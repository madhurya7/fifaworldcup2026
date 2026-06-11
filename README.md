# 🏆 FIFA World Cup 2026 Schedule

A modern, fast, mobile-first website displaying the full FIFA World Cup 2026
match schedule — every kickoff time converted to **Indian Standard Time (IST)**.

Built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

## ✨ Features

- **Hero section** with live countdown to the next match
- **Today's Matches** (auto-detected by IST calendar day)
- **Upcoming Matches** with search (by country), stage filter, favorite-team
  filter, and **List / Calendar view toggle**
- **Group Stage** schedule with A–L group tabs
- **Knockout Stage** schedule with Round of 32 → Final tabs
- **Stadiums & Venues** section with per-venue match counts
- Glassmorphism match cards, smooth animations, dark/light mode
- Per-match countdown timers and a **Share** button (Web Share API / clipboard)
- SEO metadata, JSON-LD structured data, sitemap & robots.txt
- Loading skeletons and empty states
- Basic **PWA support** (manifest + service worker for offline app shell)
- Server-side data fetching with **hourly automatic revalidation** (ISR)

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build && npm run start   # production build
```

## 📂 Project structure

```
app/
  layout.tsx        # Root layout, fonts, SEO metadata, theme provider
  page.tsx          # Homepage — assembles all sections (Server Component)
  loading.tsx        # Route-level loading skeleton
  globals.css         # Tailwind + glassmorphism utilities
  manifest.ts          # PWA manifest
  sitemap.ts / robots.ts
  api/matches/route.ts # Public JSON API for the schedule
  api/health/route.ts

components/
  Hero.tsx, Navbar.tsx, Footer.tsx
  MatchCard.tsx, ScheduleExplorer.tsx, CalendarView (in ScheduleExplorer)
  TodaysMatches.tsx, GroupStageSection.tsx, KnockoutSection.tsx
  VenueSection.tsx, CountdownTimer.tsx, ThemeProvider/ThemeToggle
  Skeletons.tsx, EmptyState.tsx, StructuredData.tsx
  ServiceWorkerRegister.tsx

lib/
  types.ts        # Match / Venue / Team types (incl. live status & score)
  data.ts         # getSchedule(): live -> fallback chain -> seed dataset
  footballData.ts # football-data.org v4 API client (live scores/status)
  teams.ts      # 48 nations: names + flag emojis, group lineups
  venues.ts     # 16 stadiums with timezones
  timezone.ts   # IST formatting & countdown helpers
```

## 🌐 Data source & automatic updates

`lib/data.ts` ships a curated **seed schedule** for all 104 matches as a
guaranteed-available fallback:

- **Group Stage (72 matches)** — based on the official FIFA group draw
  (Dec 5, 2025) and the published kickoff schedule for groups A–L.
- **Knockout Stage (32 matches)** — official bracket structure (Round of 32 →
  Final) with placeholder labels (e.g. *"Winner Group A"*) until group results
  are known.

### ✅ Live updates via football-data.org (already wired up)

`lib/footballData.ts` calls the [football-data.org v4 API](https://www.football-data.org/documentation/quickstart):

```
GET https://api.football-data.org/v4/competitions/WC/matches?season=2026
Header: X-Auth-Token: <your token>
```

To enable it, add your token to `.env.local` (already created for you):

```bash
FOOTBALL_DATA_API_TOKEN=67eced17714b4136a0de9c5087e361a4
```

This is **read server-side only** (in Server Components / Route Handlers) —
your token is never sent to the browser. `getSchedule()` will:

1. Call football-data.org for the live World Cup 2026 schedule, including
   **live status** (`SCHEDULED`, `IN_PLAY`, `PAUSED`, `FINISHED`, …),
   **current minute**, **live/final scores**, and **team crests**.
2. Map team names/groups/stages/venues to our internal format
   (`lib/footballData.ts` includes an alias table for naming differences like
   "Korea Republic" → "South Korea", "IR Iran" → "Iran", etc.).
3. If the API call fails, returns no 2026 fixtures yet, or the token is
   missing/invalid, **fall back automatically** to an optional generic
   `WORLD_CUP_DATA_URL`, and finally to the bundled seed schedule — the site
   never breaks.

**Live UI**: `MatchCard` shows a pulsing 🔴 **LIVE** badge with the current
minute, the live score in place of the countdown, an ✅ **Full Time** badge
plus final score once a match ends, and real team crest images when provided
by the API (falling back to flag emojis otherwise).

**Refresh interval**: both the homepage and `/api/matches` revalidate every
**60 seconds** (`LIVE_REVALIDATE_SECONDS` in `lib/footballData.ts`) — frequent
enough to feel real-time while staying within football-data.org's free-tier
limit of 10 requests/minute. Increase this value if you're on a stricter plan.

> ℹ️ Note: football-data.org's free tier may take time to populate full
> World Cup 2026 fixtures/results as the tournament progresses, and some
> competitions/seasons require a paid tier. If `competitions/WC/matches`
> returns no 2026 matches or a 403/429, the app automatically uses the seed
> schedule — no errors are shown to visitors.

### Connecting a different / additional live data source

You can also set a generic JSON endpoint as a secondary source:

```bash
WORLD_CUP_DATA_URL=https://your-api.example.com/worldcup2026/matches
```

The endpoint should return JSON shaped like `Match[]` (see `lib/types.ts`) or
`{ matches: Match[] }`.

## 🕒 IST timezone handling

All kickoff times are stored internally as UTC ISO timestamps. `lib/timezone.ts`
formats every date/time using `Intl.DateTimeFormat` with `timeZone:
"Asia/Kolkata"`, so visitors anywhere in the world see correct IST times.

## 📱 PWA

- `app/manifest.ts` generates `manifest.webmanifest`
- `public/sw.js` provides basic offline caching of the app shell and
  network-first caching for `/api/*`
- `components/ServiceWorkerRegister.tsx` registers the service worker on load

## 🎨 Customization

- Colors & theme: `tailwind.config.ts` (`wc.green`, `wc.gold`, `wc.purple`, …)
- Glassmorphism utilities: `app/globals.css` (`.glass`, `.glass-card`)
- Add/replace fixtures: `lib/data.ts`
- Add/replace teams or flags: `lib/teams.ts`
- Add/replace venues: `lib/venues.ts`
# fifawc2026
