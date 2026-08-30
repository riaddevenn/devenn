import { contactNotification } from '../emails/contact-notification'
import { contactSchema, fieldErrors } from '../utils/contact-schema'
import { sendMail } from '../utils/mailer'
import { rateLimit } from '../utils/rate-limit'

// Two limits per IP, because they defend different things. The request limit
// is deliberately loose: a real user who mistypes their email and corrects it
// should never hit it, it only stops someone hammering the endpoint. The send
// limit is what actually protects the inbox, and only successful sends count
// against it — so failed validation can never lock a user out of sending.
const REQUEST_LIMIT = 12
const SEND_LIMIT = 3
const RATE_WINDOW_MS = 10 * 60 * 1000

/** Nothing legitimate comes close; the real form posts about 1 KB. */
const MAX_BODY_BYTES = 32_000

/** A human cannot fill six fields faster than this. */
const MIN_FILL_MS = 3000

export default defineEventHandler(async (event) => {
  // Same-origin only. A cross-site page POSTing here always sends an `Origin`
  // header, so a mismatch is abuse. A missing header is allowed through:
  // browsers set it on every cross-origin POST, so absence means a non-browser
  // client, which this check was never able to constrain anyway.
  const origin = getRequestHeader(event, 'origin')
  if (origin) {
    const host = getRequestHeader(event, 'host')
    const originHost = URL.canParse(origin) ? new URL(origin).host : null

    if (!originHost || originHost !== host) {
      throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
    }
  }

  // Reject oversized bodies before spending memory parsing them.
  const declaredLength = Number(getRequestHeader(event, 'content-length') ?? 0)
  if (declaredLength > MAX_BODY_BYTES) {
    throw createError({ statusCode: 413, statusMessage: 'Payload too large' })
  }

  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  const requests = rateLimit(`contact:req:${ip}`, REQUEST_LIMIT, RATE_WINDOW_MS)

  if (!requests.ok) {
    setResponseHeader(event, 'Retry-After', String(requests.retryAfter))
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many attempts. Please try again shortly.'
    })
  }

  const parsed = contactSchema.safeParse(await readBody(event))

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please check the highlighted fields.',
      data: { errors: fieldErrors(parsed.error) }
    })
  }

  const { website, startedAt, ...submission } = parsed.data

  // Bot signals. Both answer with the success response rather than an error:
  // a distinct failure tells a bot which check caught it, and the next attempt
  // works around it.
  const filledHoneypot = Boolean(website)
  const submittedTooFast = typeof startedAt === 'number' && Date.now() - startedAt < MIN_FILL_MS

  if (filledHoneypot || submittedTooFast) {
    return { ok: true }
  }

  const sends = rateLimit(`contact:send:${ip}`, SEND_LIMIT, RATE_WINDOW_MS)

  if (!sends.ok) {
    setResponseHeader(event, 'Retry-After', String(sends.retryAfter))
    throw createError({
      statusCode: 429,
      statusMessage: 'You have already sent a few messages. Please give us a little time to reply.'
    })
  }

  try {
    await sendMail(event, contactNotification(submission), {
      name: submission.name,
      address: submission.email
    })
  } catch (error) {
    // Log the real reason server-side; return a generic one. SMTP errors quote
    // the account name and auth state, which is not something to hand to an
    // anonymous caller.
    console.error('[contact] failed to send submission', error)

    throw createError({
      statusCode: 502,
      statusMessage: 'We could not send your message just now. Please email us directly.'
    })
  }

  return { ok: true }
})
