"use client";

import { useActionState, useEffect, useRef, useState, type ChangeEvent } from "react";
import { sendQuote, type QuoteState } from "@/app/contacto/actions";
import { type FieldErrors, type QuoteField, quoteFields, validateQuote } from "@/lib/quote-schema";
import { serviceOptions, whatsappLink } from "@/lib/site";
import { CheckIcon, WhatsAppIcon } from "./icons";

type Values = Record<QuoteField, string>;

const empty: Values = {
  nombre: "",
  telefono: "",
  email: "",
  comuna: "",
  marca: "",
  modelo: "",
  anio: "",
  servicio: "",
  modalidad: "",
  mensaje: "",
  consentimiento: "",
};

// Mapeo de los slugs de /servicios a las opciones del formulario
const slugToOption: Record<string, (typeof serviceOptions)[number]> = {
  parabrisas: "Parabrisas",
  lunetas: "Luneta (parabrisas trasero)",
  "vidrios-de-puerta": "Vidrio de puerta",
  aletas: "Aleta / lateral",
  espejos: "Espejo panorámico o lateral",
  patentes: "Grabado de patentes",
  sellados: "Sellado / filtraciones",
  fabricacion: "Vidrio a medida",
};

const initial: QuoteState = { status: "idle" };

function Err({ name, error }: { name: QuoteField; error?: string }) {
  return error ? (
    <p id={`f-${name}-error`} className="mt-1.5 flex items-start gap-1 text-sm font-medium text-[#b42318]">
      <span aria-hidden>⚠</span> {error}
    </p>
  ) : null;
}

function Label({ name, children, optional }: { name: QuoteField; children: string; optional?: boolean }) {
  return (
    <label htmlFor={`f-${name}`} className="block font-semibold text-ink">
      {children}{" "}
      {optional ? (
        <span className="font-normal text-ink-500">(opcional)</span>
      ) : (
        <span aria-hidden className="text-[#b42318]">
          *
        </span>
      )}
    </label>
  );
}

function toInput(v: Values) {
  return { ...v, consentimiento: v.consentimiento === "on" ? "on" : undefined };
}

export function QuoteForm() {
  const [state, formAction, pending] = useActionState(sendQuote, initial);
  const [values, setValues] = useState<Values>(empty);
  const [touched, setTouched] = useState<Partial<Record<QuoteField, boolean>>>({});
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Marca de tiempo anti-bots (se escribe en el input oculto al montar)
  const startRef = useRef(0);
  useEffect(() => {
    if (!startRef.current) startRef.current = Date.now();
    // React reinicia los campos no controlados tras cada envío: se restaura aquí
    if (timeRef.current) timeRef.current.value = String(startRef.current);
  }, [state]);

  // Preselección del servicio cuando se llega desde /servicios (?servicio=slug)
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("servicio");
    const option = slug ? slugToOption[slug] : undefined;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sincroniza con la URL solo al montar
    if (option) setValues((v) => ({ ...v, servicio: option }));
  }, []);

  // Tras responder el servidor: foco en el mensaje y limpieza si fue exitoso
  const [handled, setHandled] = useState<QuoteState>(initial);
  if (state !== handled) {
    setHandled(state);
    setTouched({});
    setClientErrors({});
    if (state.status === "success") setValues(empty);
  }
  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
    else if (state.status === "error") {
      const firstField = quoteFields.find((f) => state.errors?.[f]);
      if (firstField) formRef.current?.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus();
      else statusRef.current?.focus();
    }
  }, [state]);

  const errors: FieldErrors = { ...(state.status === "error" ? state.errors : {}), ...clientErrors };
  // Un error del servidor desaparece cuando el usuario modifica ese campo
  for (const f of quoteFields) if (touched[f] && !clientErrors[f]) delete errors[f];

  const revalidate = (next: Values, field: QuoteField) => {
    const r = validateQuote(toInput(next));
    setClientErrors((prev) => {
      const copy = { ...prev };
      if (!r.ok && r.errors[field]) copy[field] = r.errors[field];
      else delete copy[field];
      return copy;
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const field = name as QuoteField;
    const v = type === "checkbox" ? ((e.target as HTMLInputElement).checked ? "on" : "") : value;
    const next = { ...values, [field]: v };
    setValues(next);
    if (touched[field] || type === "checkbox" || type === "radio") {
      setTouched((t) => ({ ...t, [field]: true }));
      revalidate(next, field);
    }
  };

  const onBlur = (field: QuoteField) => {
    if (!values[field] && !touched[field]) return; // no marcar error solo por pasar con Tab
    setTouched((t) => ({ ...t, [field]: true }));
    revalidate(values, field);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const r = validateQuote(toInput(values));
    if (!r.ok) {
      e.preventDefault();
      setClientErrors(r.errors);
      setTouched(Object.fromEntries(quoteFields.map((f) => [f, true])));
      const first = quoteFields.find((f) => r.errors[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
  };

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border-2 border-[#1f8f4e] bg-[#eef8f1] p-6 text-center sm:p-10"
      >
        <span className="clip-hex mx-auto inline-flex size-16 items-center justify-center bg-[#1f8f4e] text-white">
          <CheckIcon className="size-8" />
        </span>
        <h3 className="mt-4 font-display text-3xl font-bold uppercase">¡Solicitud enviada!</h3>
        <p className="mx-auto mt-3 max-w-md text-lg">
          Recibimos tu solicitud{state.id && state.id !== "OK" ? <> N° <strong>{state.id}</strong></> : null}. Te
          enviamos un correo de confirmación y un vendedor te contactará a la brevedad.
        </p>
        <p className="mt-2 text-sm text-ink-500">Revisa tu carpeta de spam si no ves el correo.</p>
        <button
          type="button"
          onClick={() => {
            setHandled(initial);
            window.location.reload();
          }}
          className="focus-dark mt-6 inline-flex min-h-12 items-center rounded-full bg-ink px-6 py-3 font-bold text-white"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  const field = (name: QuoteField) => ({
    id: `f-${name}`,
    name,
    value: values[name],
    onChange,
    onBlur: () => onBlur(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": [errors[name] ? `f-${name}-error` : "", `f-${name}-hint`].join(" ").trim(),
  });

  const inputCls =
    "focus-dark mt-1.5 block min-h-12 w-full rounded-lg border border-black/25 bg-white px-4 py-3 text-base text-ink placeholder:text-ink-500/70 focus:border-ink aria-invalid:border-[#b42318] aria-invalid:bg-[#fff6f5]";

  const errorCount = Object.keys(errors).length;

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      aria-describedby="form-help"
      className="on-light rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/10 sm:p-8"
    >
      <p id="form-help" className="text-sm text-ink-500">
        Los campos marcados con <span className="text-[#b42318]">*</span> son obligatorios.
      </p>

      <div ref={statusRef} tabIndex={-1} aria-live="assertive" className="outline-none">
        {state.status === "error" && state.message ? (
          <div role="alert" className="mt-4 rounded-lg border border-[#b42318]/40 bg-[#fff6f5] p-4 text-[#7a1a12]">
            <p className="font-semibold">{state.message}</p>
            {!state.errors ? (
              <a
                href={whatsappLink("Hola, intenté cotizar en la web pero no pude enviar el formulario.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 font-semibold underline"
              >
                <WhatsAppIcon className="size-4" /> Escribir por WhatsApp
              </a>
            ) : null}
          </div>
        ) : null}
      </div>

      {/* Anti-spam: campo trampa invisible y marca de tiempo */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-sitio_web">No completar este campo</label>
        <input id="f-sitio_web" type="text" name="sitio_web" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input ref={timeRef} type="hidden" name="_t" defaultValue="" />

      <fieldset className="mt-6">
        <legend className="font-display text-xl font-bold uppercase">Tus datos</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label name="nombre">Nombre y apellido</Label>
            <input {...field("nombre")} type="text" autoComplete="name" maxLength={80} required className={inputCls} />
            <span id="f-nombre-hint" className="sr-only" />
            <Err name="nombre" error={errors.nombre} />
          </div>
          <div>
            <Label name="telefono">Teléfono / WhatsApp</Label>
            <input
              {...field("telefono")}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+56 9 1234 5678"
              maxLength={20}
              required
              className={inputCls}
            />
            <span id="f-telefono-hint" className="mt-1 block text-sm text-ink-500">
              Celular o fijo chileno.
            </span>
            <Err name="telefono" error={errors.telefono} />
          </div>
          <div>
            <Label name="email">Correo electrónico</Label>
            <input
              {...field("email")}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="nombre@correo.cl"
              maxLength={120}
              required
              className={inputCls}
            />
            <span id="f-email-hint" className="mt-1 block text-sm text-ink-500">
              Te enviaremos la confirmación aquí.
            </span>
            <Err name="email" error={errors.email} />
          </div>
          <div className="sm:col-span-2">
            <Label name="comuna" optional>
              Comuna
            </Label>
            <input
              {...field("comuna")}
              type="text"
              autoComplete="address-level2"
              placeholder="Ej: La Florida"
              maxLength={60}
              className={inputCls}
            />
            <span id="f-comuna-hint" className="sr-only" />
            <Err name="comuna" error={errors.comuna} />
          </div>
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="font-display text-xl font-bold uppercase">Tu vehículo</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-3">
          <div>
            <Label name="marca">Marca</Label>
            <input {...field("marca")} type="text" placeholder="Ej: Kia" maxLength={40} required className={inputCls} />
            <span id="f-marca-hint" className="sr-only" />
            <Err name="marca" error={errors.marca} />
          </div>
          <div>
            <Label name="modelo">Modelo</Label>
            <input {...field("modelo")} type="text" placeholder="Ej: Morning" maxLength={40} required className={inputCls} />
            <span id="f-modelo-hint" className="sr-only" />
            <Err name="modelo" error={errors.modelo} />
          </div>
          <div>
            <Label name="anio">Año</Label>
            <input
              {...field("anio")}
              type="text"
              inputMode="numeric"
              placeholder="Ej: 2016"
              maxLength={4}
              required
              className={inputCls}
            />
            <span id="f-anio-hint" className="sr-only" />
            <Err name="anio" error={errors.anio} />
          </div>
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="font-display text-xl font-bold uppercase">¿Qué necesitas?</legend>
        <div className="mt-4 grid gap-5">
          <div>
            <Label name="servicio">Tipo de trabajo</Label>
            <select {...field("servicio")} required className={inputCls}>
              <option value="" disabled>
                Selecciona una opción
              </option>
              {serviceOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <span id="f-servicio-hint" className="sr-only" />
            <Err name="servicio" error={errors.servicio} />
          </div>

          <div
            role="radiogroup"
            aria-labelledby="f-modalidad-label"
            aria-required
            aria-invalid={errors.modalidad ? true : undefined}
            aria-describedby={errors.modalidad ? "f-modalidad-error" : undefined}
          >
            <p id="f-modalidad-label" className="font-semibold">
              ¿Dónde prefieres la atención? <span aria-hidden className="text-[#b42318]">*</span>
            </p>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {(
                [
                  ["taller", "En el taller"],
                  ["domicilio", "A domicilio"],
                  ["indiferente", "Me da lo mismo"],
                ] as const
              ).map(([v, l]) => (
                <label
                  key={v}
                  className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-black/25 px-4 py-3 has-checked:border-ink has-checked:bg-brand-50 has-focus-visible:outline-3 has-focus-visible:outline-ink"
                >
                  <input
                    type="radio"
                    name="modalidad"
                    value={v}
                    checked={values.modalidad === v}
                    onChange={onChange}
                    className="size-5 accent-ink"
                  />
                  {l}
                </label>
              ))}
            </div>
            <Err name="modalidad" error={errors.modalidad} />
          </div>

          <div>
            <Label name="mensaje" optional>
              Detalles adicionales
            </Label>
            <textarea
              {...field("mensaje")}
              rows={4}
              maxLength={1000}
              placeholder="Ej: parabrisas con sensor de lluvia, trizadura por piedra…"
              className={`${inputCls} resize-y`}
            />
            <span id="f-mensaje-hint" className="mt-1 block text-right text-sm text-ink-500">
              {values.mensaje.length}/1000
            </span>
            <Err name="mensaje" error={errors.mensaje} />
          </div>

          <div>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                name="consentimiento"
                id="f-consentimiento"
                checked={values.consentimiento === "on"}
                onChange={onChange}
                className="mt-0.5 size-5 shrink-0 accent-ink"
                aria-invalid={errors.consentimiento ? true : undefined}
                aria-describedby={errors.consentimiento ? "f-consentimiento-error" : undefined}
              />
              <span>
                Acepto que me contacten por teléfono, WhatsApp o correo para responder esta cotización.{" "}
                <span aria-hidden className="text-[#b42318]">
                  *
                </span>
              </span>
            </label>
            <Err name="consentimiento" error={errors.consentimiento} />
          </div>
        </div>
      </fieldset>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          className="focus-dark inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-brand px-8 py-3 text-lg font-bold text-ink transition hover:bg-brand-600 disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? (
            <>
              <span aria-hidden className="size-5 animate-spin rounded-full border-2 border-ink border-t-transparent" />
              Enviando…
            </>
          ) : (
            "Enviar solicitud"
          )}
        </button>
        {errorCount > 0 ? (
          <p className="text-sm font-medium text-[#b42318]">
            Hay {errorCount} {errorCount === 1 ? "campo" : "campos"} por corregir.
          </p>
        ) : (
          <p className="text-sm text-ink-500">Respondemos en horario de atención.</p>
        )}
      </div>
    </form>
  );
}
