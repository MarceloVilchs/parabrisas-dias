import type { QuoteData } from "./quote-schema";
import { site } from "./site";

/** Escapa HTML para que ningún dato del usuario se interprete como código en el correo. */
export function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const modalidadLabel: Record<QuoteData["modalidad"], string> = {
  taller: "En el taller",
  domicilio: "A domicilio",
  indiferente: "Me da lo mismo",
};

const BRAND = "#f5e31b";
const INK = "#121212";

function layout(title: string, body: string, preheader: string) {
  return `<!doctype html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:#efefea;font-family:Arial,Helvetica,sans-serif;color:${INK};">
<span style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#efefea;padding:24px 12px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden">
<tr><td style="background:${INK};padding:22px 28px;border-bottom:5px solid ${BRAND}">
<p style="margin:0;font-size:22px;font-weight:bold;color:${BRAND};letter-spacing:1px;text-transform:uppercase">${esc(site.name)}</p>
<p style="margin:4px 0 0;font-size:13px;color:#cfcfcf">${esc(site.brand)} · ${esc(site.address.commune)}</p>
</td></tr>
<tr><td style="padding:28px">${body}</td></tr>
<tr><td style="background:#f6f6f3;padding:18px 28px;font-size:12px;color:#5c5c5c;line-height:1.6">
${esc(site.address.street)}, ${esc(site.address.commune)} · WhatsApp ${esc(site.phones.whatsapp.display)} · Fono ${esc(site.phones.landline.display)}<br>
Lunes a viernes 10:00–14:00 y 15:00–18:30 · Sábados 10:00–14:00
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

function row(label: string, value: string) {
  return `<tr>
<td style="padding:10px 12px;border-bottom:1px solid #eee;font-size:13px;color:#5c5c5c;width:38%;vertical-align:top">${esc(label)}</td>
<td style="padding:10px 12px;border-bottom:1px solid #eee;font-size:15px;font-weight:bold;vertical-align:top">${value}</td>
</tr>`;
}

function button(href: string, text: string, bg: string, color: string) {
  return `<a href="${esc(href)}" style="display:inline-block;background:${bg};color:${color};text-decoration:none;font-weight:bold;padding:12px 20px;border-radius:999px;margin:4px 6px 4px 0;font-size:15px">${esc(text)}</a>`;
}

/** Correo para el vendedor con todos los datos de la solicitud. */
export function sellerEmail(d: QuoteData, meta: { id: string; fecha: string }) {
  const vehiculo = `${d.marca} ${d.modelo} ${d.anio}`;
  const waText = `Hola ${d.nombre}, te escribimos de ${site.name} por tu cotización de ${d.servicio} para tu ${vehiculo}.`;
  const wa = `https://wa.me/${d.telefono.replace("+", "")}?text=${encodeURIComponent(waText)}`;
  const body = `
<p style="margin:0 0 6px;font-size:13px;color:#5c5c5c">Solicitud ${esc(meta.id)} · ${esc(meta.fecha)}</p>
<h1 style="margin:0 0 18px;font-size:24px">Nueva solicitud de cotización</h1>
<p style="margin:0 0 18px;font-size:16px;background:${BRAND};padding:12px 14px;border-radius:8px"><strong>${esc(d.servicio)}</strong> para <strong>${esc(vehiculo)}</strong></p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:22px">
${row("Nombre", esc(d.nombre))}
${row("Teléfono", `<a href="tel:${esc(d.telefono)}" style="color:${INK}">${esc(d.telefono)}</a>`)}
${row("Correo", `<a href="mailto:${esc(d.email)}" style="color:${INK}">${esc(d.email)}</a>`)}
${row("Comuna", esc(d.comuna || "No indicada"))}
${row("Vehículo", esc(vehiculo))}
${row("Trabajo", esc(d.servicio))}
${row("Atención", esc(modalidadLabel[d.modalidad]))}
${row("Mensaje", d.mensaje ? esc(d.mensaje).replace(/\n/g, "<br>") : "<span style='color:#999;font-weight:normal'>Sin mensaje</span>")}
</table>
<p style="margin:0 0 8px;font-size:14px;color:#5c5c5c">Responder al cliente:</p>
${button(wa, "WhatsApp al cliente", "#1f8f4e", "#ffffff")}
${button(`tel:${d.telefono}`, "Llamar", INK, "#ffffff")}
${button(`mailto:${d.email}?subject=${encodeURIComponent(`Cotización ${d.servicio} - ${vehiculo}`)}`, "Responder correo", BRAND, INK)}
`;
  return {
    subject: `Nueva cotización: ${d.servicio} · ${vehiculo} · ${d.nombre}`.replace(/[\r\n]/g, " "),
    html: layout("Nueva cotización", body, `${d.nombre} solicita ${d.servicio} para ${vehiculo}`),
    text: [
      `Nueva solicitud de cotización (${meta.id} · ${meta.fecha})`,
      `Nombre: ${d.nombre}`,
      `Teléfono: ${d.telefono}`,
      `Correo: ${d.email}`,
      `Comuna: ${d.comuna || "No indicada"}`,
      `Vehículo: ${vehiculo}`,
      `Trabajo: ${d.servicio}`,
      `Atención: ${modalidadLabel[d.modalidad]}`,
      `Mensaje: ${d.mensaje || "-"}`,
      `WhatsApp: ${wa}`,
    ].join("\n"),
  };
}

/** Correo de confirmación para el cliente. */
export function customerEmail(d: QuoteData, meta: { id: string }) {
  const vehiculo = `${d.marca} ${d.modelo} ${d.anio}`;
  const firstName = d.nombre.split(" ")[0];
  const body = `
<h1 style="margin:0 0 12px;font-size:24px">¡Gracias, ${esc(firstName)}! Recibimos tu solicitud</h1>
<p style="margin:0 0 18px;font-size:16px;line-height:1.6">Tu solicitud de cotización se envió con éxito. Un vendedor la revisará y te contactará <strong>a la brevedad</strong> al teléfono o correo que nos indicaste.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:22px;background:#f6f6f3;border-radius:8px">
${row("N° de solicitud", esc(meta.id))}
${row("Trabajo", esc(d.servicio))}
${row("Vehículo", esc(vehiculo))}
${row("Atención", esc(modalidadLabel[d.modalidad]))}
</table>
<p style="margin:0 0 12px;font-size:15px;line-height:1.6">Si necesitas una respuesta más rápida, escríbenos directamente:</p>
${button(`https://wa.me/${site.phones.whatsapp.href}`, `WhatsApp ${site.phones.whatsapp.display}`, "#1f8f4e", "#ffffff")}
<p style="margin:22px 0 0;font-size:13px;color:#5c5c5c;line-height:1.6">Recibiste este correo porque completaste el formulario de cotización en nuestro sitio web. Si no fuiste tú, puedes ignorarlo.</p>
`;
  return {
    subject: `Recibimos tu solicitud de cotización · ${site.name}`,
    html: layout("Solicitud recibida", body, "Tu solicitud se envió con éxito. Pronto te atenderemos."),
    text: `Hola ${firstName}, recibimos tu solicitud de cotización (${meta.id}) de ${d.servicio} para tu ${vehiculo}. Te contactaremos a la brevedad. WhatsApp: ${site.phones.whatsapp.display}`,
  };
}
