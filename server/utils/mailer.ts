import type { H3Event } from 'h3';
import nodemailer, { type Transporter } from 'nodemailer';
import type { EmailContent } from '../emails/contact-notification';
import { sanitizeHeader } from './contact-schema';

/**
 * Reused across warm invocations. Netlify keeps a function container alive
 * between requests, so building the transport once saves the TLS handshake on
 * every submission after the first.
 */
let transporter: Transporter | null = null;

/**
 * Gmail via SMTP, authenticated with an app password.
 *
 * The credentials come from `runtimeConfig` (never `runtimeConfig.public`), so
 * they exist only inside the function bundle and never reach the browser.
 */
function getTransporter(event: H3Event) {
  const config = useRuntimeConfig(event);
  const user = config.GMAIL_USER;
  const pass = config.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error(
      'Mailer not configured — set NUXT_GMAIL_USER and NUXT_GMAIL_APP_PASSWORD.',
    );
  }

  transporter ??= nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  // NUXT_CONTACT_RECIPIENTS is a comma-separated list: the first address is the
  // To, the rest are CC'd. Blank entries are dropped so a trailing comma cannot
  // produce an empty recipient, and the destructure falls back to the
  // authenticated account when the variable is unset.
  const [to = user, ...cc] = (config.CONTACT_RECIPIENTS ?? '')
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean);

  return {
    transporter,
    from: `"Devenn website" <${user}>`,
    to,
    cc,
  };
}

export async function sendMail(
  event: H3Event,
  email: EmailContent,
  replyTo?: { name: string; address: string },
) {
  const { transporter, from, to, cc } = getTransporter(event);

  await transporter.sendMail({
    from,
    to,
    cc: cc.length ? cc : undefined,
    subject: sanitizeHeader(email.subject),
    text: email.text,
    html: email.html,
    replyTo: replyTo
      ? `"${sanitizeHeader(replyTo.name).replace(/"/g, '')}" <${sanitizeHeader(replyTo.address)}>`
      : undefined,
  });
}
