// Reseñas públicas de Google Maps ("Parabrisas Díaz - La Florida").
// "rating" en estrellas: confirmar contra la ficha de Google antes de publicar.

export type Review = {
  author: string;
  when: string;
  rating: number;
  text: string;
  localGuide?: boolean;
};

export const reviews: Review[] = [
  {
    author: "Alejandro Astorga",
    when: "Hace 4 años",
    rating: 5,
    text: "Excelente atención, 100% recomendable, el trabajo se realizó de manera rápida y muy prolijo, dejaron todo muy limpio, muchas gracias Parabrisas Díaz.",
  },
  {
    author: "Carlos Ramírez",
    when: "Hace 4 años",
    rating: 5,
    localGuide: true,
    text: "Negocio familiar, muy buena atención y rapidez. Reemplacé el parabrisas de mi Renault Duster 2022 y no se nota la diferencia. Valores dentro del promedio.",
  },
  {
    author: "Papuro",
    when: "Hace un año",
    rating: 5,
    localGuide: true,
    text: "He puesto un par de parabrisas anteriormente y hoy un par de espejos laterales. Muy buen trabajo y rapidez. 100% recomendable.",
  },
  {
    author: "Ronny Salazar",
    when: "Hace 5 años",
    rating: 5,
    localGuide: true,
    text: "Muy buen servicio, es un negocio familiar. Muy responsables con los tiempos de entrega.",
  },
  {
    author: "Ernesto Pérez",
    when: "Hace un mes",
    rating: 5,
    localGuide: true,
    text: "Revisión sobre problemas y dan la solución efectiva. Buen precio.",
  },
  {
    author: "Francisco Javier Martínez",
    when: "Hace 4 años",
    rating: 5,
    localGuide: true,
    text: "Cumplieron con el plazo, buen servicio, atención amable y cordial. Recomiendo este lugar para cambio de parabrisas.",
  },
  {
    author: "Susana Flores",
    when: "Hace 3 años",
    rating: 5,
    text: "No es primera vez que me salvan ❤️ Rápido y preciso. Excelente atención.",
  },
  {
    author: "Patricio Olivares",
    when: "Hace 2 años",
    rating: 5,
    localGuide: true,
    text: "Muy buena atención, trabajo rápido y profesional.",
  },
  {
    author: "Claudio Torrejón",
    when: "Hace 4 años",
    rating: 5,
    localGuide: true,
    text: "Buena atención. Agilidad en responder. Excelente servicio.",
  },
];
