import Link from "next/link";
import type { ReactNode } from "react";
import { whatsappLink } from "@/lib/site";
import { ArrowRightIcon, StarIcon, WhatsAppIcon } from "./icons";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  dark = false,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  id?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p
          className={`font-display text-sm font-bold uppercase tracking-[0.2em] ${
            dark ? "text-brand" : "text-ink-500"
          }`}
        >
          <span aria-hidden className={dark ? "" : "mr-2 inline-block h-3 w-3 bg-brand clip-hex align-[-1px]"} />
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={`mt-2 font-display text-3xl font-bold uppercase leading-tight sm:text-4xl ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-white/75" : "text-ink-500"}`}>{intro}</p>
      ) : null}
    </div>
  );
}

export function Stars({ rating, size = "size-5" }: { rating: number; size?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-[#e8a100]" role="img" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} filled={i < Math.round(rating)} className={size} />
      ))}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline-light" | "dark";
  className?: string;
}) {
  const styles = {
    primary: "focus-dark bg-brand text-ink hover:bg-brand-600",
    "outline-light": "border-2 border-white/40 text-white hover:border-brand hover:text-brand",
    dark: "bg-ink text-white hover:bg-ink-700",
  }[variant];
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-bold transition ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}

export function WhatsAppButton({
  message,
  label = "Escríbenos por WhatsApp",
  className = "",
}: {
  message?: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1f8f4e] px-6 py-3 text-base font-bold text-white transition hover:bg-[#187540] ${className}`}
    >
      <WhatsAppIcon className="size-5" />
      {label}
      <span className="sr-only">(abre en una pestaña nueva)</span>
    </a>
  );
}

export function CtaBanner() {
  return (
    <section aria-labelledby="cta-title" className="bg-brand">
      <div className="on-light mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 id="cta-title" className="font-display text-3xl font-bold uppercase text-ink sm:text-4xl">
            ¿Se trizó tu parabrisas?
          </h2>
          <p className="mt-2 max-w-xl text-lg text-ink/80">
            Cuéntanos la marca, modelo y año de tu vehículo y te enviamos una cotización a la brevedad.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <ButtonLink href="/contacto#cotizar" variant="dark">
            Cotizar ahora <ArrowRightIcon className="size-5" />
          </ButtonLink>
          <WhatsAppButton message="Hola, quiero cotizar un trabajo." label="WhatsApp" />
        </div>
      </div>
    </section>
  );
}
