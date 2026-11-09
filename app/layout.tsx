import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { site } from "@/lib/site";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Parabrisas y cristales automotrices en La Florida`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "parabrisas La Florida",
    "cambio de parabrisas",
    "lunetas",
    "vidrios de puerta",
    "espejos panorámicos",
    "grabado de patentes",
    "Vicuña Mackenna",
    "Glassy",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: site.name,
    title: `${site.name} · ${site.brand}`,
    description: site.description,
    images: [{ url: "/galeria/ig-009.webp", alt: "Taller Parabrisas Díaz en La Florida" }],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#121212",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoGlass",
  name: site.name,
  alternateName: site.brand,
  description: site.description,
  url: site.url,
  image: `${site.url}/img/logo.webp`,
  telephone: `+${site.phones.whatsapp.href}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.commune,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: "CL",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "14:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "15:00", closes: "18:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "14:00" },
  ],
  sameAs: [site.instagram.url],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CL" className={`${barlow.variable} ${barlowCondensed.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#contenido"
          className="sr-only z-50 rounded-md bg-brand px-4 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
