# Architecture Research

**Domain:** Premium Reiki Landing Page (Next.js 15)
**Researched:** 2026-02-10
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     App Router Layer                         │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  [locale]/ (i18n dynamic segment)                      │  │
│  │    ├── layout.tsx (Root Layout + Providers)            │  │
│  │    ├── page.tsx (Home/Landing)                         │  │
│  │    ├── booking/ (Booking flow pages)                   │  │
│  │    └── route.ts (Form/Contact API endpoints)           │  │
│  └────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                  Server Components Layer                     │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │  Hero   │  │Features │  │Testimon.│  │ Contact │        │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘        │
│       │            │            │            │              │
│       └────────────┴────────────┴────────────┘              │
│                  (Server-Side Rendered)                      │
├─────────────────────────────────────────────────────────────┤
│                  Client Components Layer                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ BookingForm  │  │ ContactForm  │  │ AnimatedHero │      │
│  │  (islands)   │  │  (islands)   │  │   (islands)  │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                 │                 │              │
│         └─────────────────┴─────────────────┘              │
│            (Client-Side Interactivity)                       │
├─────────────────────────────────────────────────────────────┤
│                     Data Flow Layer                          │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────┐  │
│  │ Server Actions │  │ Analytics SDK  │  │  i18n Data   │  │
│  │  (Form Submit) │  │ (Vercel/GA)    │  │  (Messages)  │  │
│  └────────┬───────┘  └────────┬───────┘  └──────┬───────┘  │
│           │                   │                  │          │
│           └───────────────────┴──────────────────┘          │
├─────────────────────────────────────────────────────────────┤
│                   External Integrations                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Calendar   │  │     Email    │  │   Analytics  │      │
│  │ (Cal.com API)│  │  (Resend API)│  │ (Vercel/GA4) │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component              | Responsibility                              | Typical Implementation                        |
| ---------------------- | ------------------------------------------- | --------------------------------------------- |
| **Root Layout**        | HTML scaffold, global providers, i18n setup | Server Component with NextIntlClientProvider  |
| **Page Components**    | Section composition, static generation      | Server Components with async data fetching    |
| **Section Components** | Hero, Features, Testimonials, CTA, Footer   | Server Components (static HTML)               |
| **Form Components**    | Booking, Contact forms with validation      | Client Components with Server Actions         |
| **Animation Wrappers** | Scroll effects, entrance animations         | Client Components with Framer Motion          |
| **Server Actions**     | Form submission, API integrations           | TypeScript functions with validation (Zod)    |
| **Route Handlers**     | API endpoints for external services         | route.ts files with Web Request/Response APIs |

## Recommended Project Structure

```
src/
├── app/                           # App Router (routing)
│   ├── [locale]/                  # i18n dynamic segment
│   │   ├── layout.tsx             # Root layout with providers
│   │   ├── page.tsx               # Landing page (composition)
│   │   ├── booking/               # Booking flow pages
│   │   │   └── page.tsx
│   │   └── api/                   # Route handlers
│   │       ├── contact/
│   │       │   └── route.ts       # Contact form API
│   │       └── booking/
│   │           └── route.ts       # Booking API
│   ├── layout.tsx                 # Minimal root (for 404)
│   └── not-found.tsx              # 404 page
├── components/                    # All components
│   ├── sections/                  # Landing page sections
│   │   ├── Hero.tsx               # Hero section (server)
│   │   ├── Features.tsx           # Features grid (server)
│   │   ├── Testimonials.tsx       # Testimonials (server)
│   │   ├── About.tsx              # About/Services (server)
│   │   ├── ContactCTA.tsx         # CTA section (server)
│   │   └── Footer.tsx             # Footer (server)
│   ├── forms/                     # Interactive forms
│   │   ├── BookingForm.tsx        # Booking form (client)
│   │   ├── ContactForm.tsx        # Contact form (client)
│   │   └── FormField.tsx          # Reusable field (client)
│   ├── animations/                # Animation wrappers
│   │   ├── FadeInView.tsx         # Scroll fade-in (client)
│   │   ├── SlideInView.tsx        # Scroll slide (client)
│   │   └── ParallaxSection.tsx    # Parallax effect (client)
│   └── ui/                        # Reusable UI components
│       ├── Button.tsx             # Button variants
│       ├── Card.tsx               # Card component
│       ├── Input.tsx              # Form input
│       └── Badge.tsx              # Badge component
├── lib/                           # Utilities and configs
│   ├── actions/                   # Server Actions
│   │   ├── contact.ts             # Contact form action
│   │   └── booking.ts             # Booking action
│   ├── validations/               # Zod schemas
│   │   ├── contact.ts             # Contact schema
│   │   └── booking.ts             # Booking schema
│   ├── integrations/              # External APIs
│   │   ├── calendar.ts            # Cal.com integration
│   │   ├── email.ts               # Resend email
│   │   └── analytics.ts           # Analytics helpers
│   └── utils/                     # Shared utilities
│       ├── cn.ts                  # classnames helper
│       └── format.ts              # Date/time formatting
├── i18n/                          # Internationalization
│   ├── routing.ts                 # next-intl routing config
│   └── request.ts                 # Request configuration
├── messages/                      # Translation files
│   ├── en.json                    # English translations
│   ├── es.json                    # Spanish translations
│   └── fr.json                    # French translations
├── public/                        # Static assets
│   ├── images/                    # Images
│   ├── fonts/                     # Custom fonts
│   └── favicon.ico                # Favicon
└── middleware.ts                  # next-intl middleware
```

### Structure Rationale

- **`app/[locale]/`**: Next.js 15 App Router with i18n dynamic segment for multi-language support
- **`components/sections/`**: Landing page sections as Server Components (static HTML for performance)
- **`components/forms/`**: Client Components for interactivity (form validation, submission)
- **`components/animations/`**: Client island pattern - wrap static content with client animations
- **`lib/actions/`**: Server Actions for form handling (no API routes needed for simple forms)
- **`lib/validations/`**: Centralized Zod schemas for type-safe validation
- **`i18n/` + `messages/`**: next-intl configuration and translation files

## Architectural Patterns

### Pattern 1: Server-First with Client Islands

**What:** Default to Server Components, isolate interactivity in small Client Components

**When to use:** All landing pages, especially static marketing sites

**Trade-offs:**

- ✅ **Pros:** Smaller bundle, better SEO, faster initial load
- ❌ **Cons:** More planning needed for client/server boundaries

**Example:**

```typescript
// app/[locale]/page.tsx (Server Component)
import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import ContactForm from '@/components/forms/ContactForm' // Client island

export default async function LandingPage() {
  // Can fetch data here server-side
  const testimonials = await getTestimonials()

  return (
    <>
      <Hero />  {/* Server Component */}
      <Features />  {/* Server Component */}
      <Testimonials data={testimonials} />  {/* Server Component */}
      <ContactForm />  {/* Client Component (island) */}
    </>
  )
}
```

### Pattern 2: Server Actions for Forms

**What:** Use Server Actions instead of API routes for form submissions

**When to use:** Contact forms, booking forms, newsletter signups

**Trade-offs:**

- ✅ **Pros:** No API routes needed, progressive enhancement, automatic CSRF protection
- ❌ **Cons:** POST-only, requires understanding of Server/Client boundaries

**Example:**

```typescript
// lib/actions/contact.ts (Server Action)
'use server'

import { z } from 'zod'
import { contactSchema } from '@/lib/validations/contact'

export async function submitContactForm(formData: FormData) {
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors }
  }

  // Send email, save to DB, etc.
  await sendEmail(parsed.data)

  return { success: true }
}
```

```typescript
// components/forms/ContactForm.tsx (Client Component)
'use client'

import { useActionState } from 'react'
import { submitContactForm } from '@/lib/actions/contact'

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, null)

  return (
    <form action={formAction}>
      <input name="name" required />
      <input name="email" type="email" required />
      <textarea name="message" required />
      <button type="submit">Send</button>
      {state?.error && <p>Error: {state.error}</p>}
      {state?.success && <p>Message sent!</p>}
    </form>
  )
}
```

### Pattern 3: Static Generation with Dynamic Paths

**What:** Use `generateStaticParams` for pre-rendering, ISR for updates

**When to use:** Blog posts, service pages, multi-language pages

**Trade-offs:**

- ✅ **Pros:** CDN-cacheable, instant loads, SEO-friendly
- ❌ **Cons:** Build time increases, stale data without ISR

**Example:**

```typescript
// app/[locale]/page.tsx
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'es' },
    { locale: 'fr' }
  ]
}

export const revalidate = 3600 // ISR: revalidate every hour

export default async function Page({ params }) {
  const { locale } = await params
  // Fetch data based on locale
  return <LandingPage locale={locale} />
}
```

### Pattern 4: Animation with Scroll Triggers

**What:** Use Framer Motion in Client Components for scroll-based animations

**When to use:** Hero sections, feature reveals, testimonial carousels

**Trade-offs:**

- ✅ **Pros:** Smooth UX, professional feel, attention-guiding
- ❌ **Cons:** Adds ~50KB to bundle, must be client-side

**Example:**

```typescript
// components/animations/FadeInView.tsx
'use client'

import { motion } from 'framer-motion'

export function FadeInView({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  )
}
```

```typescript
// components/sections/Features.tsx (Server Component)
import { FadeInView } from '@/components/animations/FadeInView'

export default function Features() {
  return (
    <section>
      <FadeInView>  {/* Client wrapper */}
        <h2>Our Features</h2>  {/* Static content */}
        <div className="grid">
          {/* Feature cards rendered server-side */}
        </div>
      </FadeInView>
    </section>
  )
}
```

### Pattern 5: Internationalization with next-intl

**What:** Use `[locale]` dynamic segment + next-intl for routing and translations

**When to use:** Multi-language sites (landing pages, marketing sites)

**Trade-offs:**

- ✅ **Pros:** SEO-friendly URLs, automatic locale detection, type-safe translations
- ❌ **Cons:** Build complexity, requires middleware, more files

**Example:**

```typescript
// i18n/routing.ts
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'es', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed', // Don't prefix default locale
})
```

```typescript
// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params

  // Load messages for this locale
  const messages = await import(`@/messages/${locale}.json`)

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages.default}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

## Data Flow

### Request Flow

```
[User Action: Submit Form]
    ↓
[Client Component] → [Server Action] → [Validation (Zod)] → [External API]
    ↓                     ↓                    ↓                  ↓
[UI Update]  ←  [Return Result]  ←  [Success/Error]  ←  [API Response]
```

### Static Generation Flow

```
[Build Time]
    ↓
[generateStaticParams] → [Fetch locale list] → [Generate pages for each locale]
    ↓
[Pre-render HTML] → [Export static files] → [Deploy to CDN]
    ↓
[Runtime: ISR] → [Revalidate after X seconds] → [Rebuild page in background]
```

### Analytics Flow

```
[Page Load]
    ↓
[Analytics SDK Init] → [Send pageview event] → [Vercel Analytics / GA4]
    ↓
[User Interaction]
    ↓
[Track event] → [Send custom event] → [Analytics Dashboard]
```

### Key Data Flows

1. **Form Submission Flow**: Client Component → Server Action → Validation → External API (email/calendar) → Response → UI update
2. **Static Page Load**: CDN → Pre-rendered HTML → Hydrate client islands → Interactive
3. **i18n Flow**: Middleware detects locale → Load messages → Render with translations
4. **Analytics Flow**: Page load → Initialize SDK → Track pageviews and events → Dashboard

## Scaling Considerations

| Scale                     | Architecture Adjustments                                                                                                                                             |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **0-10k visits/month**    | Full static generation (SSG), no optimization needed. Deploy to Vercel free tier.                                                                                    |
| **10k-100k visits/month** | Add ISR for dynamic content, enable image optimization, consider CDN caching headers. Monitor analytics for slow pages.                                              |
| **100k-1M visits/month**  | Implement edge functions for forms, use Vercel Analytics, add database for form submissions instead of email. Consider splitting by locale to different deployments. |
| **1M+ visits/month**      | Consider separate marketing site, implement advanced caching strategies, use edge middleware for geo-routing, monitor performance metrics closely.                   |

### Scaling Priorities

1. **First bottleneck:** Form submissions overwhelming email API
   - **Fix:** Add database for submissions, queue emails with background jobs

2. **Second bottleneck:** Image loading on mobile
   - **Fix:** Use Next.js Image component with `priority` flag for above-fold images, implement lazy loading for below-fold

3. **Third bottleneck:** Analytics script blocking render
   - **Fix:** Use `next/script` with `strategy="lazyOnload"` for analytics

## Anti-Patterns

### Anti-Pattern 1: Client Component Everything

**What people do:** Mark all components with `'use client'` by default

**Why it's wrong:**

- Larger JavaScript bundle (slower page loads)
- No SEO benefits from Server Components
- Miss out on server-side caching

**Do this instead:**

- Default to Server Components
- Only use `'use client'` for interactivity (forms, animations, click handlers)
- Use the "client island" pattern: wrap static server content with small client wrappers

### Anti-Pattern 2: Creating API Routes for Simple Forms

**What people do:** Create `app/api/contact/route.ts` for every form

**Why it's wrong:**

- Unnecessary complexity for simple forms
- More files to maintain
- No progressive enhancement
- Manual CSRF protection needed

**Do this instead:**

- Use Server Actions for form submissions
- Only use Route Handlers for webhooks, third-party integrations, or complex API logic

### Anti-Pattern 3: Fetching Data in Client Components

**What people do:** Use `useEffect` to fetch data in Client Components

**Why it's wrong:**

- Waterfalls (wait for JS → fetch → render)
- No SEO (search engines don't see content)
- Poor perceived performance

**Do this instead:**

- Fetch data in Server Components (runs on server, pre-rendered)
- Pass data as props to Client Components
- Use streaming with `<Suspense>` for slow data

### Anti-Pattern 4: Blocking Animations

**What people do:** Apply animations to every element, long duration animations

**Why it's wrong:**

- Annoying for repeat visitors
- Can delay content visibility (poor UX)
- Adds unnecessary bundle size

**Do this instead:**

- Use `viewport={{ once: true }}` so animations only run once
- Keep animations subtle and fast (0.3-0.6s duration)
- Only animate elements that benefit from attention-guiding

### Anti-Pattern 5: Hardcoded Text in Components

**What people do:** Put strings directly in JSX instead of using i18n

**Why it's wrong:**

- Hard to add languages later (requires refactoring all components)
- No centralized translation management
- Mixing content with code

**Do this instead:**

- Use `next-intl` from the start, even for single-language sites
- Store all user-facing text in `messages/` JSON files
- Use translation keys in components: `t('hero.title')`

## Integration Points

### External Services

| Service                | Integration Pattern       | Notes                                                                |
| ---------------------- | ------------------------- | -------------------------------------------------------------------- |
| **Cal.com**            | Server Action → API call  | Use `@calcom/embed` for calendar embeds, API for availability checks |
| **Resend**             | Server Action → Email API | Best for transactional emails (contact forms, bookings)              |
| **Vercel Analytics**   | `<Analytics />` in layout | Auto-collects Web Vitals, custom events with `track()`               |
| **Google Analytics 4** | `@next/third-parties`     | Use `GoogleAnalytics` component in layout, track custom events       |
| **Framer Motion**      | Client Components only    | Import in client islands, use `whileInView` for scroll animations    |

### Internal Boundaries

| Boundary               | Communication          | Notes                                                       |
| ---------------------- | ---------------------- | ----------------------------------------------------------- |
| **Page ↔ Sections**    | Props (RSC)            | Server Components pass data via props                       |
| **Section ↔ Forms**    | Props + Server Actions | Forms are client islands, use Server Actions for submission |
| **Client ↔ Server**    | Server Actions         | Use `useActionState` for form state, no fetch() needed      |
| **Layout ↔ Pages**     | Context providers      | Use `NextIntlClientProvider` for i18n, wrap in layout       |
| **Middleware ↔ Pages** | Headers/cookies        | Middleware detects locale, sets headers for routing         |

## Build Order (Recommended Implementation Sequence)

### Phase 1: Foundation (Week 1)

**Dependencies:** None
**Components:**

1. Set up Next.js 15 project with App Router
2. Configure `next-intl` routing and middleware
3. Create root layout with i18n providers
4. Build basic UI components (`Button`, `Input`, `Card`)
5. Set up Tailwind CSS and design tokens

**Rationale:** Must establish routing and i18n architecture before building pages

### Phase 2: Static Sections (Week 2)

**Dependencies:** Phase 1 (UI components, i18n)
**Components:**

1. Hero section (Server Component)
2. Features section (Server Component)
3. About/Services section (Server Component)
4. Testimonials section (Server Component)
5. Footer (Server Component)

**Rationale:** Build static sections first (no dependencies on forms/integrations)

### Phase 3: Forms & Interactivity (Week 3)

**Dependencies:** Phase 2 (sections to integrate forms into)
**Components:**

1. Contact form (Client Component)
2. Booking form (Client Component)
3. Server Actions for form handling
4. Zod validation schemas
5. Email integration (Resend)

**Rationale:** Forms depend on sections being in place; Server Actions can be tested independently

### Phase 4: Animations (Week 4)

**Dependencies:** Phase 2 (sections to animate)
**Components:**

1. Scroll animation wrappers (`FadeInView`, `SlideInView`)
2. Animated hero elements
3. Testimonial carousel/slider
4. Parallax effects (optional)

**Rationale:** Add animations after static content works; easy to wrap existing sections

### Phase 5: Integrations (Week 5)

**Dependencies:** Phase 3 (forms must work first)
**Components:**

1. Calendar integration (Cal.com)
2. Analytics setup (Vercel + GA4)
3. SEO metadata (Open Graph, Twitter Cards)
4. Sitemap and robots.txt generation

**Rationale:** External integrations depend on forms/pages being functional

### Phase 6: Polish & Optimization (Week 6)

**Dependencies:** All previous phases
**Tasks:**

1. Image optimization and lazy loading
2. Performance audit (Lighthouse)
3. Accessibility audit (WCAG 2.1)
4. Cross-browser testing
5. Mobile responsiveness fixes
6. ISR configuration for dynamic content

**Rationale:** Optimization requires complete functionality to measure and improve

## Static Generation Strategy

### Full Static Generation (Recommended for Landing Pages)

```typescript
// app/[locale]/page.tsx
export const dynamic = 'force-static' // Force static generation
export const revalidate = false // Never revalidate (fully static)

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'fr' }]
}
```

**Benefits:**

- Fastest possible page loads (CDN-served HTML)
- Best SEO (pre-rendered content)
- Lowest hosting costs (no server compute)

### Incremental Static Regeneration (For Dynamic Content)

```typescript
// app/[locale]/blog/[slug]/page.tsx
export const revalidate = 3600 // Revalidate every hour

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}
```

**Use when:**

- Content updates occasionally (blog posts, testimonials)
- Want static performance with fresh content
- Have more pages than practical to build at deploy time

### Dynamic Rendering (Avoid for Landing Pages)

```typescript
// Only use for authenticated pages or real-time data
export const dynamic = 'force-dynamic'
```

**Avoid because:**

- Slower (server rendering on every request)
- Higher costs (compute on every visit)
- Not necessary for marketing/landing pages

## SEO Metadata Structure

```typescript
// app/[locale]/layout.tsx
import type { Metadata } from 'next'

export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: {
      default: t('title'),
      template: `%s | ${t('siteName')}`,
    },
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://example.com/${locale}`,
      siteName: t('siteName'),
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/twitter-image.jpg'],
    },
    alternates: {
      canonical: `https://example.com/${locale}`,
      languages: {
        en: '/en',
        es: '/es',
        fr: '/fr',
      },
    },
  }
}
```

## Sources

### Official Documentation (HIGH Confidence)

- [Next.js 15 App Router Documentation](https://nextjs.org/docs/app)
- [Next.js Project Structure Guide](https://nextjs.org/docs/app/getting-started/project-structure)
- [Next.js Static Generation with generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- [Next.js Server Actions and Mutations](https://nextjs.org/docs/13/app/building-your-application/data-fetching/server-actions-and-mutations)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)

### Architecture Patterns (HIGH Confidence)

- [Modern Full Stack Application Architecture Using Next.js 15+](https://softwaremill.com/modern-full-stack-application-architecture-using-next-js-15/)
- [The Ultimate Guide to Organizing Your Next.js 15 Project Structure](https://www.wisp.blog/blog/the-ultimate-guide-to-organizing-your-nextjs-15-project-structure)
- [Next.js Architecture in 2026 — Server-First, Client-Islands, and Scalable App Router Patterns](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router)
- [Next.js 15: App Router — A Complete Senior-Level Guide](https://medium.com/@livenapps/next-js-15-app-router-a-complete-senior-level-guide-0554a2b820f7)

### Form Handling Best Practices (HIGH Confidence)

- [Next.js 15 Server Actions: Complete Guide with Real Examples (2026)](https://medium.com/@saad.minhas.codes/next-js-15-server-actions-complete-guide-with-real-examples-2026-6320fbfa01c3)
- [Nextjs 15 — Actions Best Practice](https://medium.com/@lior_amsalem/nextjs-15-actions-best-practice-bf5cc023301e)
- [Mastering Form Handling in Next.js 15 with Server Actions](https://medium.com/@sankalpa115/mastering-form-handling-in-next-js-15-with-server-actions-react-hook-form-react-query-and-shadcn-108f6863200f)

### Analytics Integration (MEDIUM Confidence)

- [Next.js Analytics Guide](https://nextjs.org/docs/app/guides/analytics)
- [How to Add Google Analytics in Next.js 15 App Router](https://www.sujalvanjare.com/blog/how-to-add-google-analytics-nextjs-15)
- [Vercel Web Analytics Quickstart](https://vercel.com/docs/analytics/quickstart)

### Animation Best Practices (MEDIUM Confidence)

- [Framer Motion Documentation](https://motion.dev)
- [Framer Motion Scroll Animations Guide - Next.js, TypeScript & Tailwind](https://jb.desishub.com/blog/framer-motion)
- [A Beginner's Guide to Framer Motion in React & Next.js](https://medium.com/@cirilptomass/a-beginners-guide-to-framer-motion-in-react-next-js-2378c7c1b20d)

### Landing Page Patterns (MEDIUM Confidence)

- [Best Next.js Landing Page Layouts for High SaaS Conversions](https://www.zignuts.com/blog/nextjs-landing-page-layouts)
- [Building a Static Landing Page with Next.js](https://medium.com/@mansour091800/building-a-static-landing-page-with-next-js-af25769ee396)

---

_Architecture research for: Premium Reiki Landing Page (Next.js 15)_
_Researched: 2026-02-10_
_Research confidence: HIGH (verified via Context7 and official documentation)_
