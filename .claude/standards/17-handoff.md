# 17 — Pre-Launch & Site Owner Handoff

## Core Principle

The site is not ready to launch when the last feature is built.
It is ready when the code is clean, content is live, and Naa can
manage it confidently after launch. This checklist covers both.

---

## Pre-Launch Checklist

Work through every item before marking the site as live.

### Code Quality
- [ ] `npm run lint` passes — zero errors
- [ ] `npx tsc --noEmit` passes — zero TypeScript errors
- [ ] `npm run build` passes — clean production build
- [ ] `npm audit` — zero critical or high vulnerabilities
- [ ] No `console.log` statements left in code
- [ ] No commented-out code blocks
- [ ] No TODO comments without a sprint reference (except the Resend stub if deferred)
- [ ] No placeholder content anywhere — lorem ipsum, placeholder URLs

### Content
- [ ] All couple info entered in Sanity — names, date, location
- [ ] All story milestones entered and published in Sanity
- [ ] Event details confirmed (ceremony and reception venues, times, addresses)
- [ ] Hotel recommendations confirmed and entered in Sanity
- [ ] FAQ entries written and published in Sanity
- [ ] Registry links confirmed and entered in Sanity
- [ ] All text reviewed and approved — no typos
- [ ] RSVP form tested end-to-end — submission reaches Supabase table
- [ ] RSVP confirmation email tested (if Resend implemented in Sprint 3)

### Links and Navigation
- [ ] All section anchor links working — Hero CTA → RSVP, etc.
- [ ] All external links working — registry links, hotel booking links
- [ ] No `href="#"` remaining in production
- [ ] "Back to top" or footer monogram links work if present

### Performance
- [ ] pagespeed.web.dev — all scores green on Vercel production URL
- [ ] LCP under 2.5 seconds on mobile
- [ ] CLS under 0.1
- [ ] INP under 200ms
- [ ] Fonts loaded via `next/font` — no external Google Fonts request
- [ ] SVG illustrations under 20 path elements each
- [ ] RSVPSection dynamically imported
- [ ] Total page weight under 500KB (very achievable with no photography)

### Accessibility
- [ ] Skip navigation link present in root layout
- [ ] One `<h1>` (Hero heading) — correct heading hierarchy throughout
- [ ] All decorative SVGs have `aria-hidden="true"`
- [ ] All RSVP form inputs have associated labels
- [ ] All icon-only buttons have `aria-label`
- [ ] Keyboard navigation tested — all elements reachable
- [ ] Focus indicators visible on all interactive elements
- [ ] Colour contrast verified on all text combinations
- [ ] CSS animations respect `prefers-reduced-motion`
- [ ] RSVP form announces success/error via `aria-live` region

### Mobile and Cross-Browser
- [ ] Tested on real mobile device — not just DevTools
- [ ] Tested at 375px (iPhone SE)
- [ ] Tested at 390px (iPhone 14)
- [ ] Tested at 768px (iPad)
- [ ] Tested at 1280px (Desktop)
- [ ] No horizontal scrolling at any screen size
- [ ] RSVP form usable on mobile — all inputs 44px minimum
- [ ] SVG illustrations scale correctly at all sizes
- [ ] Section animations work correctly on mobile

### SEO and Metadata
- [ ] Title tag: "Nii & Naa — Wedding Invitation" (or agreed title)
- [ ] Description meta tag with wedding date and brief invite copy
- [ ] Open Graph metadata set
- [ ] OG image created and uploaded (1200x630px)
- [ ] Twitter card metadata set

### Security
- [ ] `RESEND_API_KEY` not in any client component or bundle
- [ ] `SUPABASE_ANON_KEY` not in any client component (only in API route)
- [ ] RSVP API route validates input with Zod
- [ ] Honeypot field present and checked in API route
- [ ] Rate limiting implemented — 4th submission in 24h blocked
- [ ] RLS enabled on `rsvps` table — no public SELECT policy
- [ ] Security headers verified at securityheaders.com — A or A+
- [ ] No hardcoded credentials anywhere in codebase
- [ ] `.env.local` not committed to Git

### Infrastructure
- [ ] Custom domain configured on Vercel (if domain purchased)
- [ ] SSL certificate active — HTTPS only
- [ ] Environment variables set in Vercel dashboard for Production
- [ ] `.env.example` committed and up to date
- [ ] `www` redirect configured if using a custom domain
- [ ] Vercel project settings reviewed

---

## Sanity CMS — Self-Training Guide for Naa

After the site launches, Naa can manage content independently via Sanity Studio.
Walk through these steps before marking the site as fully handed over.

### Accessing Sanity Studio

1. Open the Studio URL (created when `npx sanity deploy` was run in Sprint 0)
2. Log in with the Sanity account credentials
3. You will see a list of content types on the left

### Publishing vs Saving as Draft

- **Draft** — saved but not live on the website. The site does not show draft content.
- **Publish** — makes the content live on the website. Click the green Publish button.
- If you save and close without publishing, the changes will not appear on the site.
- After publishing, the site updates within 60 seconds (ISR revalidation).

### What You Can Update

| Content type | What it controls |
|---|---|
| Couple Info | Names, bio, wedding date, location name — used in Hero and Footer |
| Story Milestones | Our Story timeline — add, edit, or reorder milestones |
| Itinerary Items | Event Details section — ceremony and reception details |
| Hotels | Travel & Stay section — hotel recommendations and booking links |
| FAQ Items | FAQ accordion — add, edit, reorder questions and answers |
| Registry Info | Registry section — store names and links |

### Adding a New FAQ Item

1. Click "FAQ Item" in the left sidebar
2. Click "+ New FAQ Item" (or the pencil icon)
3. Fill in the Question and Answer fields
4. Set an "Order" number (lower = appears first)
5. Click **Publish** — the site updates within ~60 seconds

### Editing Existing Content

1. Click the content type in the left sidebar
2. Click the item you want to edit
3. Make your changes
4. Click **Publish**

### If Something Looks Wrong on the Site

1. Check that the document is **Published** (not draft)
2. Wait 60 seconds for ISR revalidation
3. Hard refresh the page (Ctrl+Shift+R / Cmd+Shift+R)
4. If still wrong, check for typos in the Sanity Studio content

---

## Vercel — What Naa Should Know

```
Hosting:     Vercel (vercel.com)
Auto-deploy: Any change pushed to the main branch on GitHub
             automatically deploys to the live site.

What auto-updates:
  - Code changes → pushed to GitHub → Vercel rebuilds the site automatically
  
What manual updates:
  - Content changes → done in Sanity Studio (above)
  - Environment variables → Vercel dashboard
```

### Environment Variables Set

(List all variable names — not values — for reference):
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — Sanity project
- `NEXT_PUBLIC_SANITY_DATASET` — Sanity dataset (production)
- `SUPABASE_URL` — Supabase project
- `SUPABASE_ANON_KEY` — Supabase public key
- `RESEND_API_KEY` — email sending
- `NEXT_PUBLIC_SITE_URL` — the live URL

### To View RSVP Submissions

Log into **Supabase** → Table Editor → `rsvps` table.
You can filter, sort, and export RSVP data from there.
Do not modify table structure or policies without asking first.

---

## Post-Launch — RSVP Period

Once the invitations are sent:

- Check Supabase `rsvps` table for submissions
- Export to CSV from Supabase for your records (Table Editor → Export)
- Monitor the Vercel function logs if any RSVP errors are reported
- Rate limiting is 3 per IP per 24 hours — if legitimate guests are being blocked,
  adjust the threshold in `app/api/rsvp/route.ts` and redeploy

---

## CLAUDE.md Final Update

Before marking the site as launched, update `CLAUDE.md` Quick Reference:

```markdown
**Current sprint:** All sprints complete — site live
**Active task:** Post-launch support
```

And update `sprint.md` with all sprints marked complete and merged.
