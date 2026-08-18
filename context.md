# SSC Helper App — Project Context

For any developer (human or AI) picking this project up cold. Explains what
this is, how it's built, how the team works day-to-day, and where the
non-obvious decisions live. Read this before touching content data or the
reader. **If this file looks out of date, fix it — don't just work around
the gap.** It's reverted to a stale version at least once already because
someone pushed from an old local checkout; if you're merging/rebasing and
see a conflict here, take the newer content, not "whichever side is
convenient."

## What this is

A web app (mobile-first, Flutter port planned later) for Indian SSC students,
Classes 6–10. Digital chapter reader with real interactive content, a
per-student score system, quizzes (not built yet), an AI tutor chat (RAG,
not built yet), and role-based access (Student/Teacher/Developer/Founder).
**Class 6 Science is the pilot subject** with real hand-built interactive
content for multiple chapters. Class 6 Telugu and Maths are also under
active development (chapter maps + partial content).

Product name: **SSC Helper** (renamed from "SSC Tutor"). The rename is
functionally complete — package name, page titles, and the Work Manager
feedback `source` value are all `ssc-helper`. If you see `ssc-tutor`
anywhere in actual code (not a historical comment), it's a bug, not
intentional.

## Branch workflow — read this first

**The intent is: day-to-day work on `Dev`, merge to `master` only when a
batch is ready to go live.** In practice this has been drifting — multiple
people have been pushing straight to `master`, which defeats the point (no
safety net, no preview-before-production). If you're reading this: **push
to `Dev`**, open a PR or ask before merging to `master`, and if `Dev` has
fallen behind `master` again, fast-forward it rather than ignoring it.

- `Dev` → auto-deploys to a stable Vercel Preview URL:
  `https://ssc-helper-dev.vercel.app` (Deployment Protection may be on —
  ask the Founder if you can't open it).
- `master` → production, served at **two** domains pointing at the same
  Vercel deployment: `https://ssc-helper-app.vercel.app` (the raw Vercel
  domain) and `https://sschelper.aivafreelancia.in` (custom domain, DNS via
  Cloudflare zone `aivafreelancia.in`, **DNS only** not proxied, so
  Vercel's SSL/domain verification works).
- Public GitHub repo — no Vercel account needed to clone/push, just GitHub
  collaborator access.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Supabase** — Postgres DB, Auth (email/password + Google OAuth), RLS
- Hosted on **Vercel** — see branch workflow above for URLs

## Directory structure

```
src/
  app/
    page.tsx                 Root — redirects based on auth state
    login/page.tsx            Login (data-page-id="login")
    signup/page.tsx           Signup (data-page-id="signup")
    onboarding/page.tsx       First-login profile form incl. role + access
                              code (data-page-id="onboarding")
    auth/callback/route.ts    OAuth callback handler
    (app)/                    Route group: everything behind login
      layout.tsx               Shared shell — enforces auth + complete
                                profile, renders header/nav/class-selector/
                                book-status-bar/bottom-nav, wraps everything
                                in ScoreProvider
      dashboard/page.tsx       Post-login home, subject grid (data-page-id="dashboard")
      admin/page.tsx           Founder-only user/role management (data-page-id="admin")
      profile/page.tsx         Identity (name/school/class/role), role-code
                                redeem form, Admin link for Founders (data-page-id="profile")
      reader/page.tsx          Chapter index + reader, generalized across
                                subjects via loadClassContent() (data-page-id="reader")
  components/
    reader/                    FillInTable (gradable cells), page-turn
                                transition, page browser/search, per-chapter
                                content components (content/c6-science-*.tsx,
                                content/c6-telugu-*.tsx)
    app-header.tsx             Minimal — just the back arrow. Identity
                                (avatar/name/class/Admin link) lives on
                                /profile instead, not in the header.
    nav-bar.tsx                Feedback/Reset/Others/Upgrade + page-turn arrows,
                                floating rounded-pill styling
    book-status-bar.tsx        Page badge (opens page browser) + score +
                                Reveal-answers toggle (Founder/Dev/Teacher only)
    admin-users-list.tsx       Search + role dropdown; stacked cards on
                                mobile, table on tablet/desktop
  lib/
    pages.ts                   PAGES registry — see "Page ID convention" below
    profile.ts                  Profile type, Role type, getProfile() (3-tier
                                 fallback select — see gotcha #1)
    subjects.ts                  getSubjectsForClass() — reads from data/classes/
    content.ts                   Chapter/ClassContent types + loadClassContent(
                                  classGrade, subject) — the registry every
                                  new class+subject data file must be added to
    reader-content-registry.tsx  getPageContent() — lazy (next/dynamic)
                                  per-page component lookup, keyed by
                                  chapter id + page-within-chapter
    reader-search-index.ts       Keyword search index for the page browser
    supabase/
      client.ts                  Browser Supabase client
      server.ts                  Server Supabase client (cookies-based)
      middleware.ts               Session refresh logic, used by proxy.ts
  proxy.ts                    Next.js middleware entry point (session refresh)
  data/classes/                Hub files (CN.json) + per-subject files
    C6.json … C10.json                    Hub: lists subjects + which file each is in
    C6-Science.json                        Real content, multiple chapters built
    C6-Telugu.json                         Chapter map + partial content
    C6-Maths.json                          Chapter map + partial content
scripts/
  pull-approved-feedback.mjs   Logs into Work Manager (WORK_MANAGER_USERNAME/
                               PASSWORD), fetches Founder-approved SSC Helper
                               feedback items + reference screenshots — see
                               "Feedback" section below
```

## Auth & session flow

Supabase Auth, cookie-based sessions via `@supabase/ssr`. `proxy.ts` runs on
every request and refreshes the session (`src/lib/supabase/middleware.ts`).

`(app)/layout.tsx` is the single auth gate: redirects to `/login` if
unauthenticated, `/onboarding` if the profile is incomplete. Individual
pages under `(app)/` don't need their own guards.

Profile data lives in Supabase's `profiles` table keyed by the Supabase user
id — not browser storage, not server memory. Same account shows the same
profile on any device.

### Known gotcha: local dev login redirecting to production

If `npm run dev` on localhost sends someone to `sschelper.aivafreelancia.in`
(or the `.vercel.app` production URL) partway through login/OAuth instead of
staying on localhost, it is **not a code bug** — `login/page.tsx` and
`signup/page.tsx` both build `redirectTo` dynamically from
`window.location.origin`, so they correctly ask for
`http://localhost:3000/auth/callback`. The actual cause: Supabase Auth
falls back to the **Site URL** whenever the requested redirect isn't on the
**Redirect URLs** allow-list (Authentication → URL Configuration in the
Supabase dashboard). Fix: add `http://localhost:3000/**` (and
`http://localhost:3000/auth/callback`) to Redirect URLs — leave Site URL
pointing at production, don't change it. Every developer's localhost needs
this same allow-list entry; it's a one-time dashboard change, not per-person.

## Database schema (Supabase `profiles` table)

```sql
create table public.profiles (
  id uuid references auth.users primary key,
  full_name text,
  school_name text,
  class_grade int,
  role text not null default 'student'
    check (role in ('founder','developer','teacher','student')),
  email text,
  score integer not null default 0,
  created_at timestamptz default now()
);

-- RLS: users can view/update their own row, plus:
create policy "Founders can view all profiles" on public.profiles
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'founder')
  );
create policy "Founders can update all profiles" on public.profiles
  for update using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'founder')
  );
```

`email` and `score` were added after the table already existed in
production — `getProfile()` (`lib/profile.ts`) cascades through 3 select
tiers (full → role+email → base-only) so a not-yet-run migration degrades
gracefully instead of breaking auth entirely. **See gotcha #1 before adding
another column.**

## Role system

Four roles: **Founder > Developer > Teacher > Student**. New signups default
to `student`.

Two ways to get a different role:
1. **Onboarding**: pick a role in the "I am a..." dropdown (Student/
   Teacher/Developer — Founder is never self-selectable) and enter a 4-digit
   access code. The dropdown alone does nothing — only a code matching
   `FOUNDER_ROLE_CODE`/`DEVELOPER_ROLE_CODE`/`TEACHER_ROLE_CODE`/
   `STUDENT_ROLE_CODE` (server-only env vars, `lib/actions/redeem-role-code.ts`)
   actually changes `profiles.role`. No code → continues as Student, no
   error.
2. **Admin assigns it directly**: `/admin` (Founder-only), search by
   name/email, set the role from a dropdown. **This is the normal path for
   the team** — sign up as Student, tell the Founder your email, get
   promoted. Role codes don't need to be distributed at all this way.

**Bootstrapping**: the very first Founder needs one manual SQL `update`
(the admin UI is itself Founder-gated). Every promotion after that goes
through `/admin` or a code.

## Content data model

`src/data/classes/` holds curriculum as JSON. One **hub file** per class
(`CN.json`, lists subjects + filenames) and one **subject file** per subject
(`CN-<Subject>.json`). `src/lib/subjects.ts` reads the hub for
`getSubjectsForClass()`.

### Chapter shape

```json
{
  "id": "ch3",
  "unit": "I",
  "number": 3,
  "title": "Rain: where does it come from?",
  "pageStart": 30,
  "pageEnd": 36,
  "status": "coming-soon",
  "periods": 10,
  "subArea": "Physics",
  "author": null,
  "genre": null
}
```

`periods`/`subArea` are Science-specific (a chapter's period count and topic
area). `author`/`genre` are for language/literature subjects (Telugu, Hindi,
English) instead — a lesson's poet/author and its form (గేయం/కథ/etc). Both
sets are optional on the shared `Chapter` type; use whichever fits the
subject, leave the other `null`.

A `totalPages` field on the subject file and a special `id: "index"` chapter
carrying an `indexData` array (the textbook's own index table) are both
required — `chapter-index.tsx` renders that as the clickable expandable-by-
unit list, and hides the Physics/Chemistry/Biology legend automatically when
no chapter in the index has a `subArea`.

**`src/lib/content.ts`'s `loadClassContent(classGrade, subject)` is the
registry every new class+subject data file must be added to** — it's a
static-import lookup keyed `"{classGrade}-{subject}"`, not a dynamic
`require`. The reader (`reader/page.tsx`) calls this instead of hardcoding
which subject to load; forgetting to register here means the reader shows
"Coming soon" even if the JSON file itself is fully populated.

### Building out a chapter's actual page content — the process that works

This has burned time more than once (a proportionally-compressed page map
that didn't match the real book, a chapter that was silently 1 page short),
so:

1. **Get the real page numbers from the textbook's own index page, not by
   estimation or compression.** Render the PDF's index page, read the
   original page numbers per chapter, and compute
   `app_page = original_page + (pages of front matter/intro the app
   prepends)`. Verify the offset holds by spot-checking 2-3 chapter start
   pages against the rendered PDF, and verify the *true last content page*
   directly (back matter/appendices can follow the last real chapter and
   must not be counted as part of it).
2. **Render pages to view them** — poppler (`pdftoppm`) or PyMuPDF both
   work; render at ~150dpi into a scratch/local folder, read via the
   image-viewing Read tool. Extract pages on-demand per chapter as you
   build it, not the whole book upfront into a permanent archive.
3. **Build one chapter at a time, then stop and let the person driving
   confirm it before continuing** where practical.
4. **Science-specific**: `FillInTable` cells only get `correctAnswers` when
   the textbook's own answer is a short, exact, single-ish fact (plant
   parts, transparent/opaque, soluble/insoluble). Tables asking the student
   to describe/compare/predict in their own words stay ungraded —
   exact-match grading would mark valid answers wrong. If Reveal has
   nothing to show on a page, that's usually correct, not a bug (see
   `fill-in-table.tsx`'s "nothing to reveal" note).
5. **Literature/language subjects (Telugu etc.) — do not transcribe the
   actual poem/story/song text into a page.** Those are creative
   copyrighted works, not factual/instructional content like a Science
   activity. Build the page around a thematic summary in your own words,
   the poet/author bio, the textbook's own comprehension questions
   (functional prompts, fine to include), and the word-meanings glossary
   (facts, fine to include) — not a verbatim transcription of the verses.
6. Never reproduce actual textbook photos — `IconGallery`/`FigureNote`
   stand in with an emoji + caption instead (established pattern).

### Reader

`/reader?class=N&subject=Name&page=P` (`src/app/(app)/reader/page.tsx`) is
subject-generic via `loadClassContent()` — don't hardcode a single subject
here again. Renders the chapter index at the index page, otherwise looks up
the page's component via `getPageContent()` (`reader-content-registry.tsx`)
and falls back to a `ComingSoonCard` if nothing's registered for that page
yet. `?browse=1` opens the page search/browser
(`components/reader/page-browser.tsx`).

Sub-nav while inside a book: `NavBar` (Feedback/Reset/Others/Upgrade + page
arrows, swipe also turns pages) then `BookStatusBar` (page badge that opens
the page browser, score, Reveal-answers toggle for Founder/Developer/
Teacher) then the class selector.

## Scoring

`ScoreProvider` (`components/score-provider.tsx`), wraps the whole `(app)`
shell, seeded from `profiles.score`, persists to Supabase debounced (800ms)
so a burst of quick answers doesn't fire one request per answer. `FillInTable`
awards +1/-1 per gradable cell on blur (can't re-score an unchanged answer —
no farming by tabbing in/out). Score can go negative; `BookStatusBar` shows
it color-coded (red negative, green positive) rather than with a minus sign.
Reveal-answers awards a flat +1 once per page (not per cell) the first time
it's toggled on for that page, tracked in `localStorage`.

## Page ID convention

Every page has an entry in `src/lib/pages.ts` (`PAGES` registry) and stamps
`data-page-id={PAGES.<key>.id}` on its root element. **When adding a new
page: register it in `pages.ts` first, then set the `data-page-id`
attribute.**

## Design system

"Claymorphism" — light theme, soft 3D look, layered shadows
(`shadow-[6px_6px_14px_rgba(79,70,229,0.1),-4px_-4px_10px_rgba(255,255,255,0.7)]`
is the recurring card-shadow), heavily rounded corners (`rounded-[24px]`/
`rounded-[32px]`/`rounded-[28px]` for floating pill-bars), indigo/orange/
peach palette. Design tokens/reference: `design-system/ssc-helper/MASTER.md`.

## Feedback (Work Manager integration)

In-app feedback (`components/feedback-widget.tsx`) does **not** go to a
Supabase table — it POSTs to AIVA Work Manager's feedback inbox
(`NEXT_PUBLIC_FEEDBACK_API_URL` + `/api/feedback`), tagged
`source: "ssc-helper"`. (This was briefly wrong — `"ssc-tutor"`, the old
product name — which meant nothing routed to the SSC Helper tab there or
was eligible for the Approve workflow. If you see `ssc-tutor` in the actual
POST body in code, that's a regression, fix it. Any pre-fix rows in Work
Manager's DB are still tagged `ssc-tutor` and need a one-time manual
`UPDATE feedback SET source = 'ssc-helper' WHERE source = 'ssc-tutor';`.)

Work Manager (separate repo, `c:\ALL-projects-claude\AIVA\AIVA Work manager`)
has a Founder-only "Approve" workflow for SSC Helper feedback: a fuller
description + up to 6 reference images become the real build brief, stored
in `feedback_approvals`. `scripts/pull-approved-feedback.mjs` (this repo) is
meant to log into Work Manager (`POST /api/login`, cookie `aiva_session`,
credentials from `WORK_MANAGER_USERNAME`/`PASSWORD`) and pull those approved
items + decode the images to real files so a coding session can actually
view the reported issue, not just read a text description of it.

## Environment variables

See `.env.local.example`. Current vars:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_FEEDBACK_API_URL
FOUNDER_ROLE_CODE / DEVELOPER_ROLE_CODE / TEACHER_ROLE_CODE / STUDENT_ROLE_CODE
WORK_MANAGER_USERNAME / WORK_MANAGER_PASSWORD
```

The three `NEXT_PUBLIC_*` ones are safe to share in plaintext (Slack, etc.)
— Next.js bakes them into the public JS bundle regardless, RLS is the real
security boundary, not their secrecy. The role codes and Work Manager
credentials are real server-only secrets — don't commit them, don't paste
them in chat; share via a password manager's secure-share if they need to
leave your machine at all. In practice **new developers shouldn't need the
role codes** — see "Role system" above, admin assigns roles directly now.

**Important**: `NEXT_PUBLIC_*` vars are baked in at *build time*, not read
at runtime — changing them in Vercel's dashboard does nothing until the next
build/deploy.

## Deployment

- **GitHub**: `aivafreelancia2026-star/SSc-Helper-app`, **public** repo
  (repo root = Next.js project root). Public specifically so Vercel's Hobby
  tier doesn't block collaborators' commits and so developers don't need
  Vercel access just to clone/push.
- **Vercel**: project `ssc-helper-app`, Hobby tier. `master` → production
  at both `ssc-helper-app.vercel.app` and `sschelper.aivafreelancia.in`.
  `Dev` → preview (`ssc-helper-dev.vercel.app`).
- **Supabase Auth URL config** must include the production domain(s) in
  Redirect URLs, **plus `http://localhost:3000/**` for local dev** — see
  "Known gotcha: local dev login redirecting to production" above. This is
  the single most likely cause if someone's localhost misbehaves during
  login.

### Known gotcha: Vercel Hobby tier + team/private-repo limits

Hobby (free) plan blocks deployments where the git commit author isn't
recognized as having contributing access — and **doesn't support inviting
team members at all** (paywalled behind Pro). Worked around by keeping the
repo public (so collaborator commits deploy fine) and, if teammates need to
view a protected Preview URL without Vercel access, disabling Deployment
Protection for Preview specifically (Project Settings → Deployment
Protection) rather than paying for Pro just for that.

## Known gotchas / bug patterns to avoid repeating

1. **Never add a column to `getProfile()`'s `.select(...)` before the
   matching SQL migration is confirmed run** — and when you do add one, add
   it as a *new fallback tier appended after* the existing ones, never
   merged into an existing tier's column list. Merging into an existing
   tier means one missing column (e.g. `score`) drops already-working
   columns (`role`, `email`) along with it — this exact bug happened and
   silently reverted every signed-in user (including the Founder) to
   looking like a plain student.
2. **`NEXT_PUBLIC_*` env var changes need a fresh build to take effect.**
3. **Chapter page ranges: always verify against the textbook's own index,
   never estimate/compress** — see "Building out a chapter's actual page
   content" above.
4. **Local dev login redirecting to the production domain is a Supabase
   Redirect URLs config gap, not a code bug** — see the dedicated gotcha
   above. Don't go looking for it in `login/page.tsx`/`signup/page.tsx`;
   they're already correct.
5. **Restarting the local dev server while a browser tab is already open on
   it can break that tab's hydration** (stale bundle vs. the now-restarted
   server) — symptoms look like broken client-side JS (e.g. a form
   submitting as a native GET instead of the React handler running). Hard
   refresh the tab after any dev-server restart, don't assume a bug.
6. **Don't reproduce full textbook photos, or full poem/story/song text for
   literature subjects.**
7. **Push to `Dev`, not `master`** — see "Branch workflow" above. If you
   must fix something urgent directly on `master`, fast-forward `Dev` to
   match right after so it doesn't silently fall behind again, and update
   this file if anything you changed makes it stale.

## What's not built yet

- Quizzes
- AI tutor chat / RAG (an "Upgrade" page stub exists, not the real feature)
- Progress tracking beyond the score system
- Most of the curriculum — Class 6 Science, Telugu, and Maths have partial
  real content; everything else is either an empty `chapters: []`
  placeholder or fully absent
- Flutter port
