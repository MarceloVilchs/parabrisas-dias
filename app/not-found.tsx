import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="hex-pattern flex min-h-[60vh] items-center bg-ink text-white">
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="font-display text-7xl font-extrabold text-brand">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold uppercase">Página no encontrada</h1>
        <p className="mt-3 text-lg text-white/75">La página que buscas no existe o fue movida.</p>
        <ButtonLink href="/" className="mt-8">
          Volver al inicio
        </ButtonLink>
      </div>
    </section>
  );
}
