# Phase 2: Static Content & SEO - Research

**Researched:** 2026-02-12
**Domain:** Next.js 15 Static Site Generation, SEO Optimization, Landing Page Architecture
**Confidence:** HIGH

## Summary

This research covers building premium landing pages with Next.js 15 App Router using static site generation (SSG), implementing comprehensive SEO optimization through metadata APIs and structured data, and architecting high-performance, accessible landing page components with Tailwind CSS v4.

Next.js 15's App Router provides a modern SSG approach where Server Components are the default, enabling fast static HTML generation with zero client-side JavaScript for content sections. The Metadata API offers type-safe, hierarchical metadata management through static exports and dynamic `generateMetadata` functions, while JSON-LD structured data is implemented via script tags for search engine optimization. For images, the `next/image` component provides automatic optimization with format conversion (WebP/AVIF), lazy loading, and layout shift prevention.

Landing page architecture in 2026 emphasizes Server Components by default with small "leaf-level" Client Components for interactivity, semantic HTML for accessibility, and performance optimization targeting Core Web Vitals (LCP < 2.5s). Tailwind CSS v4 introduces CSS-first configuration via `@theme` directive, 5-100x faster builds, and zero-config content detection, requiring migration from JavaScript-based config files.

**Primary recommendation:** Build with Server Components by default, use static metadata exports for SEO, implement JSON-LD for LocalBusiness schema, optimize hero images with priority prop, and leverage Tailwind v4's CSS-first configuration for premium UI components.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15+ (16.1.6 current) | Static site generation framework | App Router is production-ready with Server Components, built-in metadata API, automatic image optimization |
| React | 19.2+ | Component framework | Server Components reduce client bundle, automatic optimization with React Compiler |
| Tailwind CSS | 4.x | Utility-first CSS framework | CSS-first config, 5-100x faster builds, zero-config content detection, modern CSS features |
| TypeScript | 5.x | Type safety | Effectively standard for Next.js in 2026, improves maintainability and refactoring confidence |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| schema-dts | latest | TypeScript types for JSON-LD | Type-safe structured data implementation |
| next/image | Built-in | Image optimization | All images - automatic WebP/AVIF, lazy loading, layout shift prevention |
| next/og | Built-in | Dynamic OG image generation | Generated social preview images (ImageResponse constructor) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Static metadata | generateMetadata | Only use dynamic when content depends on route params or external data |
| File-based OG images | ImageResponse | Use static files for simple branding, ImageResponse for dynamic per-page previews |
| Tailwind CSS | CSS Modules | Tailwind provides faster development, component libraries, and design consistency |

**Installation:**
```bash
# Core already installed from Phase 1
# Supporting packages (if using TypeScript types for JSON-LD)
npm install -D schema-dts
```

## Architecture Patterns

### Recommended Project Structure
```
app/
├── layout.tsx           # Root layout with metadata
├── page.tsx            # Home page (Server Component)
├── opengraph-image.tsx # Dynamic OG image generation
├── robots.txt          # SEO crawling rules
├── sitemap.ts          # Sitemap generation
└── _components/        # Landing page components
    ├── Hero.tsx        # Hero section (Server Component)
    ├── AboutSection.tsx
    ├── BenefitsSection.tsx
    ├── PricingSection.tsx
    └── CTAButton.tsx   # Interactive button (Client Component)
public/
├── images/             # Static images
│   ├── hero-bg.jpg
│   └── practitioner.jpg
└── favicon.ico
```

### Pattern 1: Static Metadata for SEO
**What:** Export static `metadata` object from `layout.tsx` or `page.tsx` for SEO tags
**When to use:** Content known at build time (landing pages, marketing pages)
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reiki Healing Services | Find Balance and Inner Peace',
  description: 'Professional Reiki healing sessions in [location]. Experience energy healing, stress relief, and holistic wellness with certified practitioner.',
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000'
  ),
  openGraph: {
    title: 'Reiki Healing Services',
    description: 'Professional Reiki healing sessions...',
    images: ['/opengraph-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reiki Healing Services',
    description: 'Professional Reiki healing sessions...',
    images: ['/opengraph-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### Pattern 2: JSON-LD Structured Data
**What:** Embed JSON-LD schema in page components for search engine understanding
**When to use:** All pages - especially LocalBusiness for service-based landing pages
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/guides/json-ld
export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Reiki Healing Practice',
    description: 'Professional Reiki healing and energy work services',
    image: 'https://example.com/images/practitioner.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Wellness Ave',
      addressLocality: 'City',
      addressRegion: 'State',
      postalCode: '12345',
    },
    telephone: '+1-555-123-4567',
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-18:00',
  }

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      {/* Page content */}
    </section>
  )
}
```

### Pattern 3: Optimized Image Loading
**What:** Use `next/image` with priority for LCP images, lazy load below fold
**When to use:** All images - critical for Core Web Vitals
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/getting-started/images
import Image from 'next/image'

// Hero image (above fold, LCP candidate)
<Image
  src="/images/hero-bg.jpg"
  alt="Peaceful healing environment"
  width={1920}
  height={1080}
  priority
  className="object-cover"
/>

// Below-fold images (lazy loaded by default)
<Image
  src="/images/practitioner.jpg"
  alt="Certified Reiki practitioner"
  width={400}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Pattern 4: Server Component First Architecture
**What:** Build pages with Server Components by default, use Client Components only for interactivity
**When to use:** All landing page sections except interactive elements (forms, buttons with client state)
**Example:**
```typescript
// app/page.tsx - Server Component (default)
import { CTAButton } from './_components/CTAButton'

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <BenefitsSection />
      <PricingSection />
    </>
  )
}

// app/_components/CTAButton.tsx - Client Component (interactive)
'use client'

export function CTAButton() {
  return (
    <button onClick={() => {/* client interaction */}}>
      Schedule Consultation
    </button>
  )
}
```

### Pattern 5: Tailwind CSS v4 Configuration
**What:** Use CSS-first configuration with @theme directive instead of JavaScript config
**When to use:** All Tailwind v4 projects
**Example:**
```css
/* app/globals.css */
/* Source: https://tailwindcss.com/docs/upgrade-guide */
@import "tailwindcss";

@theme {
  --color-primary-50: oklch(0.97 0.01 250);
  --color-primary-500: oklch(0.55 0.2 250);
  --color-primary-900: oklch(0.3 0.15 250);

  --font-sans: 'Inter', system-ui, sans-serif;
  --font-serif: 'Merriweather', serif;

  --breakpoint-3xl: 1920px;
}
```

### Anti-Patterns to Avoid
- **Using 'use client' on page.tsx:** Page should be Server Component, only leaf interactive elements need 'use client'
- **Creating Route Handlers for Server Components:** Call async functions directly in Server Components, no need for API routes
- **Not specifying image dimensions:** Always provide width/height or use fill prop to prevent layout shift
- **Multiple priority images:** Only mark one above-fold LCP candidate as priority, others compete for bandwidth
- **Ignoring metadataBase:** Required for absolute URLs in social preview images, use VERCEL_PROJECT_PRODUCTION_URL
- **Using @tailwind directives in v4:** Use @import "tailwindcss" instead of @tailwind base/components/utilities

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Custom <img> with srcset | next/image component | Automatic format conversion, lazy loading, blur placeholders, layout shift prevention |
| Social preview images | Manual image creation | File-based opengraph-image.jpg or ImageResponse | Next.js auto-generates tags, ImageResponse creates dynamic previews from JSX |
| SEO metadata | Manual <Head> tags | Metadata API (static export or generateMetadata) | Type-safe, hierarchical, automatically deduped, crawler-optimized |
| Lazy loading | Intersection Observer | next/image default behavior | Native browser lazy loading, faster than JS solution, no hydration cost |
| Responsive images | Multiple <source> tags | next/image with sizes prop | Automatic srcset generation, optimal format selection per browser |
| JSON-LD sanitization | Custom string escaping | .replace(/</g, '\\u003c') pattern | Prevents XSS via JSON-LD injection, official Next.js recommendation |

**Key insight:** Next.js provides production-ready, performance-optimized solutions for common landing page needs. Custom implementations miss edge cases (security, browser compatibility, Core Web Vitals optimization) that framework solutions handle automatically.

## Common Pitfalls

### Pitfall 1: Server Component Confusion
**What goes wrong:** Adding 'use client' to components that don't need client-side interactivity, bloating JavaScript bundle
**Why it happens:** Developers assume all components need 'use client' or encounter errors when mixing server/client code
**How to avoid:** Default to Server Components, only add 'use client' to leaf components with event handlers, hooks, or browser APIs
**Warning signs:** Large client bundle size, hydration errors, "window is not defined" errors

### Pitfall 2: Metadata Streaming Breaking Bot Crawlers
**What goes wrong:** Social media crawlers (Twitter, Slack) receive HTML before metadata resolves, showing broken previews
**Why it happens:** Next.js 15 streams metadata separately for dynamic pages, but some bots don't wait
**How to avoid:** Use static metadata exports for landing pages (not generateMetadata), or configure `htmlLimitedBots` in next.config.js
**Warning signs:** Social preview shows generic metadata instead of page-specific content

### Pitfall 3: Missing Image Dimensions Causing Layout Shift
**What goes wrong:** Images load and cause content to jump (poor CLS score), hurting Core Web Vitals
**Why it happens:** Forgetting width/height props on remote images or not using fill for responsive layouts
**How to avoid:** Always specify width/height for static-sized images, use fill prop + parent container sizing for responsive images
**Warning signs:** Content jumping during page load, poor Cumulative Layout Shift (CLS) score

### Pitfall 4: Over-Using priority Prop
**What goes wrong:** Multiple images marked priority compete for bandwidth, actually worsening LCP
**Why it happens:** Developers mark several images as "important" without understanding browser prioritization
**How to avoid:** Only mark the single LCP candidate (usually hero background) as priority, let others lazy load
**Warning signs:** Slower initial page load despite image optimization, poor LCP scores

### Pitfall 5: JSON-LD XSS Vulnerability
**What goes wrong:** User-generated content in JSON-LD creates XSS attack vector via unescaped HTML
**Why it happens:** Using JSON.stringify without sanitizing < character
**How to avoid:** Always use .replace(/</g, '\\u003c') when stringifying JSON-LD
**Warning signs:** HTML tags appearing in structured data, failed security audits

### Pitfall 6: Tailwind v4 Migration Breaking Builds
**What goes wrong:** Build fails after upgrading to Tailwind v4 with "unknown at-rule" errors
**Why it happens:** Using v3 syntax (@tailwind directives, tailwind.config.js) with v4
**How to avoid:** Replace @tailwind with @import "tailwindcss", migrate config to @theme in CSS, use official upgrade tool
**Warning signs:** CSS compilation errors, "cannot find tailwindcss/plugin" errors

### Pitfall 7: Redirect in Try-Catch Blocks
**What goes wrong:** redirect() function doesn't work inside try/catch, causes TypeScript errors
**Why it happens:** redirect() uses TypeScript never type and throws internally, but gets caught by try/catch
**How to avoid:** Never wrap redirect() calls in try/catch, let Next.js handle the flow control
**Warning signs:** Redirects not working, TypeScript "unreachable code" warnings

## Code Examples

Verified patterns from official sources:

### Complete Landing Page Structure
```typescript
// app/page.tsx
// Source: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
import type { Metadata } from 'next'
import Image from 'next/image'
import { CTAButton } from './_components/CTAButton'

export const metadata: Metadata = {
  title: 'Find Balance and Inner Peace Through Reiki Healing',
  description: 'Professional Reiki healing sessions with certified practitioner. Experience energy healing, stress relief, and holistic wellness.',
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000'
  ),
  openGraph: {
    title: 'Reiki Healing Services',
    description: 'Professional Reiki healing sessions...',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Reiki Healing Services',
      },
    ],
  },
}

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Reiki Healing Practice',
    description: 'Professional Reiki healing and energy work',
    image: 'https://example.com/images/practitioner.jpg',
    telephone: '+1-555-123-4567',
    priceRange: '$$',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <section className="relative h-screen">
        <Image
          src="/images/hero-bg.jpg"
          alt="Peaceful healing environment"
          fill
          priority
          className="object-cover"
        />
        <div className="relative z-10 flex h-full items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold text-white mb-6">
              Find Balance and Inner Peace Through Reiki Healing
            </h1>
            <p className="text-xl text-white mb-8">
              Professional energy healing sessions for stress relief and wellness
            </p>
            <CTAButton />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">About Reiki</h2>
          {/* Content sections */}
        </div>
      </section>
    </>
  )
}
```

### Client Component Button
```typescript
// app/_components/CTAButton.tsx
'use client'

export function CTAButton() {
  const handleClick = () => {
    // Client-side interaction
    window.scrollTo({ top: document.getElementById('pricing')?.offsetTop, behavior: 'smooth' })
  }

  return (
    <button
      onClick={handleClick}
      className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
    >
      Schedule Consultation
    </button>
  )
}
```

### Tailwind v4 Global Styles
```css
/* app/globals.css */
/* Source: https://tailwindcss.com/docs/upgrade-guide */
@import "tailwindcss";

@theme {
  /* Colors */
  --color-primary-50: oklch(0.98 0.01 220);
  --color-primary-100: oklch(0.95 0.03 220);
  --color-primary-500: oklch(0.55 0.18 220);
  --color-primary-600: oklch(0.48 0.16 220);
  --color-primary-900: oklch(0.28 0.1 220);

  --color-neutral-50: oklch(0.99 0 0);
  --color-neutral-100: oklch(0.96 0 0);
  --color-neutral-800: oklch(0.35 0 0);
  --color-neutral-900: oklch(0.25 0 0);

  /* Typography */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-serif: 'Merriweather', Georgia, serif;

  /* Spacing */
  --spacing-section: 5rem;

  /* Breakpoints */
  --breakpoint-3xl: 1920px;
}

/* Custom utilities */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pages Router | App Router with Server Components | Next.js 13 (stable in 14-15) | Server Components reduce client bundle, faster initial loads, better SEO |
| Head component | Metadata API (static/dynamic) | Next.js 13 App Router | Type-safe, hierarchical, automatic deduplication, crawler-optimized streaming |
| getStaticProps | Direct async Server Components | Next.js 13 App Router | Simpler code, no separate data fetching function needed |
| @tailwind directives | @import "tailwindcss" + @theme | Tailwind CSS v4 | CSS-first config, 5-100x faster builds, zero-config content detection |
| tailwind.config.js | CSS @theme directive | Tailwind CSS v4 | No JS config, easier version control, better IDE support |
| priority prop | priority (but careful usage) | Next.js 13+ | Same API, but guidance emphasizes only one priority image per page |
| WebP focus | AVIF as primary format | 2025-2026 | Better compression than WebP, Next.js auto-serves based on browser support |

**Deprecated/outdated:**
- **Pages Router metadata:** Use App Router Metadata API, not next-seo library or manual Head tags
- **@tailwind directives in v4:** Replace with @import "tailwindcss" for Tailwind CSS v4
- **tailwind.config.js in v4:** Migrate to @theme directive in CSS files
- **getStaticProps/getServerSideProps:** Use Server Components directly in App Router
- **Route Handlers for data fetching in Server Components:** Call functions directly, no API route needed

## Open Questions

Things that couldn't be fully resolved:

1. **Optimal hero background format (video vs. static image)**
   - What we know: Video creates impact but affects LCP; static images with priority optimize for Core Web Vitals
   - What's unclear: Exact performance threshold where video becomes problematic for given hosting/CDN
   - Recommendation: Start with high-quality static image with priority for optimal LCP, defer video exploration to later phase if needed

2. **Pricing tier structure for conversion optimization**
   - What we know: 2-4 tiers standard, highlighting "best value" option improves conversions
   - What's unclear: Specific pricing model for Reiki services (per-session, packages, membership)
   - Recommendation: Research requires user context about service offerings, defer to planning phase with conversion best practices

3. **Scientific disclaimer placement strategy**
   - What we know: Legal requirement for alternative healing practices
   - What's unclear: Optimal placement balancing compliance with user experience (footer vs. near claims vs. dedicated page)
   - Recommendation: Consult legal requirements for jurisdiction, common pattern is footer link to dedicated disclaimer page

## Sources

### Primary (HIGH confidence)
- Next.js Official Documentation (v16.1.6, 2026-02-11):
  - Metadata and OG images: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
  - JSON-LD guide: https://nextjs.org/docs/app/guides/json-ld
  - Image optimization: https://nextjs.org/docs/app/getting-started/images
- Tailwind CSS Official Documentation:
  - Upgrade guide (v3 to v4): https://tailwindcss.com/docs/upgrade-guide
  - Hero sections (Tailwind UI): https://tailwindcss.com/plus/ui/blocks/marketing/sections/heroes
- Vercel Official Blog:
  - Common Next.js App Router mistakes: https://vercel.com/blog/common-mistakes-with-the-next-js-app-router-and-how-to-fix-them

### Secondary (MEDIUM confidence)
- Next.js SEO Guide 2026: https://www.digitalapplied.com/blog/nextjs-seo-guide
- Next.js App Router Pitfalls (2026-02-11): https://imidef.com/en/2026-02-11-app-router-pitfalls
- Tailwind v4 vs v3 comparison: https://staticmania.com/blog/tailwind-v4-vs-v3-comparison
- Next.js Image Component Performance: https://pagepro.co/blog/nextjs-image-component-performance-cwv/
- Core Web Vitals Real Fixes: https://rise.co/blog/core-web-vitals-for-react-next.js-sites-real-fixes-that-cut-lcp-by-50percent
- React & Next.js Best Practices 2026: https://fabwebstudio.com/blog/react-nextjs-best-practices-2026-performance-scale

### Tertiary (LOW confidence)
- Landing page conversion patterns: https://www.thethunderclap.com/blog/how-to-design-high-converting-landing-page
- Landing page layouts 2026: https://me-page.com/blog/design-and-templates/top-landing-page-layouts-that-convert-in-2026
- Semantic HTML accessibility: https://medium.com/@matt.dawkins/hero-sections-accessible-semantic-and-performant-c04502e16f40

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official Next.js and Tailwind documentation, current versions verified
- Architecture: HIGH - Official Next.js patterns, Vercel engineering blog, documented API patterns
- Pitfalls: HIGH - Official Vercel blog post on common mistakes, recent 2026 documentation on App Router gotchas
- Image optimization: HIGH - Official Next.js image documentation and component API
- SEO/Metadata: HIGH - Official Next.js metadata API and JSON-LD guide
- Tailwind v4: MEDIUM - Official upgrade guide verified, but v4 is recent (some ecosystem adapting)
- Conversion optimization: LOW - Community best practices, not framework-specific

**Research date:** 2026-02-12
**Valid until:** 2026-03-12 (30 days - stable ecosystem, but monitor Next.js/Tailwind updates)
