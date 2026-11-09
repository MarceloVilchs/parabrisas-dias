import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { CtaBanner } from "@/components/ui";
import { galeria } from "@/lib/galeria-data";

export const metadata: Metadata = {
  title: "Galería de trabajos",
  description:
    "Fotos de parabrisas, lunetas, vidrios de puerta, aletas y espejos instalados por Parabrisas Díaz en La Florida.",
  alternates: { canonical: "/galeria" },
};

export default function GaleriaPage() {
  return (
    <>
      <section aria-labelledby="galeria-h1" className="hex-pattern bg-ink py-14 text-white sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-brand">Galería</p>
          <h1 id="galeria-h1" className="mt-2 font-display text-4xl font-extrabold uppercase sm:text-5xl">
            Trabajos realizados
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            {galeria.length} trabajos publicados en nuestro Instagram. Filtra por tipo de cristal y toca una foto para
            verla en grande.
          </p>
        </div>
      </section>
      <section aria-label="Fotos de trabajos" className="bg-surface py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Gallery items={galeria} />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
