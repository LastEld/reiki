# Reiki Landing

Multilingual Reiki practice website built with Next.js App Router and `next-intl`.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion + React Bits UI components
- `next-intl` for localization

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create local env:

```bash
cp .env.example .env.local
```

3. Start dev server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Where To Edit Content

- Main copy:
  - `messages/en.json`
  - `messages/ru.json`
  - `messages/de.json`
  - `messages/fr.json`
  - `messages/it.json`
- Section layout/components:
  - `app/_components/*`
- SEO/metadata:
  - `app/layout.tsx`
  - `app/[locale]/layout.tsx`
  - `app/[locale]/page.tsx`

## Business Data (Address, Phone, Hours)

Business/profile data is centralized in `lib/practice.ts` and read from `.env` variables.

Update these in Vercel project settings:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PRACTICE_NAME`
- `NEXT_PUBLIC_BRAND_NAME`
- `NEXT_PUBLIC_PRACTITIONER_NAME`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_CONTACT_PHONE`
- `NEXT_PUBLIC_CONTACT_STREET`
- `NEXT_PUBLIC_CONTACT_POSTAL_CODE`
- `NEXT_PUBLIC_CONTACT_CITY`
- `NEXT_PUBLIC_CONTACT_COUNTRY`
- `NEXT_PUBLIC_CONTACT_COUNTRY_CODE`
- `NEXT_PUBLIC_CONTACT_LATITUDE`
- `NEXT_PUBLIC_CONTACT_LONGITUDE`
- `NEXT_PUBLIC_HOURS_WEEKDAYS`
- `NEXT_PUBLIC_HOURS_SATURDAY`
- `NEXT_PUBLIC_HOURS_SUNDAY`
- `NEXT_PUBLIC_HOURS_SCHEMA_WEEKDAYS`
- `NEXT_PUBLIC_HOURS_SCHEMA_SATURDAY`
- `NEXT_PUBLIC_SOCIAL_URLS`
- `NEXT_PUBLIC_CALENDLY_URL`
- `NEXT_PUBLIC_GA_ID`

Server-only (private):

- `RESEND_API_KEY`
- `CONTACT_EMAIL`
- `CONTACT_FROM_EMAIL`

## Deploy To Vercel

1. Push repository to GitHub.
2. Import project in Vercel.
3. Add all environment variables from `.env.example`.
4. Set production domain (must match `NEXT_PUBLIC_SITE_URL`).
5. Deploy.

## Quality Checks

```bash
npm run lint
npm run build
```
