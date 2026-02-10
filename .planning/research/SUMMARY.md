# Project Research Summary

**Project:** Premium Reiki Landing Page
**Domain:** Wellness Service Landing Page (Next.js)
**Researched:** 2026-02-10
**Confidence:** HIGH

## Executive Summary

This is a premium wellness service landing page built with Next.js 15 — a single-page marketing site designed to showcase reiki services, build trust with potential clients, and convert visitors into bookings. Industry research shows this type of project succeeds when using modern React frameworks with server-first rendering, premium animations for polish, and integrated booking to reduce friction. The recommended approach combines Next.js 15 App Router for performance and SEO, Framer Motion for smooth animations, and external booking platforms (Calendly) to avoid building complex scheduling logic.

The core technical strategy is "server-first with client islands": render static content server-side for speed and SEO, isolate interactivity (forms, animations) in small Client Components. This pattern delivers the fast load times and professional polish required for premium positioning while keeping bundle sizes small (target: 150-200KB gzipped). Stack choices prioritize Next.js built-in features first (Metadata API, Server Actions, Image optimization) before adding external libraries.

Key risks center on Next.js 15 gotchas that silently break production: metadata configuration failing in Client Components, missing metadataBase breaking social sharing, and image optimization errors. Mitigation requires strict architectural discipline from Phase 1: establish metadata in Server Components, configure environment variables properly, and test Core Web Vitals continuously. Alternative wellness also requires trust-building focus — credible credentials, realistic messaging, and transparent disclaimers to overcome skepticism without over-promising.

## Key Findings

### Recommended Stack

Next.js 15 App Router with React 19 forms the foundation, leveraging Server Components for static content and Server Actions for form handling. This eliminates the need for API routes while providing excellent SEO and performance. TypeScript adds type safety, while Tailwind CSS enables rapid styling with v4's CSS-first approach (fallback to v3 if needed).

**Core technologies:**
- **Next.js 15 + React 19:** App Router with Server Components for server-first rendering and built-in SEO via Metadata API
- **TypeScript 5.x:** Type safety for scalable codebase with zero-config Next.js integration
- **Tailwind CSS 4.x/3.x:** Utility-first styling with minimal bundle impact and rapid development
- **Framer Motion 12.x + Lenis:** Premium animations for scroll effects and smooth scrolling (32KB gzipped total)
- **React Hook Form + Zod:** Performant form handling with schema validation for contact/booking forms
- **next-intl 3.x:** Multi-language support designed specifically for App Router with locale-based routing
- **Resend + React Email:** Modern email API for contact form notifications with React-based templates
- **Calendly (react-calendly):** Embedded booking integration avoiding custom calendar logic

**Critical versions:**
- Next.js 15.0.7+ (security fix for secret inlining)
- Framer Motion 12.x compatible with React 19
- Cal.com avoided due to Next.js 15 compatibility issues (Feb 2026)

**Philosophy:** Use Next.js built-ins first, add libraries only when needed. Total core dependencies: ~8 packages.

### Expected Features

Landing pages for wellness services follow established patterns. Research shows users expect certain baseline features (table stakes) while competitive advantage comes from polish and trust-building.

**Must have (table stakes):**
- **Hero section with clear CTA** — 53% of users leave if they don't see clear action within 3 seconds
- **Professional practitioner photo** — Builds trust; visitors need to see who they'll work with
- **Service description** — Clear explanation of what happens in session, what to expect
- **Pricing display** — 93% research pricing before booking; hiding pricing creates distrust
- **Contact information** — Phone, location, email anchor service in real world
- **Mobile responsiveness** — 83% of traffic is mobile; non-responsive = 53% bounce rate
- **Fast page load (<3s)** — 53% abandon if >3 seconds; optimize images, lazy load
- **FAQ section** — Reduces objections and support burden; expected for service businesses
- **Basic trust signals** — Credentials, certifications, years of experience

**Should have (competitive):**
- **Client testimonials** — 93% rely on reviews; social proof is #1 trust builder
- **Integrated booking system** — Self-service booking increases conversions 20-40%
- **Video introduction** — Can increase conversions up to 86%; shows personality
- **Premium animations** — Signals quality; apps with good motion see 15-20% longer sessions
- **Multi-language support** — Expands market if serving diverse community
- **Process explanation** — Step-by-step reduces anxiety for first-timers

**Defer (v2+):**
- **Multi-language support** — High complexity; only if serving multilingual market actively
- **Premium animations** — Add after conversion funnel optimized; vanity metric otherwise
- **AI personalization** — Requires significant traffic for testing; premature at small scale
- **Advanced analytics** — Start with Google Analytics; advanced tracking when optimizing at scale

**Anti-features to avoid:**
- Complex multi-step forms (20% abandonment increase per field)
- Auto-playing background videos (kills mobile performance)
- Multiple competing CTAs (causes analysis paralysis)
- Excessive navigation (exit opportunities on landing pages)
- Chat widgets with auto-popup (intrusive, hurts mobile UX)

### Architecture Approach

The architecture follows Next.js 15 best practices: server-first rendering with client islands for interactivity. Static content renders server-side for SEO and speed, while forms and animations live in small Client Components. This pattern keeps JavaScript bundles small (~150-200KB) while delivering premium UX.

**Major components:**

1. **App Router Layer (`app/[locale]/`)** — i18n routing with dynamic locale segment, root layout with providers, page composition from sections, Server Actions for forms

2. **Server Components Layer** — Hero, Features, Testimonials, About, Footer sections rendered server-side as static HTML; minimal JavaScript sent to client

3. **Client Islands Layer** — BookingForm, ContactForm, AnimatedHero as isolated Client Components using "use client" directive; Framer Motion animations wrapped around static content

4. **Data Flow Layer** — Server Actions handle form submissions with Zod validation; no API routes needed for simple forms; progressive enhancement with useActionState

5. **External Integrations** — Calendly for booking calendar, Resend for email notifications, Vercel Analytics + GA4 for tracking, next-intl for translations

**Critical patterns:**
- **Server Actions over API routes:** Forms use Server Actions for simplicity and progressive enhancement
- **Static generation with ISR:** Use generateStaticParams for locale pages, revalidate for dynamic content
- **Animation with scroll triggers:** Framer Motion in Client Components with whileInView for scroll-based reveals
- **i18n with next-intl:** Middleware detects locale, NextIntlClientProvider in layout, translations in JSON files

**Project structure:**
- `app/[locale]/` for routing
- `components/sections/` for Server Components (Hero, Features, etc.)
- `components/forms/` for Client Components (BookingForm, ContactForm)
- `components/animations/` for reusable animation wrappers
- `lib/actions/` for Server Actions
- `lib/validations/` for Zod schemas
- `messages/` for translation JSON files

### Critical Pitfalls

Next.js 15 landing pages have well-documented failure modes. The top pitfalls silently break production and require Phase 1 prevention.

1. **Metadata in Client Components** — Metadata API only works in Server Components. Adding "use client" silently breaks SEO tags. Social media previews show broken images. **Prevention:** Keep all metadata in Server Components (layout.tsx, page.tsx); move configuration to parent components; never export metadata from client files. **Phase 1 concern.**

2. **Missing metadataBase** — Without explicit metadataBase configuration, Open Graph images show localhost URLs even in production. **Prevention:** Set `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL)` in root layout; configure env var for all environments; test social sharing before launch. **Phase 1 concern.**

3. **Image optimization config missing** — Remote images (CDN, external sources) fail with "hostname not configured" error. **Prevention:** Configure remotePatterns in next.config.js before using external images; restart dev server after config changes; use specific pathname patterns for security. **Phase 1 concern.**

4. **Missing image dimensions cause layout shift** — Images without width/height props cause CLS (Cumulative Layout Shift), tanking Google rankings. **Prevention:** Always provide width/height OR use fill prop; use priority flag for above-fold images; test with slow 3G. **Phase 2 concern.**

5. **Font loading performance issues** — Loading fonts from CDN causes FOIT (Flash of Invisible Text) or FOUT (Flash of Unstyled Text), poor CLS. **Prevention:** Use next/font for all fonts (Google or custom); fonts preloaded at build time; define in root layout; never load from external CDN. **Phase 1 concern.**

6. **Server Action validation errors not displayed** — Form submits but user sees no feedback. **Prevention:** Use useActionState hook for all Server Actions; return errors as serializable objects; display errors inline; show pending state. **Phase 3 concern.**

7. **Overusing "use client" directive** — Marking entire pages client-side explodes bundle size to 500KB+. **Prevention:** Push "use client" as deep as possible; keep Server Components for static content; extract interactive pieces into separate files. **Phase 2 concern.**

8. **Third-party scripts block rendering** — Google Analytics, Calendly widgets delay page load by 2-3 seconds. **Prevention:** Use @next/third-parties/google for GA; use next/script with strategy="lazyOnload" for widgets; load analytics after hydration. **Phase 3 concern.**

9. **Environment variables exposed to client** — API keys leak to browser if using NEXT_PUBLIC_ incorrectly. **Prevention:** Never use NEXT_PUBLIC_ for secrets; keep API keys in Server Components or Server Actions; upgrade to Next.js 15.0.7+ for security fix. **Phase 1 concern.**

10. **Caching confusion** — Next.js 15 changed defaults; fetch is NOT cached by default (opposite of v14). **Prevention:** Use `revalidate` for time-based updates; use revalidatePath to invalidate after updates; understand revalidatePath regenerates on next request, not immediately. **Phase 2 concern.**

## Implications for Roadmap

Based on combined research, the roadmap should follow dependency-driven phasing that addresses critical pitfalls early and builds complexity incrementally.

### Phase 1: Foundation & Configuration (Week 1)
**Rationale:** Must establish infrastructure before building features. Next.js 15 pitfalls are easiest to fix at setup time; retrofitting is expensive. Many critical issues (metadata, fonts, image config, env vars) are Phase 1 concerns per PITFALLS.md.

**Delivers:**
- Next.js 15 project with App Router configured
- i18n routing with next-intl middleware
- Root layout with providers and metadata
- Basic UI components (Button, Input, Card)
- Tailwind CSS with design tokens
- Font optimization with next/font
- Image optimization remotePatterns
- Environment variables properly scoped

**Addresses pitfalls:**
- Pitfall 1: Metadata in Server Components (establish architecture)
- Pitfall 2: metadataBase configuration
- Pitfall 3: Image optimization config
- Pitfall 5: Font loading setup
- Pitfall 9: Environment variable security

**From FEATURES.md:** Not feature-focused; pure infrastructure setup

**Research flag:** Skip research — Next.js 15 setup is well-documented in official docs

### Phase 2: Static Content & SEO (Week 2)
**Rationale:** Build static sections as Server Components before adding interactivity. This follows architecture pattern of "server-first with client islands." Delivers visible landing page quickly while keeping bundle small.

**Delivers:**
- Hero section (Server Component)
- Features/services section (Server Component)
- About/practitioner section (Server Component)
- Testimonials section (Server Component)
- Footer (Server Component)
- SEO metadata per page
- Open Graph images and Twitter Cards

**Uses from STACK.md:**
- React 19 Server Components
- Next.js Metadata API (not next-seo)
- Tailwind CSS for styling

**Implements from ARCHITECTURE.md:**
- Server Components Layer
- Static generation with generateStaticParams
- SEO metadata structure

**Addresses from FEATURES.md:**
- Hero section with clear CTA (table stakes)
- Professional practitioner photo (table stakes)
- Service description (table stakes)
- Basic trust signals (table stakes)
- Contact information (table stakes)

**Addresses pitfalls:**
- Pitfall 4: Image dimensions for CLS (hero images)
- Pitfall 7: Avoid overusing "use client" (static sections server-rendered)
- Pitfall 10: Understand caching for static generation

**Research flag:** Skip research — Landing page sections are standard patterns

### Phase 3: Forms & Validation (Week 3)
**Rationale:** Forms depend on sections being in place for context. Server Actions provide simpler alternative to API routes. React Hook Form + Zod is industry standard per STACK.md.

**Delivers:**
- Contact form (Client Component)
- Booking form (Client Component)
- Server Actions for form handling
- Zod validation schemas
- Email integration with Resend
- Form error display and loading states

**Uses from STACK.md:**
- React Hook Form 7.66+ for form state
- Zod 3.x for schema validation
- Resend + React Email for notifications
- React 19's useActionState hook

**Implements from ARCHITECTURE.md:**
- Server Actions pattern (not API routes)
- Client Islands pattern (forms isolated)
- Data flow: Client → Server Action → Validation → Email API

**Addresses from FEATURES.md:**
- Contact form (table stakes)
- Pricing display (table stakes)
- FAQ section (table stakes)

**Addresses pitfalls:**
- Pitfall 6: Server Action validation errors displayed properly with useActionState
- Pitfall 9: API keys kept server-side in Server Actions

**Research flag:** Skip research — Server Actions + React Hook Form well documented

### Phase 4: Animations & Polish (Week 4)
**Rationale:** Add animations after static content works. Easy to wrap existing sections with animation components. Animations are differentiator per FEATURES.md but not critical for functionality.

**Delivers:**
- Scroll animation wrappers (FadeInView, SlideInView)
- Animated hero elements
- Smooth scrolling with Lenis
- Micro-interactions (hover states, transitions)
- Performance budget monitoring

**Uses from STACK.md:**
- Framer Motion 12.x for declarative animations
- Lenis 1.x for smooth scrolling
- Tailwind Motion as lightweight alternative if needed

**Implements from ARCHITECTURE.md:**
- Animation with scroll triggers pattern
- Client Components wrapping Server Components
- whileInView for scroll-based reveals

**Addresses from FEATURES.md:**
- Premium animations (differentiator)
- Professional polish for longer sessions

**Addresses pitfalls:**
- Pitfall 4: Animations don't add layout shift (viewport={{ once: true }})
- Ensure animations remain fast (0.3-0.6s duration)

**Research flag:** Light research may help — Framer Motion scroll patterns and performance optimization

### Phase 5: Booking Integration & Analytics (Week 5)
**Rationale:** External integrations depend on forms and content being functional. Booking is high-value feature (20-40% conversion increase) per FEATURES.md. Analytics needs content to track.

**Delivers:**
- Calendly embedded booking widget
- Google Analytics 4 setup
- Vercel Analytics integration
- Event tracking for conversions
- Performance monitoring

**Uses from STACK.md:**
- react-calendly for booking embed
- @next/third-parties/google for GA4
- Vercel Analytics SDK

**Implements from ARCHITECTURE.md:**
- External integrations layer
- Script loading with next/script

**Addresses from FEATURES.md:**
- Integrated appointment booking (differentiator)
- Analytics tracking (should have)

**Addresses pitfalls:**
- Pitfall 8: Third-party scripts use next/script with lazyOnload
- Ensure booking widget doesn't block page load

**Research flag:** May need research — Calendly integration patterns, GA4 event tracking setup

### Phase 6: Multi-Language & Optimization (Week 6)
**Rationale:** i18n is complex and should come after core functionality proven. Optimization requires complete functionality to measure improvements.

**Delivers:**
- Multi-language support (if needed)
- Translation files for all content
- Language switcher component
- Image optimization and lazy loading
- Performance audit (Lighthouse)
- Accessibility audit (WCAG 2.1)
- Cross-browser testing
- Mobile responsiveness fixes
- ISR configuration for dynamic content

**Uses from STACK.md:**
- next-intl 3.x with App Router
- Next.js Image component optimizations
- Built-in performance monitoring

**Implements from ARCHITECTURE.md:**
- i18n with next-intl pattern
- Static generation strategy
- Performance optimization

**Addresses from FEATURES.md:**
- Multi-language support (v2+ feature, conditional)
- Mobile responsiveness (table stakes)
- Fast page load (table stakes)

**Addresses pitfalls:**
- Final checks for all Phase 1-5 pitfalls
- CLS score < 0.1
- LCP < 2.5s
- All Core Web Vitals passing

**Research flag:** May need research if implementing i18n — next-intl configuration, translation workflow, hreflang SEO

### Phase Ordering Rationale

**Why this sequence:**

1. **Foundation first (Phase 1):** Critical pitfalls (metadata, fonts, images, env vars) are easiest to fix at setup. Retrofitting configuration is expensive and error-prone.

2. **Static before dynamic (Phase 2 → 3):** Server Components must exist before adding Client Component forms. Architecture pattern requires static sections as foundation.

3. **Functionality before polish (Phase 3 → 4):** Forms must work before adding animations. Animations are enhancement, not requirement. Can wrap existing sections easily.

4. **Internal before external (Phase 3 → 5):** Forms must function before integrating external booking. Analytics needs content to track. External dependencies come last to avoid blocking progress.

5. **Optimization last (Phase 6):** Can't optimize until everything exists. Requires measuring complete functionality. i18n is highest complexity, defer until core proven.

**Dependency chain:**
- Phase 1 → Phase 2 (infrastructure enables sections)
- Phase 2 → Phase 3 (sections provide context for forms)
- Phase 2 → Phase 4 (static sections get wrapped with animations)
- Phase 3 → Phase 5 (forms enable booking integration)
- Phase 1-5 → Phase 6 (everything must exist for optimization)

**How this avoids pitfalls:**
- Phase 1 addresses 5 critical pitfalls upfront (metadata, fonts, images, env vars)
- Phase 2 prevents bundle bloat by establishing server-first pattern
- Phase 3 implements proper Server Action validation before external dependencies
- Phase 4 adds animations after baseline performance established
- Phase 5 uses proper script loading to avoid blocking render
- Phase 6 validates all pitfalls avoided with audits

### Research Flags

**Phases likely needing `/gsd:research-phase` during planning:**

- **Phase 4 (Animations):** Framer Motion scroll patterns and performance optimization techniques may benefit from deeper research. Animation libraries are evolving rapidly; current best practices for Next.js 15 + React 19 may need verification.

- **Phase 5 (Integrations):** Calendly integration patterns and GA4 event tracking setup could use specific research. Third-party integration docs may have Next.js 15 specific gotchas.

- **Phase 6 (i18n):** next-intl configuration, translation workflow, and hreflang SEO implementation is complex enough to warrant research if implementing multi-language. Skip if single language.

**Phases with standard patterns (skip research-phase):**

- **Phase 1 (Foundation):** Next.js 15 setup is exhaustively documented in official docs. Configuration patterns are well-established.

- **Phase 2 (Static Content):** Landing page sections follow universal patterns. No domain-specific complexity.

- **Phase 3 (Forms):** Server Actions + React Hook Form + Zod is industry standard with abundant documentation. Current research in STACK.md and ARCHITECTURE.md is sufficient.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All technologies verified via Context7 official documentation (Next.js, React, Tailwind, Framer Motion, React Hook Form, next-intl). Stack choices align with 2026 best practices. Version compatibility confirmed. |
| Features | HIGH | Based on 40+ landing page examples, wellness industry patterns, booking system analysis, and conversion optimization research from 2026. Feature prioritization backed by conversion data (53% abandon if >3s, 93% research pricing, etc.). |
| Architecture | HIGH | Verified via official Next.js 15 documentation and multiple senior-level architecture guides. Server-first with client islands is established pattern. Project structure validated across multiple sources. |
| Pitfalls | HIGH | Drawn from official Next.js blog, GitHub issues, Medium technical articles, and performance guides. All 10 pitfalls cross-referenced with multiple sources. Phase mapping verified against build order recommendations. |

**Overall confidence:** HIGH

Research quality is strong across all areas. Stack recommendations come from official documentation and Context7 verified sources. Feature analysis synthesizes 40+ landing page examples and wellness industry research. Architecture patterns validated by official Next.js guides and senior developer resources. Pitfalls documented in official Next.js security updates and GitHub issues.

### Gaps to Address

Despite high confidence, a few areas need attention during implementation:

- **Framer Motion + React 19 compatibility:** Research shows Framer Motion 12.x compatible with React 19, but some sources mention importing from "motion/react" instead of "framer-motion". Verify during Phase 4 setup; may need library swap if issues arise.

- **Cal.com vs Calendly decision:** Research indicates Cal.com has Next.js 15 compatibility issues (Feb 2026), recommending Calendly instead. Monitor Cal.com repository for updates; open-source preference may justify waiting if timeline permits.

- **Multi-language implementation complexity:** next-intl research is strong, but Phase 6 i18n implementation is highest complexity task. If multi-language is requirement (not optional), consider bringing Phase 6 research forward or splitting i18n into separate phase.

- **Tailwind v4 vs v3 choice:** Stack recommends Tailwind v4 (alpha/beta) with v3 fallback. Browser compatibility may dictate choice; test v4 in target browsers early or default to v3 for stability.

- **Performance budget enforcement:** Research identifies performance pitfalls but doesn't specify enforcement mechanism. Consider adding Lighthouse CI or bundle analyzer to CI/CD pipeline during Phase 1 to catch regressions early.

## Sources

### Primary Sources (HIGH confidence)

**Context7 Official Documentation:**
- `/vercel/next.js/v16.1.5` — Next.js App Router, Metadata API, Server Components, Image optimization
- `/websites/react_dev` — React 19 hooks, Server Components, useActionState
- `/amannn/next-intl` — App Router i18n setup, locale routing
- `/react-hook-form/react-hook-form` — Zod integration, validation patterns
- `/grx7/framer-motion` — Animation library, scroll triggers
- `/websites/tailwindcss` — Utility-first CSS framework, v4 features

**Official Guides & Security Updates:**
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Next.js Security Update Dec 2025](https://nextjs.org/blog/security-update-2025-12-11) — Environment variable security
- [Next.js Project Structure Guide](https://nextjs.org/docs/app/getting-started/project-structure)
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

### Secondary Sources (MEDIUM-HIGH confidence)

**Landing Page Best Practices & Features:**
- [40 Best Landing Page Examples 2026 (Unbounce)](https://unbounce.com/landing-page-examples/best-landing-page-examples/)
- [Top 16 Wellness Website Examples 2026 (Hostinger)](https://www.hostinger.com/tutorials/wellness-website-examples)
- [12 Landing Page Best Practices 2026 (Leadfeeder)](https://www.leadfeeder.com/blog/landing-pages-convert/)
- [Landing Page Optimization Ultimate Guide (VWO)](https://vwo.com/landing-page-optimization/)

**Next.js Architecture & Patterns:**
- [Modern Full Stack Application Architecture Using Next.js 15+ (SoftwareMill)](https://softwaremill.com/modern-full-stack-application-architecture-using-next-js-15/)
- [Ultimate Guide to Organizing Next.js 15 Project Structure (Wisp)](https://www.wisp.blog/blog/the-ultimate-guide-to-organizing-your-nextjs-15-project-structure)
- [Next.js Architecture 2026 — Server-First, Client-Islands (YogiJS)](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router)
- [Next.js 15 App Router Complete Senior-Level Guide (Medium)](https://medium.com/@livenapps/next-js-15-app-router-a-complete-senior-level-guide-0554a2b820f7)

**Performance & Pitfalls:**
- [7 Common Performance Mistakes - Daniel Scott](https://medium.com/full-stack-forge/7-common-performance-mistakes-in-next-js-and-how-to-fix-them-edd355e2f9a9)
- [10 Next.js Mistakes Slowing Your App - debug_senpai](https://medium.com/@jigsz6391/10-nextjs-mistakes-slowing-your-app-and-how-to-fix-them-fast-e792a4ff5caf)
- [Fixing CLS in Next.js - Ankit](https://medium.com/@mohantaankit2002/fixing-cls-cumulative-layout-shift-issues-in-next-js-for-better-core-web-vitals-65e8fbecdd0e)
- [Optimizing Core Web Vitals Next.js 15 - Excel Nwachukwu](https://trillionclues.medium.com/optimizing-core-web-vitals-with-next-js-15-61564cc51b13)

**Integration Patterns:**
- [Next.js 15 Server Actions Complete Guide - Saad Minhas](https://medium.com/@saad.minhas.codes/next-js-15-server-actions-complete-guide-with-real-examples-2026-6320fbfa01c3)
- [Mastering Form Handling in Next.js 15 with Server Actions](https://medium.com/@sankalpa115/mastering-form-handling-in-next-js-15-with-server-actions-react-hook-form-react-query-and-shadcn-108f6863200f)
- [Google Analytics Setup Next.js 15 - Thomas Augot](https://medium.com/@thomasaugot/how-to-set-up-google-analytics-with-google-tag-manager-in-next-js-15-in-2025-dedfcaee875a)

**Stack-Specific Research:**
- [Framer Motion vs GSAP Performance (Motion.dev)](https://motion.dev/docs/gsap-vs-motion)
- [Resend vs SendGrid Comparison (Sequenzy)](https://www.sequenzy.com/versus/resend-vs-sendgrid)
- [Tailwind CSS 4 Setup (Next.js Discussions)](https://github.com/vercel/next.js/discussions/82623)
- [shadcn/ui 2026 Updates](https://ui.shadcn.com/docs/changelog/2026-02-radix-ui)

**Pitfall-Specific Research:**
- [Next.js SEO Complete Guide 2026 - Thomas Augot](https://medium.com/@thomasaugot/the-complete-guide-to-seo-optimization-in-next-js-15-1bdb118cffd7)
- [OG Check Next.js Guide](https://ogcheck.com/blog/nextjs-open-graph)
- [Next.js Image Optimization Pain - Daggie Blanqx](https://medium.com/@daggieblanqx/the-untold-pain-of-next-js-image-optimization-and-how-to-finally-fix-it-19c792ea4ad9)
- [Font Loading Issues OneUpTime](https://oneuptime.com/blog/post/2026-01-24-nextjs-font-loading-issues/view)
- [Managing Environment Variables - Bale](https://medium.com/@bloodturtle/managing-environment-variables-in-next-js-protecting-sensitive-information-95ba60910d56)

### GitHub Issues & Official Discussions (HIGH confidence for problem validation)
- [Metadata metadataBase Issue #62984](https://github.com/vercel/next.js/issues/62984)
- [Caching Discussion #54075](https://github.com/vercel/next.js/discussions/54075)
- [Cal.com Next.js 15 Compatibility Issues](https://github.com/vercel/next.js/discussions/71995)

---
*Research completed: 2026-02-10*
*Ready for roadmap: yes*
