/**
 * Sliding-window rate limiter, in memory.
 *
 * **Best effort only.** The state lives in one function container, and Netlify
 * both recycles containers and runs several in parallel under load — so a
 * determined attacker gets roughly `limit × containers` attempts, and a quiet
 * period resets the counter entirely. It stops the accidental double-submit
 * and the naive script; it does not stop a distributed flood.
 *
 * If the form starts attracting real abuse, the fix is a check that does not
 * depend on local state: Cloudflare Turnstile in front of the form, or a
 * shared store (Netlify Blobs, Upstash) behind this function.
 */
const hits = new Map<string, number[]>()

export interface RateLimitResult {
  ok: boolean
  /** Seconds until the caller may retry. Zero when `ok`. */
  retryAfter: number
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now()
  const cutoff = now - windowMs
  const recent = (hits.get(key) ?? []).filter(time => time > cutoff)

  if (recent.length >= limit) {
    return { ok: false, retryAfter: Math.ceil((recent[0]! + windowMs - now) / 1000) }
  }

  recent.push(now)
  hits.set(key, recent)

  // Drop stale keys before the map can grow without bound on a long-lived
  // container.
  if (hits.size > 5000) {
    for (const [existing, times] of hits) {
      if (!times.some(time => time > cutoff)) hits.delete(existing)
    }
  }

  return { ok: true, retryAfter: 0 }
}
