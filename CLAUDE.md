# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The Devenn marketing site — a prerendered landing page plus one API route. Devenn is a Saudi digital-transformation consultancy (formerly Alwasaet); see [COMPANY.md](COMPANY.md) for audience and business goals. The page is a lead-generation asset, so prerendered text content, working `mailto:`/`tel:` links and a functioning contact form matter more than clever interactivity.

This directory is **not** a git repository.

## Commands

```bash
npm run dev        # dev server on http://localhost:3000
npm run build      # THE deploy build — prerenders / and emits the API function
npm run generate   # pure-static build; DROPS server/api, so the contact form 404s
npm run preview    # serve the build
npx eslint .       # lint — there is no `lint` script in package.json
npx nuxt prepare   # regenerate .nuxt/ (runs on postinstall; ESLint fails without it)

node scripts/optimize-assets.mjs            # PNG/JPG in public/ -> WebP
node scripts/optimize-assets.mjs --replace  # ...and delete the sources
```

No test framework and no typecheck script are configured (`vue-tsc` is not installed).

## Design source

Figma file `tjOIcv0Kd9deYag0FfnBC6`, frame `1149:732` ("MacBook Air - 17"). The comp is desktop-only at 1280px wide with 80px gutters — 1120px of content, which is what `.container-page` reproduces. There is no Arabic/RTL variant, so the layout is plain LTR.

Responsive behaviour below 1280px was added during implementation and is **not** in the comp. Treat the desktop rendering as authoritative and mobile as a judgement call.

### Font substitution

The design specifies **Gilroy** (Regular/Medium/SemiBold/Bold), which is licensed and not redistributable. **Figtree** stands in — closest free geometric sans with a double-storey `a`. Consequences:

- Headlines wrap slightly earlier than the comp (the hero H1 breaks after "Delivered" rather than "With"). This resolves itself when real Gilroy is installed; do not "fix" it by shrinking type.
- To swap in Gilroy: drop woff2 files into `app/assets/fonts/`, add `@font-face` in `main.css`, change `'Figtree'` to `'Gilroy'` in `tailwind.config.js`, and drop the `fonts.families` entry in `nuxt.config.ts`.

## Architecture

`app/pages/index.vue` composes the whole page from `app/components/sections/*`, in Figma frame order. Sections are presentational and self-contained — copy lives inline in each component, not in a CMS.

Shared pieces: `AppHeader`, `AppFooter`, `BulletItem`, `BrowserMockup` (the frosted browser frame in the products grid), `ContactModal` + `FormField`.

### Header

Fixed overlay, two states driven by a passive scroll listener (`scrollY > 8`):

- **At the top** — fully transparent, no backdrop, no border, so the hero art runs behind it uninterrupted.
- **Scrolled** — `bg-dark-800/70` + `backdrop-blur-[6.5px]` + a hairline border.

The filled state is **dark on purpose**. Below the hero the header passes over white sections, and the wordmark and nav are white — a light bar would make them disappear. The alternative (light bar, swapping to `devenn-wordmark-dark.svg` and dark nav text) is viable since that asset exists, but it means cross-fading two logos.

The bar also fills while the mobile drawer is open, so the two read as one surface at any scroll position.

### Contact modal

One `<ContactModal />` instance is mounted in `index.vue`; all three "Contact us" buttons (header desktop, header mobile, hero, footer) drive it through `useContactModal()`, which wraps `useState` so the flag is per-request during prerender rather than shared across renders.

`onSubmit` POSTs to `/api/contact`; see "Contact form" below for the whole path. HTML5 `required`/`type=email` is the fast client-side pass, but the server is the authority — field errors come back from it and render under each `FormField`.

Design tokens live in `tailwind.config.js` under the same names Figma uses (`dark-800`, `purple-600`, `blue-50`…), so a token change in the file maps to one place in code. Reusable section styling — `.container-page`, `.eyebrow`, `.section-title`, `.btn-primary`, `.bg-dot-grid`, `.card-gradient-border` — is in `app/assets/css/main.css`.

## Assets

Exported from Figma and organised by role: `public/logos`, `public/clients`, `public/capabilities`, `public/products`, `public/team`, `public/illustrations`, `public/icons`. Names are semantic (`hero-wave-background.webp`, not `rectangle-45.png`).

Rules that were applied and should keep being applied:

- **Rasters ship as WebP.** Figma hands back full-quality PNGs — the hero alone was 1.7 MB. `scripts/optimize-assets.mjs` converts them; total asset weight is ~1.7 MB for 45 files. Reference `.webp` paths directly with plain `<img>`; do not route pre-optimised images through `NuxtImg`/IPX, which re-encodes them and stalls the dev server.
- **Vector artwork ships as SVG**, exported per logical node (`download_assets` with `defaultFormat: 'svg'` on a specific node id) rather than as the loose path fragments a whole-subtree export returns.
- **Flat shapes are CSS, not assets.** The dot-grid background, the blurred colour blobs behind the team and product cards, and the browser traffic-light dots are all reproduced in CSS. They were flat fills/blurs in the comp, so an asset would only add weight.
- **Outlined text is re-typed as real text.** The hero H1 is 50+ letter vectors in Figma. It is rendered as an `<h1>` so it stays selectable, translatable and indexable.

## Deployment

Netlify, built with **`nuxt build`** — not `nuxt generate`. This is the one thing to get right:

`generate` forces Nitro's `static` preset, which emits plain files and **silently drops `server/api/*`**. The page would still look perfect and the modal would still open; the form would just 404 on submit. `build` under the `netlify` preset keeps `/` prerendered (via `nitro.prerender.routes`) _and_ emits the API route as a function, so nothing is lost — `dist/index.html` is still a fully prerendered 39 KB document.

Output split: static site → `dist/`, function → `.netlify/functions-internal/server/`. Both are set in `netlify.toml`, which also carries the baseline security headers.

The function bundle is ~45 MB, mostly `sharp` (from `@nuxt/image`, 19 MB) and `better-sqlite3` (from `@nuxt/content`, 17 MB). Both are dead weight — nothing calls `NuxtImg` and nothing queries the `insights` collection — but both are under Netlify's limits, so this is a cold-start cost, not a blocker. Dropping either module reclaims its share.

Building locally on Windows bundles `sharp` for `win32-x64`; Netlify builds on Linux and gets `linux-x64`. The architecture warning in a local build is an artifact of building here, not a deploy problem.

## Contact form

`POST /api/contact` → Gmail SMTP via nodemailer. Files:

| File                                    | Role                                                             |
| --------------------------------------- | ---------------------------------------------------------------- |
| `server/api/contact.post.ts`            | Handler: origin, size, rate limit, validation, bot signals, send |
| `server/utils/contact-schema.ts`        | Zod schema, error flattening, `sanitizeHeader`                   |
| `server/emails/contact-notification.ts` | **The email template — this is the file to edit**                |
| `server/utils/mailer.ts`                | Transport, `From`/`Reply-To` construction                        |
| `server/utils/rate-limit.ts`            | In-memory sliding window                                         |

**Credentials** are a Google **app password**, not the account password — 2-Step Verification must be on to generate one. They live in `runtimeConfig` (never `runtimeConfig.public`) and are supplied as `NUXT_GMAIL_USER` / `NUXT_GMAIL_APP_PASSWORD` / `NUXT_CONTACT_RECIPIENT`; see `.env.example`. Verified: the canary values do not appear anywhere in `dist/` or in the server bundle — Nuxt reads them at runtime rather than baking them into the artifact.

Gmail rewrites `From` to the authenticated account unless the address is a verified alias, so mail always sends as your account and the submitter goes in `Reply-To`. Hitting reply in your inbox answers the lead.

Defences, and what each is actually worth:

- **Zod validation with length caps** — the authority on what is acceptable; caps stop a megabyte of text reaching your inbox.
- **HTML escaping in the template** — submitted values are attacker-controlled and mail clients render HTML. Every interpolation goes through `escape()`.
- **`sanitizeHeader`** strips CR/LF before anything reaches a header. Without it a newline in `name` appends arbitrary headers (`Bcc:`) and turns the form into an open relay.
- **Honeypot + minimum fill time** — both answer with the _success_ response rather than an error, so a bot cannot learn which check caught it.
- **Two rate limits** — 12 requests and 3 sends per IP per 10 min. Only successful sends count against the send limit, so a user who mistypes their email can never lock themselves out.
- **Same-origin check** — a cross-site page always sends `Origin`, so a mismatch is abuse. A _missing_ `Origin` is allowed: browsers always send it cross-origin, so absence means a non-browser client this check never constrained anyway.
- **Opaque errors** — SMTP failures quote the account name and auth state, so the real error is logged server-side and the client gets a generic 502.

The rate limiter is **best effort**: state lives in one function container, and Netlify recycles containers and runs several in parallel. It stops double-submits and naive scripts, not a distributed flood. If real abuse shows up, put Cloudflare Turnstile in front of the form or move the counter to a shared store — do not just raise the limit.

## Gotchas

- **`devtools: { enabled: true }` breaks headless screenshots.** The injected overlay hangs `preview_screenshot`. Set it to `false` temporarily when capturing, then restore.
- **Screenshot tools capture from the document top**, ignoring `window.scrollY`. To inspect a lower section, hide the others via `display: none` rather than scrolling — and prefer `preview_inspect`/`getBoundingClientRect` over eyeballing a downscaled screenshot for anything dimensional.
- **`.nuxt/` is generated.** `eslint.config.mjs` imports from it and `tsconfig.json` only references its four generated project configs, so a missing `.nuxt/` breaks tooling, not just types. Never edit files there.
- **Tailwind is v3.4** via `@nuxtjs/tailwindcss` v6 — not v4, not Nuxt UI. `tailwindcss.cssPath` points at `main.css`; without it the module injects a second copy of Tailwind's base layer.
- **`srcDir` is `app/`** (Nuxt 4 default), but `server/`, `content/`, `public/`, `scripts/` and all config stay at the root.
- **The preview renderer wedges.** Symptoms: `preview_screenshot` times out, `window.innerWidth` reports `0`, `getBoundingClientRect()` returns `{}`, or `getComputedStyle` returns stale values while the classes and CSS rules are demonstrably correct. It is the renderer, not the code — restart the preview server before believing a "style not applying" result. Related: the dev server does **not** pick up `tailwind.config.js` edits without a restart, which presents the same way.
- **`preview_click` fires before hydration.** A click that reports success can land on a not-yet-hydrated button and do nothing. If a handler seems dead, drive it from `preview_eval` (`el.click()`, `form.requestSubmit()`) and re-check state in a _separate_ eval call so Vue can render in between.
- **Node cannot read `/tmp` paths on this box.** Bash translates them, Node does not — `node -e` on `/tmp/x` fails with `ENOENT: C:\tmp\x`. Use a relative path for scratch files.

## Known deviations from the comp

Flagged rather than silently resolved — confirm with the designer:

- `capital-market-authority.svg` contains an extra blue geometric mark grouped into the CMA frame in Figma. It may be a separate client's logo placed there by mistake.
- The services/portfolio card border is a gradient in the rendered design but `get_design_context` reports a solid `#BB81F3`. Implemented as a gradient in `.card-gradient-border`; revert that one rule to go solid.
- The comp reads "Sinse 2025" in the identity timeline; implemented as "Since 2025".
- Two headings use `#181818` where every other heading uses the `dark-500` token (`#181347`). The token is used throughout for consistency.
- The dot-grid spacing (`--dot-gap: 15px`) is measured from the exported texture, not read from a Figma value.
