# Project Setup Checklist

> Complete this checklist at the start of the project.
> Work through it in order — each step builds on the previous one.
> Do not start building until Steps 1–4 are complete.

---

## Step 1 — Design & Architecture (Before Any Code)

Think through the full project before writing a single line of code.

- [ ] **Project purpose defined**
  - What is this site for? Who will receive it?
  - What does a guest need to do when they land on it?
  - What does a successful launch look like?

- [ ] **Tech stack confirmed**
  - Framework: Next.js 14 (App Router) ✅
  - CMS: Sanity (couple info, story, events, hotels, FAQ, registry) ✅
  - Database: Supabase (RSVP only) ✅
  - Email: Resend (RSVP confirmation — stubbed until Sprint 3) ✅
  - Hosting: Vercel ✅

- [ ] **Section map agreed**
  - Hero, Our Story, Event Details, Travel & Stay, RSVP, Registry, FAQ, Footer ✅
  - No gallery section ✅
  - No photography anywhere ✅

- [ ] **Design system locked**
  - Colours (ivory, blush, rose, rose-dark, ink, taupe, hairline) ✅
  - Typography (Dancing Script, Cormorant Garamond, Inter) ✅
  - Shape language (28px card radius, pill buttons, circular chips) ✅
  - All visuals are SVG illustration components — no photos ✅

**Deliverable:** Clear picture of what is being built. This project has it. Proceed.

---

## Step 2 — Fill in .claude/project/ Files

Complete the project files before touching the codebase:

- [ ] **`overview.md`** — project spec, schemas, Supabase table, rules ✅
- [ ] **`structure.md`** — planned folder structure (update after scaffold) ✅
- [ ] **`env.md`** — all environment variable names and scopes ✅
- [ ] **`sprint.md`** — Sprint 0 tasks and Definition of Done ✅
- [ ] **`do-not-touch.md`** — protocol and initial entries ✅
- [ ] **`known-issues.md`** — seeded with Framer Motion risk ✅
- [ ] **`CLAUDE.md`** — quick reference updated ✅

**Deliverable:** Claude is fully briefed before the first line of code.

---

## Step 3 — Infrastructure Setup

Set up services before Sprint 0 build begins.

### GitHub
- [ ] Repository created on GitHub (this repo) ✅
- [ ] Default branch set to `main` ✅
- [ ] `.gitignore` includes `.env.local`, `node_modules`, `.next`

### Vercel
- [ ] Create Vercel project
- [ ] Link to GitHub repository — auto-deploy on `main` confirmed
- [ ] Add all environment variables to Vercel dashboard
  - Development, Preview, and Production environments
- [ ] Confirm first deployment succeeds (even with placeholder content)

### Sanity
- [ ] Create Sanity project at sanity.io
- [ ] Run `npx sanity@latest init --env` in project root
- [ ] Define all six schemas (coupleInfo, storyMilestone, itineraryItem, hotel, faqItem, registryInfo)
- [ ] Deploy Sanity Studio: `npx sanity deploy`
- [ ] Fill `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`

### Supabase
- [ ] Create Supabase project
- [ ] Create `rsvps` table with schema from `overview.md`
- [ ] Enable RLS on `rsvps` table
- [ ] Write INSERT policy for anon role
- [ ] Verify no SELECT policy exists for anon role (RSVPs are private)
- [ ] Generate TypeScript types: `npx supabase gen types typescript > types/supabase.ts`
- [ ] Fill `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `.env.local`

### Resend (Sprint 3 — stub now)
- [ ] Create Resend account
- [ ] Get API key — add to `.env.local` as `RESEND_API_KEY`
- [ ] Add placeholder in `app/api/rsvp/route.ts` with TODO comment (do not implement until Sprint 3)

**Deliverable:** All services connected, environment variables set, first deployment live.

---

## Step 4 — Sprint 0 Build

With all setup complete, begin Sprint 0.

- [ ] Create `sprint-0` branch from `main`
- [ ] Scaffold Next.js 14 (if not done):
  ```bash
  npx create-next-app@latest . --typescript --tailwind --eslint --app --import-alias "@/*"
  ```
- [ ] Install project stack:
  ```bash
  npm install --save-exact tailwindcss-animate
  npm install --save-exact @supabase/supabase-js
  npm install --save-exact next-sanity @sanity/image-url
  npm install --save-exact react-hook-form zod @hookform/resolvers
  npm install --save-exact clsx tailwind-merge lucide-react
  npm install --save-exact resend
  ```
- [ ] Configure `tailwind.config.ts` — design tokens, fonts, animation utilities
- [ ] Configure `next.config.mjs` — security headers, Sanity CDN remotePatterns
- [ ] Set up fonts in `app/layout.tsx` — Dancing Script, Cormorant Garamond, Inter
- [ ] Create `lib/utils.ts` — `cn()` utility
- [ ] Create four illustration SVG components in `/components/illustrations/`
- [ ] Scaffold all six Sanity schemas
- [ ] Create `sanity/lib/client.ts` and `sanity/lib/queries.ts`
- [ ] Create `types/sanity.ts` and `types/env.d.ts`
- [ ] Create `app/layout.tsx` with fonts, root metadata, skip nav link
- [ ] Create `app/page.tsx` — placeholder section stubs with `id` attributes
- [ ] Create `.nvmrc`
- [ ] Create `.env.example`
- [ ] Run pre-merge sequence:
  ```bash
  npm run lint && npx tsc --noEmit && npm run build && npm audit
  ```
- [ ] All four checks pass — fix any failures before merging
- [ ] Merge `sprint-0` to `main`
- [ ] Vercel production deployment confirmed
- [ ] Update `structure.md` with actual scaffold layout
- [ ] Update `sprint.md` — Sprint 0 complete

**Deliverable:** Clean, configured, deployed foundation ready for Sprint 1.

---

## Step 5 — Ongoing — Every Sprint

Repeat for every sprint after Sprint 0:

- [ ] Create sprint branch from `main`: `git checkout -b sprint-N`
- [ ] Update `sprint.md` with new sprint details
- [ ] Build tasks on task branches: `git checkout -b task/component-name`
- [ ] Merge task branches into sprint branch
- [ ] Work through Definition of Done checklist
- [ ] Review on Vercel preview URL (not localhost)
- [ ] Run pre-merge sequence: `npm run lint && npx tsc --noEmit && npm run build && npm audit`
- [ ] Merge sprint branch to `main`
- [ ] Update `sprint.md` — mark sprint complete
- [ ] Update `CLAUDE.md` Quick Reference with new sprint number
- [ ] Update `do-not-touch.md` with newly approved components
- [ ] Update `progress.md` — Claude does this automatically after every group

---

## Documents Created at Project Start

| Document | Location | Purpose |
|---|---|---|
| CLAUDE.md | `/CLAUDE.md` | AI session briefing |
| Project overview | `.claude/project/overview.md` | Stack, schemas, rules |
| File structure | `.claude/project/structure.md` | Where everything lives |
| Environment vars | `.claude/project/env.md` | All variable documentation |
| Sprint status | `.claude/project/sprint.md` | Current sprint tracking |
| Do not touch | `.claude/project/do-not-touch.md` | Off-limits files |
| Known issues | `.claude/project/known-issues.md` | Bug log |
| This checklist | `.claude/project/project-setup-checklist.md` | Bootstrap reference |
| .env.example | `/.env.example` | Variable names for reference |
| .nvmrc | `/.nvmrc` | Node.js version |
