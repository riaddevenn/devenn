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
    // Google shows the app password as four groups of four; pasting it with the
    // spaces intact is the norm. Gmail tolerates them today, but stripping
    // costs nothing and removes a foot-gun when the value is retyped into
    // Netlify's env var UI.
    auth: { user, pass: pass.replace(/\s+/g, '') },

    // Nodemailer's defaults are far too generous for a request a human is
    // waiting on — the socket timeout alone is 10 minutes, which is what makes
    // a stalled send look like the form has hung forever.
    //
    // `connectionTimeout` is the load-bearing one. smtp.gmail.com resolves to
    // both an A and a AAAA record, and on a network where IPv6 cannot reach
    // Google, nodemailer burns this entire timeout on the v6 address before
    // falling back to v4 and succeeding. Measured cold: ~5.6s of stall at the
    // 5s setting versus ~0.57s when it goes straight out over v4. 2s keeps the
    // worst case near 2.6s while leaving 14x headroom over a healthy TCP+TLS
    // handshake (~0.14s), and no connection failed at this setting in testing.
    connectionTimeout: 2000,
    greetingTimeout: 3000,
    socketTimeout: 8000,
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
