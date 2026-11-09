import { z } from "zod";
import { serviceOptions } from "./site";

// Sin saltos de línea ni caracteres de control (evita inyección de cabeceras en correos)
const singleLine = /^[^\r\n\u0000-\u001f\u007f]*$/;
const nameRe = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' .-]+$/;
const textRe = /^[\p{L}\p{N} .,'\-/()#°+]*$/u;

/** Normaliza un teléfono chileno a +56XXXXXXXXX. Devuelve null si no es válido. */
export function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/[\s\-().+]/g, "");
  if (!/^\d+$/.test(digits)) return null;
  const local = digits.startsWith("56") && digits.length === 11 ? digits.slice(2) : digits;
  // Celular (9 XXXX XXXX) o fijo de 9 dígitos (2 XXXX XXXX, regiones 3x-7x)
  if (!/^[2-9]\d{8}$/.test(local)) return null;
  return `+56${local}`;
}

const urlCount = (s: string) => (s.match(/https?:\/\/|www\./gi) ?? []).length;

export const quoteSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Ingresa tu nombre (mínimo 2 letras).")
    .max(80, "El nombre es demasiado largo.")
    .regex(nameRe, "El nombre solo puede contener letras y espacios."),
  telefono: z
    .string()
    .trim()
    .min(1, "Ingresa tu teléfono.")
    .refine((v) => normalizePhone(v) !== null, "Ingresa un teléfono chileno válido, por ejemplo +56 9 1234 5678.")
    .transform((v) => normalizePhone(v) as string),
  email: z
    .string()
    .trim()
    .min(1, "Ingresa tu correo electrónico.")
    .max(120, "El correo es demasiado largo.")
    .regex(singleLine, "Correo no válido.")
    .pipe(z.email("Ingresa un correo válido, por ejemplo nombre@correo.cl.")),
  comuna: z
    .string()
    .trim()
    .max(60, "La comuna es demasiado larga.")
    .regex(/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' .-]*$/, "La comuna solo puede contener letras."),
  marca: z
    .string()
    .trim()
    .min(2, "Ingresa la marca del vehículo.")
    .max(40, "La marca es demasiado larga.")
    .regex(textRe, "La marca contiene caracteres no permitidos."),
  modelo: z
    .string()
    .trim()
    .min(1, "Ingresa el modelo del vehículo.")
    .max(40, "El modelo es demasiado largo.")
    .regex(textRe, "El modelo contiene caracteres no permitidos."),
  anio: z
    .string()
    .trim()
    .regex(/^\d{4}$/, "Ingresa el año con 4 dígitos, por ejemplo 2015.")
    .refine((v) => {
      const n = Number(v);
      return n >= 1950 && n <= new Date().getFullYear() + 1;
    }, "Ingresa un año entre 1950 y el próximo año."),
  servicio: z.enum(serviceOptions, "Selecciona el tipo de trabajo."),
  modalidad: z.enum(["taller", "domicilio", "indiferente"], "Selecciona dónde prefieres la atención."),
  mensaje: z
    .string()
    .trim()
    .max(1000, "El mensaje no puede superar los 1000 caracteres.")
    .refine((v) => urlCount(v) <= 1, "Por seguridad, no incluyas enlaces en el mensaje."),
  consentimiento: z.literal("on", "Debes aceptar ser contactado para enviar la solicitud."),
});

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteData = z.output<typeof quoteSchema>;
export type QuoteField = keyof QuoteInput;
export type FieldErrors = Partial<Record<QuoteField, string>>;

export function validateQuote(input: Record<string, unknown>) {
  const result = quoteSchema.safeParse(input);
  if (result.success) return { ok: true as const, data: result.data };
  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as QuoteField;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return { ok: false as const, errors };
}

export const quoteFields: QuoteField[] = [
  "nombre",
  "telefono",
  "email",
  "comuna",
  "marca",
  "modelo",
  "anio",
  "servicio",
  "modalidad",
  "mensaje",
  "consentimiento",
];
