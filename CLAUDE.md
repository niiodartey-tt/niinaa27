# CLAUDE.md — Nii & Naa Wedding Invitation

> **Read this file fully before touching any code.**
> State the project, current sprint, and active task before writing anything.
> If any rule here conflicts with a request — this file wins.

---

## Session Opening

Before every session state:
1. What project this is
2. Current sprint and active task
3. Any constraints relevant to today's work

---

## Critical Rules — Always Apply Without Reading Reference Files

These apply to every task, every session. No exceptions.

- Mobile-first always — Tailwind breakpoints on every component
- Tailwind CSS only — no inline styles except dynamic runtime values
- Named exports only — except Next.js `page.tsx` and `layout.tsx`
- `"use client"` on any component using hooks or event handlers
- Never fetch data in client components for initial page render
- **NO Framer Motion — ever.** It is permanently banned. See `.claude/project/known-issues.md`
- **Lenis is the scroll provider** — `LenisProvider` in `layout.tsx`. Do not add competing scroll libraries or re-add `scroll-behavior: smooth` to CSS
- **NO `next/image` for photography** — there is no photography on this site
- **NO scroll-snap** — single natural scroll, no forced snap points
- **NO SVG from external files for design illustrations** — build all decorative SVGs in code as React components
- Every Supabase query destructures `{ data, error }`
- `SUPABASE_URL` and `SUPABASE_ANON_KEY` are public — `RESEND_API_KEY` is server-only ever
- Always handle loading, error, and empty states on every fetch
- One component per file — maximum 150 lines
- Every `.map()` has a unique `key` — never use array index
- Run `npm run lint && npx tsc --noEmit && npm run build && npm audit` before every sprint merge
- After every group update `.claude/project/progress.md` automatically
- After each group passes TypeScript check, commit and push to the current sprint branch automatically

---

## Project Quick Reference

**Project:** Nii & Naa Wedding Invitation
**Type:** Personal project — single scrolling invitation website
**Domain:** TBD — deployed on Vercel
**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Sanity CMS · Supabase (RSVP) · Resend (stubbed)
**Current sprint:** Sprint 3 — Sanity/Supabase Wiring + Polish + SEO
**Active task:** (none yet — awaiting Sprint 3 start)

→ Full details: `.claude/project/overview.md`
→ File structure: `.claude/project/structure.md`
→ Environment variables: `.claude/project/env.md`
→ Sprint status: `.claude/project/sprint.md`
→ Build progress log: `.claude/project/progress.md`
→ Do not touch: `.claude/project/do-not-touch.md`
→ Known issues: `.claude/project/known-issues.md`

---

## Reference Map — Read When the Task Requires It

| Task involves | Read this file |
|---|---|
| Any component or UI work | `.claude/standards/01-presentation.md` |
| Layout, spacing, breakpoints | `.claude/standards/02-responsive.md` |
| Tailwind, styling decisions | `.claude/standards/03-styling.md` |
| Any animation or transition | `.claude/standards/04-animation.md` |
| Known error patterns, bugs | `.claude/standards/05-breaking-points.md` |
| Creating or refactoring components | `.claude/standards/06-components.md` |
| Supabase, Sanity, API routes | `.claude/standards/07-data-fetching.md` |
| Any interactive element | `.claude/standards/08-accessibility.md` |
| Fonts, SVG weight, Core Web Vitals | `.claude/standards/09-performance.md` |
| Git, commits, sprint merges | `.claude/standards/10-git.md` |
| TypeScript types, interfaces | `.claude/standards/11-typescript.md` |
| API routes, RSVP form, env vars | `.claude/standards/12-security.md` |
| Installing any package | `.claude/standards/13-dependencies.md` |
| Debugging any bug | `.claude/standards/14-debugging.md` |
| Any terminal command | `.claude/standards/15-terminal.md` |
| Pre-launch or site owner handoff | `.claude/standards/17-handoff.md` |

---

## Design System Quick Reference

**Colours (Tailwind token → hex):**
| Token | Hex | Use |
|---|---|---|
| `ivory` | `#FBF9F4` | Background |
| `blush` | `#F0DCD0` | Section fills, cards |
| `rose` | `#B56A52` | Primary accent, CTA buttons |
| `rose-dark` | `#8A4E3C` | Hover, dark accents |
| `ink` | `#3A2A22` | Body text, headings |
| `taupe` | `#8A7267` | Secondary text, labels |
| `hairline` | `#E4DFD3` | Borders, dividers |

**Fonts:**
- `Dancing Script` — script accent, couple's names only
- `Cormorant Garamond` — body text, headers
- `Inter` — UI labels, form elements

**Shape:**
- Card radius: 24–28px (`rounded-3xl` / `rounded-[28px]`)
- Pill buttons: `rounded-full`
- Icon chips: `rounded-full` (circular)

**No photography anywhere.** All visuals are custom SVG illustrations built as React components.

---

*Nii & Naa · Personal project · Version 1.0 · August 2026*
