# Stack Research

**Domain:** Premium Reiki Landing Page
**Researched:** 2026-02-10
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology   | Version                          | Purpose                         | Why Recommended                                                                                                                                                 |
| ------------ | -------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Next.js      | 15.x (latest stable) / 16.x      | React framework with App Router | Industry standard for production apps. App Router provides server components, streaming, and built-in SEO via Metadata API. Official source: Context7 verified. |
| React        | 19.x                             | UI library                      | Latest stable release with Server Components, improved hydration, and useActionState hook for forms. Works seamlessly with Next.js 15+.                         |
| TypeScript   | 5.x                              | Type safety                     | Essential for scalable codebases. Next.js 15 has first-class TypeScript support with zero config.                                                               |
| Tailwind CSS | 4.x (alpha/beta) or 3.x (stable) | Utility-first CSS               | V4 brings CSS-first config, zero-config setup, and native CSS variables. Falls back to v3 if browser compatibility is critical.                                 |
| Node.js      | 20.x LTS or 22.x                 | Runtime                         | Required for Next.js. LTS recommended for production stability.                                                                                                 |

**Confidence: HIGH** - All verified via Context7 official documentation and Next.js 15 release notes.

### Animation & Interactions

| Library            | Version | Purpose                                                  | When to Use                                                                                                                                                                                 |
| ------------------ | ------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framer Motion      | 12.x    | Declarative animations, page transitions, scroll effects | **Recommended primary choice.** React-native API, 32KB gzipped. Perfect for smooth UI animations, gesture controls, and scroll-triggered effects. 2.5x faster than GSAP for unknown values. |
| Lenis              | 1.x     | Smooth scrolling                                         | Essential for premium feel. Lightweight (~5KB), works with Framer Motion. Provides butter-smooth scroll across devices.                                                                     |
| Tailwindcss Motion | Latest  | Simple utility-based animations                          | Optional lightweight alternative (5KB) for basic animations if bundle size is critical.                                                                                                     |

**Alternatives Considered:**

- **GSAP** - Better for complex timeline animations and maintains 60fps under heavy load, but larger bundle (78KB) and steeper learning curve. Use only if you need intricate sequential animations.
- **Motion (motion.dev)** - 85KB, good for complex scroll interactions, but Framer Motion is more established in React ecosystem.

**Confidence: HIGH** - Based on 2026 performance comparisons showing Framer Motion optimized for React, verified via multiple sources.

### Forms & Validation

| Library             | Version | Purpose                    | When to Use                                                                                                    |
| ------------------- | ------- | -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| React Hook Form     | 7.66.0+ | Form state management      | **Recommended.** Performant (minimal re-renders), works perfectly with React 19 and Next.js 15 Server Actions. |
| Zod                 | 3.x     | Schema validation          | **Recommended.** TypeScript-first, auto-infers types. Use with @hookform/resolvers for seamless integration.   |
| @hookform/resolvers | Latest  | Validation resolver bridge | Required to connect React Hook Form with Zod.                                                                  |

**Why this combo:**

- React Hook Form minimizes re-renders using uncontrolled components
- Zod provides runtime + compile-time type safety
- Works with React 19's useActionState for server-side validation
- Industry standard in 2026 (verified via web search and Context7)

**Confidence: HIGH** - Context7 documentation verified, multiple 2026 tutorials confirm this as the standard approach.

### Internationalization (i18n)

| Library   | Version | Purpose              | When to Use                                                                                                         |
| --------- | ------- | -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| next-intl | 3.x     | Internationalization | **Recommended for App Router.** First-class Next.js 15 support, locale-based routing, SSR-safe, ICU message syntax. |

**Setup:**

- Use `getRequestConfig` for server-side locale detection
- Wrap root layout with `NextIntlClientProvider`
- Store translations in JSON files per locale
- Supports both Server and Client Components

**Alternatives Considered:**

- **next-i18next** - Better for Pages Router, but next-intl is designed specifically for App Router
- **react-i18next** - Generic React solution, less Next.js-specific optimizations

**Confidence: HIGH** - Verified via Context7 official next-intl documentation showing App Router integration.

### UI Components

| Library   | Version | Purpose                         | When to Use                                                                                                                                                     |
| --------- | ------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shadcn/ui | Latest  | Pre-built components (optional) | **Recommended if using component library.** Copy-paste components built on Radix UI + Tailwind. Updated Feb 2026 with unified radix-ui package and RTL support. |
| Radix UI  | Latest  | Headless UI primitives          | Use directly if you need maximum customization. shadcn/ui is built on top of this.                                                                              |

**Why shadcn/ui:**

- Full code ownership (copy-paste, not npm dependency)
- Accessibility built-in via Radix
- Tailwind-styled by default
- Works with Tailwind v4

**When NOT to use:**

- If design is 100% custom and components won't be reused
- If you want to minimize dependencies

**Confidence: HIGH** - Verified via official shadcn/ui changelog showing 2026 updates for Next.js 15.

### Email & Contact Forms

| Service/Library         | Purpose                             | When to Use                                                                                           |
| ----------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Resend                  | Email delivery API                  | **Recommended.** Modern API, React Email integration, built by same team. Clean developer experience. |
| React Email             | Email templates as React components | **Recommended with Resend.** Write emails in React/Tailwind, Resend renders them.                     |
| @react-email/components | Email-safe React components         | Provides email client-compatible components (Button, Link, etc.)                                      |

**Alternatives Considered:**

- **SendGrid** - More features (validation, inbound parsing, visual editor), but older API and more complex. Choose if you need advanced email marketing features.
- **Nodemailer** - Low-level, requires more setup. Use only if self-hosting or have specific SMTP requirements.

**Implementation:**

```bash
npm install resend react-email @react-email/components
```

**Confidence: HIGH** - Resend + React Email confirmed as 2026 standard for Next.js projects.

### Calendar/Booking Integration

| Service  | Approach                      | Status                             | When to Use                                                                                                          |
| -------- | ----------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Calendly | Embed via react-calendly      | ✅ Stable                          | **Recommended for quick integration.** Inline embed or popup widget. Well-documented Next.js integration.            |
| Cal.com  | Embed via @calcom/embed-react | ⚠️ Next.js 15 compatibility issues | Open-source alternative, but @calcom/embed-react not yet ready for Next.js 15 (as of Feb 2026). Monitor for updates. |

**Recommended Approach:**

- Use Calendly for immediate production use
- Watch Cal.com repository for Next.js 15 support if open-source is critical

**Integration:**

```bash
npm install react-calendly  # For Calendly
```

**Confidence: MEDIUM** - Calendly integration confirmed stable. Cal.com has known Next.js 15 issues per GitHub discussions.

### SEO & Analytics

| Tool                 | Version  | Purpose               | Why Recommended                                                                                                                     |
| -------------------- | -------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Next.js Metadata API | Built-in | SEO meta tags         | **Use built-in API, not next-seo.** Next.js 15 Metadata API is type-safe, supports static + dynamic generation, and auto-optimizes. |
| Google Analytics 4   | Latest   | User analytics        | Use @next/third-parties/google for official integration.                                                                            |
| Vercel Analytics     | Latest   | Web vitals monitoring | **Recommended if deploying to Vercel.** Automatic performance tracking.                                                             |

**Why NOT next-seo:**

- Next.js 15 Metadata API supersedes it
- Built-in solution is type-safe and better integrated
- Avoids extra dependency

**Setup:**

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: 'Reiki Healing',
  description: 'Premium reiki services...',
  openGraph: { ... }
}
```

**Confidence: HIGH** - Verified via Context7 Next.js documentation and multiple 2026 SEO guides.

### Development Tools

| Tool       | Purpose                  | Notes                                            |
| ---------- | ------------------------ | ------------------------------------------------ |
| ESLint     | Code linting             | Next.js includes ESLint config by default        |
| Prettier   | Code formatting          | Configure with Tailwind plugin for class sorting |
| TypeScript | Type checking            | Next.js auto-configures tsconfig.json            |
| turbo      | Build caching (optional) | Use if monorepo or multi-package setup           |

## Installation

```bash
# Core
npx create-next-app@latest my-reiki-site --typescript --tailwind --app --eslint

# Animation
npm install framer-motion lenis

# Forms
npm install react-hook-form zod @hookform/resolvers

# i18n
npm install next-intl

# Email
npm install resend react-email @react-email/components

# Booking
npm install react-calendly

# Analytics (Google)
npm install @next/third-parties

# UI Components (optional)
npx shadcn@latest init

# Dev dependencies
npm install -D prettier prettier-plugin-tailwindcss
```

## Alternatives Considered

| Recommended           | Alternative   | When to Use Alternative                                                                        |
| --------------------- | ------------- | ---------------------------------------------------------------------------------------------- |
| Framer Motion         | GSAP          | Need complex timeline-based animations or bulletproof 60fps with heavy simultaneous animations |
| next-intl             | react-i18next | Using framework other than Next.js or need broader ecosystem                                   |
| Resend                | SendGrid      | Need email validation, inbound parsing, visual editor, or IP warm-up automation                |
| Calendly              | Cal.com       | Open-source requirement + willing to wait for Next.js 15 compatibility                         |
| Built-in Metadata API | next-seo      | Using Next.js < 13 or Pages Router                                                             |
| Tailwind v4           | Tailwind v3   | Need support for browsers older than 3 years                                                   |

## What NOT to Use

| Avoid                               | Why                                                | Use Instead                        |
| ----------------------------------- | -------------------------------------------------- | ---------------------------------- |
| next-seo                            | Superseded by built-in Metadata API in Next.js 13+ | Next.js Metadata API (built-in)    |
| Pages Router                        | App Router is the standard for new projects        | App Router (app/ directory)        |
| next/head                           | Deprecated in App Router                           | Metadata API                       |
| CSS Modules for utility styling     | Verbose compared to Tailwind                       | Tailwind CSS                       |
| Class components                    | Hooks are standard since React 16.8                | Function components with hooks     |
| getServerSideProps / getStaticProps | Removed in App Router                              | Server Components with async/await |
| @calcom/embed-react (currently)     | Not yet compatible with Next.js 15                 | react-calendly or wait for update  |

## Stack Patterns by Variant

**If budget is extremely limited:**

- Skip Resend (use SMTP with nodemailer)
- Skip booking integration (use Google Forms + manual scheduling)
- Use Tailwindcss Motion instead of Framer Motion

**If maximum performance is critical:**

- Use GSAP instead of Framer Motion for animations
- Minimize use of Client Components
- Implement aggressive caching strategies
- Use Vercel Edge Runtime where possible

**If multi-language is NOT needed:**

- Skip next-intl entirely
- Hardcode content in components
- Still use JSON files for easy content updates

**If design is 100% custom:**

- Skip shadcn/ui
- Use Radix UI directly for complex interactions
- Build custom components with Tailwind

## Version Compatibility

| Package                  | Compatible With       | Notes                                       |
| ------------------------ | --------------------- | ------------------------------------------- |
| Next.js 15.x / 16.x      | React 19.x            | Next.js 16.x uses React 19 by default       |
| Framer Motion 12.x       | React 18-19           | Confirmed compatible with latest React      |
| React Hook Form 7.66+    | React 18-19           | Works with useActionState in React 19       |
| next-intl 3.x            | Next.js 15 App Router | Designed specifically for App Router        |
| Tailwind CSS 4.x (alpha) | Next.js 15+           | Stable but beta; use v3 if issues arise     |
| @calcom/embed-react      | ❌ Next.js 15 issues  | Known compatibility problems as of Feb 2026 |

## Stack Decision Summary

**Core Philosophy:** Use Next.js 15 built-in features first, add libraries only when needed.

**For Premium Landing Page specifically:**

1. ✅ **Next.js 15 + React 19 + TypeScript** - Foundation
2. ✅ **Tailwind CSS** - Fast styling (v4 preferred, v3 fallback)
3. ✅ **Framer Motion + Lenis** - Premium animations and smooth scroll
4. ✅ **React Hook Form + Zod** - Contact forms with validation
5. ✅ **next-intl** - Multi-language support
6. ✅ **Resend + React Email** - Transactional emails
7. ✅ **Calendly** - Booking integration (Cal.com when compatible)
8. ✅ **Built-in Metadata API** - SEO optimization
9. ✅ **Google Analytics 4** - Analytics tracking
10. ⚠️ **shadcn/ui** - Optional, only if using pre-built components

**Total Core Dependencies:** ~8 packages (excluding dev tools)
**Estimated Bundle Size (production):** 150-200KB gzipped (optimized)

## Sources

**Context7 Official Documentation (HIGH confidence):**

- Next.js App Router: `/vercel/next.js/v16.1.5` - Metadata API, Server Components
- React 19: `/websites/react_dev` - Hooks, Server Components
- next-intl: `/amannn/next-intl` - App Router setup
- React Hook Form: `/react-hook-form/react-hook-form` - Zod integration
- Framer Motion: `/grx7/framer-motion` - Animation library
- Tailwind CSS: `/websites/tailwindcss` - Utility framework

**2026 Web Search Verification (MEDIUM-HIGH confidence):**

- [Next.js Landing Page Templates (2026 Edition)](https://www.aniq-ui.com/en/templates/business-landing-page-nextjs-template)
- [Next.js 15 SEO Guide](https://www.digitalapplied.com/blog/nextjs-seo-guide)
- [Framer Motion vs GSAP Performance](https://motion.dev/docs/gsap-vs-motion)
- [Resend vs SendGrid Comparison](https://www.sequenzy.com/versus/resend-vs-sendgrid)
- [Cal.com Next.js 15 Compatibility Issues](https://github.com/vercel/next.js/discussions/71995)
- [shadcn/ui 2026 Updates](https://ui.shadcn.com/docs/changelog/2026-02-radix-ui)
- [Lenis Smooth Scroll](https://lenis.darkroom.engineering/)
- [React Email + Resend Integration](https://react.email/docs/integrations/resend)
- [Tailwind CSS 4 Setup](https://github.com/vercel/next.js/discussions/82623)

---

_Stack research for: Premium Reiki Landing Page_
_Researched: 2026-02-10_
_Researcher: gsd-project-researcher_
