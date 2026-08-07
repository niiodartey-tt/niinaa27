# 14 — Debugging Process

## Core Principle

Never fix what you have not diagnosed.
The fix is always the last step — not the first.
Before any code changes, understand what is happening,
where it is happening, and why it is happening.

---

## The 8-Stage Process

### Stage 1 — Reproduce Reliably

A bug you cannot reproduce consistently is a bug you cannot fix confidently.

Before touching any code, answer:
- Can I reproduce this every time?
- What exact steps trigger it?
- Does it happen in development only, preview only, or production?
- Does it happen on all browsers or one specific browser?
- Does it happen on mobile only, desktop only, or both?
- When did it start? What changed before it appeared?

**If you cannot reproduce it reliably — stop.**
Do not attempt a fix. A fix for a bug you cannot reproduce is a guess.

---

### Stage 2 — Isolate the Layer

Work through each layer:

```
UI Layer
  → Visual/styling issue? (layout broken, SVG overflow)
  → Rendering issue? (section not showing, data missing)
  → Interaction issue? (RSVP form not submitting)

Data Layer
  → Is the Sanity data reaching the component?
  → Is the API route returning what you expect?
  → Is the Supabase insert actually succeeding?

Integration Layer
  → Sanity content issue? (draft not published)
  → Supabase RLS issue? (insert blocked by missing policy)
  → Environment variable issue? (undefined in wrong environment)

Build Layer
  → Only happens after build, not in development?
  → TypeScript error caught at build time?
  → Missing dependency or version conflict?

Network Layer
  → CORS issue? (blocked API request)
  → Timeout? (slow connection, partial load)
  → Works locally, fails on Vercel?
```

---

### Stage 3 — Read the Evidence

Collect all available evidence before changing any code:

**Browser DevTools:**
```
Console tab     → errors or warnings? "use client" missing?
Network tab     → /api/rsvp returning 400, 429, or 500?
Elements tab    → is the HTML structure what you expect?
Application tab → are env vars reaching the browser?
```

**Terminal:**
```bash
npm run build       # any build errors?
npx tsc --noEmit    # any TypeScript errors?
npm run lint        # any lint errors?
```

**Vercel Dashboard:**
```
Function logs    → any errors in app/api/rsvp/route.ts?
Build logs       → did the build succeed?
Environment vars → are SUPABASE_URL and SUPABASE_ANON_KEY set?
```

**Supabase Dashboard:**
```
Table editor     → is the rsvp row actually there?
API logs         → is the query reaching Supabase?
Authentication → Policies → is the anon INSERT policy present?
```

**Sanity Studio:**
```
Is the document published? (not saved as draft)
Is the field populated? (not empty)
Does the field name match the GROQ query?
```

---

### Stage 4 — Form a Hypothesis

Based on the evidence, form one specific hypothesis.

```
GOOD hypothesis:
"The RSVP form is silently succeeding client-side but the Supabase row
is not being created. Likely cause: the INSERT policy for the anon role
is missing from the rsvps table in Supabase — RLS is blocking the write."

BAD hypothesis:
"Something is wrong with the RSVP form."
```

A good hypothesis names:
- The specific component or file
- The specific behaviour that is wrong
- The suspected cause

Write it down before testing it. This prevents drift.

---

### Stage 5 — Test the Hypothesis

Test **one thing at a time**.
Never change multiple things simultaneously.

**Testing methods:**
```tsx
// Add a console.log to verify the suspected value
console.log("Supabase error:", error)  // what is the actual error object?
console.log("Body received:", body)    // is the request body what you expect?

// Comment out the suspected code to isolate it
// if (body._honeypot) { return NextResponse.json({ success: true }) }
// Does the insert work if honeypot check is bypassed?

// Replace with simplest possible version
// const result = rsvpSchema.safeParse({ name: "Test", email: "test@test.com", attending: true })
// Does the schema parse correctly?
```

---

### Stage 6 — Apply the Fix

Once the hypothesis is confirmed:

- Apply the **minimal fix** — change only what needs changing
- Never refactor surrounding code during a bug fix
- Never add new features during a bug fix
- Never clean up unrelated code during a bug fix

The fix should be surgical. In and out.

---

### Stage 7 — Verify the Fix

After the fix:

- Reproduce the original steps — confirm bug is gone
- Test related functionality — confirm nothing else broke
- Test on mobile (375px) and desktop (1280px)
- Test in development AND run `npm run build`
- If bug was in production — test on Vercel preview URL
- Check browser console — no new errors introduced
- Check network tab — no new failed requests

---

### Stage 8 — Document It

Every bug that took more than 30 minutes to fix gets documented
in `.claude/project/known-issues.md`:

```markdown
---
BUG:     RSVP form inserts not reaching Supabase in production
CAUSE:   SUPABASE_ANON_KEY was not set in the Vercel Production environment
         (only Development and Preview). The variable resolved to undefined,
         causing the Supabase client to throw on initialisation.
FIX:     Added SUPABASE_ANON_KEY to the Production environment in Vercel dashboard.
PREVENT: When adding new env vars, always set them in all three Vercel
         environments: Development, Preview, and Production.
DATE:    DD/MM/YYYY
SPRINT:  Sprint N
---
```

---

## Claude's Behaviour on Bug Reports

### Claude must NEVER do this
- Immediately suggest a fix without asking questions
- Change multiple files at once during debugging
- Assume the cause without evidence
- Rewrite the component from scratch to avoid debugging

### Claude must ALWAYS do this

**Step 1 — Ask the reproduction questions:**
```
Can you reproduce this consistently?
What exact steps trigger it?
Does it happen in dev, preview, or production?
What do you see in the browser console?
```

**Step 2 — Request the evidence:**
```
Can you share:
- The browser console output
- The network tab output for the /api/rsvp request
- The Vercel function logs if it is a server-side issue
```

**Step 3 — State a hypothesis before fixing:**
```
Based on what you have shared, I believe the issue is:
[specific hypothesis]

I am going to test this by [specific action]
before making any changes.
```

**Step 4 — Propose a surgical fix:**
```
The fix is [specific change] in [specific file].
This change does [X] and should not affect [Y] or [Z].
Shall I proceed?
```

**Step 5 — After fix, state verification steps:**
```
To confirm this is resolved:
1. [Step to reproduce original bug — should not occur now]
2. [Related functionality to verify still works]
3. Check browser console for new errors
```

---

## Common Bugs — Quick Reference

| Symptom | Likely Cause | First Check |
|---|---|---|
| Section invisible on Vercel, fine locally | CSS keyframe animation missing `forwards` | Check `tailwind.config.ts` animation definition |
| Scroll reveal not triggering | `useInView` hook not used, ref not attached | Is `"use client"` present? Is `ref` on the outer element? |
| RSVP form silently fails | API route error, Supabase RLS, wrong env var | Vercel function logs, Supabase dashboard logs |
| RSVP form returns 500 | Supabase INSERT policy missing for anon | Supabase → Authentication → Policies |
| Sanity data not appearing | Content not published | Sanity Studio → is document Published, not Draft? |
| Sanity data stale | ISR not revalidating | Check `export const revalidate = 60` in `app/page.tsx` |
| Works dev, breaks production | Env var missing in Vercel | Vercel dashboard → environment variables |
| TypeScript error only in build | Strict config, `noUncheckedIndexedAccess` | `npx tsc --noEmit` locally |
| SVG overflows at 375px | Fixed `width` attribute on SVG element | Use `className="w-full h-auto"` with `viewBox` |
| Font not loading | Google Fonts link tag instead of `next/font` | Check `app/layout.tsx` — must use `next/font/google` |
| FAQ accordion not animating | Wrong Tailwind classes for `max-height` transition | Check transition-all + duration-300 on the collapsible div |
