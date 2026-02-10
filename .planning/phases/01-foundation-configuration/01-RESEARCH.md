# Phase 1: Foundation & Configuration - Research

**Researched:** 2026-02-10
**Domain:** Next.js 15 + React 19 + TypeScript + Tailwind CSS project setup
**Confidence:** HIGH

## Summary

Phase 1 establishes the critical infrastructure foundation for a Next.js 15 premium landing page. This research covers the complete setup process from project initialization through production deployment, with specific focus on preventing common pitfalls that cause production failures.

The standard approach for 2026 is to use `create-next-app@latest` with the `--yes` flag for recommended defaults, which automatically configures Next.js 15, React 19, TypeScript, Tailwind CSS, ESLint, App Router, and Turbopack. This eliminates manual configuration and ensures compatibility between all tools.

Critical configuration requirements identified:

1. **metadataBase** must be set in root layout to prevent build errors when using relative URLs in metadata
2. **Image optimization** requires explicit `remotePatterns` configuration for external images
3. **Environment variables** need proper scoping (NEXT*PUBLIC* prefix for client-side access)
4. **Vercel deployment** provides automatic Git integration with zero additional configuration

**Primary recommendation:** Use `npx create-next-app@latest project-name --yes` for instant setup with all best practices pre-configured, then add only metadataBase and image remotePatterns configuration.

## Standard Stack

The established libraries/tools for Next.js 15 projects in 2026:

### Core

| Library      | Version                               | Purpose                         | Why Standard                                                |
| ------------ | ------------------------------------- | ------------------------------- | ----------------------------------------------------------- |
| Next.js      | 15.x (latest)                         | React framework with App Router | Industry standard, created by Vercel, best-in-class SSG/SSR |
| React        | 19.x (latest)                         | UI library                      | Required dependency for Next.js 15                          |
| TypeScript   | 5.x (latest)                          | Type safety                     | Recommended by Next.js team, prevents runtime errors        |
| Tailwind CSS | 4.x (latest via @tailwindcss/postcss) | Utility-first CSS               | Official Next.js integration, rapid UI development          |

### Supporting

| Library   | Version                         | Purpose                      | When to Use                                                  |
| --------- | ------------------------------- | ---------------------------- | ------------------------------------------------------------ |
| ESLint    | Latest (via eslint-config-next) | Code quality                 | Auto-included with create-next-app                           |
| Prettier  | Latest + eslint-config-prettier | Code formatting              | For consistent formatting (optional but recommended)         |
| next/font | Built-in                        | Font optimization            | For Google Fonts or local fonts                              |
| @next/env | Built-in                        | Environment variable loading | For loading .env in non-Next.js contexts (e.g., ORM configs) |

### Alternatives Considered

| Instead of   | Could Use                | Tradeoff                                                                            |
| ------------ | ------------------------ | ----------------------------------------------------------------------------------- |
| Tailwind CSS | CSS Modules / styled-jsx | Tailwind faster for landing pages, CSS Modules better for complex design systems    |
| TypeScript   | JavaScript               | TypeScript prevents errors but adds complexity; not recommended for production apps |
| Vercel       | Netlify / Cloudflare     | Vercel has best Next.js support, others require more configuration                  |

**Installation:**

```bash
# Automatic setup with all defaults (RECOMMENDED)
npx create-next-app@latest my-app --yes
cd my-app

# Manual installation (only if you need custom setup)
npm install next@latest react@latest react-dom@latest
npm install -D typescript @types/react @types/node
npm install -D tailwindcss @tailwindcss/postcss autoprefixer
npm install -D eslint eslint-config-next
```

## Architecture Patterns

### Recommended Project Structure (App Router)

```
my-next-app/
├── app/                    # App Router directory (routes + layouts)
│   ├── layout.tsx         # Root layout (REQUIRED - wraps all pages)
│   ├── page.tsx           # Home page (/)
│   ├── globals.css        # Global styles (Tailwind imports)
│   └── [route]/           # Dynamic routes
├── public/                # Static assets (images, fonts, favicon)
├── components/            # Reusable React components
├── lib/                   # Utility functions, helpers
├── .env.local            # Local environment variables (gitignored)
├── .env.production       # Production environment variables (gitignored)
├── next.config.ts        # Next.js configuration (TypeScript)
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.mjs    # PostCSS configuration (for Tailwind)
├── package.json          # Dependencies
└── .gitignore           # Git ignore rules
```

### Pattern 1: Root Layout Configuration

**What:** Root layout is the top-level UI wrapper for all routes, MUST include `<html>` and `<body>` tags
**When to use:** Required for every Next.js App Router project
**Example:**

```typescript
// Source: https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/01-installation.mdx
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://acme.com'), // CRITICAL: Required for relative URLs in metadata
  title: 'My Landing Page',
  description: 'Premium Next.js landing page',
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

### Pattern 2: Metadata Configuration (SEO)

**What:** Export metadata object from layouts/pages for SEO instead of using `<Head>` component
**When to use:** Always in App Router (replaces old `next/head` pattern)
**Example:**

```typescript
// Source: https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/04-functions/generate-metadata.mdx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
  openGraph: {
    title: 'Next.js',
    description: 'The React Framework for the Web',
    url: 'https://nextjs.org',
    siteName: 'Next.js',
    images: [
      {
        url: 'https://nextjs.org/og.png', // Must be absolute URL
        width: 800,
        height: 600,
      },
    ],
  },
}
```

### Pattern 3: Environment Variable Scoping

**What:** Server-only variables (secrets) use standard naming, client-accessible variables use NEXT*PUBLIC* prefix
**When to use:** Always when using environment variables
**Example:**

```bash
# .env.local
DATABASE_URL="postgres://..." # Server-only (never exposed to browser)
NEXT_PUBLIC_API_URL="/api"    # Client-accessible (embedded in bundle)
```

```typescript
// Server Component (can access all env vars)
export default async function ServerComponent() {
  const dbUrl = process.env.DATABASE_URL // ✅ Works
  const apiUrl = process.env.NEXT_PUBLIC_API_URL // ✅ Works
}

// Client Component (only NEXT_PUBLIC_)
;('use client')
export default function ClientComponent() {
  const dbUrl = process.env.DATABASE_URL // ❌ Undefined
  const apiUrl = process.env.NEXT_PUBLIC_API_URL // ✅ Works
}
```

### Pattern 4: Tailwind CSS Integration

**What:** Import Tailwind in globals.css, configure content paths in tailwind.config.js
**When to use:** Always when using Tailwind CSS
**Example:**

```css
/* app/globals.css */
/* Source: https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/11-css.mdx */
@import 'tailwindcss';
```

```javascript
// tailwind.config.js
// Source: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/tailwind-v3-css.mdx
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Pattern 5: Font Optimization with next/font

**What:** Use next/font to self-host Google Fonts with automatic optimization
**When to use:** For any Google Fonts or local custom fonts
**Example:**

```typescript
// Source: https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/13-fonts.mdx
import { Geist } from 'next/font/google'

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body>{children}</body>
    </html>
  )
}
```

### Anti-Patterns to Avoid

- **Don't use `<Head>` from next/head in App Router** - Use metadata exports instead
- **Don't put metadata in Client Components** - Causes build errors; use Server Components or layouts
- **Don't use `getServerSideProps` or `getStaticProps`** - These are Pages Router APIs; use async Server Components instead
- **Don't manually configure Babel or webpack unless necessary** - Next.js 15 uses SWC and Turbopack by default
- **Don't expose secrets with NEXT*PUBLIC* prefix** - Only use for truly public values

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem                      | Don't Build                     | Use Instead                         | Why                                                   |
| ---------------------------- | ------------------------------- | ----------------------------------- | ----------------------------------------------------- |
| Font loading                 | Custom font CSS with @font-face | next/font/google or next/font/local | Automatic optimization, self-hosting, no layout shift |
| Image optimization           | Manual srcset/picture elements  | next/image                          | Automatic WebP/AVIF, lazy loading, responsive images  |
| Environment variable loading | Custom dotenv setup             | Built-in .env support               | Automatic loading, build-time inlining, scoping       |
| CSS preprocessing            | Custom PostCSS config           | Built-in Tailwind/CSS Modules       | Pre-configured, zero config needed                    |
| TypeScript configuration     | Manual tsconfig.json            | create-next-app generated config    | Optimized for Next.js, includes path aliases          |
| ESLint setup                 | Manual eslint rules             | eslint-config-next                  | Next.js-specific rules, React 19 compatibility        |

**Key insight:** Next.js 15 + create-next-app provides 95% of configuration out-of-the-box. Custom solutions introduce maintenance burden and compatibility issues.

## Common Pitfalls

### Pitfall 1: Missing metadataBase Causes Build Errors

**What goes wrong:** Build fails with error "metadata.metadataBase is not set" when using relative URLs in Open Graph images or other metadata
**Why it happens:** Next.js requires absolute URLs for social sharing metadata; relative URLs need a base URL to resolve
**How to avoid:** Always set metadataBase in root layout, even for development
**Warning signs:** Build error mentioning "metadataBase" or "absolute URL required"
**Solution:**

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000',
  ),
}
```

### Pitfall 2: Image Optimization Fails for External Images

**What goes wrong:** Next.js Image component throws error "Invalid src prop" for external images
**Why it happens:** Security feature requires explicit allowlist of external image domains
**How to avoid:** Configure remotePatterns in next.config.ts before using external images
**Warning signs:** Runtime error with "hostname 'example.com' is not configured"
**Solution:**

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        pathname: '/my-bucket/**',
      },
    ],
  },
}
export default nextConfig
```

### Pitfall 3: Environment Variables Not Loading

**What goes wrong:** process.env.VARIABLE is undefined in components
**Why it happens:** Client Components can't access server-only variables; variables not prefixed with NEXT*PUBLIC*
**How to avoid:** Use NEXT*PUBLIC* prefix for client-side variables, keep secrets server-only
**Warning signs:** Undefined environment variables in browser console
**Solution:**

```bash
# .env.local
DATABASE_URL="secret"              # ✅ Server-only
NEXT_PUBLIC_API_URL="/api"        # ✅ Client-accessible
API_KEY="secret"                  # ❌ Not accessible in Client Components
```

### Pitfall 4: .env Files Committed to Git

**What goes wrong:** Secrets exposed in public repository
**Why it happens:** Default .gitignore might be incomplete or files added before .gitignore
**How to avoid:** Verify .gitignore includes .env\* before first commit, check with git status
**Warning signs:** .env.local appears in git status
**Solution:**

```bash
# Verify .gitignore includes:
.env*.local
.env.local
.env.production

# Remove if accidentally committed:
git rm --cached .env.local
git commit -m "Remove .env file from tracking"
```

### Pitfall 5: TypeScript Errors Ignored in Production Build

**What goes wrong:** Production build succeeds despite TypeScript errors
**Why it happens:** ignoreBuildErrors: true set in next.config (dangerous default in some templates)
**How to avoid:** Remove ignoreBuildErrors or set to false, fix TypeScript errors before deploying
**Warning signs:** Build succeeds but IDE shows TypeScript errors
**Solution:**

```typescript
// next.config.ts - Ensure this is NOT set:
const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false, // ✅ Fail builds on TypeScript errors
  },
}
```

### Pitfall 6: Tailwind Not Generating Styles

**What goes wrong:** Tailwind classes have no effect, styles not applied
**Why it happens:** content array in tailwind.config.js doesn't include all component paths
**How to avoid:** Ensure content array includes all directories with components (app/, components/, etc.)
**Warning signs:** Tailwind classes in JSX but no styles in browser
**Solution:**

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // ✅ App Router
    './components/**/*.{js,ts,jsx,tsx,mdx}', // ✅ Components
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // If using Pages Router
  ],
}
```

## Code Examples

Verified patterns from official sources:

### Complete Root Layout with All Best Practices

```typescript
// app/layout.tsx
// Source: Context7 - /vercel/next.js
import './globals.css'
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'), // CRITICAL
  title: {
    default: 'My Landing Page',
    template: '%s | My Landing Page',
  },
  description: 'Premium Next.js 15 landing page',
  openGraph: {
    title: 'My Landing Page',
    description: 'Premium Next.js 15 landing page',
    url: 'https://yourdomain.com',
    siteName: 'My Landing Page',
    images: [
      {
        url: '/og-image.png', // Relative URL (requires metadataBase)
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.className}>
      <body>{children}</body>
    </html>
  )
}
```

### Next.js Configuration with Image and Environment Setup

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.yourservice.com',
        pathname: '/images/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false, // Fail builds on TS errors
  },
}

export default nextConfig
```

### TypeScript Configuration (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Environment Variables Best Practices

```bash
# .env.local (development)
DATABASE_URL="postgresql://localhost:5432/mydb"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# .env.production (production - set in Vercel dashboard)
DATABASE_URL="postgresql://production-host/mydb"
NEXT_PUBLIC_API_URL="https://myapp.com/api"
```

### ESLint + Prettier Configuration

```javascript
// eslint.config.mjs
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier, // Must be last to override formatting rules
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
])

export default eslintConfig
```

### .gitignore for Next.js Projects

```gitignore
# Source: https://github.com/github/gitignore/blob/main/Nextjs.gitignore
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env.local
.env.production

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
```

## State of the Art

| Old Approach                      | Current Approach         | When Changed              | Impact                                                               |
| --------------------------------- | ------------------------ | ------------------------- | -------------------------------------------------------------------- |
| Pages Router                      | App Router               | Next.js 13 (stable in 14) | Server Components default, better performance, simpler data fetching |
| getStaticProps/getServerSideProps | Async Server Components  | Next.js 13                | Cleaner API, less boilerplate, unified pattern                       |
| Webpack                           | Turbopack                | Next.js 15 (default)      | 10x faster local dev, faster production builds                       |
| Manual font loading               | next/font                | Next.js 13                | Automatic optimization, zero layout shift                            |
| pages/\_app.js                    | app/layout.tsx           | Next.js 13                | More flexible layouts, better code organization                      |
| CSS Modules default               | Tailwind CSS recommended | Next.js 13+               | Faster development, smaller bundles with JIT                         |
| Babel                             | SWC                      | Next.js 12                | 5x faster compilation                                                |
| ESLint 8                          | ESLint 9 (flat config)   | Next.js 15                | Simpler configuration, better performance                            |

**Deprecated/outdated:**

- **getStaticProps/getServerSideProps**: Use async Server Components instead
- **pages/\_app.js**: Use app/layout.tsx (App Router)
- **next/head**: Use metadata exports
- **experimental.turbopack**: Now stable, use at top level in next.config.ts (Next.js 16+)
- **serverRuntimeConfig/publicRuntimeConfig**: Removed in Next.js 16, use env vars directly

## Deployment (Vercel)

### Setup Process

1. **Connect Git Repository**: Push Next.js project to GitHub/GitLab/Bitbucket
2. **Import to Vercel**: Visit vercel.com → Import Project → Select repo
3. **Auto-Configuration**: Vercel auto-detects Next.js, no configuration needed
4. **Deploy**: Click Deploy, build completes in ~1 minute
5. **Automatic Deployments**: Every git push triggers new deployment
6. **Preview Deployments**: Every PR gets unique preview URL

### Environment Variables in Vercel

- Set in Vercel Dashboard → Project Settings → Environment Variables
- Separate values for Production, Preview, Development
- VERCEL_URL automatically provided (current deployment URL)
- VERCEL_PROJECT_PRODUCTION_URL automatically provided (production domain)

### Critical Vercel Features

- **Automatic HTTPS**: No configuration needed
- **CDN**: Static assets automatically cached globally
- **Serverless Functions**: API routes become isolated functions
- **Edge Runtime**: Optional for ultra-low latency
- **Analytics**: Built-in Web Vitals tracking

### Production Checklist for Vercel

```bash
# 1. Test production build locally
npm run build
npm run start

# 2. Verify .env.production is NOT committed (in .gitignore)
git status

# 3. Set environment variables in Vercel Dashboard
# DATABASE_URL, API_KEYS, etc.

# 4. Push to main branch
git push origin main

# 5. Verify deployment at Vercel dashboard
# Check build logs, function logs, analytics
```

## Open Questions

Things that couldn't be fully resolved:

1. **Tailwind CSS 4.x vs 3.x**
   - What we know: create-next-app may install v3 or v4 depending on timing
   - What's unclear: Whether v4 is fully stable for production in early 2026
   - Recommendation: Accept whatever version create-next-app installs (both work); v4 uses @tailwindcss/postcss instead of old plugin

2. **Turbopack Stability**
   - What we know: Turbopack is default in Next.js 15 for development
   - What's unclear: Production builds still use webpack or Turbopack in Next.js 15?
   - Recommendation: Use defaults; Turbopack becomes production-ready in Next.js 16

3. **React 19 Breaking Changes**
   - What we know: React 19 is default with Next.js 15
   - What's unclear: Any edge case incompatibilities with third-party libraries
   - Recommendation: Test thoroughly; stick to Next.js official integrations initially

## Verification Steps

### 1. Verify Next.js Runs Locally

```bash
npm run dev
# Expected: Server running at http://localhost:3000
# Visit in browser, should see default Next.js page
```

### 2. Verify TypeScript Compilation

```bash
npm run build
# Expected: Build completes without TypeScript errors
# Check output for "Compiled successfully"
```

### 3. Verify Tailwind Generates Styles

```tsx
// app/page.tsx
export default function Home() {
  return <h1 className="text-4xl font-bold underline">Test Tailwind</h1>
}
// Visit page, inspect element - should see Tailwind classes applied
```

### 4. Verify Environment Variables

```typescript
// Create test page: app/test/page.tsx
export default function TestPage() {
  const publicVar = process.env.NEXT_PUBLIC_TEST
  return <div>Public: {publicVar || 'NOT SET'}</div>
}
// Add NEXT_PUBLIC_TEST="works" to .env.local
// Restart dev server, visit /test, should see "works"
```

### 5. Verify Deployment Works

```bash
# Push to GitHub
git add .
git commit -m "Initial setup"
git push

# Import to Vercel (first time only)
# Visit vercel.com, import repo

# Check deployment
# Visit deployment URL, should see site live
# Check Vercel dashboard for build logs
```

### 6. Verify Metadata Configuration

```bash
# Build should succeed
npm run build

# Check for metadataBase warnings in build output
# If present, add metadataBase to app/layout.tsx
```

## Sources

### Primary (HIGH confidence)

- Context7: /vercel/next.js - Next.js 15 official documentation
  - Installation and setup patterns
  - App Router conventions
  - TypeScript configuration
  - Image optimization
  - Environment variables
  - ESLint and Prettier integration
  - Tailwind CSS setup
  - Metadata API

### Secondary (MEDIUM confidence)

- [Next.js on Vercel](https://vercel.com/frameworks/nextjs) - Deployment best practices
- [Next.js Metadata Guide](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) - metadataBase requirements
- [GitHub Next.js gitignore](https://github.com/github/gitignore/blob/main/Nextjs.gitignore) - Standard ignore patterns

### Tertiary (LOW confidence)

- WebSearch: Vercel deployment 2026 - Auto-deployment features
- WebSearch: Next.js 15 metadataBase - Configuration requirement confirmation
- WebSearch: Next.js gitignore best practices - Security patterns

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - Verified via Context7 official Next.js docs
- Architecture: HIGH - All patterns from official Next.js documentation
- Pitfalls: HIGH - Common issues documented in official Next.js docs and GitHub discussions
- Deployment: MEDIUM - Vercel-specific features verified via Vercel docs and web search

**Research date:** 2026-02-10
**Valid until:** ~60 days (Next.js 15 is stable, major changes unlikely until Next.js 16)

## Notes for Planner

1. **Installation is 1 command**: `npx create-next-app@latest project-name --yes` does 90% of the work
2. **Critical config additions**: Only metadataBase and image remotePatterns need manual setup
3. **Vercel deployment is zero-config**: Just connect Git repo, everything else automatic
4. **Environment variables**: Must be set in Vercel dashboard for production (not in .env files)
5. **TypeScript strict mode**: Already enabled by default in create-next-app
6. **Verification is built-in**: `npm run build` catches most issues before deployment
