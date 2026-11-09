import Image from "next/image";
import Link from "next/link";
import { nav, site, whatsappLink } from "@/lib/site";
import { ClockIcon, InstagramIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "./icons";

export function Footer() {
  return (
    <footer className="hex-pattern bg-ink text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/img/logo.webp"
              alt={`Logo ${site.brand}`}
              width={80}
              height={80}
              className="size-20 rounded-full bg-white"
            />
            <span className="font-display text-2xl font-bold uppercase text-brand">{site.name}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Venta e instalación de cristales automotrices. Negocio familiar en La Florida.
            Todas las marcas y modelos, trabajos 100% garantizados.
          </p>
        </div>

        <div>
          <h2 className="flex items-center gap-2 font-display text-lg font-bold uppercase tracking-wide text-white">
            <ClockIcon className="size-5 text-brand" /> Horario de atención
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            {site.hours.map((h) => (
              <div key={h.days}>
                <dt className="font-semibold text-white">{h.days}</dt>
                <dd>{h.ranges.join(" · ")}</dd>
                {"note" in h && h.note ? <dd className="text-white/60">{h.note}</dd> : null}
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">Contacto</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-1 hover:text-brand"
              >
                <WhatsAppIcon className="size-5 text-brand" />
                {site.phones.whatsapp.display}
                <span className="sr-only">(WhatsApp, abre en una pestaña nueva)</span>
              </a>
            </li>
            <li>
              <a href={`tel:${site.phones.landline.href}`} className="inline-flex items-center gap-2 py-1 hover:text-brand">
                <PhoneIcon className="size-5 text-brand" />
                {site.phones.landline.display}
              </a>
            </li>
            <li>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-1 hover:text-brand"
              >
                <InstagramIcon className="size-5 text-brand" />
                {site.instagram.handle}
                <span className="sr-only">(Instagram, abre en una pestaña nueva)</span>
              </a>
            </li>
            <li>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-2 py-1 hover:text-brand"
              >
                <MapPinIcon className="mt-0.5 size-5 shrink-0 text-brand" />
                <span>
                  {site.address.street}, {site.address.commune}
                  <span className="block text-white/60">{site.address.reference}</span>
                </span>
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Pie de página">
          <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">Navegación</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-block py-1 hover:text-brand">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contacto#cotizar" className="inline-block py-1 font-semibold text-brand hover:underline">
                Solicitar cotización
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-center text-xs text-white/60 sm:px-6">
          © {site.name} · {site.brand}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
