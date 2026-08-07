# 13 — Dependency Management

## Core Principle

Claude's training data has a cutoff date. Library versions in training may be
outdated, deprecated, or have known vulnerabilities. Before installing any package,
verify the current version and status at npmjs.com.

---

## Before Installing Any Package

State in the plan:

- Package name and exact purpose
- Version being installed — verified at npmjs.com
- Last publish date — must be within 12 months
- Weekly downloads — signals active community
- Whether it is on the approved library list
- Compatibility with Next.js 14 and current Node.js LTS
- Whether an approved library could do the job instead

If uncertain about the current version:
```
"I am not certain this is the current version.
Please verify at npmjs.com/package/[name] before installing."
```

---

## Approved Libraries — Use Freely

| Category | Package | Notes |
|---|---|---|
| Framework | next | v14 — App Router |
| Language | typescript | Strict mode |
| Styling | tailwindcss | With PostCSS |
| Animation | tailwindcss-animate | Simple UI states only — accordion, modal, toast |
| Scroll | lenis | Smooth scroll provider — initialized via `LenisProvider` in `layout.tsx`. Use `lenis/react` (`ReactLenis` component). Do not add competing scroll libraries. |
| Icons | lucide-react | Only icon library allowed |
| Utilities | clsx | Class merging |
| Utilities | tailwind-merge | Tailwind class deduplication |
| Forms | react-hook-form | RSVP form state management |
| Validation | zod | Schema validation — API route and form |
| Form resolver | @hookform/resolvers | Connects zod to react-hook-form |
| Database | @supabase/supabase-js | Supabase client — RSVP API route only |
| CMS | @sanity/client | Sanity GROQ client — use directly, not via next-sanity (see below) |
| CMS | @sanity/image-url | Sanity image URL builder (minimal use — no photography) |
| Email | resend | RSVP confirmation — Sprint 3 |
| Images | sharp | Image processing (Next.js build dependency) |

---

## Explicitly BANNED Libraries

| Package | Why Banned | Use Instead |
|---|---|---|
| `next-sanity` | **DO NOT INSTALL.** Pulls in `@sanity/ui` → `motion` (framer-motion) as a peer dep, violating the FM ban. Use `@sanity/client` directly for GROQ queries — it provides the same fetch functionality without studio dependencies. If visual editing is ever needed, evaluate separately. | `@sanity/client` |
| `framer-motion` | **PERMANENTLY BANNED.** Causes React 19 hydration failure on Vercel production builds. Elements with `style="opacity:0"` from SSR remain permanently invisible. Click handlers fail to attach. Full documented post-mortem in `.claude/project/known-issues.md`. | CSS transitions + Intersection Observer (`useInView` hook) + Tailwind Animate |
| `motion` | Same package as framer-motion (deduped from `@sanity/ui`). Same ban applies. | Same as above |
| `@studio-freight/lenis` | Deprecated package name for Lenis. Use `lenis` (current package) instead. | `lenis` |
| `react-spring` | Unnecessary given CSS animation approach. Adds bundle weight. | CSS transitions |
| `gsap` | Unnecessary, large bundle. | CSS transitions + Intersection Observer |

---

## Requires Approval Before Installing

Any library not on the approved list must be proposed in the plan phase
and confirmed before installation. State:

1. Package name and purpose
2. Bundle size impact
3. Whether an approved library could do the job instead
4. Last publish date and weekly downloads

---

## Never Install

| Package | Use Instead |
|---|---|
| `moment.js` | `date-fns` (much smaller) or native `Intl.DateTimeFormat` |
| `lodash` | Native JavaScript — this project has no complex data transforms |
| `axios` | Native `fetch` |
| `jquery` | Never |
| `styled-components` | Tailwind CSS |
| `emotion` | Tailwind CSS |
| Multiple icon libraries | `lucide-react` only |
| `react-query` / `tanstack-query` | Unnecessary — SSG + API routes covers all data needs |
| `next-auth` | Not needed — this site has no authentication |

---

## Installation Commands

```bash
# Standard dependency
npm install next-sanity

# Development only tool
npm install --save-dev @types/node

# Exact version pinned (preferred for core dependencies)
npm install --save-exact react-hook-form

# Multiple packages at once
npm install clsx tailwind-merge lucide-react
```

---

## Version Pinning

Pin exact versions for core dependencies to prevent silent breaking changes.

```json
// package.json — exact versions, no ^ or ~
{
  "dependencies": {
    "next": "14.x.x",
    "react": "19.x.x",
    "zod": "3.x.x"
  }
}
```

Install with exact version flag:
```bash
npm install --save-exact zod@3.22.4
```

`package-lock.json` must always be committed to Git.

---

## Node.js Version Management (nvm)

Always manage Node.js via nvm. Never use apt to install Node.js.

```bash
# Install nvm — once per machine (already done)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install latest LTS
nvm install --lts
nvm use --lts
nvm alias default node

# Check versions
nvm list
node --version
npm --version
```

### .nvmrc — per project

```bash
echo "20.x.x" > .nvmrc  # replace with actual LTS version
nvm use  # reads .nvmrc automatically
```

Commit `.nvmrc` to Git. Vercel reads it automatically.

---

## Red Flags — Never Install a Package That Has

- Last publish date over 12 months ago
- Open critical or high severity vulnerabilities (`npm audit`)
- Fewer than 1,000 weekly downloads (unless niche/specific)
- No TypeScript types and no `@types/` package available
- Peer dependency conflicts with Next.js 14 or React 19
- Marked as deprecated on npmjs.com
- README that says "no longer maintained"
- React 18 peer requirement when project uses React 19

---

## Dependency Audit — Per Sprint

Run before every sprint merge to main:

```bash
npm audit
```

Required results before merge:
```
found 0 vulnerabilities ✅ — merge is allowed
found N high severity vulnerabilities ❌ — fix before merging
```

```bash
# Fix automatically where possible
npm audit fix

# If npm audit fix introduces breaking changes
npm audit fix --dry-run  # preview what would change

# If cannot fix automatically
# 1. Check if newer version resolves it
# 2. Evaluate actual risk
# 3. Document in known-issues.md if accepting
# 4. Never merge with critical or high vulnerabilities unresolved
```

---

## Verify Installation Succeeded

After installing any package:

```bash
# Confirm it appears in package.json
cat package.json | grep "package-name"

# Confirm it installed correctly
npm run build

# Confirm no new vulnerabilities introduced
npm audit
```
