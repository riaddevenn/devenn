import { z } from 'zod'

/**
 * Shape of the contact form body.
 *
 * Every field is length-capped. The endpoint is public, so these caps are the
 * first line of defence against someone posting a megabyte of text straight
 * into an email — the messages double as the copy shown under each field.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name.')
    .max(100, 'Please keep this under 100 characters.'),

  email: z
    .email('Please enter a valid email address.')
    .max(254, 'Please keep this under 254 characters.'),

  company: z
    .string()
    .trim()
    .max(120, 'Please keep this under 120 characters.')
    .optional(),

  phone: z
    .string()
    .trim()
    .max(40, 'Please keep this under 40 characters.')
    .optional(),

  subject: z
    .string()
    .trim()
    .min(2, 'Please enter a subject.')
    .max(150, 'Please keep this under 150 characters.'),

  message: z
    .string()
    .trim()
    .min(10, 'Please tell us a little more.')
    .max(5000, 'Please keep this under 5000 characters.'),

  /**
   * Honeypot. Hidden from humans by CSS, so a real submission always leaves it
   * empty — but it accepts any string rather than enforcing that here, because
   * a validation error would tell a bot exactly which check caught it. The
   * handler reads it and silently discards instead.
   */
  website: z.string().max(200).optional(),

  /**
   * When the form was opened, set client-side. Used only to catch scripts that
   * fill and submit instantly. Forgeable by anything that bothers to look, so
   * it is a filter for lazy bots, not a security control.
   */
  startedAt: z.number().int().positive().optional()
})

export type ContactBody = z.infer<typeof contactSchema>

/** The submission proper — the bot signals stripped off. */
export type ContactSubmission = Omit<ContactBody, 'website' | 'startedAt'>

/**
 * Flattens Zod issues into `{ field: firstMessage }` for the form UI.
 */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {}

  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? '_')
    errors[field] ??= issue.message
  }

  return errors
}

/**
 * Strips CR/LF from a value that will end up in an email header.
 *
 * Without this, a newline in `name` or `subject` lets a submitter append their
 * own headers (`Bcc:`, `Content-Type:`) to the outgoing message and turn the
 * form into an open relay. Zod's email check already rejects newlines, so this
 * is defence in depth rather than the only guard.
 */
export function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim()
}
