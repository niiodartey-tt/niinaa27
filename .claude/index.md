# Claude System — Master Index

> This file is your map. It lists every file in the .claude/ system,
> what it contains, when to read it, and when to update it.
> Keep this file in sync if you ever add new standards files.

---

## How the System Works

```
CLAUDE.md                    ← Claude reads this every session
    ↓ references
.claude/standards/           ← Claude reads these when the task requires it
.claude/project/             ← Live project state — updated throughout the build
```

**Standards files are permanent rules.** They apply across every sprint.
They only change if a standard itself evolves (e.g., a new Next.js pattern becomes preferred).

**Project files are live state.** They change with every sprint: new tasks, new files built,
new bugs discovered. Claude updates these after every group automatically.

---

## Root File

| File | Purpose | Updated when |
|---|---|---|
| `CLAUDE.md` | Main briefing file — read every session. Critical rules, project quick reference, design system quick reference, reference map. | Sprint changes, active task changes |

---

## Standards Files — `.claude/standards/`

Permanent rules. Apply to every sprint.

| File | Contains | Claude reads it when... |
|---|---|---|
| `01-presentation.md` | How Claude plans, presents code, and structures responses | Any component or UI task |
| `02-responsive.md` | Mobile-first rules, Tailwind breakpoints, touch targets, test sizes | Layout, spacing, or breakpoint work |
| `03-styling.md` | Tailwind-only rule, cn() utility, class ordering, config tokens | Any styling decision |
| `04-animation.md` | CSS transitions + Intersection Observer only. Tailwind Animate for UI states. Framer Motion BANNED. Reduced-motion handling. | Any animation or transition |
| `05-breaking-points.md` | Common failure patterns for Next.js, Supabase, Sanity, React — defensive rules | Bug or unexpected behaviour |
| `06-components.md` | Folder structure, naming, exports, props, server vs client, 150-line limit, custom hooks | Creating or refactoring components |
| `07-data-fetching.md` | SSG, SSR, client fetching, API routes, Sanity patterns, Supabase patterns | Supabase, Sanity, or API route work |
| `08-accessibility.md` | WCAG 2.1 AA — semantic HTML, headings, alt text, contrast, keyboard nav, ARIA, forms, reduced motion | Any interactive element or form |
| `09-performance.md` | Core Web Vitals, fonts (next/font), SVG weight, dynamic imports, metadata, CLS | Fonts, SVG illustrations, scripts, or speed |
| `10-git.md` | Branch structure, sprint workflow, hotfix workflow, commit messages, sprint checklist, pre-merge sequence | Git commits, merges, or sprint transitions |
| `11-typescript.md` | Strict mode, type vs interface, no any, async return types, Supabase types, Sanity types, env types | TypeScript types or interfaces |
| `12-security.md` | Env var rules, input validation, error handling, rate limiting, Supabase RLS, RSVP form security | API routes, RSVP form, or env vars |
| `13-dependencies.md` | Approved library list, banned libraries (Framer Motion, Lenis), version pinning, audit | Installing any package |
| `14-debugging.md` | 8-stage debugging process, Claude behaviour on bug reports, common bug quick reference | Any bug or unexpected behaviour |
| `15-terminal.md` | All terminal commands — Next.js scaffold, Sanity CLI, Supabase CLI, Vercel CLI, git workflow | Any terminal command needed |
| `17-handoff.md` | Pre-launch checklist, Sanity self-training for site owner, Vercel docs, post-launch support | Pre-launch or owner handoff |

> Note: `16-ghana.md` is not included — no Ghana-specific localisation needed for this project.

---

## Project Files — `.claude/project/`

Live state. Updated throughout the build.

| File | Contains | Updated when |
|---|---|---|
| `overview.md` | Project spec: purpose, tech stack, Sanity schemas, Supabase table, security architecture, project-specific rules | Project kickoff, new integrations |
| `structure.md` | File and folder structure — every directory and key file | Scaffold complete (Sprint 0), new components added |
| `env.md` | All environment variable names, scope (client vs server), and descriptions | New variable added to the project |
| `sprint.md` | Current sprint status, active tasks, sprint history, upcoming sprints, Definition of Done | Start and end of every sprint |
| `do-not-touch.md` | Stable and off-limits files, confirmation protocol | Component completed and approved, new stable file |
| `known-issues.md` | Bug log — BUG/CAUSE/FIX/PREVENT format. Pre-seeded with Framer Motion / React 19 hydration risk. | Bug discovered and resolved |
| `project-setup-checklist.md` | Step-by-step bootstrap process — reference only | Not edited during build |
| `progress.md` | Build diary — Claude updates after every group automatically | After every group in every sprint |

---

## Quick Reference — What to Fill in at Kickoff

```
1. overview.md       → stack, schemas, tables, rules  ✅ (done)
2. structure.md      → fill after Sprint 0 scaffold
3. env.md            → all variable names             ✅ (done)
4. sprint.md         → Sprint 0 setup                 ✅ (done)
5. do-not-touch.md   → initial entries                ✅ (done)
6. CLAUDE.md         → Quick Reference section        ✅ (done)
```

---

## Quick Reference — What to Update Each Sprint

```
sprint.md            → new sprint details, task status, completion
do-not-touch.md      → newly completed/approved components
CLAUDE.md            → current sprint number and active task
progress.md          → automatic after each group
known-issues.md      → bugs resolved during the sprint
```

---

## Adding a New Standards File

If a new recurring standard is identified:

1. Create the file in `.claude/standards/` with the next number
2. Add a row to the Standards Files table in this index
3. Add a row to the Reference Map table in `CLAUDE.md`
4. Document the standard fully — follow the format of existing files

---

## File Count

```
Total files in system:    25
Standards files:          16  (.claude/standards/)
Project template files:    8  (.claude/project/)
Root files:                1  (CLAUDE.md)
This index:                1
```

---

*Nii & Naa Wedding · Personal project · Version 1.0 · August 2026*
