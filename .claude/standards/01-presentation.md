# 01 — How Claude Presents Work

## Rule 1 — Always Plan Before Building

Before writing any code Claude must present a plan containing:

- What is being built — one clear sentence
- Files that will be created or modified — full paths
- Key decisions — why specific approaches are chosen
- Assumptions made — things not specified in the prompt
- Questions — anything unclear that needs confirmation

**Claude waits for explicit confirmation before writing any code.**
"Looks good", "proceed", "yes" = confirmed.
No confirmation = no code written.

---

## Rule 2 — Explanation Standard

Moderate explanation with every component:

- What the component does — one sentence
- Key decisions explained — why this pattern, why this approach
- Any gotchas or things to know
- What to do next — what connects to this component

Do not explain standard Tailwind classes or obvious React patterns.
Only explain non-obvious decisions.

---

## Rule 3 — Multiple File Presentation

State the tier at the start of every multi-file task:

| File Count | Tier | Approach |
|---|---|---|
| 2–3 files | Simple | All files delivered in one response |
| 4–6 files | Medium | File structure first → confirm → one file at a time |
| 7+ files | Complex | Structure first → confirm → deliver by logical group |

**Logical groups for complex tasks:**
- Group 1 → Layout files (layout.tsx, globals.css, page.tsx)
- Group 2 → Section components (HeroSection, OurStorySection)
- Group 3 → UI primitives (Button, Input, Accordion)
- Group 4 → Data layer (Sanity queries, API routes, Supabase client)
- Group 5 → Illustration components (FloralCorner, Monogram, etc.)

Confirm each group before moving to the next.

---

## Rule 4 — Plan Format

Every plan follows this exact structure:

```
---
PLAN: [Task name]

WHAT: [One sentence description]

FILES:
- /components/sections/HeroSection.tsx [CREATE]
- /components/illustrations/FloralCorner.tsx [CREATE]
- /app/page.tsx [MODIFY]

KEY DECISIONS:
- CSS keyframe animation for entrance — not Framer Motion (banned)
- Server component — no interactivity needed in Hero
- FloralCorner uses currentColor so Tailwind text colour classes control SVG fill/stroke

ASSUMPTIONS:
- Hero content hardcoded for now — Sanity integration in Sprint 3
- Using existing colour tokens from tailwind.config.ts

QUESTIONS:
- Should the scroll CTA arrow bounce (Tailwind animate-bounce) or pulse?

Tier: Simple (2 files created, 1 modified) — delivering together on confirmation.
---

Awaiting confirmation to proceed.
```

---

## Rule 5 — Code Format

- Each file clearly labelled with full path before the code block
- File path format: `// components/sections/HeroSection.tsx`
- TypeScript always — no `.js` files in `app/` or `components/`
- Tailwind classes ordered: layout → spacing → typography → colour → border → animation → state
- Comments only on non-obvious logic — never on every line

---

## Rule 6 — After Delivering Code

After every code delivery Claude provides:

```
DELIVERED:
- List of files created or modified with full paths

NEXT STEPS:
- What needs to be done next
- What this connects to in the next task
- Any manual steps needed (installs, env vars, Sanity content entry)

TEST:
- How to verify this works correctly
- What to look for on mobile and desktop
- Any console errors to watch for
```
