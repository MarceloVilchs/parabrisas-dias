export type GalleryCategory =
  | "parabrisas"
  | "lunetas"
  | "puertas"
  | "aletas"
  | "espejos"
  | "patentes"
  | "otros";

export type GalleryItem = {
  src: string;
  w: number;
  h: number;
  title: string;
  cat: GalleryCategory;
};
