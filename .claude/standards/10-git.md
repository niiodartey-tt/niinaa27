# 10 — Git & Sprint Workflow

## Branch Structure

```
main              → production, always deployable, auto-deploys to Vercel
sprint-N          → one branch per sprint (sprint-0, sprint-1, sprint-2, sprint-3)
task/description  → one branch per task, branched from sprint-N
hotfix/description → emergency fixes branched directly from main
```

---

## Branch Naming

```
Sprint branches:  sprint-0, sprint-1, sprint-2, sprint-3
Task branches:    task/hero-section, task/rsvp-form, task/faq-accordion
Hotfix branches:  hotfix/rsvp-insert-bug, hotfix/missing-env-var

Never:            my-branch, test, fix, temp, wip
```

---

## The Sprint Workflow

### 1. Start a new sprint — branch from main

```bash
git checkout main
git pull origin main
git checkout -b sprint-1
git push -u origin sprint-1
```

### 2. Start a new task — branch from sprint

```bash
git checkout sprint-1
git pull origin sprint-1
git checkout -b task/hero-section
```

### 3. Work on task — commit regularly

```bash
git add .
git status          # always verify what you're committing
git commit -m "feat: build HeroSection with CSS entrance animations"
git push origin task/hero-section
```

### 4. Task complete — merge into sprint branch

```bash
git checkout sprint-1
git pull origin sprint-1
git merge task/hero-section
git push origin sprint-1
```

### 5. All tasks done — review on Vercel preview URL

Review the site at the Vercel preview URL before merging.
Test on mobile and desktop. Work through the Definition of Done checklist.

### 6. Confirmed — merge sprint to main

```bash
git checkout main
git pull origin main
git merge sprint-1
git push origin main
# Vercel auto-deploys to production
```

### 7. Next sprint — branch from updated main

```bash
git checkout main
git pull origin main
git checkout -b sprint-2
git push -u origin sprint-2
```

---

## Hotfix Workflow

For bugs discovered after a sprint is live that cannot wait:

```bash
# 1. Branch from main directly
git checkout main
git pull origin main
git checkout -b hotfix/rsvp-insert-bug

# 2. Make the fix — targeted change only
# No new features. No refactoring. Fix only.

# 3. Commit and push
git add .
git commit -m "fix: resolve RSVP insert failing when dietary notes is empty"
git push origin hotfix/rsvp-insert-bug

# 4. Review on Vercel preview URL

# 5. Merge hotfix to main
git checkout main
git merge hotfix/rsvp-insert-bug
git push origin main

# 6. Bring fix into current sprint so it is not lost
git checkout sprint-2
git merge main
git push origin sprint-2
```

---

## Commit Message Standard

```
Format: type: short description (max 72 characters)
```

### Types

```
feat:     new feature or component
fix:      bug fix
style:    visual/styling change, no logic change
refactor: restructuring code without changing behaviour
perf:     performance improvement
a11y:     accessibility improvement
content:  copy or content update (e.g., updating static placeholder text)
chore:    config, dependencies, tooling
```

### Good examples

```
feat: build HeroSection with CSS fade-up entrance animation
feat: implement FloralCorner SVG illustration component
feat: add useInView hook for Intersection Observer scroll reveals
feat: RSVP form with Zod validation and Supabase insert
fix: resolve FAQ accordion not closing when another opens
fix: SVG overflow at 375px on FloralDivider component
style: adjust Hero heading size clamp for mobile
a11y: add aria-labels to RSVP form fields and error messages
perf: dynamically import RSVPSection to reduce initial bundle
content: update event details with confirmed venue address
chore: configure tailwind.config.ts with design tokens
chore: install tailwindcss-animate and configure plugins
```

### Never acceptable

```
fix
changes
update
wip
stuff
done
```

### No AI attribution — ever

Commit messages must contain only the message itself. Never include:
- `Co-Authored-By: Claude ...`
- `Generated with Claude Code`
- `🤖 Generated with ...`
- Any reference to AI tooling in the commit body or trailer

This applies to every commit Claude makes on this project, in every sprint.

---

## Commit Frequency

- Commit after every meaningful unit of work
- Component built → commit
- Bug fixed → commit
- Design token added → commit
- Never go more than 2 hours without committing if actively building
- Never commit broken code that does not build

---

## Sprint Branch Checklist

Add this to the GitHub branch description when creating a sprint branch:

```markdown
## Sprint N — Nii & Naa Wedding
**Started:** DD/MM/YYYY
**Target completion:** DD/MM/YYYY

### Tasks
- [ ] task/component-name
- [ ] task/component-name

### Definition of Done
- [ ] All tasks merged into sprint branch
- [ ] Reviewed on Vercel preview URL — mobile + desktop
- [ ] Tested on 375px, 390px, 768px, 1280px
- [ ] All interactive elements keyboard-navigable
- [ ] CSS animations respect prefers-reduced-motion
- [ ] No horizontal overflow at any breakpoint
- [ ] All links working — no href="#" remaining
- [ ] No console errors in browser DevTools
- [ ] npm run lint passes
- [ ] npx tsc --noEmit passes
- [ ] npm run build passes
- [ ] npm audit — zero critical/high vulnerabilities

**Approved:** [ ]
**Merged to main:** [ ]
```

---

## Pre-Merge Command Sequence

Run in this exact order before every merge to main:

```bash
npm run lint && npx tsc --noEmit && npm run build && npm audit
```

All four must pass. Fix all failures before merging.
The `&&` means each command only runs if the previous succeeded.

---

## Vercel Preview URLs

Every branch pushed to GitHub gets a Vercel preview URL automatically.
Always review sprint work on the sprint branch preview URL — not localhost.

```
main branch      → production URL
sprint-1 branch  → preview URL (auto-generated)
task/*           → preview URL (auto-generated)
```

---

## What Claude Must Never Do

- Never commit directly to `main`
- Never commit directly to a sprint branch
- Always work on task branches
- Never use generic commit messages
- Never push broken code that fails the build
- Never merge to `main` without explicit confirmation
- Never rebase shared branches — merge only
- Never include AI attribution in any commit message (no `Co-Authored-By`, no Claude/AI references)

---

## Claude Code Auto-Commit Rule

After every group in a sprint Claude must automatically:

1. Run the TypeScript check: `npx tsc --noEmit`
2. If clean — stage and commit:
   ```bash
   git add .
   git commit -m "feat: Sprint N Group N — brief description"
   git push origin sprint-N
   ```
3. Update `.claude/project/progress.md` with the group entry
4. Report completion and await confirmation for next group

Claude never asks permission to commit after a verified group.
If TypeScript check fails — fix errors first, then commit.
Never commit broken code.
