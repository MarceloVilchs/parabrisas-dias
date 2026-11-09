// Datos del negocio: edita aquí y se actualiza en todo el sitio.

export const site = {
  name: "Parabrisas Díaz",
  brand: "Glassy V. Mackenna",
  owner: "Yordy Antonio Díaz",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://parabrisasdiaz.cl",
  description:
    "Venta e instalación de parabrisas, lunetas, vidrios de puerta, aletas y espejos panorámicos para todas las marcas y modelos. Taller en La Florida y servicio a domicilio. Trabajos 100% garantizados.",
  address: {
    street: "Av. Vicuña Mackenna 10976",
    commune: "La Florida",
    city: "Santiago",
    region: "Región Metropolitana",
    postalCode: "8240000",
    reference: "Frente a la plaza Los Quillayes",
  },
  geo: { lat: -33.56026770314434, lng: -70.58708682457825 },
  phones: {
    whatsapp: { display: "+56 9 8454 3080", href: "56984543080" },
    landline: { display: "(2) 2288 7626", href: "+56222887626" },
  },
  instagram: {
    handle: "@glassy_v.mackenna",
    url: "https://www.instagram.com/glassy_v.mackenna/",
  },
  mapsUrl: "https://maps.app.goo.gl/K3oQ3UZ5gYXQwXGF8",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.71177411915!2d-70.58708682457825!3d-33.56026770314434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d100dd8b7515%3A0xbcc84687bf3148df!2sParabrisas%20diaz%20-%20La%20Florida!5e1!3m2!1ses-419!2scl!4v1794238301652!5m2!1ses-419!2scl",
  hours: [
    {
      days: "Lunes a viernes",
      ranges: ["10:00 a 14:00", "15:00 a 18:30"],
      note: "De 14:00 a 15:00 cerrado por colación",
    },
    { days: "Sábados", ranges: ["10:00 a 14:00"] },
    { days: "Domingos y festivos", ranges: ["Cerrado"] },
  ],
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.phones.whatsapp.href}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const nav = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/galeria", label: "Galería" },
  { href: "/contacto", label: "Contacto" },
] as const;

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  imageAlt: string;
  points: string[];
};

export const services: Service[] = [
  {
    slug: "parabrisas",
    title: "Parabrisas",
    short: "Reemplazo de parabrisas trizados o quebrados, con o sin sensor.",
    description:
      "Instalamos parabrisas nuevos para autos, camionetas, SUV, furgones y camiones. Retiramos el vidrio dañado, limpiamos el marco y sellamos con adhesivo de poliuretano para que no queden filtraciones ni ruidos.",
    image: "/galeria/ig-068.webp",
    imageAlt: "Parabrisa nuevo instalado en un Mercedes Benz A250",
    points: [
      "Todas las marcas y modelos",
      "Parabrisas con sensor de lluvia",
      "Vehículos livianos y de carga",
    ],
  },
  {
    slug: "lunetas",
    title: "Lunetas",
    short: "Parabrisas trasero con desempañador, a la medida de tu vehículo.",
    description:
      "Cambiamos lunetas (parabrisas trasero) templadas o con desempañador. Aspiramos los restos de vidrio del interior para que entregues tu auto limpio.",
    image: "/galeria/ig-069.webp",
    imageAlt: "Luneta trasera de un Kia Rio Hatchback antes del reemplazo",
    points: [
      "Lunetas con desempañador",
      "Limpieza de restos de vidrio",
      "Hatchback, sedán y SUV",
    ],
  },
  {
    slug: "vidrios-de-puerta",
    title: "Vidrios de puerta",
    short: "Vidrios delanteros y traseros, revisión del alzavidrios incluida.",
    description:
      "Reemplazamos vidrios de puerta delanteros y traseros. Desarmamos el panel, retiramos los restos de vidrio y revisamos que el alzavidrios quede funcionando correctamente.",
    image: "/galeria/ig-067.webp",
    imageAlt: "Vidrio de puerta reemplazado en un Suzuki Celerio 2020 rojo",
    points: [
      "Delanteros y traseros",
      "Revisión del alzavidrios",
      "Retiro de restos de vidrio",
    ],
  },
  {
    slug: "aletas",
    title: "Aletas y laterales",
    short: "Aletas traseras, cuartos y laterales abatibles.",
    description:
      "Instalamos aletas (vidrios fijos laterales) y laterales traseros abatibles, respetando el sellado original para evitar filtraciones de agua.",
    image: "/galeria/ig-018.webp",
    imageAlt: "Aleta trasera izquierda de un Kia Morning 2017",
    points: ["Aletas fijas", "Laterales abatibles", "Sellado contra filtraciones"],
  },
  {
    slug: "espejos",
    title: "Espejos panorámicos y laterales",
    short: "Fabricación a medida de espejos laterales y panorámicos.",
    description:
      "Fabricamos e instalamos espejos laterales y panorámicos a medida para cualquier vehículo. Aumentan tu campo de visión y reducen los puntos ciegos. También adaptamos espejos alternativos.",
    image: "/galeria/ig-007.webp",
    imageAlt: "Espejo panorámico fabricado a medida para Toyota Hilux 2018",
    points: [
      "Fabricación a medida",
      "Instalación incluida",
      "Adaptación de espejos alternativos",
    ],
  },
  {
    slug: "patentes",
    title: "Grabado de patentes",
    short: "Grabado en vidrios y espejos para prevenir robos.",
    description:
      "Grabamos la patente de tu vehículo en todos los vidrios y espejos. Es un requisito para muchos seguros y desincentiva el robo de espejos y cristales.",
    image: "/galeria/ig-027.webp",
    imageAlt: "Grabado de patente en un vidrio",
    points: ["Vidrios y espejos", "Trabajo a domicilio", "Ayuda a prevenir robos"],
  },
  {
    slug: "sellados",
    title: "Sellados y filtraciones",
    short: "Solución a filtraciones de agua, ruidos y molduras sueltas.",
    description:
      "Si entra agua o escuchas silbidos al manejar, revisamos y sellamos parabrisas y lunetas. Reemplazamos el adhesivo desgastado y las molduras dañadas.",
    image: "/galeria/ig-042.webp",
    imageAlt: "Sellado tipo moldura de parabrisa y luneta en un BMW",
    points: ["Filtraciones de agua", "Ruidos de viento", "Cambio de molduras"],
  },
  {
    slug: "fabricacion",
    title: "Vidrios a medida",
    short: "Ventanas y cristales fabricados a medida, incluso maquinaria.",
    description:
      "Fabricamos vidrios laminados y templados a medida para vehículos antiguos, maquinaria y casos especiales en que no existe el repuesto original.",
    image: "/galeria/ig-030.webp",
    imageAlt: "Vidrio laminado fabricado a medida para una retroexcavadora",
    points: ["Vidrio laminado y doble", "Vehículos clásicos", "Maquinaria"],
  },
];

export const serviceOptions = [
  "Parabrisas",
  "Luneta (parabrisas trasero)",
  "Vidrio de puerta",
  "Aleta / lateral",
  "Espejo panorámico o lateral",
  "Grabado de patentes",
  "Sellado / filtraciones",
  "Vidrio a medida",
  "Otro",
] as const;
