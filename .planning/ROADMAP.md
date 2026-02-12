# Roadmap: Reiki Landing Site

## Overview

This roadmap transforms a premium landing page vision into a deployed Next.js 15 application that converts visitors into booked clients. Starting with critical infrastructure to prevent Next.js pitfalls, we build server-rendered content sections for SEO, add interactive forms for conversions, polish with animations, integrate booking and analytics, and finalize with multi-language support. Each phase delivers a coherent, verifiable capability following dependency-driven architecture patterns.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & Configuration** - Next.js 15 project setup with critical infrastructure
- [ ] **Phase 2: Static Content & SEO** - Server-rendered sections with metadata
- [ ] **Phase 3: Forms & Validation** - Contact forms and FAQ with Server Actions
- [ ] **Phase 4: Animations & Polish** - Premium animations and performance optimization
- [ ] **Phase 5: Booking Integration & Analytics** - Calendly integration and tracking
- [ ] **Phase 6: Multi-Language & Final Optimization** - i18n support and audits

## Phase Details

### Phase 1: Foundation & Configuration

**Goal**: Next.js 15 project with App Router, TypeScript, Tailwind CSS, and all critical infrastructure properly configured to prevent production pitfalls.

**Depends on**: Nothing (first phase)

**Requirements**: TECH-01, TECH-02, TECH-03, TECH-04, TECH-05, TECH-06, TECH-07, TECH-08

**Success Criteria** (what must be TRUE):

1. Next.js 15 project with App Router runs locally without errors
2. TypeScript compilation succeeds with proper type checking
3. Tailwind CSS generates styles and responds to config changes
4. Environment variables are properly scoped (server-only secrets not exposed)
5. Deployment pipeline auto-deploys from Git repository to production URL

**Plans**: 2 plans

Plans:

- [ ] 01-01-PLAN.md -- Scaffold Next.js 15 project with TypeScript, Tailwind CSS, ESLint, Prettier, and critical configuration
- [ ] 01-02-PLAN.md -- Deploy to Vercel with Git auto-deploy and verify production URL

---

### Phase 2: Static Content & SEO

**Goal**: Visitors see a complete, premium landing page with all informational sections, proper SEO metadata, and professional design, rendered as static HTML for speed and search visibility.

**Depends on**: Phase 1

**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04, CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, TRUST-01, TRUST-02, TRUST-03, TRUST-04, TRUST-05, TRUST-06, PRICE-01, PRICE-02, PRICE-03, PRICE-04, SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07, UX-02, UX-03, UX-04

**Success Criteria** (what must be TRUE):

1. Visitor sees hero section with compelling headline, premium background media, and prominent CTA button
2. Visitor can scroll through all content sections (About Reiki, Benefits, How Sessions Work, Methodology) with readable, well-formatted text
3. Visitor sees transparent pricing information, trust signals (practitioner photo, qualifications), and required scientific disclaimers
4. Social media preview shows correct title, description, and image when sharing site URL
5. Search engines correctly index the page with proper semantic HTML structure and structured data

**Plans**: 4 plans

Plans:

- [ ] 02-01-PLAN.md -- Design system, layout shell (header + footer), SEO metadata, CTA button
- [ ] 02-02-PLAN.md -- Hero section, About Reiki, and How Sessions Work sections
- [ ] 02-03-PLAN.md -- Benefits, Pricing cards, and Trust/credentials sections
- [ ] 02-04-PLAN.md -- SEO assets (JSON-LD, sitemap, robots, OG image) and visual verification

---

### Phase 3: Forms & Validation

**Goal**: Visitors can contact the practitioner and ask questions through functional forms with proper validation, error handling, and email notifications.

**Depends on**: Phase 2

**Requirements**: BOOK-01, BOOK-04, BOOK-05, BOOK-06, BOOK-07, FAQ-01, FAQ-02, FAQ-03, FAQ-04, FAQ-05

**Success Criteria** (what must be TRUE):

1. Visitor can fill out contact form (name, email, message) and receive success confirmation after submission
2. Practitioner receives email notification with visitor details when form is submitted
3. Visitor sees inline error messages for invalid input (missing required fields, malformed email)
4. Visitor sees contact phone and email displayed with clickable links (tel: and mailto:)
5. Visitor can browse FAQ section with expandable accordion UI to find answers to common questions

**Plans**: TBD

Plans:

- [ ] 03-01: [TBD during planning]

---

### Phase 4: Animations & Polish

**Goal**: Visitors experience a premium, polished interface with smooth animations, optimized performance, and responsive design that works beautifully across all devices.

**Depends on**: Phase 2

**Requirements**: UX-01, UX-05, UX-06, UX-07, UX-08, PERF-01, PERF-02, PERF-03, PERF-04, PERF-05, PERF-06

**Success Criteria** (what must be TRUE):

1. Visitor experiences smooth scroll animations as sections come into view (fade-in effects)
2. Visitor sees hover effects on buttons, links, and interactive elements with fluid transitions
3. Page loads in under 3 seconds on typical connections (tested with slow 3G throttling)
4. Lighthouse Performance Score is 90+ with all Core Web Vitals in "Good" range
5. Site displays properly and remains usable on mobile phones (320px), tablets, and desktops (1920px+)

**Plans**: TBD

Plans:

- [ ] 04-01: [TBD during planning]

---

### Phase 5: Booking Integration & Analytics

**Goal**: Visitors can book sessions directly through integrated calendar system, and practitioner can track visitor behavior and conversions through analytics.

**Depends on**: Phase 3

**Requirements**: BOOK-02, BOOK-03, TRACK-01, TRACK-02, TRACK-03, TRACK-04, TRACK-05

**Success Criteria** (what must be TRUE):

1. Visitor clicks "Book Session" CTA and sees Calendly calendar widget embedded in page
2. Visitor can select date and time through Calendly and complete booking without leaving site
3. Booked appointments automatically appear in practitioner's Google Calendar
4. Analytics dashboard shows form submissions, CTA clicks, and Calendly opens as conversion events
5. Visitor sees cookie consent banner on first visit and analytics respects consent choice

**Plans**: TBD

Plans:

- [ ] 05-01: [TBD during planning]

---

### Phase 6: Multi-Language & Final Optimization

**Goal**: Visitors can view the site in their preferred language (Russian/English), and site passes all performance, accessibility, and SEO audits with production-ready quality.

**Depends on**: Phase 5

**Requirements**: I18N-01, I18N-02, I18N-03, I18N-04, I18N-05, I18N-06

**Success Criteria** (what must be TRUE):

1. Visitor sees language switcher in navigation and can toggle between Russian and English
2. All UI text and content sections display in selected language after switching
3. URLs reflect language choice (example.com/en/ vs example.com/ru/) for proper SEO
4. Browser automatically redirects to correct language based on Accept-Language header
5. Site passes Lighthouse accessibility audit (WCAG 2.1 AA) and maintains 90+ performance score across all languages

**Plans**: TBD

Plans:

- [ ] 06-01: [TBD during planning]

---

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6

| Phase                                  | Plans Complete | Status      | Completed |
| -------------------------------------- | -------------- | ----------- | --------- |
| 1. Foundation & Configuration          | 2/2            | Complete    | 2026-02-10 |
| 2. Static Content & SEO                | 0/4            | Planning    | -         |
| 3. Forms & Validation                  | 0/TBD          | Not started | -         |
| 4. Animations & Polish                 | 0/TBD          | Not started | -         |
| 5. Booking Integration & Analytics     | 0/TBD          | Not started | -         |
| 6. Multi-Language & Final Optimization | 0/TBD          | Not started | -         |

---

_Roadmap created: 2026-02-10_
_Last updated: 2026-02-12_
