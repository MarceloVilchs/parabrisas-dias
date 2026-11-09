import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, CtaBanner, SectionHeading, WhatsAppButton } from "@/components/ui";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Parabrisas, lunetas, vidrios de puerta, aletas, espejos panorámicos, grabado de patentes, sellados y vidrios a medida en La Florida. Todas las marcas y modelos.",
  alternates: { canonical: "/servicios" },
};

const pasos = [
  { title: "Cotiza", text: "Envíanos marca, modelo, año y el vidrio que necesitas por el formulario o WhatsApp." },
  { title: "Agenda", text: "Coordinamos el día y si el trabajo será en el taller o a domicilio." },
  { title: "Instalamos", text: "Retiramos el vidrio dañado, limpiamos, instalamos y sellamos." },
  { title: "Garantía", text: "Entregamos tu vehículo limpio y con el trabajo 100% garantizado." },
];

export default function ServiciosPage() {
  return (
    <>
      <section aria-labelledby="servicios-h1" className="hex-pattern bg-ink py-14 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-brand">Servicios</p>
          <h1 id="servicios-h1" className="mt-2 max-w-3xl font-display text-4xl font-extrabold uppercase leading-tight sm:text-5xl">
            Cristales automotrices para todas las marcas y modelos
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            Venta e instalación en nuestro taller de La Florida o a domicilio. Elige un servicio para ver el detalle.
          </p>
          <nav aria-label="Servicios" className="mt-8">
            <ul className="flex flex-wrap gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <a
                    href={`#${s.slug}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white/90 transition hover:border-brand hover:text-brand"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <div className="bg-white">
        {services.map((s, i) => (
          <section
            key={s.slug}
            id={s.slug}
            aria-labelledby={`${s.slug}-title`}
            className={i % 2 === 1 ? "bg-surface" : "bg-white"}
          >
            <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 md:gap-12">
              <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  sizes="(min-width: 768px) 540px, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-ink-500">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 id={`${s.slug}-title`} className="mt-1 font-display text-3xl font-bold uppercase sm:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-ink-500">{s.description}</p>
                <ul className="mt-6 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-lg">
                      <span className="clip-hex inline-flex size-7 shrink-0 items-center justify-center bg-brand">
                        <CheckIcon className="size-4" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href={`/contacto?servicio=${encodeURIComponent(s.slug)}#cotizar`} variant="dark">
                    Cotizar {s.title.toLowerCase()} <ArrowRightIcon className="size-5" />
                  </ButtonLink>
                  <WhatsAppButton message={`Hola, quiero cotizar: ${s.title}.`} label="WhatsApp" />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="proceso-title" className="hex-pattern bg-ink py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading id="proceso-title" dark center eyebrow="Cómo trabajamos" title="Simple y sin sorpresas" />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pasos.map((p, i) => (
              <li key={p.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <span className="clip-hex inline-flex size-12 items-center justify-center bg-brand font-display text-xl font-extrabold text-ink">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold uppercase">{p.title}</h3>
                <p className="mt-2 text-white/75">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
