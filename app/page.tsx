import Image from "next/image";
import Link from "next/link";
import { ButtonLink, CtaBanner, SectionHeading, Stars, WhatsAppButton } from "@/components/ui";
import {
  ArrowRightIcon,
  CarIcon,
  CheckIcon,
  ClockIcon,
  MapPinIcon,
  ShieldIcon,
  TruckIcon,
  UsersIcon,
} from "@/components/icons";
import { services, site } from "@/lib/site";
import { reviews } from "@/lib/reviews";
import { galeria } from "@/lib/galeria-data";

const destacados = [
  "/galeria/ig-070.webp",
  "/galeria/ig-003.webp",
  "/galeria/ig-071.webp",
  "/galeria/ig-010.webp",
  "/galeria/ig-063.webp",
  "/galeria/ig-055.webp",
  "/galeria/ig-096.webp",
  "/galeria/ig-031.webp",
]
  .map((src) => galeria.find((g) => g.src === src))
  .filter((g) => g !== undefined);

const ventajas = [
  {
    icon: ShieldIcon,
    title: "100% garantizado",
    text: "Todos nuestros trabajos tienen garantía de instalación. Si algo no queda bien, lo solucionamos.",
  },
  {
    icon: CarIcon,
    title: "Todas las marcas y modelos",
    text: "Autos, camionetas, SUV, furgones, camiones y hasta maquinaria. Si no existe el vidrio, lo fabricamos.",
  },
  {
    icon: TruckIcon,
    title: "Taller o a domicilio",
    text: "Atiende tu vehículo en nuestro taller de La Florida o coordina la instalación donde estés.",
  },
  {
    icon: UsersIcon,
    title: "Negocio familiar",
    text: "Trato directo, responsables con los tiempos de entrega y dejamos tu auto limpio.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section aria-labelledby="hero-title" className="hex-pattern relative overflow-hidden bg-ink text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-10 pb-14 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand">
              <MapPinIcon className="size-4" /> {site.address.commune}, Santiago
            </p>
            <h1
              id="hero-title"
              className="mt-5 font-display text-4xl leading-[1.05] font-extrabold uppercase sm:text-5xl lg:text-6xl"
            >
              Parabrisas y cristales <span className="text-brand">para tu vehículo</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
              Venta e instalación de parabrisas, lunetas, vidrios de puerta, aletas y espejos panorámicos.
              Todas las marcas y modelos, en taller o a domicilio.
            </p>
            <ul className="mt-6 grid gap-2 text-base text-white/90 sm:grid-cols-2">
              {["Trabajos 100% garantizados", "Cotización sin costo", "Atención a domicilio", "Fabricación a medida"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckIcon className="size-5 shrink-0 text-brand" /> {t}
                  </li>
                ),
              )}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contacto#cotizar">
                Solicitar cotización <ArrowRightIcon className="size-5" />
              </ButtonLink>
              <WhatsAppButton message="Hola, quiero cotizar un trabajo." />
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10 lg:aspect-[4/5]">
              <Image
                src="/galeria/ig-009.webp"
                alt="Auto plateado estacionado frente al letrero de Parabrisas Díaz en La Florida"
                fill
                priority
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-ink shadow-xl sm:left-6">
              <Stars rating={5} />
              <span className="text-sm font-semibold">Clientes satisfechos en Google</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section aria-labelledby="servicios-title" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              id="servicios-title"
              eyebrow="Lo que hacemos"
              title="Nuestros servicios"
              intro="Soluciones completas en cristales automotrices, con materiales de calidad e instalación profesional."
            />
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 font-semibold text-ink underline decoration-brand decoration-4 underline-offset-4 hover:decoration-ink"
            >
              Ver todos los servicios <ArrowRightIcon className="size-5" />
            </Link>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/servicios#${s.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-black/10 bg-surface transition hover:-translate-y-0.5 hover:border-ink hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-xl font-bold uppercase">{s.title}</h3>
                    <p className="mt-2 flex-1 text-ink-500">{s.short}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                      Más información <ArrowRightIcon className="size-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* POR QUÉ ELEGIRNOS */}
      <section aria-labelledby="ventajas-title" className="hex-pattern bg-ink py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            id="ventajas-title"
            dark
            center
            eyebrow="Por qué elegirnos"
            title="Confianza en cada instalación"
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ventajas.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <span className="clip-hex inline-flex size-14 items-center justify-center bg-brand text-ink">
                  <Icon className="size-7" />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold uppercase">{title}</h3>
                <p className="mt-2 leading-relaxed text-white/75">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TRABAJOS */}
      <section aria-labelledby="trabajos-title" className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              id="trabajos-title"
              eyebrow="Trabajos realizados"
              title="Más de 100 trabajos publicados"
              intro="Algunos de los vehículos que han pasado por nuestro taller."
            />
            <ButtonLink href="/galeria" variant="dark">
              Ver galería completa <ArrowRightIcon className="size-5" />
            </ButtonLink>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {destacados.map((g) => (
              <li key={g.src} className="group relative aspect-square overflow-hidden rounded-xl bg-ink">
                <Image
                  src={g.src}
                  alt={g.title}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3 pt-10 text-sm font-semibold text-white">
                  {g.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* RESEÑAS */}
      <section aria-labelledby="resenas-title" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              id="resenas-title"
              eyebrow="Reseñas"
              title="Lo que dicen nuestros clientes"
              intro="Opiniones reales publicadas en Google Maps."
            />
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold underline decoration-brand decoration-4 underline-offset-4 hover:decoration-ink"
            >
              Ver en Google Maps <ArrowRightIcon className="size-5" />
              <span className="sr-only">(abre en una pestaña nueva)</span>
            </a>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <li key={r.author}>
                <figure className="flex h-full flex-col rounded-xl border border-black/10 bg-surface p-6">
                  <Stars rating={r.rating} />
                  <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-ink">
                    <p>“{r.text}”</p>
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-black/10 pt-4">
                    <span
                      aria-hidden
                      className="clip-hex inline-flex size-11 shrink-0 items-center justify-center bg-ink font-display text-lg font-bold text-brand"
                    >
                      {r.author.charAt(0)}
                    </span>
                    <span>
                      <span className="block font-semibold">{r.author}</span>
                      <span className="block text-sm text-ink-500">
                        {r.localGuide ? "Local Guide · " : ""}
                        {r.when}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* UBICACIÓN RÁPIDA */}
      <section aria-labelledby="visitanos-title" className="border-t border-black/10 bg-surface py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <SectionHeading id="visitanos-title" eyebrow="Visítanos" title="Taller en La Florida" />
            <p className="mt-4 flex items-start gap-2 text-lg">
              <MapPinIcon className="mt-1 size-5 shrink-0" />
              <span>
                {site.address.street}, {site.address.commune}.
                <span className="block text-ink-500">{site.address.reference}.</span>
              </span>
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contacto" variant="dark">
                Cómo llegar
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-xl bg-white p-6 ring-1 ring-black/10">
            <h3 className="flex items-center gap-2 font-display text-xl font-bold uppercase">
              <ClockIcon className="size-5" /> Horario de atención
            </h3>
            <dl className="mt-4 divide-y divide-black/10">
              {site.hours.map((h) => (
                <div key={h.days} className="flex flex-wrap justify-between gap-2 py-3">
                  <dt className="font-semibold">{h.days}</dt>
                  <dd className="text-right">
                    {h.ranges.join(" y ")}
                    {"note" in h && h.note ? <span className="block text-sm text-ink-500">{h.note}</span> : null}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
