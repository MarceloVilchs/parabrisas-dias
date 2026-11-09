import nodemailer from "nodemailer";

type Mail = { to: string; subject: string; html: string; text: string; replyTo?: string };

function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT ?? 465);
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export function mailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.MAIL_TO);
}

export async function sendMail(mail: Mail) {
  const transport = getTransport();
  const from = process.env.MAIL_FROM ?? process.env.SMTP_USER;
  if (!transport) {
    // Desarrollo sin SMTP configurado: se muestra en consola en vez de enviarse.
    console.info(`[mail:simulado] Para: ${mail.to} | Asunto: ${mail.subject}\n${mail.text}\n`);
    return;
  }
  await transport.sendMail({ from, ...mail });
}
