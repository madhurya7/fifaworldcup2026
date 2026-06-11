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
  types.ts      # Match / Venue / Team types
  data.ts       # Schedule dataset + getSchedule()
  teams.ts      # 48 nations: names + flag emojis, group lineups
  venues.ts     # 16 stadiums with timezones
  timezone.ts   # IST formatting & countdown helpers
```

## 🌐 Data source & automatic updates

`lib/data.ts` ships a curated **seed schedule** for all 104 matches:

- **Group Stage (72 matches)** — based on the official FIFA group draw
  (Dec 5, 2025) and the published kickoff schedule for groups A–L.
- **Knockout Stage (32 matches)** — official bracket structure (Round of 32 →
  Final) with placeholder labels (e.g. *"Winner Group A"*) until group results
  are known.

### Connecting a live data source

`getSchedule()` already supports live data. Set an environment variable:

```bash
WORLD_CUP_DATA_URL=https://your-api.example.com/worldcup2026/matches
```

The endpoint should return JSON shaped like `Match[]` (see `lib/types.ts`) or
`{ matches: Match[] }`. Good public sources to adapt:

- [football-data.org](https://www.football-data.org/documentation/api)
- [TheSportsDB](https://www.thesportsdb.com/api.php)
- FIFA's own published fixtures feed

The page (`app/page.tsx`) and API route (`app/api/matches/route.ts`) both use
`revalidate = 3600`, so once a live source is configured, the **entire site
refreshes automatically every hour** — no redeploy needed. If the live fetch
fails for any reason, the app gracefully **falls back to the bundled seed
data** so the site never breaks.

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
# fifaworldcup2026
