"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site, whatsappLink } from "@/lib/site";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "./icons";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Cerrar el menú al cambiar de página
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name}, ir al inicio`}>
          <Image
            src="/img/logo.webp"
            alt=""
            width={56}
            height={56}
            priority
            className="size-11 rounded-full bg-white sm:size-14"
          />
          <span className="leading-tight">
            <span className="block font-display text-xl font-bold uppercase tracking-wide text-brand sm:text-2xl">
              {site.name}
            </span>
            <span className="block text-xs text-white/70 sm:text-sm">{site.brand}</span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="rounded-md px-3 py-2 text-base font-medium text-white/85 transition hover:text-brand aria-[current=page]:text-brand aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="ml-2">
              <Link
                href="/contacto#cotizar"
                className="focus-dark inline-flex items-center rounded-full bg-brand px-5 py-2.5 font-semibold text-ink transition hover:bg-brand-600"
              >
                Cotizar
              </Link>
            </li>
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md text-white md:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div
        id="menu-movil"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 sm:top-20 overflow-y-auto bg-ink md:hidden"
      >
        <nav aria-label="Menú móvil" className="px-4 py-6">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="block rounded-lg px-4 py-4 text-xl font-semibold text-white aria-[current=page]:bg-white/10 aria-[current=page]:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link
              href="/contacto#cotizar"
              className="focus-dark rounded-full bg-brand px-6 py-4 text-center text-lg font-bold text-ink"
            >
              Solicitar cotización
            </Link>
            <a
              href={whatsappLink("Hola, quiero cotizar un trabajo.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-6 py-4 text-lg font-semibold text-white"
            >
              <WhatsAppIcon /> Escríbenos por WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
