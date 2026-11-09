import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { WhatsAppButton } from "@/components/ui";
import { ClockIcon, InstagramIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto y cotizaciones",
  description:
    "Cotiza tu parabrisas, luneta o vidrio de puerta. Taller en Av. Vicuña Mackenna 10976, La Florida. WhatsApp +56 9 8454 3080.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <section aria-labelledby="contacto-h1" className="hex-pattern bg-ink py-14 text-white sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-brand">Contacto</p>
          <h1 id="contacto-h1" className="mt-2 font-display text-4xl font-extrabold uppercase sm:text-5xl">
            Cotiza sin compromiso
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Completa el formulario con los datos de tu vehículo y te responderemos a la brevedad. Si es urgente,
            escríbenos por WhatsApp.
          </p>
        </div>
      </section>

      <section className="bg-surface py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.6fr_1fr]">
          <div id="cotizar" className="scroll-mt-28">
            <h2 className="sr-only">Formulario de cotización</h2>
            <QuoteForm />
          </div>

          <aside aria-label="Datos de contacto" className="space-y-5">
            <div className="rounded-2xl bg-ink p-6 text-white">
              <h2 className="font-display text-2xl font-bold uppercase text-brand">Contacto directo</h2>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href={whatsappLink("Hola, quiero cotizar un trabajo.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-brand"
                  >
                    <span className="clip-hex inline-flex size-11 shrink-0 items-center justify-center bg-brand text-ink">
                      <WhatsAppIcon className="size-5" />
                    </span>
                    <span>
                      <span className="block text-sm text-white/60">WhatsApp</span>
                      <span className="text-lg font-semibold">{site.phones.whatsapp.display}</span>
                      <span className="sr-only"> (abre en una pestaña nueva)</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`tel:${site.phones.landline.href}`} className="flex items-center gap-3 hover:text-brand">
                    <span className="clip-hex inline-flex size-11 shrink-0 items-center justify-center bg-brand text-ink">
                      <PhoneIcon className="size-5" />
                    </span>
                    <span>
                      <span className="block text-sm text-white/60">Teléfono fijo</span>
                      <span className="text-lg font-semibold">{site.phones.landline.display}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={site.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-brand"
                  >
                    <span className="clip-hex inline-flex size-11 shrink-0 items-center justify-center bg-brand text-ink">
                      <InstagramIcon className="size-5" />
                    </span>
                    <span>
                      <span className="block text-sm text-white/60">Instagram</span>
                      <span className="text-lg font-semibold">{site.instagram.handle}</span>
                      <span className="sr-only"> (abre en una pestaña nueva)</span>
                    </span>
                  </a>
                </li>
              </ul>
              <WhatsAppButton message="Hola, quiero cotizar un trabajo." className="mt-6 w-full" />
            </div>

            <div className="rounded-2xl bg-white p-6 ring-1 ring-black/10">
              <h2 className="flex items-center gap-2 font-display text-xl font-bold uppercase">
                <ClockIcon className="size-5" /> Horario
              </h2>
              <dl className="mt-3 divide-y divide-black/10">
                {site.hours.map((h) => (
                  <div key={h.days} className="py-3">
                    <dt className="font-semibold">{h.days}</dt>
                    <dd>{h.ranges.join(" y ")}</dd>
                    {"note" in h && h.note ? <dd className="text-sm text-ink-500">{h.note}</dd> : null}
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="mapa-title" className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 id="mapa-title" className="font-display text-3xl font-bold uppercase sm:text-4xl">
                Cómo llegar
              </h2>
              <p className="mt-3 flex items-start gap-2 text-lg">
                <MapPinIcon className="mt-1 size-5 shrink-0" />
                <span>
                  {site.address.street}, {site.address.commune}, {site.address.city}.{" "}
                  <span className="text-ink-500">{site.address.reference}.</span>
                </span>
              </p>
            </div>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-dark inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-6 py-3 font-bold text-white hover:bg-ink-700"
            >
              Abrir en Google Maps<span className="sr-only"> (abre en una pestaña nueva)</span>
            </a>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-black/10">
            <iframe
              src={site.mapsEmbed}
              title={`Mapa de ubicación de ${site.name} en ${site.address.street}, ${site.address.commune}`}
              className="block h-[360px] w-full sm:h-[450px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </section>
    </>
  );
}
