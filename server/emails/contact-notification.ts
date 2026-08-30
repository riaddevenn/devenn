import type { ContactSubmission } from '../utils/contact-schema'

export interface EmailContent {
  subject: string
  text: string
  html: string
}

/**
 * The notification you receive when someone submits the contact form.
 *
 * This file is meant to be edited — the brand colours, the wording and the
 * field list below are all local to it. Two rules to keep in mind:
 *
 *  1. Run every submitted value through `escape()`. The fields are attacker
 *     controlled and mail clients render HTML, so an unescaped value is a
 *     phishing link (or worse) delivered to your inbox with your own domain
 *     on it.
 *  2. Inline your styles. Gmail strips `<style>` blocks in the forwarded and
 *     mobile views, so anything not inlined silently disappears.
 */

// Brand tokens, mirrored from tailwind.config.js. Email clients need literal
// hex — there is no stylesheet to resolve a variable against.
const BRAND = {
  dark: '#0D0A27',
  heading: '#181347',
  body: '#646184',
  purple: '#9B58DA',
  border: '#E8E7ED',
  surface: '#F4F4FA'
}

export function contactNotification(submission: ContactSubmission): EmailContent {
  const { name, email, company, phone, subject, message } = submission

  // Add or reorder rows here — both the HTML and the plain-text part are
  // generated from this list, so they never drift apart.
  const rows: Array<[label: string, value: string]> = [
    ['Name', name],
    ['Email', email],
    ['Company', company || '—'],
    ['Phone', phone || '—'],
    ['Subject', subject]
  ]

  const subjectLine = `New enquiry from ${name}${company ? ` (${company})` : ''}`

  const text = [
    'New contact form submission',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message:',
    message,
    '',
    '—',
    'Sent from the contact form on devenn.net'
  ].join('\n')

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background-color:${BRAND.surface};font-family:'Figtree',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid ${BRAND.border};">
      <tr>
        <td style="background-color:${BRAND.dark};padding:24px 28px;">
          <p style="margin:0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.purple};">
            Devenn
          </p>
          <h1 style="margin:6px 0 0;font-size:20px;font-weight:600;color:#ffffff;">
            New contact form submission
          </h1>
        </td>
      </tr>

      <tr>
        <td style="padding:28px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            ${rows
              .map(
                ([label, value]) => `<tr>
              <td style="padding:0 0 14px;width:110px;vertical-align:top;font-size:13px;color:${BRAND.body};">
                ${escape(label)}
              </td>
              <td style="padding:0 0 14px;vertical-align:top;font-size:14px;font-weight:500;color:${BRAND.heading};">
                ${escape(value)}
              </td>
            </tr>`
              )
              .join('\n            ')}
          </table>

          <div style="margin-top:10px;padding:18px;background-color:${BRAND.surface};border-radius:8px;border-left:3px solid ${BRAND.purple};">
            <p style="margin:0 0 8px;font-size:13px;color:${BRAND.body};">Message</p>
            <p style="margin:0;font-size:15px;line-height:1.6;color:${BRAND.heading};white-space:pre-wrap;">${escape(message)}</p>
          </div>

          <a href="mailto:${escape(email)}?subject=${encodeURIComponent(`Re: ${subject}`)}"
             style="display:inline-block;margin-top:22px;padding:11px 18px;background-color:${BRAND.purple};color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:4px;">
            Reply to ${escape(name)}
          </a>
        </td>
      </tr>

      <tr>
        <td style="padding:16px 28px;border-top:1px solid ${BRAND.border};font-size:12px;color:${BRAND.body};">
          Sent from the contact form on devenn.net. Replying to this email goes straight to the sender.
        </td>
      </tr>
    </table>
  </body>
</html>`

  return { subject: subjectLine, text, html }
}

/**
 * Escapes the five characters that let a value break out of HTML text or an
 * attribute. Applied to every submitted value above — see rule 1.
 */
function escape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
