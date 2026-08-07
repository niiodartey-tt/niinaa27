# Do Not Touch

> This file lists files and areas that are stable, sensitive, or off-limits.
> Claude must not modify anything listed here without explicit instruction.
> Update this file as the project evolves — add entries when something is finalised.

---

## Core Rule

If a file or folder is listed here:
- Do not modify it during unrelated tasks
- Do not refactor it to "clean it up"
- Do not rename it or move it
- Do not change its exports or API
- Flag it in the plan if a task genuinely requires touching it
- Wait for explicit confirmation before proceeding

---

## Confirmation Protocol

If a task requires touching a do-not-touch file:

1. Flag it clearly in the plan phase
2. State exactly what change is needed and why
3. State what the risk is if it goes wrong
4. Wait for explicit confirmation: "yes", "proceed", "confirmed"
5. Make the minimum change necessary
6. Test thoroughly before merging
7. Update this file if the status changes

**No confirmation = no changes to locked files. Ever.**

---

## Always Off-Limits (Every Sprint)

| File | Reason |
|---|---|
| `.env.local` | Never read, log, or expose env var values |
| `package-lock.json` | Never manually edit — managed by npm |
| `.gitignore` | Only modify if adding a new pattern |
| `next.config.mjs` | Only modify if you understand current settings fully |
| `tsconfig.json` | Only modify with explicit instruction |
| `tailwind.config.ts` | Only add tokens — never remove existing ones |

---

## Project-Specific — Do Not Touch

> Nothing is locked yet — the project has not been built.
> Add entries here as each sprint is reviewed and approved.

### Design Tokens — Lock After Sprint 0 Approval

Once the colour tokens, font variables, and animation utilities in `tailwind.config.ts`
are confirmed working and visually approved, add this entry:

| File | Status | Reason |
|---|---|---|
| `/tailwind.config.ts` | *(add after Sprint 0 approval)* | Design tokens are the source of truth for all colour, typography, and animation across the site — never remove or rename a token |

### Illustration Components — Lock After Sprint 0 Approval

Once each SVG illustration component is visually approved:

| Component | Status | Reason |
|---|---|---|
| `/components/illustrations/FloralCorner.tsx` | *(add after Sprint 0 approval)* | Approved illustration — do not alter shape, stroke weight, or proportions |
| `/components/illustrations/FloralDivider.tsx` | *(add after Sprint 0 approval)* | Approved illustration |
| `/components/illustrations/Monogram.tsx` | *(add after Sprint 0 approval)* | Approved monogram — primary brand mark for this wedding |
| `/components/illustrations/LeafAccent.tsx` | *(add after Sprint 0 approval)* | Approved illustration |

### Sanity Schemas — Do Not Modify Without Confirmation

Once a Sanity schema is deployed and content has been entered, changing field names,
removing fields, or changing field types will break existing content.

| Schema | Status | Risk if changed |
|---|---|---|
| `/sanity/schemas/coupleInfo.ts` | *(lock after Sprint 3 content entry)* | Breaks couple info and wedding date content |
| `/sanity/schemas/storyMilestone.ts` | *(lock after Sprint 3 content entry)* | Breaks Our Story timeline entries |
| `/sanity/schemas/itineraryItem.ts` | *(lock after Sprint 3 content entry)* | Breaks Event Details section |
| `/sanity/schemas/hotel.ts` | *(lock after Sprint 3 content entry)* | Breaks Travel & Stay cards |
| `/sanity/schemas/faqItem.ts` | *(lock after Sprint 3 content entry)* | Breaks FAQ accordion |
| `/sanity/schemas/registryInfo.ts` | *(lock after Sprint 3 content entry)* | Breaks Registry links |

### RSVP API Route — Security-Critical

| File | Status | Reason |
|---|---|---|
| `/app/api/rsvp/route.ts` | Lock after Sprint 2 | Security-critical: honeypot, rate limiting, Zod validation, Supabase insert. Any change could open a vulnerability or break RSVP data integrity. Requires explicit plan and review. |

### Supabase — Do Not Modify Without Confirmation

| Configuration | Location | Risk if changed |
|---|---|---|
| `rsvps` table schema | Supabase dashboard | Column renames break the TypeScript types and API route INSERT |
| RLS policies | Supabase dashboard | Modifying RLS can expose RSVP data to public reads or block legitimate inserts |

---

## In-Progress — Do Not Interfere

> These are being actively worked on in the current sprint.
> Only the assigned task branch should touch these files.

| File / Area | Active task | Sprint |
|---|---|---|
| *(none yet — project not started)* | — | — |

> Clear this section at the end of each sprint once tasks are merged.

---

## How to Keep This File Updated

At the end of every sprint:
1. Move "In-Progress" entries out (either to locked or remove)
2. Add newly approved components to the locked section
3. Add any newly stable config files
