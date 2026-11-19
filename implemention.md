# Portfolio Redesign & Performance Optimization — Implementation Plan

## Phase 1: Baseline Audit (Complete)

### Project Architecture

- **Framework**: React 19 + Vite 8 (SPA with hash-based section routing)
- **Styling**: Tailwind CSS v4 + Custom CSS (Glassmorphism identity)
- **3D**: Three.js (ColorBends shader background)
- **Animation**: Framer Motion (preloader only)
- **Backend**: Firebase (Auth + Firestore for Chat & Contact)
- **Icons**: lucide-react

### Current Bundle (Baseline)

| Asset             | Size            | Gzip          |
| ----------------- | --------------- | ------------- |
| `index.js` (main) | **913.87 KB**   | 257.08 KB     |
| `firebase.js`     | 332.89 KB       | 102.73 KB     |
| `ChatRoom.js`     | 5.30 KB         | 1.97 KB       |
| `index.css`       | 40.39 KB        | 9.76 KB       |
| `ChatRoom.css`    | 6.35 KB         | 1.63 KB       |
| **Total JS**      | **1,252.06 KB** | **361.78 KB** |

### Key Issues Identified

1. **Three.js** ≈ 580 KB in main bundle (~63%) — only used for fullscreen plane + shader
2. **Framer Motion** ≈ 90 KB — only used by preloader
3. **Google Fonts** in `<head>` — render-blocking, loading 5 weights
4. **`@fontsource-variable/geist`** imported but `--font-inter` referenced — dual font loading
5. **ChatRoom** mounts inside Suspense even when Contact section is hidden (`display: none`)
6. **Firestore** `subscribeToMessages` has no `limit()` — downloads entire chat history
7. **Profile image** `loading="lazy"` on LCP image (ProfileCard avatar)
8. **`og:image`** uses relative path `/og_image.jpg`
9. **`position: "relative"`** (quoted string) in ProfileCard.css
10. **`glow-bg`** animation on `.pc-card` rotates `--bgrotate` custom property with no `@property` registration — does nothing visible
11. **`holo-bg`** animation runs continuously on `.pc-shine` even at idle
12. **All sections** mounted simultaneously with `display: none`
13. **`main.content-area`** uses `justify-content: center` with `min-height` — potential CLS source
14. **Keywords meta** tag contains "Unemployed Web Developer"
15. **No `prefers-reduced-motion`** handling for WebGL or animations
16. **17 tool cards** each have `backdrop-filter: blur(16px)`
17. **ColorBends** pointer listener on container div (behind `#persistent-bg pointer-events: none`)
18. **Profile PNG**: 113 KB (reasonable but could use WebP)
19. **Project images**: Already WebP ✓
20. **Tool images**: Already WebP ✓

---

## Phase 2: Low-Risk Performance Improvements

### 2.1 Font System

- [x] Remove Google Fonts `<link>` from index.html
- [x] Keep `@fontsource-variable/geist` (already installed, variable font, Latin optimized)
- [x] Update `--font-inter` to `--font-primary` using Geist
- [x] Add `font-display: swap` and metric-compatible fallback with `size-adjust`
- [x] Preload the Geist Latin woff2 file

### 2.2 Image Optimization

- [x] Profile avatar: `loading="eager"` + `fetchpriority="high"` (LCP image)
- [x] Tool icons: `loading="lazy"` + `decoding="async"`
- [x] Project images: `loading="lazy"` + `decoding="async"`
- [x] Set explicit `width`/`height` on images to prevent CLS

### 2.3 CSS Fixes

- [x] Fix `position: "relative"` → `position: relative` in ProfileCard.css
- [x] Remove unused `glow-bg` animation
- [x] Add `@media (prefers-reduced-motion: reduce)` rules
- [x] Add `@media (hover: none)` to simplify ProfileCard effects on touch

### 2.4 ChatRoom Optimization

- [x] Mount ChatRoom only when Contact section is active
- [x] Add `limit(50)` + `orderBy('createdAt', 'desc')` to Firestore query
- [x] Reverse messages for chronological display

### 2.5 Layout Stability

- [x] Replace `justify-content: center` with stable padding approach on `main.content-area`
- [x] Reserve image dimensions

### 2.6 SEO & Metadata

- [x] Make `og:image` absolute URL
- [x] Remove misleading keywords meta
- [x] Update page title

---

## Phase 3: Visual Redesign

### 3.1 Typography System (Geist-based)

- [x] Establish type scale with CSS custom properties
- [x] Responsive font scaling with `clamp()`

### 3.2 Hero Section Redesign

- [x] Editorial headline: "Building Digital Experiences Through Code."
- [x] Professional description
- [x] Asymmetric layout with ProfileCard
- [x] Primary CTA (Projects) + Secondary CTA (Contact)
- [x] Floating highlight cards (GPA, Internship, HIMTIKA)

### 3.3 Navigation Enhancement

- [x] Refined typography and spacing

### 3.4 Projects Section

- [x] Featured project layout (top 3 larger)
- [x] Variable card sizing
- [x] Improved visual hierarchy

### 3.5 Experience Section

- [x] Clean editorial timeline
- [x] Better typography

### 3.6 Skills/Tools Section

- [x] Categorized layout
- [x] Reduced backdrop-filter usage

### 3.7 Contact Section

- [x] Professional layout
- [x] Maintained chat functionality

---

## Phase 4: Advanced Performance Optimization

### 4.1 Native WebGL (Three.js replacement)

- [x] Lightweight WebGL context
- [x] Preserve GLSL shader exactly
- [x] Limit DPR to 1
- [x] Pause when `document.hidden`
- [x] Respect `prefers-reduced-motion`
- [x] Limit mobile to ~30 FPS
- [x] Handle WebGL context loss
- [x] CSS gradient fallback
- [x] Window-level pointer tracking

### 4.2 Framer Motion → CSS

- [x] CSS-only preloader with matching appearance
- [x] `sessionStorage` check for first-visit-only

### 4.3 ProfileCard CSS Optimization

- [x] Remove unused `glow-bg` animation
- [x] Touch device simplification
- [x] Idle state optimization

### 4.4 Backdrop Filter Reduction

- [x] Preserve on: nav, hero, modals, key highlights
- [x] Replace on: tool cards, project cards, timeline items

### 4.5 Code Splitting

- [x] Lazy-mount ChatRoom when Contact activates
- [x] Separate Three.js (now WebGL) from main bundle

---

## Phase 5: Final Validation (Complete)

- [x] Production build (`npm run build` passed in 1.23s)
- [x] Compare bundle sizes (Main JS reduced from 913.87 KB to 283.44 KB, -69.0%)
- [x] Check for console & lint errors (`npm run lint` passed with 0 errors)
- [x] Verify all sections navigate correctly (SPA hash routing intact)
- [x] Verify ChatRoom functionality (Mounts only on Contact section, query capped at 50 messages)
- [x] Verify preloader behavior (Pure CSS + SVG, sessionStorage first-visit check)
- [x] Verify ColorBends rendering (Native WebGL implementation with 1.0 DPR, window pointer tracking, fallback)
- [x] Verify ProfileCard interactions (Clean relative positioning, glow-bg loop removed, responsive touch support)
- [x] Check responsive layouts (Mobile-first clamp scales, featured project card, filterable tool badges)
- [x] Check reduced-motion behavior (`prefers-reduced-motion` media queries applied to WebGL, cards, and animations)

### Final Bundle Size Comparison
| Asset | Baseline (Phase 1) | Final Optimized | Delta / Reduction |
|---|---|---|---|
| `index.js` (main) | **913.87 KB** (257.08 KB gz) | **283.44 KB** (90.37 KB gz) | **-630.43 KB (-69.0%)** |
| `firebase.js` (lazy) | 332.89 KB (102.73 KB gz) | 333.31 KB (102.82 KB gz) | *Lazy loaded on Contact* |
| `ChatRoom.js` (lazy) | 5.30 KB (1.97 KB gz) | 5.33 KB (1.99 KB gz) | *Lazy loaded on Contact* |
| `index.css` | 41.81 KB (9.92 KB gz) | 44.46 KB (10.49 KB gz) | +2.6 KB (Design tokens & categories) |
| `ChatRoom.css` | 6.35 KB (1.63 KB gz) | 6.35 KB (1.63 KB gz) | Unchanged |
| **Initial JS Load** | **913.87 KB** (257.08 KB gz) | **283.44 KB** (90.37 KB gz) | **-69.0% (-630 KB)** |
| **Modules Bundled** | 499 modules | 90 modules | **-409 modules (-82%)** |
| **Build Time** | 2.33s | 1.23s | **47% faster** |
