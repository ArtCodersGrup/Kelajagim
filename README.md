# Kelajagim — pre-launch landing site

Static marketing site for Kelajagim (Astro + Tailwind). Single goal: collect
phone numbers into a Supabase-backed waitlist ahead of app launch.

## Stack

- Astro 4 (static output)
- Tailwind CSS
- Vanilla TS (waitlist form + FAQ accordion + scroll-reveal), no framework, no
  JS beyond that.

## Local development

```bash
npm install
npm run dev
```

The site runs at `http://localhost:4321`.

## Environment variables

Copy `.env.example` to `.env` and fill in your Supabase project's values:

```bash
cp .env.example .env
```

```
PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

Without these set, the waitlist form logs the submission payload to the
console and shows the success state — it never hard-fails, so local dev works
without a Supabase project.

## Supabase setup

1. Create a Supabase project.
2. In the SQL editor, run `supabase/waitlist.sql`. It creates the `waitlist`
   table with row-level security enabled and an insert-only policy for the
   anonymous (`anon`) role — nothing can be read back through the public API
   key.
3. Copy the project URL and anon public key into `.env` (see above).

## Build

```bash
npm run build
```

Static output is written to `dist/`.

## Deploy — Cloudflare Pages (via git)

1. Push this repository to GitHub/GitLab.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect
   to Git**, select this repo.
3. Build settings:
   - Framework preset: `Astro`
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Add environment variables in **Settings → Environment variables** (for
   both Production and Preview):
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`
5. Save and deploy. Subsequent pushes to the connected branch redeploy
   automatically.
6. Once verified, point the `kelajagim.uz` domain at the Pages project under
   **Custom domains**.

## Project structure

```
src/
├── layouts/Base.astro       SEO, OG tags, fonts, JSON-LD
├── pages/                   index, privacy, terms, offer
├── components/              one component per landing-page section
├── scripts/waitlist.ts      form mask, validation, Supabase submit
└── styles/global.css        Tailwind entry + scroll-reveal/FAQ CSS
```

## Notes

- Real assets in place: `public/logo.png` (header/footer/favicon),
  `public/mockup-home.png` (Hero), `public/mockup-test.png` (Mock Exam).
  `public/og-image.png` is still a flat-color placeholder — swap in a real
  1200×630 social preview when available.
- Legal pages (`/privacy`, `/terms`, `/offer`) contain a structured Uzbek
  skeleton with `[TODO: to'ldiriladi]` placeholders for content pending
  legal review.
