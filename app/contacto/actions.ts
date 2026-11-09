"use server";

import { headers } from "next/headers";
import { randomBytes } from "node:crypto";
import { customerEmail, sellerEmail } from "@/lib/email-templates";
import { mailConfigured, sendMail } from "@/lib/mailer";
import { type FieldErrors, quoteFields, validateQuote } from "@/lib/quote-schema";
import { rateLimit } from "@/lib/rate-limit";

export type QuoteState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: FieldErrors;
  id?: string;
};

const MIN_FILL_MS = 3_000; // un humano no completa el formulario en menos de 3 s
const MAX_FILL_MS = 2 * 60 * 60 * 1000; // formulario abierto por más de 2 h = recargar

export async function sendQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  // 1) Honeypot: campo invisible que solo completan los bots. Respondemos "éxito" sin enviar nada.
  const honeypot = formData.get("sitio_web");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "success", id: "OK" };
  }

  // 2) Trampa de tiempo
  const started = Number(formData.get("_t"));
  if (!formData.get("_t") || !Number.isFinite(started)) {
    return {
      status: "error",
      message: "No pudimos verificar el formulario. Recarga la página o escríbenos por WhatsApp.",
    };
  }
  const elapsed = Date.now() - started;
  if (elapsed < MIN_FILL_MS) {
    return { status: "success", id: "OK" };
  }
  if (elapsed > MAX_FILL_MS) {
    return { status: "error", message: "El formulario expiró. Recarga la página e inténtalo de nuevo." };
  }

  // 3) Límite de envíos por IP
  const h = await headers();
  const ip = (h.get("x-forwarded-for")?.split(",")[0] ?? h.get("x-real-ip") ?? "local").trim();
  const limit = rateLimit(`quote:${ip}`);
  if (!limit.ok) {
    return {
      status: "error",
      message: `Recibimos demasiadas solicitudes desde tu conexión. Intenta en ${limit.retryInMin} minutos o escríbenos por WhatsApp.`,
    };
  }

  // 4) Validación estricta en el servidor (nunca confiar solo en el navegador)
  const raw: Record<string, unknown> = {};
  for (const f of quoteFields) {
    const v = formData.get(f);
    raw[f] = typeof v === "string" ? v : "";
  }
  if (raw.consentimiento === "") raw.consentimiento = undefined;
  const result = validateQuote(raw);
  if (!result.ok) {
    return { status: "error", message: "Revisa los campos marcados.", errors: result.errors };
  }

  if (process.env.NODE_ENV === "production" && !mailConfigured()) {
    console.error("[cotizacion] SMTP no configurado: revisa las variables de entorno.");
    return {
      status: "error",
      message: "No pudimos enviar tu solicitud en este momento. Escríbenos por WhatsApp o llámanos.",
    };
  }

  // 5) Envío de correos (los datos se escapan dentro de las plantillas)
  const id = `PD-${randomBytes(3).toString("hex").toUpperCase()}`;
  const fecha = new Intl.DateTimeFormat("es-CL", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Santiago",
  }).format(new Date());
  const data = result.data;

  try {
    const seller = sellerEmail(data, { id, fecha });
    await sendMail({
      to: process.env.MAIL_TO ?? "vendedor@localhost",
      replyTo: data.email,
      ...seller,
    });
  } catch (err) {
    console.error("[cotizacion] Error enviando correo al vendedor", err);
    return {
      status: "error",
      message: "No pudimos enviar tu solicitud. Inténtalo nuevamente o escríbenos por WhatsApp.",
    };
  }

  try {
    const customer = customerEmail(data, { id });
    await sendMail({ to: data.email, ...customer });
  } catch (err) {
    // La solicitud ya llegó al vendedor; solo falló la confirmación al cliente.
    console.error("[cotizacion] Error enviando confirmación al cliente", err);
  }

  return { status: "success", id };
}
