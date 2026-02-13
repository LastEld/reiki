# React Bits Integration Doctrine - GSD Strict Core

This doctrine defines the "proper" way to integrate and maintain React Bits components within the Reiki project, ensuring state-of-the-art aesthetics and robust engineering.

## 📦 Registry Configuration

The official registry is configured in `components.json`. To ensure reliable JSON parsing (avoiding HTML-as-JSON errors), always use the explicit registry names or manual extraction for complex animations.

```json
{
  "registries": {
    "@react-bits": "https://reactbits.dev/r/{name}.json"
  }
}
```

## ⚠️ CLI Installation Caveats

### Direct URL Failure
Avoid adding components via direct URL if they return HTML instead of JSON:
`npx shadcn add "https://reactbits.dev/r/split-text.json"` ❌ (Returns HTML 404/Redirect)

### Recommended Pattern
Always use the registry identifier after configuring `components.json`:
`npx shadcn add @react-bits/SpotlightCard-TS-TW --yes` ✅

**Variants:**
- `-TS-TW`: TypeScript + Tailwind (Standard for this project)
- `-JS-TW`: JavaScript + Tailwind
- `-TS-DE`: TypeScript Default

## 🛠️ Implementation Standards

### 1. Component Location
All React Bits components MUST be located in `components/ui/` to maintain atomic design consistency.
- `components/ui/split-text.tsx`
- `components/ui/spotlight-card.tsx`
- `components/ui/galaxy.tsx`
- `components/ui/tilted-card.tsx`

### 2. Client Directive (MANDATORY)
Every React Bits component MUST have `'use client'` as the very first line. React Bits components use hooks (`useRef`, `useEffect`, `useState`) and browser APIs that are incompatible with Next.js Server Components. Without `'use client'`, the build will fail with errors like `createMotionComponent() from the server`.

### 3. Animation Library Standardization
This project uses `framer-motion` as the standard animation library. **Never** import from `motion/react` - always use `framer-motion`:
```typescript
// CORRECT
import { motion, useSpring } from 'framer-motion'

// WRONG - do not use
import { motion, useSpring } from 'motion/react'
```

### 4. Dependency Hardening
React Bits components often depend on external libraries. Ensure these are installed and tracked:
- **GSAP**: `npm install gsap @gsap/react`
- **OGL (for WebGL)**: `npm install ogl`
- **Framer Motion**: `npm install framer-motion`
- **Utility**: `npm install clsx tailwind-merge`

### 5. Progressive Enhancement & Fallbacks
When using premium-enabled animations (like `SplitText`), always implement a robust character-splitting fallback to ensure the UI remains functional for all developers.

```typescript
// Example from split-text.tsx
const chars = content.split('').map((char) => {
  const span = document.createElement('span');
  span.innerText = char === ' ' ? '\u00A0' : char;
  span.style.display = 'inline-block';
  // ...
  return span;
});
```

### 6. Interactive Refinement
Combine multiple React Bits components to create immersive states:
- Use `Galaxy` for ambient backgrounds.
- Wrap critical UI in `SpotlightCard` for magnetic interaction.
- Use `SplitText` for high-impact editorial typography.

## 🚀 AMS & Roadmap Integration
This doctrine is linked to the `reiki-refined` project in AMS. Follow this standard for all new "Elite UI" additions.
