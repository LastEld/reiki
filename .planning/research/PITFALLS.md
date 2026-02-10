# Pitfalls Research

**Domain:** Next.js 15 Landing Pages
**Researched:** 2026-02-10
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Metadata in Client Components

**What goes wrong:**
Metadata configurations fail silently when placed in client components ("use client"). Social media previews show broken images or missing descriptions, and SEO metadata doesn't appear in page source.

**Why it happens:**
Developers add "use client" to enable interactivity, forgetting that the Metadata API only works in Server Components. This is especially common when converting components from Pages Router or adding hooks.

**How to avoid:**
- Keep metadata in Server Components (layout.tsx or page.tsx without "use client")
- Move metadata configuration to parent Server Component
- Use generateMetadata function for dynamic metadata in Server Components
- Never export metadata objects from client components

**Warning signs:**
- "metadata.metadataBase is not set" warnings in console
- Open Graph previews showing localhost URLs in production
- Twitter Card validator showing no metadata
- View source shows no meta tags despite metadata configuration

**Phase to address:**
Phase 1 (Foundation/Setup) - Establish proper metadata architecture before building features

**Sources:**
- [Next.js 15 SEO Guide - Thomas Augot](https://medium.com/@thomasaugot/the-complete-guide-to-seo-optimization-in-next-js-15-1bdb118cffd7)
- [Next.js SEO 2026 - Djamware](https://www.djamware.com/post/697a19b07c935b6bb054313e/next-js-seo-optimization-guide--2026-edition)

---

### Pitfall 2: Missing metadataBase Configuration

**What goes wrong:**
Open Graph images display as broken links on social media. Facebook, LinkedIn, and Twitter show localhost URLs instead of production URLs, even in deployed environments.

**Why it happens:**
Next.js requires explicit metadataBase for resolving relative image URLs. Without it, defaults to "http://localhost:3000" in all environments.

**How to avoid:**
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    images: '/og-image.png', // Now resolves to full URL
  },
}
```

- Set NEXT_PUBLIC_SITE_URL in all deployment environments
- Use absolute URLs for Open Graph images if metadataBase cannot be set
- Test social sharing on staging before production

**Warning signs:**
- Console warning: "metadata.metadataBase is not set for resolving social open graph or twitter images"
- Social preview tools show localhost URLs
- Images work locally but break on social platforms
- Twitter Card validator fails to load images

**Phase to address:**
Phase 1 (Foundation/Setup) - Configure before deploying

**Sources:**
- [Next.js Metadata GitHub Issue #62984](https://github.com/vercel/next.js/issues/62984)
- [OG Check Next.js Guide](https://ogcheck.com/blog/nextjs-open-graph)
- [OneUpTime Metadata Errors](https://oneuptime.com/blog/post/2026-01-24-fix-nextjs-metadata-generation-errors/view)

---

### Pitfall 3: Caching Confusion in App Router

**What goes wrong:**
Landing page content doesn't update after changes. Users see stale booking calendars, outdated pricing, or old promotional content hours after updates.

**Why it happens:**
Next.js 15 changed default caching behavior - not all fetch requests are cached by default anymore, but developers assume Pages Router behavior or misunderstand the new caching model.

**How to avoid:**
- Understand Next.js 15 defaults: fetch is NOT cached by default
- Use `revalidate` for time-based updates: `{ next: { revalidate: 3600 } }`
- Use `revalidateTag` with 'max' profile for stale-while-revalidate behavior
- Use `revalidatePath` to invalidate specific routes after updates
- Be aware: revalidatePath invalidates but regenerates on NEXT request (not immediate)

**Warning signs:**
- Landing page shows old prices after update
- Booking calendar displays yesterday's availability
- Form submissions succeed but changes don't appear
- Data updates only visible after hard refresh
- Router cache shows old data when navigating

**Phase to address:**
Phase 2 (Core Features) - When implementing dynamic content (pricing, bookings, testimonials)

**Sources:**
- [Next.js 15 Caching - UniqueDevs](https://uniquedevs.com/en/blog/how-does-caching-work-in-next-js-15/)
- [Next.js Caching GitHub Discussion #54075](https://github.com/vercel/next.js/discussions/54075)
- [Leapcell Cache Control Guide](https://leapcell.io/blog/mastering-cache-control-and-revalidation-in-next-js-app-router)

---

### Pitfall 4: Image Optimization Configuration Missing

**What goes wrong:**
"Error: Invalid src prop on `next/image`, hostname is not configured under images in your `next.config.js`" breaks the site when using external images (Cloudinary, S3, Unsplash).

**Why it happens:**
Next.js blocks optimization of remote images for security. Developers add next/image without configuring allowed domains, especially for CMS images, booking platform avatars, or CDN assets.

**How to avoid:**
```javascript
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}
```

- Configure remotePatterns BEFORE adding external images
- Restart dev server after config changes
- Use specific pathname patterns for security: `pathname: '/account123/**'`
- Always provide width/height for remote images

**Warning signs:**
- Error message about unconfigured hostname
- Images work in development but fail in production
- New CDN domain breaks existing images
- Config changes don't apply without restart

**Phase to address:**
Phase 1 (Foundation/Setup) - Configure with initial asset strategy

**Sources:**
- [Medium: Next.js Image Optimization Pain](https://medium.com/@daggieblanqx/the-untold-pain-of-next-js-image-optimization-and-how-to-finally-fix-it-19c792ea4ad9)
- [Next.js Image Optimization Guide - Adhithi Ravichandran](https://adhithiravi.medium.com/speed-matters-optimize-image-performance-in-next-js-15-like-a-pro-de1f1d2270e9)

---

### Pitfall 5: Missing Image Dimensions Cause Layout Shift

**What goes wrong:**
Landing page CLS (Cumulative Layout Shift) score tanks. Page jumps around as images load, pushing content down. Google penalizes site in search rankings.

**Why it happens:**
Developers use next/image without width/height props. Browser doesn't reserve space, causing reflow when image loads. This is the #1 CLS killer in React apps.

**How to avoid:**
```tsx
// BAD - causes layout shift
<Image src="/hero.jpg" alt="Hero" />

// GOOD - reserves space
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority // for above-fold images
/>

// GOOD - for responsive full-width
<Image
  src="/hero.jpg"
  alt="Hero"
  fill
  className="object-cover"
/>
```

- Always provide width/height OR use fill prop
- Use `priority` for above-fold images (hero sections)
- Implement skeleton loaders that match final content height
- Test with slow 3G throttling to catch shifts

**Warning signs:**
- Page "jumps" as images load
- CLS score > 0.1 in PageSpeed Insights
- Content moves down after hero image appears
- Mobile experience feels janky

**Phase to address:**
Phase 2 (Core Features) - When building hero sections and image galleries

**Sources:**
- [Fixing CLS in Next.js - Ankit](https://medium.com/@mohantaankit2002/fixing-cls-cumulative-layout-shift-issues-in-next-js-for-better-core-web-vitals-65e8fbecdd0e)
- [Core Web Vitals Next.js 15 - Excel Nwachukwu](https://trillionclues.medium.com/optimizing-core-web-vitals-with-next-js-15-61564cc51b13)

---

### Pitfall 6: Font Loading Performance Issues

**What goes wrong:**
FOIT (Flash of Invisible Text) or FOUT (Flash of Unstyled Text) ruins user experience. Text disappears or shifts when custom fonts load, causing poor CLS scores.

**Why it happens:**
Developers load Google Fonts via CDN or use custom fonts without next/font optimization. External font requests block rendering and cause layout shifts.

**How to avoid:**
```tsx
// app/layout.tsx
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- Use next/font for ALL fonts (Google or custom)
- Fonts are preloaded at build time - no FOIT/FOUT
- Define fonts in root layout, not per page
- Use CSS variables for flexibility
- Never load fonts from external CDN links

**Warning signs:**
- Text invisible for 1-2 seconds on load
- Font changes after initial render
- External font requests in network tab
- CLS caused by font swap

**Phase to address:**
Phase 1 (Foundation/Setup) - Configure typography system early

**Sources:**
- [OneUpTime Font Loading Issues](https://oneuptime.com/blog/post/2026-01-24-nextjs-font-loading-issues/view)
- [Fonts in Next.js 2026 Guide](https://thelinuxcode.com/fonts-in-nextjs-a-practical-architecture-guide-for-2026/)
- [Next.js Font Optimization - LogRocket](https://blog.logrocket.com/next-js-font-optimization-custom-google-fonts/)

---

### Pitfall 7: Server Action Validation Errors Not Displayed

**What goes wrong:**
Form submits but validation errors disappear. User sees no feedback, assumes form worked, but data wasn't saved. Critical for booking forms and contact forms.

**Why it happens:**
Server Actions return errors, but component doesn't display them. Developers use Server Actions without useActionState hook, losing error state.

**How to avoid:**
```tsx
// Server Action
'use server'
export async function submitBooking(state: FormState, formData: FormData) {
  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Process booking...
}

// Client Component
'use client'
export default function BookingForm() {
  const [state, action, pending] = useActionState(submitBooking, undefined)

  return (
    <form action={action}>
      <input name="email" />
      {state?.errors?.email && <p className="text-red-500">{state.errors.email}</p>}
      <button disabled={pending}>Submit</button>
    </form>
  )
}
```

- Use useActionState for all Server Actions with validation
- Return errors as serializable objects
- Display errors next to form fields
- Show pending state to prevent double submissions

**Warning signs:**
- Form resets but no success/error message
- Validation errors not visible to users
- Data not saved but no feedback shown
- Users report "form doesn't work" but no errors logged

**Phase to address:**
Phase 3 (Integrations) - When implementing booking and contact forms

**Sources:**
- [Next.js 15 Server Actions Guide - Saad Minhas](https://medium.com/@saad.minhas.codes/next-js-15-server-actions-complete-guide-with-real-examples-2026-6320fbfa01c3)
- [Next.js Forms with Server Actions](https://www.robinwieruch.de/next-forms/)

---

### Pitfall 8: Overusing "use client" Directive

**What goes wrong:**
JavaScript bundle explodes to 500KB+. Landing page loads slowly because entire component library ships to client. Performance tanks, especially on mobile.

**Why it happens:**
Developers add "use client" to parent components when only child needs it. Common pattern: mark entire page client-side for one interactive button.

**How to avoid:**
```tsx
// BAD - entire page becomes client component
'use client'
export default function LandingPage() {
  return (
    <div>
      <Hero /> {/* Now client-side */}
      <Features /> {/* Now client-side */}
      <BookingButton /> {/* Needs interactivity */}
    </div>
  )
}

// GOOD - only button is client component
export default function LandingPage() {
  return (
    <div>
      <Hero /> {/* Server Component */}
      <Features /> {/* Server Component */}
      <BookingButton /> {/* Client Component */}
    </div>
  )
}

// components/BookingButton.tsx
'use client'
export function BookingButton() {
  const [open, setOpen] = useState(false)
  return <button onClick={() => setOpen(true)}>Book Now</button>
}
```

- Push "use client" as deep as possible in component tree
- Keep Server Components for static content
- Extract interactive pieces into separate client components
- Analyze bundle with `@next/bundle-analyzer`

**Warning signs:**
- Bundle size > 300KB for landing page
- Slow "Time to Interactive" metrics
- Many components marked "use client"
- Mobile performance poor despite optimization

**Phase to address:**
Phase 2 (Core Features) - During component architecture design

**Sources:**
- [7 Common Performance Mistakes - Daniel Scott](https://medium.com/full-stack-forge/7-common-performance-mistakes-in-next-js-and-how-to-fix-them-edd355e2f9a9)
- [10 Next.js Mistakes - debug_senpai](https://medium.com/@jigsz6391/10-nextjs-mistakes-slowing-your-app-and-how-to-fix-them-fast-e792a4ff5caf)

---

### Pitfall 9: Third-Party Scripts Block Rendering

**What goes wrong:**
Google Analytics, Calendly widget, or chat scripts delay page load by 2-3 seconds. User sees blank page while scripts load.

**Why it happens:**
Developers add script tags directly to HTML or use regular script imports. Scripts load synchronously, blocking rendering.

**How to avoid:**
```tsx
// BAD - blocks rendering
<script src="https://www.googletagmanager.com/gtag/js?id=GA_ID" />

// GOOD - uses Next.js Script with strategy
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XYZ" />
      </body>
    </html>
  )
}

// For Calendly
import Script from 'next/script'

<Script
  src="https://assets.calendly.com/assets/external/widget.js"
  strategy="lazyOnload"
/>
```

- Use `@next/third-parties/google` for GA/GTM
- Use next/script with `strategy="lazyOnload"` for non-critical scripts
- Load analytics after hydration, not during initial render
- Never add scripts directly to head without Script component

**Warning signs:**
- Slow First Contentful Paint (FCP > 2s)
- Network tab shows blocking scripts
- Page blank for several seconds
- Google Analytics delays page load

**Phase to address:**
Phase 3 (Integrations) - When adding analytics and third-party widgets

**Sources:**
- [Next.js Third Parties Guide](https://nextjs.org/docs/app/guides/third-party-libraries)
- [Google Analytics Next.js Setup - Thomas Augot](https://medium.com/@thomasaugot/how-to-set-up-google-analytics-with-google-tag-manager-in-next-js-15-in-2025-dedfcaee875a)

---

### Pitfall 10: Environment Variables Exposed to Client

**What goes wrong:**
API keys, database URLs, or authentication secrets leak to browser. Critical security vulnerability. Anyone can view secrets in browser DevTools.

**Why it happens:**
Developers use NEXT_PUBLIC_ prefix incorrectly or reference server-only variables in client components.

**How to avoid:**
```typescript
// .env.local
DATABASE_URL=postgres://...  // Server only
STRIPE_SECRET_KEY=sk_live_... // Server only
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_... // OK for client

// BAD - exposes secret
'use client'
const apiKey = process.env.STRIPE_SECRET_KEY // Will be undefined or exposed

// GOOD - Server Component
async function getBookings() {
  const db = await connect(process.env.DATABASE_URL) // Server only
  return db.bookings.findMany()
}

// GOOD - Server Action
'use server'
export async function createPayment() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY) // Server only
}
```

- Never use NEXT_PUBLIC_ for secrets
- Only use NEXT_PUBLIC_ for truly public values (analytics IDs, publishable keys)
- Keep API keys and secrets in Server Components or Server Actions
- Use Vercel Environment Variables or AWS Secrets Manager
- Security Update: Upgrade to Next.js 15.0.7+ (fixes secret inlining vulnerability)

**Warning signs:**
- Secrets visible in browser Network tab
- Environment variables undefined in client components
- Build warnings about exposed variables
- Security scanners flag exposed keys

**Phase to address:**
Phase 1 (Foundation/Setup) - Before any API integration

**Sources:**
- [Next.js Security Update Dec 2025](https://nextjs.org/blog/security-update-2025-12-11)
- [Managing Environment Variables - Bale](https://medium.com/@bloodturtle/managing-environment-variables-in-next-js-protecting-sensitive-information-95ba60910d56)
- [Next.js Data Security Guide](https://nextjs.org/docs/app/guides/data-security)

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Skip metadataBase config | Faster local dev | Broken social sharing in prod | Never - takes 2 minutes |
| Load fonts from CDN | Saves build config | FOIT/FOUT, poor CLS | Never - next/font is built-in |
| Mark entire page "use client" | Simpler mental model | 300KB+ bundle size | Never - extract client components |
| Fetch data in useEffect | Familiar pattern | Slower loads, waterfall requests | Never - use Server Components |
| Use external script tags | Quick integration | Blocks rendering, poor performance | Never - use next/script |
| Hard-code URLs instead of env vars | Faster prototyping | Breaks in other environments | MVP only, must fix before launch |
| Skip width/height on images | Less code | Layout shift, poor CLS | Never - causes SEO penalty |
| Cache everything indefinitely | Faster responses | Stale content, user confusion | Only for truly static assets |

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Calendly | Loading widget synchronously | Use next/script with strategy="lazyOnload" |
| Google Analytics | Using standard gtag.js | Use @next/third-parties/google GoogleAnalytics component |
| Stripe | Exposing secret key with NEXT_PUBLIC_ | Use server-only env vars in Server Actions |
| Cloudinary/S3 | Not configuring remotePatterns | Add domains to next.config.js before using |
| i18n (next-intl) | Using Pages Router i18n config | Use middleware + dynamic routes (App Router) |
| CMS (Contentful/Strapi) | Fetching in useEffect | Fetch in Server Components with revalidate |
| Email (Resend/SendGrid) | Client-side API calls | Use Server Actions for email sending |
| Forms (React Hook Form) | Not using useActionState | Combine with Server Actions for validation |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| No image optimization | 1.5MB images, 3s load time | Use next/image with width/height | Immediate - affects all users |
| Blocking third-party scripts | FCP > 2s, blank page | Use next/script with lazyOnload | Immediate - GA/widgets delay render |
| Fetching static data dynamically | Slow initial load | Use App Router with revalidate | 100+ visitors/day notice slowness |
| Over-caching with stale data | Users see old content | Use revalidateTag with 'max' profile | After first content update |
| No font optimization | FOIT, layout shift | Use next/font in root layout | Immediate - poor CLS score |
| Large client bundles | TTI > 5s on mobile | Push "use client" deep, code split | Mobile users (50%+ traffic) |
| Missing loading states | Forms submit twice | Use pending from useActionState | When users get impatient (3s+) |
| No error boundaries | White screen on error | Add error.tsx for route segments | First error in production |

## SEO Mistakes

Domain-specific SEO issues for Next.js landing pages.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Metadata in client components | No SEO tags in HTML | Keep metadata in Server Components |
| Missing metadataBase | Social previews show localhost | Set in root layout with env var |
| No Open Graph images | Poor social sharing CTR | Add opengraph-image.tsx or metadata.openGraph.images |
| Generic titles/descriptions | Low search rankings | Use generateMetadata for dynamic pages |
| Missing canonical URLs | Duplicate content penalty | Set metadata.alternates.canonical |
| No structured data (JSON-LD) | Missing rich snippets | Add schema.org markup for services |
| Blocking JavaScript for content | Search crawlers miss content | Use Server Components for content |
| Slow Core Web Vitals | Google ranking penalty | Fix CLS, LCP, FCP with next/image and next/font |

## UX Pitfalls

Common user experience mistakes in landing pages.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| No loading state on forms | Users submit twice | Show pending with useActionState |
| No error feedback | Users confused why form failed | Display validation errors inline |
| Layout shifts from images | Janky, unprofessional feel | Always set image dimensions |
| Invisible text (FOIT) | Can't read content for 2s | Use next/font with display: 'swap' |
| Slow page transitions | Feels broken, unresponsive | Use loading.tsx for route segments |
| Flash of unstyled content | Unprofessional appearance | Use Tailwind with CSS-in-JS for critical styles |
| Calendly widget blocks page | Users wait to interact | Load with strategy="lazyOnload" |
| No mobile optimization | 50%+ users have poor experience | Test Core Web Vitals on mobile |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Metadata**: Set metadataBase in production env vars - verify with social preview tools
- [ ] **Open Graph**: Test sharing on Facebook, LinkedIn, Twitter - check image displays
- [ ] **Images**: All next/image have width/height OR fill prop - check CLS score
- [ ] **Fonts**: Using next/font, not CDN - verify no FOIT/FOUT in slow 3G
- [ ] **Forms**: Server Actions use useActionState - test validation error display
- [ ] **Environment vars**: No NEXT_PUBLIC_ for secrets - audit .env files
- [ ] **Analytics**: Google Analytics loads after hydration - check Network timing
- [ ] **Third-party scripts**: Using next/script with strategy - verify non-blocking
- [ ] **Caching**: revalidate configured for dynamic content - test content updates
- [ ] **i18n**: Middleware configured for locale routing - test language switching
- [ ] **Remote images**: Domains in remotePatterns - test all external images
- [ ] **Error handling**: error.tsx for route segments - trigger errors to test
- [ ] **Loading states**: loading.tsx for slow routes - test on slow connection
- [ ] **Mobile performance**: CLS < 0.1, LCP < 2.5s - test on real device

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Metadata in client component | LOW | Move metadata to parent Server Component, redeploy |
| Missing metadataBase | LOW | Add to root layout, set env var, redeploy |
| Broken image optimization | MEDIUM | Configure remotePatterns, restart dev server, redeploy |
| Poor CLS from images | MEDIUM | Add width/height to all images, test with Lighthouse |
| Exposed secrets | HIGH | Rotate keys immediately, remove NEXT_PUBLIC_, redeploy |
| Over-cached content | LOW | Call revalidatePath or revalidateTag, wait for regeneration |
| Large bundle size | HIGH | Refactor to push "use client" deep, code split, re-architect |
| Broken i18n routing | HIGH | Refactor from Pages Router config to middleware approach |
| FOIT/FOUT issues | MEDIUM | Migrate to next/font, test font loading |
| Blocking scripts | MEDIUM | Migrate to next/script with lazyOnload strategy |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Metadata in client components | Phase 1: Foundation | Check view-source shows meta tags |
| Missing metadataBase | Phase 1: Foundation | Test social preview on LinkedIn/Twitter |
| Image optimization config | Phase 1: Foundation | Deploy and verify external images load |
| Font loading issues | Phase 1: Foundation | Test on slow 3G, check CLS score |
| Environment variables exposed | Phase 1: Foundation | Audit browser DevTools Network tab |
| Overusing "use client" | Phase 2: Core Features | Analyze bundle with @next/bundle-analyzer |
| Missing image dimensions | Phase 2: Core Features | Run Lighthouse, CLS < 0.1 |
| Caching confusion | Phase 2: Core Features | Update content, verify refresh behavior |
| Server Action validation | Phase 3: Integrations | Submit invalid form, check error display |
| Third-party script blocking | Phase 3: Integrations | Check FCP < 1.8s with scripts loaded |
| Calendly widget performance | Phase 3: Integrations | Test page load with widget present |
| Google Analytics timing | Phase 3: Integrations | Verify GA loads after hydration |
| i18n routing setup | Phase 4: Polish | Test all locale routes work correctly |

## Next.js 15 Specific Gotchas

Version-specific issues unique to Next.js 15.

### Params is Now a Promise (Breaking Change)
```typescript
// Next.js 14
export async function generateMetadata({ params }) {
  const id = params.id // Direct access
}

// Next.js 15 - Must await
export async function generateMetadata({ params }) {
  const { id } = await params // Must await!
}
```

**Impact:** Metadata generation fails silently if params not awaited
**Phase:** Phase 1 (Foundation) - Fix during initial setup

### Caching Defaults Changed
- Fetch requests NOT cached by default (opposite of Next.js 14)
- Must explicitly opt-in to caching with `{ next: { revalidate: 3600 } }`
- Router cache behavior changed - use experimental.staleTimes config

**Impact:** Data may be fetched more often than expected
**Phase:** Phase 2 (Core Features) - When implementing data fetching

### Framer Motion Compatibility
- Framer Motion not yet compatible with React 19 (Next.js 15 default)
- Workaround: Import from "motion/react" instead of "framer-motion"
- Alternative: Use CSS animations or other libraries

**Impact:** Animations may break or require refactoring
**Phase:** Phase 2 (Core Features) - When implementing animations

### i18n Config Removed
- Built-in i18n from Pages Router removed in App Router
- Must use middleware + dynamic routes approach
- Libraries like next-intl required for internationalization

**Impact:** Cannot use old i18n configuration
**Phase:** Phase 4 (Polish) - When implementing multi-language

## Sources

### Performance & Core Web Vitals
- [7 Common Performance Mistakes - Daniel Scott](https://medium.com/full-stack-forge/7-common-performance-mistakes-in-next-js-and-how-to-fix-them-edd355e2f9a9)
- [10 Next.js Mistakes - debug_senpai](https://medium.com/@jigsz6391/10-nextjs-mistakes-slowing-your-app-and-how-to-fix-them-fast-e792a4ff5caf)
- [Fixing CLS in Next.js - Ankit](https://medium.com/@mohantaankit2002/fixing-cls-cumulative-layout-shift-issues-in-next-js-for-better-core-web-vitals-65e8fbecdd0e)
- [Core Web Vitals Next.js 15 - Excel Nwachukwu](https://trillionclues.medium.com/optimizing-core-web-vitals-with-next-js-15-61564cc51b13)

### SEO & Metadata
- [Next.js 15 SEO Guide - Thomas Augot](https://medium.com/@thomasaugot/the-complete-guide-to-seo-optimization-in-next-js-15-1bdb118cffd7)
- [Next.js SEO 2026 - Djamware](https://www.djamware.com/post/697a19b07c935b6bb054313e/next-js-seo-optimization-guide--2026-edition)
- [OG Check Next.js Guide](https://ogcheck.com/blog/nextjs-open-graph)
- [OneUpTime Metadata Errors](https://oneuptime.com/blog/post/2026-01-24-fix-nextjs-metadata-generation-errors/view)

### Image Optimization
- [Next.js Image Optimization Pain - Daggie Blanqx](https://medium.com/@daggieblanqx/the-untold-pain-of-next-js-image-optimization-and-how-to-finally-fix-it-19c792ea4ad9)
- [Optimize Images Next.js 15 - Adhithi Ravichandran](https://adhithiravi.medium.com/speed-matters-optimize-image-performance-in-next-js-15-like-a-pro-de1f1d2270e9)

### Font Optimization
- [OneUpTime Font Loading Issues](https://oneuptime.com/blog/post/2026-01-24-nextjs-font-loading-issues/view)
- [Fonts in Next.js 2026 Guide](https://thelinuxcode.com/fonts-in-nextjs-a-practical-architecture-guide-for-2026/)
- [Next.js Font Optimization - LogRocket](https://blog.logrocket.com/next-js-font-optimization-custom-google-fonts/)

### Caching & Revalidation
- [Next.js 15 Caching - UniqueDevs](https://uniquedevs.com/en/blog/how-does-caching-work-in-next-js-15/)
- [Leapcell Cache Control Guide](https://leapcell.io/blog/mastering-cache-control-and-revalidation-in-next-js-app-router)

### Server Actions & Forms
- [Next.js 15 Server Actions - Saad Minhas](https://medium.com/@saad.minhas.codes/next-js-15-server-actions-complete-guide-with-real-examples-2026-6320fbfa01c3)
- [Next.js Forms with Server Actions](https://www.robinwieruch.de/next-forms/)

### Third-Party Integrations
- [Next.js Third Parties Guide](https://nextjs.org/docs/app/guides/third-party-libraries)
- [Google Analytics Setup - Thomas Augot](https://medium.com/@thomasaugot/how-to-set-up-google-analytics-with-google-tag-manager-in-next-js-15-in-2025-dedfcaee875a)

### Security
- [Next.js Security Update Dec 2025](https://nextjs.org/blog/security-update-2025-12-11)
- [Managing Environment Variables - Bale](https://medium.com/@bloodturtle/managing-environment-variables-in-next-js-protecting-sensitive-information-95ba60910d56)
- [Next.js Data Security Guide](https://nextjs.org/docs/app/guides/data-security)

### i18n
- [Next.js 15 i18n - Thomas Augot](https://medium.com/@thomasaugot/next-js-15-app-router-internationalization-with-url-based-routing-7e49413dc7c1)
- [Next-intl with Next 15 - Tom Pilnaj](https://medium.com/@pilniczek/next-intl-with-next-15-ssg-c374a7241ad8)

### GitHub Issues & Discussions
- [Metadata metadataBase Issue #62984](https://github.com/vercel/next.js/issues/62984)
- [Caching Discussion #54075](https://github.com/vercel/next.js/discussions/54075)
- [Framer Motion Discussion #72228](https://github.com/vercel/next.js/discussions/72228)

---
*Pitfalls research for: Next.js 15 Landing Pages*
*Researched: 2026-02-10*
