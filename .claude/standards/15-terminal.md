# 15 — Terminal Commands Standard

## Environment

```
OS:              Linux (Ubuntu/Debian, WSL2)
Package manager: npm
Node.js:         managed via nvm — always LTS version
Shell:           bash
```

---

## Command Presentation Format

All commands delivered in one code block first.
Explanation follows after the block.
Never scattered through prose.
Always specify what each command does and why.

---

## npm Rules

```bash
# CORRECT — standard install
npm install next-sanity

# CORRECT — dev dependency
npm install --save-dev @types/node

# CORRECT — exact version pinned
npm install --save-exact zod@3.22.4

# CORRECT — multiple packages
npm install clsx tailwind-merge lucide-react

# WRONG — never use sudo with npm
sudo npm install next-sanity  # corrupts file permissions

# WRONG — --save is default since npm5, redundant
npm install --save next-sanity
```

---

## Project Setup — New Next.js 14 Project

```bash
npx create-next-app@14 . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --import-alias "@/*"

npm install
```

- `@14` pins the major version to Next.js 14 (App Router)
- `.` scaffolds into the current directory (repo already exists)
- `--import-alias "@/*"` sets up the `@/` path alias
- `npm install` ensures all dependencies install fresh after scaffold

---

## This Project's Stack — Install Order

```bash
# 1. Tailwind animate plugin
npm install --save-exact tailwindcss-animate

# 2. Supabase (RSVP only)
npm install --save-exact @supabase/supabase-js

# 3. Sanity
npm install --save-exact next-sanity @sanity/image-url
npx sanity@latest init --env

# 4. Forms and validation
npm install --save-exact react-hook-form zod @hookform/resolvers

# 5. Utilities
npm install --save-exact clsx tailwind-merge lucide-react

# 6. Email (Sprint 3 — install at Sprint 0 to set up env var early)
npm install --save-exact resend

# 7. Dev dependencies
npm install --save-dev --save-exact @types/node
```

Verify after each group:
```bash
npm run build  # catch errors early
npm audit      # check for vulnerabilities
```

---

## Verification Commands

```bash
npm run dev          # start local server on localhost:3000
npm run build        # production build — catches errors dev mode misses
npm run lint         # ESLint across the project
npx tsc --noEmit     # TypeScript check without generating files
npm audit            # check for security vulnerabilities
npm outdated         # list packages with newer versions available
```

---

## Pre-Sprint-Merge Sequence

Run in this exact order before every merge to main:

```bash
npm run lint && npx tsc --noEmit && npm run build && npm audit
```

All four must pass. Fix all failures before merging.
The `&&` means each command only runs if the previous succeeds.

---

## Git Commands — Sprint Workflow

### Starting a new sprint
```bash
git checkout main
git pull origin main
git checkout -b sprint-1
git push -u origin sprint-1
```

### Starting a new task
```bash
git checkout sprint-1
git pull origin sprint-1
git checkout -b task/hero-section
```

### Committing work
```bash
git add .
git status                                          # always verify before committing
git commit -m "feat: build HeroSection with CSS entrance animation"
git push origin task/hero-section
```

### Checking what changed
```bash
git diff                    # line-by-line changes not yet staged
git status                  # modified, staged, and untracked files
git log --oneline -10       # last 10 commits
```

### Merging task into sprint
```bash
git checkout sprint-1
git pull origin sprint-1
git merge task/hero-section
git push origin sprint-1
```

### Merging sprint to main (after confirmation)
```bash
git checkout main
git pull origin main
git merge sprint-1
git push origin main
```

### Hotfix
```bash
git checkout main
git pull origin main
git checkout -b hotfix/rsvp-insert-fix
# make the fix
git add .
git commit -m "fix: resolve RSVP Supabase insert missing anon policy"
git push origin hotfix/rsvp-insert-fix
git checkout main
git merge hotfix/rsvp-insert-fix
git push origin main
git checkout sprint-2
git merge main
git push origin sprint-2
```

---

## Vercel CLI Commands

```bash
# Install Vercel CLI globally — once per machine
npm install --global vercel

# Link local project to Vercel — once per project
vercel link

# Deploy to preview URL manually
vercel

# Pull environment variables from Vercel to local
vercel env pull .env.local

# Check deployment logs
vercel logs

# Deploy to production manually (prefer pushing to main instead)
vercel --prod
```

`vercel env pull` is especially useful — downloads all Vercel environment
variables to `.env.local` so local dev matches production exactly.
Run this whenever you add a new variable in the Vercel dashboard.

---

## Sanity CLI Commands

```bash
# Initialise Sanity in the project (run once at Sprint 0)
npx sanity@latest init --env

# Start Sanity Studio locally (runs on http://localhost:3333)
npx sanity dev

# Deploy Sanity Studio to production (creates a hosted Studio URL)
npx sanity deploy

# Generate TypeScript types from Sanity schema (optional — types/sanity.ts is hand-written here)
npx sanity schema extract
npx sanity typegen generate
```

---

## Supabase CLI Commands

```bash
# Install Supabase CLI globally
npm install --global supabase

# Generate TypeScript types from rsvps table schema
npx supabase gen types typescript \
  --project-id YOUR_PROJECT_ID \
  > types/supabase.ts

# Run the above again whenever the rsvps table schema changes
```

---

## Node.js Version Management (nvm)

```bash
# Install latest LTS Node.js
nvm install --lts
nvm use --lts
nvm alias default node

# Check installed versions
nvm list

# Check which Node.js is active
which node  # should return /home/[user]/.nvm/versions/node/...
node --version
npm --version

# Use version specified in .nvmrc
nvm use     # reads .nvmrc automatically
```

---

## Troubleshooting Commands

### Dependency errors — nuclear option
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

Fixes the majority of mysterious dependency errors.

### Clear Next.js build cache
```bash
rm -rf .next
npm run build
```

Use when builds produce stale or unexpected output.

### Port already in use
```bash
lsof -i :3000
kill -9 $(lsof -t -i:3000)
```

### Verify correct Node.js is active
```bash
which node
# Should return: /home/[username]/.nvm/versions/node/v20.x.x/bin/node
# NOT: /usr/bin/node — that is the system Node (outdated)
```

If `which node` returns `/usr/bin/node` run `nvm use --lts` to fix.

### Check disk space (if builds fail mysteriously)
```bash
df -h
```

Low disk space causes cryptic build failures on WSL2.

---

## Never Do

```bash
# Never sudo npm install
sudo npm install tailwindcss  # corrupts permissions

# Never commit node_modules
git add node_modules  # ensure node_modules is in .gitignore

# Never commit .env.local
git add .env.local  # ensure .env.local is in .gitignore

# Never push directly to main
git push origin main  # work on branches, merge via sprint workflow

# Never rm -rf without knowing exactly what it deletes
rm -rf /  # always verify path before rm -rf
```
