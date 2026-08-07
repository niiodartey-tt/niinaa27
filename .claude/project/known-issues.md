# Known Issues

> This file is a living log of bugs discovered, diagnosed, and fixed.
> Every bug that took more than 30 minutes to resolve gets documented here.
> This turns every bug into a permanent improvement to the project standard.
> Claude reads this to avoid repeating the same mistakes.

---

## How to Add an Entry

When a bug is resolved, add an entry using this format:

```markdown
---
BUG:     One sentence describing what the bug was
CAUSE:   What caused it — be specific
FIX:     What resolved it — be specific
PREVENT: Rule or check added to stop it recurring
DATE:    DD/MM/YYYY
SPRINT:  Sprint N
---
```

---

## Active Issues

> Bugs currently being investigated or worked around.

| Issue | Discovered | Status | Notes |
|---|---|---|---|
| None currently | — | — | — |

---

## Resolved Issues

> Document every resolved bug here. Newest first.

---
BUG:     [PRE-LOADED RISK] Framer Motion causes permanent hydration failure
         with React 19 in Next.js App Router production builds on Vercel
CAUSE:   Framer Motion 12.x is deduped from @sanity/ui → motion. In React 19
         concurrent rendering on Vercel production builds, Framer Motion's
         useLayoutEffect never fires correctly. Animated elements baked with
         style="opacity:0" from the SSR pass remain permanently invisible —
         the client does not re-animate them. Click handlers on FM-wrapped
         components also fail to attach, causing full subtree hydration failure.
         Using next/dynamic({ ssr: false }) inside a 'use client' page component
         triggers BailoutToCSR in React 19, which adopts the server DOM without
         a fresh mount lifecycle, compounding the problem.
         Confirmed via Ostendere project (Sprint 1, May 2026) — visible as blank
         sections and a non-interactive page on Vercel preview despite clean
         local dev. curl diagnostic showed BAILOUT_TO_CLIENT_SIDE_RENDERING
         present in server HTML.
FIX:     Framer Motion removed entirely from all public-facing components.
         All entrance animations replaced with CSS keyframe animations defined
         in tailwind.config.ts + globals.css. Scroll-triggered reveals use
         Intersection Observer via a custom useInView hook. This project never
         introduces Framer Motion in the first place.
PREVENT: Framer Motion is BANNED from this project. Do not install it. Do not
         import it. Do not suggest it as an animation approach. If a task
         requires animation, use CSS transitions, CSS keyframes via Tailwind,
         or Intersection Observer. This rule has no exceptions.
         See .claude/standards/04-animation.md and 13-dependencies.md.
DATE:    Inherited risk — documented 07/08/2026 at project start
SPRINT:  Pre-project — inherited from Ostendere Sprint 1
---

---

## Recurring Patterns

> Patterns that have caused multiple bugs — extra vigilance required.

[None yet — add as patterns emerge]

---

## Dependency Issues

> Package-related problems — version conflicts, deprecated APIs, vulnerabilities.

| Package | Version | Issue | Resolution | Date |
|---|---|---|---|---|
| `next-sanity` | 9.12.3 | Pulls in `@sanity/ui` → `motion@12.43.0` → `framer-motion@12.43.0` as transitive deps — violates the FM ban | Replaced with `@sanity/client` (direct) — same GROQ functionality, no studio deps, no motion. Updated 13-dependencies.md. | 07/08/2026 |
| `postcss` (nested in next@14.2.35) | 8.4.31 | 5 high severity CVEs (path traversal in source map auto-loading: GHSA-r28c-9q8g-f849, GHSA-fxqj-rqcc-2cmp). Fix requires next@16, a breaking change. | Accepted for Next.js 14 sprint lifecycle — build-tool only, not a runtime attack surface. We control all CSS files so malicious source maps can't be introduced. Re-evaluate when upgrading Next.js post-launch. | 07/08/2026 |

---

## Environment Issues

> Problems caused by environment configuration — missing vars, wrong values.

| Variable | Environment | Issue | Resolution | Date |
|---|---|---|---|---|
| *(none yet)* | — | — | — | — |

---

## Notes for Future Sprints

> Things that are not bugs but could become problems. Technical debt and open decisions.

- RSVP rate limiting uses in-memory Map — resets on Vercel cold start. Acceptable for
  wedding RSVP traffic volume. If abuse is observed post-launch, migrate to Upstash Redis
  with `@upstash/ratelimit`.
- RSVP anti-spam thresholds (3 submissions per IP per 24 hours) are provisional — review
  with Naa before Sprint 2 implementation. See overview.md open question.
