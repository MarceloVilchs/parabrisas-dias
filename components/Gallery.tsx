"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryCategory, GalleryItem } from "@/lib/types";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./icons";

const filtros: { id: "todos" | GalleryCategory; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "parabrisas", label: "Parabrisas" },
  { id: "lunetas", label: "Lunetas" },
  { id: "puertas", label: "Vidrios de puerta" },
  { id: "aletas", label: "Aletas" },
  { id: "espejos", label: "Espejos" },
  { id: "patentes", label: "Patentes" },
  { id: "otros", label: "Otros" },
];

const PAGE = 24;

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [filtro, setFiltro] = useState<(typeof filtros)[number]["id"]>("todos");
  const [visible, setVisible] = useState(PAGE);
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const list = filtro === "todos" ? items : items.filter((i) => i.cat === filtro);
  const shown = list.slice(0, visible);

  const open = (i: number, el: HTMLButtonElement) => {
    lastTrigger.current = el;
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const go = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + list.length) % list.length)),
    [list.length],
  );

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onClose = () => {
      setIndex(null);
      lastTrigger.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    dlg.addEventListener("close", onClose);
    dlg.addEventListener("keydown", onKey);
    return () => {
      dlg.removeEventListener("close", onClose);
      dlg.removeEventListener("keydown", onKey);
    };
  }, [go]);

  // Gestos táctiles: deslizar para cambiar de foto
  const touchX = useRef<number | null>(null);

  const current = index !== null ? list[index] : null;
  const count = (id: string) => (id === "todos" ? items.length : items.filter((i) => i.cat === id).length);

  return (
    <div>
      <div role="group" aria-label="Filtrar por tipo de trabajo" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {filtros
          .filter((f) => count(f.id) > 0)
          .map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filtro === f.id}
              onClick={() => {
                setFiltro(f.id);
                setVisible(PAGE);
              }}
              className="focus-dark inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-brand"
            >
              {f.label}
              <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs [[aria-pressed=true]_&]:bg-white/15">
                {count(f.id)}
              </span>
            </button>
          ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Mostrando {shown.length} de {list.length} fotos
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {shown.map((g, i) => (
          <li key={g.src}>
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              className="focus-dark group relative block aspect-square w-full overflow-hidden rounded-xl bg-ink text-left"
              aria-label={`Ver foto ampliada: ${g.title}`}
            >
              <Image
                src={g.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 270px, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3 pt-10 text-sm font-semibold text-white">
                {g.title}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {visible < list.length ? (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE)}
            className="inline-flex min-h-12 items-center rounded-full bg-ink px-8 py-3 font-bold text-white transition hover:bg-ink-700"
          >
            Cargar más fotos ({list.length - visible} restantes)
          </button>
        </div>
      ) : null}

      <dialog
        ref={dialogRef}
        aria-label={current ? current.title : "Foto ampliada"}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-black/95 p-0 text-white backdrop:bg-black/80"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {current ? (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 p-3 sm:p-4">
              <p className="text-sm text-white/70" aria-live="polite">
                {index! + 1} / {list.length}
              </p>
              <button
                type="button"
                onClick={close}
                className="inline-flex size-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                aria-label="Cerrar"
                autoFocus
              >
                <CloseIcon />
              </button>
            </div>
            <div className="relative flex-1" onClick={(e) => e.target === e.currentTarget && close()}>
              <Image
                key={current.src}
                src={current.src}
                alt={current.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute top-1/2 left-2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 hover:bg-black/80 sm:left-4"
                aria-label="Foto anterior"
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute top-1/2 right-2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 hover:bg-black/80 sm:right-4"
                aria-label="Foto siguiente"
              >
                <ChevronRightIcon />
              </button>
            </div>
            <p className="p-4 text-center font-display text-xl font-bold uppercase sm:text-2xl">{current.title}</p>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
