# BUILD TASK: kelajagim.uz — Pre-launch Landing Site

You are building a production-ready static marketing site for **Kelajagim**, an Uzbek-language edtech mobile app (grades 4–6, entrance-exam prep for Prezident maktablari). The app is NOT launched yet — the site's single conversion goal is collecting phone numbers into a waitlist. All user-facing text is in Uzbek and is provided verbatim below — do not translate, do not paraphrase.

---

## 1. Stack (fixed — do not substitute)

- **Astro 4+** (static output, `output: 'static'`)
- **Tailwind CSS** via `@astrojs/tailwind`
- Vanilla TS only for the waitlist form + FAQ accordion + scroll animations. No React/Vue. Zero JS shipped except these islands.
- Deploy target: **Cloudflare Pages** (build: `npm run build`, output: `dist/`). Include a `README.md` with git + Cloudflare Pages deploy steps.

## 2. Project structure

```
kelajagim-site/
├── src/
│   ├── layouts/Base.astro          # <head>: SEO, OG tags, fonts, favicon
│   ├── pages/
│   │   ├── index.astro
│   │   ├── privacy.astro           # Maxfiylik siyosati
│   │   ├── terms.astro             # Foydalanish shartlari
│   │   └── offer.astro             # Ommaviy oferta
│   ├── components/
│   │   ├── Header.astro  Hero.astro  Problems.astro  Tracks.astro
│   │   ├── HowItWorks.astro  MockExam.astro  Schools.astro
│   │   ├── Pricing.astro  Methodology.astro  Faq.astro
│   │   ├── FinalCta.astro  Footer.astro  WaitlistForm.astro
│   ├── scripts/waitlist.ts
│   └── styles/global.css
├── public/  (favicon, og-image.png, phone mockups — placeholders for now)
├── .env.example
└── astro.config.mjs, tailwind.config.mjs, tsconfig.json
```

## 3. Design tokens (extracted from the app's Figma — exact values, do not invent)

Extend Tailwind theme:

```js
colors: {
  primary:      '#004AC6',  // buttons, links, Aniq track
  primaryDark:  '#003EA8',  // headings on light-blue surfaces, hover
  primaryLight: '#DBE1FF',  // CTA card backgrounds, badges
  accent:       '#2563EB',  // active states
  tabiiy:       '#16A34A',  // Tabiiy (natural sciences) track — green
  tabiiyLight:  '#DCFCE7',
  ink:          '#191B23',  // primary text
  inkSecondary: '#434655',  // secondary text
  inkMuted:     '#737686',  // captions
  line:         '#C3C6D7',  // borders
  surface:      '#FAF8FF',  // page background
  danger:       '#BA1A1A',  // form errors
}
borderRadius: { card: '12px', pill: '9999px' }
boxShadow: { card: '0px 2px 4px rgba(0,0,0,0.04)' }
fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
```

Rules: 8pt spacing grid (16/24/32/48/64px). Font: Inter via `@fontsource-variable/inter` (self-hosted — no Google Fonts CDN, target audience has slow networks). Body 16px/1.6, H1 clamp(32px, 6vw, 52px)/1.15 font-bold, H2 clamp(24px, 4vw, 36px). Max content width 1120px. Mobile-first — 80% of traffic is phones.

## 4. Page sections — order and exact Uzbek content

### 4.1 Header (sticky, blur backdrop)
Logo text "Kelajagim" (image logo comes later — reserve 32px slot). Nav (desktop only): Imkoniyatlar, Tariflar, FAQ (anchor links). Right: button `Ro'yxatga yozilish` → scrolls to #waitlist.

### 4.2 Hero
- Badge (pill, primaryLight bg, primaryDark text): `Tez kunda — Android va iOS`
- H1: `Farzandingizni Prezident maktabiga tayyorlang`
- Subtitle (inkSecondary): `4–6-sinf o'quvchilari uchun Aniq va Tabiiy yo'nalishlarda tizimli tayyorgarlik. Real imtihon formatidagi testlar, video darslar va shaxsiy o'quv dasturi — barchasi bitta ilovada.`
- **WaitlistForm** (see §5)
- Micro-copy under form (inkMuted, 13px): `🎁 Kutish ro'yxatidagilar ilova chiqqanida maxsus chegirma oladi`
- Right side (desktop) / below (mobile): phone mockup frame with `public/mockup-home.png` (placeholder: gray 390×844 rounded rect with "App screenshot" label; real screenshot will be dropped in later).

### 4.3 Problems — H2: `Tanish muammolarmi?`
3 cards (icon + title + text):
1. `Repetitor qimmat` — `Sifatli repetitorning oylik narxi millionlab so'm. Har bir oila buni ko'tara olmaydi.`
2. `Tizimli tayyorgarlik yo'q` — `Internetdagi tarqoq materiallar bilan qaysi mavzudan boshlashni bilish qiyin.`
3. `Imtihon formati noma'lum` — `Bola real imtihonda qanday savollar bo'lishini bilmay, hayajondan yutqazadi.`

### 4.4 Tracks — H2: `Ikki yo'nalish — bitta maqsad`
2 cards side by side:
- **Aniq yo'nalish** (primary border-top 4px): `Matematika + Ingliz tili`. Text: `Mantiqiy fikrlash, masalalar yechish va ingliz tili grammatikasi bo'yicha bosqichma-bosqich darslar.`
- **Tabiiy yo'nalish** (tabiiy border-top 4px): `Tabiiy fanlar + Ingliz tili`. Text: `Biologiya, kimyo va fizika asoslari hamda ingliz tili — qiziqarli va tushunarli formatda.`

### 4.5 HowItWorks — H2: `Qanday ishlaydi?`
3 numbered steps (vertical on mobile, horizontal on desktop, connected by a line):
1. `Baholash testi` — `Farzandingiz qisqa diagnostik testdan o'tadi va joriy bilim darajasi aniqlanadi.`
2. `Shaxsiy o'quv dasturi` — `Natijaga qarab video darslar, nazariya va mashqlardan iborat dastur tuziladi. Har bir bob 70% natija bilan ochib boriladi.`
3. `Prezident mock imtihon` — `Real imtihon formatida sinov: ikki blok, umumiy taymer va batafsil natija tahlili.`

### 4.6 MockExam (flagship feature, surface: primaryLight gradient)
H2: `Prezident mock imtihoni — xuddi asl imtihondek`
Bullets (checkmark icons): `Rasmiy imtihon formatiga mos ikki blokli tuzilma` / `Umumiy taymer — vaqtni boshqarishni o'rgatadi` / `Har bir savol bo'yicha batafsil tahlil` / `Kuchli va kuchsiz mavzular xaritasi`
Side: phone mockup `public/mockup-test.png` (same placeholder pattern).

### 4.7 Schools — H2: `Maktablar bazasi`
Text: `37+ Prezident va Ijod maktablari haqida to'liq ma'lumot: o'tish ballari, kvotalar, yotoqxona mavjudligi va ariza topshirish muddatlari — hammasi bir joyda.`
Simple 3-stat row: `37+ maktab` / `O'tish ballari` / `Yillik kvotalar`

### 4.8 Pricing — H2: `Tariflar` — **NO PRICES**
3 cards, each with feature list and a `Tez kunda` pill instead of a price:
- **Oddiy**: `Asosiy video darslar`, `Mavzu testlari`, `Yangiliklar va maktablar bazasi`
- **Plus** (highlighted, `Ommabop` badge): everything in Oddiy + `To'liq kurs materiallari`, `Batafsil natija tahlili`, `Statistika`
- **Premium**: everything in Plus + `Prezident mock imtihonlari`, `Sertifikat`
Footer line under cards: `Aniq narxlar ilova chiqishi bilan e'lon qilinadi. Kutish ro'yxatidagilar uchun maxsus chegirma kafolatlanadi.`

### 4.9 Methodology — H2: `Metodika`
Single centered block: `Dastur Prezident maktablari va Ijod maktablarining rasmiy qabul imtihonlari formatiga asoslangan. Har bir savol banki mavzular bo'yicha tuzilgan bo'lib, bola imtihonda uchraydigan barcha savol turlarini mashq qiladi.`
(NO author photos, NO testimonials, NO fake reviews — deliberately excluded pre-launch.)

### 4.10 FAQ — H2: `Ko'p so'raladigan savollar` (accordion, `<details>` based, styled)
1. `Ilova qachon chiqadi?` — `Ilova hozirda faol ishlab chiqilmoqda. Kutish ro'yxatiga yozilganlar birinchi bo'lib xabardor qilinadi va maxsus chegirma oladi.`
2. `Qaysi sinf o'quvchilari uchun?` — `4, 5 va 6-sinf o'quvchilari uchun mo'ljallangan — aynan Prezident maktablariga hujjat topshirish yoshidagi bolalar.`
3. `Android va iPhone'da ishlaydimi?` — `Ha, ilova Android va iOS uchun bir vaqtda chiqadi.`
4. `To'lov qanday amalga oshiriladi?` — `Payme va Click orqali, shuningdek aktivatsiya kodlari orqali to'lash mumkin bo'ladi.`
5. `Bepul qismi bo'ladimi?` — `Ha, demo darslar va baholash testi bepul bo'ladi. To'liq kurslar tariflar orqali ochiladi.`

### 4.11 FinalCta (primary bg, white text)
H2: `Birinchilardan bo'ling` + subtitle `Ilova chiqishi bilan xabar beramiz va maxsus chegirma taqdim etamiz.` + WaitlistForm (light variant).

### 4.12 Footer
Logo, © 2026 Kelajagim. Links: `Maxfiylik siyosati` (/privacy), `Foydalanish shartlari` (/terms), `Ommaviy oferta` (/offer). Contact: `TELEGRAM_LINK_PLACEHOLDER`, `info@kelajagim.uz`.

## 5. WaitlistForm — the only dynamic element

Single input (tel) + submit button. NO extra fields, NO comment box.

- Placeholder: `+998 __ ___ __ __`; button: `Birinchilardan bo'ling`
- Input mask: auto-prefix `+998`, digits only, format `+998 XX XXX XX XX` while typing
- Validation: regex `^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$`. Error (danger color, below input): `Telefon raqamni to'liq kiriting`
- Submit → `POST` to Supabase REST:
  ```ts
  // waitlist.ts — reads PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY from import.meta.env
  fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
    method: 'POST',
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${ANON_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ phone: normalizedPhone, source: utmSource ?? 'direct' }),
  });
  ```
- Capture `utm_source` from URL into the `source` column.
- Success state: replace form with `✅ Rahmat! Ilova chiqishi bilan sizga xabar beramiz.`
- Duplicate (HTTP 409): show success state anyway (idempotent UX).
- Network error: `Xatolik yuz berdi. Qaytadan urinib ko'ring.`
- If env vars are missing (local dev), log payload to console and show success — site must never hard-fail.
- Both form instances (Hero + FinalCta) share one script.

Create `.env.example`:
```
PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

Also generate `supabase/waitlist.sql` (for me to run manually):
```sql
create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  phone text not null unique,
  source text default 'direct',
  created_at timestamptz default now()
);
alter table waitlist enable row level security;
-- anon can ONLY insert; nobody can read via anon key
create policy waitlist_insert_only on waitlist
  for insert to anon with check (true);
```

## 6. Legal pages
`/privacy`, `/terms`, `/offer` — shared simple prose layout (max-w-prose). Fill each with a clearly-marked Uzbek skeleton (section headings + `[TODO: to'ldiriladi]` bodies): privacy must include sections for collected data (telefon raqam), storage (Supabase, EU region), user rights, contact. These will be finalized later — structure now, so store review links exist.

## 7. SEO / Performance / A11y (hard requirements)

- `<html lang="uz">`; title: `Kelajagim — Prezident maktabiga tayyorgarlik ilovasi`; meta description: `4–6-sinf o'quvchilari uchun Prezident va Ijod maktablari kirish imtihonlariga tizimli tayyorgarlik: video darslar, testlar va real imtihon formatidagi mock sinovlar.`
- OG + Twitter tags, `og:image` → `/og-image.png` (placeholder 1200×630), canonical, `robots.txt`, `sitemap` via `@astrojs/sitemap`.
- JSON-LD: `Organization` + `FAQPage` (from §4.10 content).
- Lighthouse mobile ≥ 90 all categories. Images `loading="lazy"` below fold, explicit width/height, WebP where possible.
- Scroll-reveal animation: IntersectionObserver, `opacity 0→1` + `translateY(16px→0)`, 400ms, `cubic-bezier(0.25, 0.1, 0.25, 1)`, respect `prefers-reduced-motion`.
- A11y: form input has `<label>` (visually hidden ok), focus rings visible (2px primary), contrast — inkSecondary on surface passes 4.5:1, tap targets ≥ 44px.

## 8. Definition of Done
1. `npm run dev` runs clean; `npm run build` produces static `dist/` with zero errors/warnings.
2. All 4 pages render; anchors work; form validates, masks, and posts (or console-logs without env).
3. No Lorem Ipsum anywhere — only the Uzbek copy above or marked `[TODO]` blocks in legal pages.
4. README documents: local run, env setup, Supabase table creation, Cloudflare Pages deploy via git.
