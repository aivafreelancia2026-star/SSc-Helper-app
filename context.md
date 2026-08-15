# SSC Helper App — Project Context

For any developer (human or AI) picking this project up cold. Explains what
this is, how it's built, and where the non-obvious decisions live.

## What this is

A web app (mobile-first, Flutter port planned later) for Indian SSC students,
Classes 6–10. Digital chapter reader, quizzes, an AI tutor chat (RAG,
not built yet), and per-student progress tracking. Class 6 Maths/Science is
the pilot subject while content extraction gets figured out.

Product name: **SSC Helper** (renamed from "SSC Tutor" — some historical
artifacts like the repo name `SSc-Helper-app` and old URLs may still say
`ssctutor` in places; the in-app branding is authoritative).

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Supabase** — Postgres DB, Auth (email/password + Google OAuth), RLS
- Hosted on **Vercel**, custom domain `sschelper.aivafreelancia.in` (DNS via
  Cloudflare, zone `aivafreelancia.in`)

## Directory structure

```
src/
  app/
    page.tsx                 Root — redirects based on auth state
    login/page.tsx            Login (data-page-id="login")
    signup/page.tsx           Signup (data-page-id="signup")
    onboarding/page.tsx       First-login profile form (data-page-id="onboarding")
    auth/callback/route.ts    OAuth callback handler
    (app)/                    Route group: everything behind login
      layout.tsx               Shared shell — enforces auth + complete profile,
                                renders header/nav/class-selector/bottom-nav
      dashboard/page.tsx       Post-login home, subject grid (data-page-id="dashboard")
      admin/page.tsx           Founder-only user/role management (data-page-id="admin")
      reader/page.tsx          Chapter index + reader (data-page-id="reader")
  components/                 All client components (mostly "use client")
  lib/
    pages.ts                   PAGES registry — see "Page ID convention" below
    profile.ts                  Profile type, Role type, getProfile()
    subjects.ts                  getSubjectsForClass() — reads from data/classes/
    content.ts                   Chapter/ClassContent types for reader content
    supabase/
      client.ts                  Browser Supabase client
      server.ts                  Server Supabase client (cookies-based)
      middleware.ts               Session refresh logic, used by proxy.ts
  proxy.ts                    Next.js middleware entry point (session refresh)
  data/classes/                33 subject JSON files + 5 per-class hub JSON files
    C6.json … C10.json                    Hub: lists subjects + which file each is in
    C6-Maths.json, etc.                    Per-subject chapter content
```

## Auth & session flow

Supabase Auth, cookie-based sessions via `@supabase/ssr`. `proxy.ts` runs on
every request and refreshes the session (`src/lib/supabase/middleware.ts`) —
this is what keeps users logged in across server restarts and browser
sessions, since the session lives in Supabase/cookies, not in-memory.

`(app)/layout.tsx` is the single auth gate for everything behind login:
redirects to `/login` if unauthenticated, redirects to `/onboarding` if the
profile is incomplete (`isProfileComplete` = has `school_name` +
`class_grade`). Individual pages under `(app)/` don't need their own guards.

**Cross-device / cross-restart continuity is by design already correct**:
profile data lives in Supabase's `profiles` table keyed by the Supabase user
id, not in browser storage or server memory. Logging into the same account
anywhere shows the same profile. (A schema-mismatch bug briefly broke this
on 2026-08-08 — see "Known gotchas" below — it's not a persistence design
flaw, it was a code/DB drift bug.)

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
  created_at timestamptz default now()
);

-- RLS: users can view/update their own row (original policies), plus:
create policy "Founders can view all profiles" on public.profiles
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'founder')
  );
create policy "Founders can update all profiles" on public.profiles
  for update using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'founder')
  );
```

`email` is denormalized from `auth.users` (populated at onboarding) because
RLS can't easily expose `auth.users` rows to Founders, but a self-referencing
policy on `profiles` works cleanly.

## Role system

Four roles: **Founder > Developer > Teacher > Student** (students are
"clients"). Founder is the app owner. New signups default to `student`.

Role changes happen through `/admin` (`src/app/(app)/admin/page.tsx`,
`src/components/admin-users-list.tsx`) — Founder-only (checked via
`profile.role === "founder"`, shows an access-denied card otherwise, not a
silent redirect). Lists every user with a `<select>` per row that updates
`profiles.role` directly, relying on the RLS "Founders can update all
profiles" policy above.

**Bootstrapping**: the very first Founder has to be set with one manual SQL
`update` (the admin UI is itself Founder-gated, so there's no other way to
create the first one). Every promotion after that goes through `/admin`.

Role-differentiated *content* (what a Teacher sees vs a Student) is **not**
built yet — only the plumbing (role field, admin UI, header gating) exists.

## Content data model

`src/data/classes/` holds the curriculum as JSON, generated to match this
structure per class:

- **Class 6–7**: Telugu, Hindi, English, Maths, Science (subAreas: Physics,
  Chemistry, Biology), Social — 6 subjects
- **Class 8–10**: Telugu, Hindi, English, Maths, Biology (standalone),
  Science (subAreas: Physics, Chemistry only), Social — 7 subjects

Each class has one **hub file** (`CN.json`) listing its subjects and which
file each lives in, and one **subject file** per subject (`CN-<Subject>.json`,
subject name capitalized — e.g. `C6-Maths.json`). `src/lib/subjects.ts`
imports the hub files directly (Next.js supports JSON imports natively) —
they're the source of truth for `getSubjectsForClass()`, not hardcoded TS
data. Each hub's `subjects[].file` field is the exact filename to import for
that subject — don't reconstruct it manually, since it's the one place that
tracks a rename.

**Founder/Developer only**: `SubjectsGrid` shows each subject's backing
filename (e.g. `C6-Maths.json`) below its name on the dashboard cards, for
these two roles only — a quick reference while building out content, not
meant for Teacher/Student.

### Chapter content shape (currently only Class 6 Science has real data)

Each subject file has a `chapters: []` array. A chapter looks like:

```json
{
  "id": "ch3",
  "unit": "I",
  "number": 3,
  "title": "Rains; where does it come from",
  "pageStart": 21,
  "pageEnd": 27,
  "status": "coming-soon",
  "periods": 10,
  "subArea": "Physics"
}
```

Class 6 Science (`C6-Science.json`) also has a `totalPages: 185` field
and a special `id: "index"` chapter carrying an `indexData` array — the raw
textbook index table (unit/chapter/title/page/periods/subArea), rendered by
`src/components/chapter-index.tsx` as a clickable, expandable-by-unit list.
Pages 1–8 are `status: "coming-soon"` (front matter, not yet extracted);
page 9 is the index itself; chapters 1–17 cover pages 11–185.

This is the target shape for the (not-yet-built) PDF-extraction pipeline to
write into — populate `chapters[].content` (or similar) as pages get
digitized, not a new data store.

### Reader

`/reader?class=N&subject=Name` (`src/app/(app)/reader/page.tsx`) — shows the
chapter index for a subject, or `?chapter=ch3` for a single chapter's detail
view. Currently hardcoded to only serve Class 6 Science with real data;
everything else shows a generic "coming soon" message. `SubjectsGrid` on the
dashboard links here when a subject card is clicked.

## Page ID convention

Every page has an entry in `src/lib/pages.ts` (`PAGES` registry) and stamps
`data-page-id={PAGES.<key>.id}` on its root element. This exists so pages
can be referred to unambiguously (in conversation, in rendered HTML, in
tests) without relying on route paths or matching visible text. **When
adding a new page: register it in `pages.ts` first, then set the
`data-page-id` attribute.**

## Design system

"Claymorphism" — light theme, soft 3D look, layered shadows
(`shadow-[6px_6px_14px_rgba(79,70,229,0.1),-4px_-4px_10px_rgba(255,255,255,0.7)]`
is the recurring card-shadow pattern), heavily rounded corners
(`rounded-[24px]`/`rounded-[32px]`), indigo/orange/peach palette. Design
tokens/reference: `design-system/ssc-helper/MASTER.md`.

## Feedback

In-app feedback (`src/components/feedback-widget.tsx`) does **not** go to a
Supabase table — it POSTs to AIVA Work Manager's existing feedback inbox
(`NEXT_PUBLIC_FEEDBACK_API_URL` + `/api/feedback`), tagged
`source: "ssc-tutor"` — intentionally left as the pre-rename value since
that's the product tab already registered in Work Manager; renaming it
would split feedback across two tabs there. This reuses infrastructure from
a separate AIVA project rather than building a new one.

## Environment variables

See `.env.local.example`. Three vars, all `NEXT_PUBLIC_*` (safe to expose
client-side — anon key + RLS is the real security boundary, not env secrecy):

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_FEEDBACK_API_URL
```

**Important**: Next.js bakes `NEXT_PUBLIC_*` vars in at *build time*, not
read at runtime. Changing them in Vercel's dashboard does nothing to
already-built deployments — a fresh build (redeploy, or a new push) is
required for changes to take effect. This caused a real production outage
once (see "Known gotchas").

## Deployment

- **GitHub**: `aivafreelancia2026-star/SSc-Helper-app` (repo root = Next.js
  project root, no subdirectory config needed)
- **Vercel**: project `ssc-helper-app` under the `aivafreelancia2026-star`
  team/account (Hobby tier)
- **Domain**: `sschelper.aivafreelancia.in` — Cloudflare DNS (CNAME to
  Vercel's per-domain target + a `_vercel` TXT ownership-verification
  record, both set to **DNS only**, not proxied, so Vercel's SSL
  provisioning and domain verification can see real traffic)
- **Supabase Auth URL config** (Authentication > URL Configuration) must
  match the live domain: Site URL = `https://sschelper.aivafreelancia.in`,
  Redirect URLs includes `https://sschelper.aivafreelancia.in/auth/callback`

### Known gotcha: Vercel Hobby tier + private repo

Vercel's Hobby (free) plan blocks deployments where the git commit author
isn't recognized as having contributing access to the Vercel project — and
Hobby explicitly doesn't support adding team members. This restriction is
scoped to **private** GitHub repos specifically; public repos on Hobby don't
hit it. If pushes from an account other than the repo/Vercel owner start
getting blocked with "commit author does not have contributing access,"
that's this — either push from the owner account, have the owner manually
redeploy, or (what this project does) make the repo public.

## Known gotchas / bug patterns to avoid repeating

1. **Never add a column to `getProfile()`'s `.select(...)` before the
   matching SQL migration is confirmed run.** A schema/code mismatch makes
   the query error, `getProfile` returns `null`, and every signed-in user
   gets silently redirected to `/onboarding` — this looks exactly like a
   session/persistence bug but isn't one. `getProfile` (in `lib/profile.ts`)
   now has a fallback that retries with just the original columns if the
   full select errors, specifically to survive this class of bug going
   forward — but still get migrations run first.
2. **`NEXT_PUBLIC_*` env var changes need a fresh build to take effect** —
   see "Environment variables" above. If production is 500ing with "Your
   project's URL and Key are required to create a Supabase client," this is
   almost certainly it: redeploy (or push a new commit) rather than assuming
   the vars themselves are wrong.
3. **Don't build role-gated content until the user defines what each role
   actually sees.** The role field/admin UI is intentionally just plumbing
   for now.

## What's not built yet

- PDF → JSON content extraction pipeline (chapters are structural
  placeholders except Class 6 Science's index)
- Quizzes
- AI tutor chat / RAG
- Progress tracking
- Role-differentiated content/permissions beyond the admin page itself
- Flutter port
