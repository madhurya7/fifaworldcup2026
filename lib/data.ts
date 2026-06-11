import { Match, ScheduleData, Stage } from "./types";
import { team, tbd, GROUPS } from "./teams";
import { VENUES } from "./venues";

/**
 * ---------------------------------------------------------------------------
 * DATA SOURCE
 * ---------------------------------------------------------------------------
 * This file ships a curated seed schedule for the 2026 FIFA World Cup
 * (Group Stage fixtures based on the official FIFA group draw of
 * Dec 5, 2025 and published kickoff schedule; Knockout Stage uses the
 * official bracket structure with placeholder labels until group
 * results are known).
 *
 * To connect a LIVE data source, implement `fetchLiveSchedule()` below to
 * call a provider such as:
 *   - https://www.fifa.com (official fixtures API)
 *   - https://www.football-data.org/documentation/api (free tier)
 *   - https://www.thesportsdb.com/api.php
 *
 * `getSchedule()` is called from Server Components with Next.js fetch
 * caching/revalidation (see app/page.tsx, revalidate = 3600s), so once a
 * live source is wired up the whole site refreshes automatically every
 * hour without a redeploy. If the live fetch fails for any reason, we
 * gracefully fall back to this local seed data so the site never breaks.
 * ---------------------------------------------------------------------------
 */

// ---- Local time -> UTC ISO helpers (June/July 2026, North America DST in effect) ----
const ET = (m: number, d: number, h: number, min = 0) =>
  new Date(Date.UTC(2026, m - 1, d, h + 4, min)).toISOString(); // UTC-4
const CT = (m: number, d: number, h: number, min = 0) =>
  new Date(Date.UTC(2026, m - 1, d, h + 5, min)).toISOString(); // UTC-5
const PT = (m: number, d: number, h: number, min = 0) =>
  new Date(Date.UTC(2026, m - 1, d, h + 7, min)).toISOString(); // UTC-7
const MXT = (m: number, d: number, h: number, min = 0) =>
  new Date(Date.UTC(2026, m - 1, d, h + 6, min)).toISOString(); // UTC-6 (no DST)

let n = 0;
const next = () => ++n;

function group(
  group: string,
  homeCode: string,
  awayCode: string,
  kickoffUTC: string,
  venueId: string
): Match {
  return {
    id: `m${next()}`,
    matchNumber: n,
    stage: "Group Stage",
    group,
    home: team(homeCode),
    away: team(awayCode),
    kickoffUTC,
    venueId,
    isTBD: false,
  };
}

function knockout(
  stage: Stage,
  homeLabel: string,
  awayLabel: string,
  kickoffUTC: string,
  venueId: string
): Match {
  return {
    id: `m${next()}`,
    matchNumber: n,
    stage,
    home: tbd(homeLabel),
    away: tbd(awayLabel),
    kickoffUTC,
    venueId,
    isTBD: true,
  };
}

const GROUP_STAGE_MATCHES: Match[] = [
  // ---- Group A (Jun 11 - Jun 24) ----
  group("A", "MEX", "RSA", ET(6, 11, 15, 0), "azteca"),
  group("A", "KOR", "CZE", ET(6, 11, 22, 0), "akron"),
  group("A", "CZE", "RSA", ET(6, 18, 12, 0), "mbs"),
  group("A", "MEX", "KOR", ET(6, 18, 21, 0), "akron"),
  group("A", "CZE", "MEX", ET(6, 24, 21, 0), "azteca"),
  group("A", "RSA", "KOR", ET(6, 24, 21, 0), "bbva"),

  // ---- Group B (Jun 12 - Jun 24) ----
  group("B", "CAN", "BIH", ET(6, 12, 15, 0), "bmo"),
  group("B", "QAT", "SUI", ET(6, 13, 15, 0), "levis"),
  group("B", "SUI", "BIH", ET(6, 18, 15, 0), "sofi"),
  group("B", "CAN", "QAT", ET(6, 18, 18, 0), "bcplace"),
  group("B", "BIH", "QAT", ET(6, 24, 18, 0), "bcplace"),
  group("B", "SUI", "CAN", ET(6, 24, 21, 0), "sofi"),

  // ---- Group C (Jun 13 - Jun 24) ----
  group("C", "BRA", "SCO", ET(6, 13, 18, 0), "lincoln"),
  group("C", "MAR", "HAI", ET(6, 13, 21, 0), "att"),
  group("C", "SCO", "MAR", ET(6, 19, 18, 0), "gillette"),
  group("C", "BRA", "HAI", ET(6, 19, 21, 0), "lincoln"),
  group("C", "HAI", "SCO", ET(6, 24, 15, 0), "att"),
  group("C", "MAR", "BRA", ET(6, 24, 18, 0), "hardrock"),

  // ---- Group D (Jun 12 - Jun 25) ----
  group("D", "USA", "PAR", PT(6, 12, 18, 0), "sofi"),
  group("D", "AUS", "TUR", PT(6, 12, 21, 0), "lumen"),
  group("D", "USA", "AUS", PT(6, 19, 12, 0), "lumen"),
  group("D", "TUR", "PAR", PT(6, 19, 21, 0), "levis"),
  group("D", "PAR", "AUS", CT(6, 25, 18, 0), "att"),
  group("D", "TUR", "USA", PT(6, 25, 18, 0), "sofi"),

  // ---- Group E (Jun 14 - Jun 25) ----
  group("E", "GER", "CUW", CT(6, 14, 12, 0), "nrg"),
  group("E", "CIV", "ECU", ET(6, 14, 19, 0), "lincoln"),
  group("E", "GER", "CIV", ET(6, 20, 16, 0), "bmo"),
  group("E", "ECU", "CUW", CT(6, 20, 19, 0), "arrowhead"),
  group("E", "CUW", "CIV", ET(6, 25, 21, 0), "mbs"),
  group("E", "ECU", "GER", CT(6, 25, 18, 0), "nrg"),

  // ---- Group F (Jun 14 - Jun 25) ----
  group("F", "NED", "JPN", CT(6, 14, 15, 0), "att"),
  group("F", "SWE", "TUN", MXT(6, 14, 20, 0), "bbva"),
  group("F", "NED", "SWE", CT(6, 20, 12, 0), "nrg"),
  group("F", "TUN", "JPN", MXT(6, 20, 20, 0), "bbva"),
  group("F", "JPN", "SWE", PT(6, 25, 18, 0), "levis"),
  group("F", "TUN", "NED", CT(6, 25, 18, 0), "att"),

  // ---- Group G (Jun 15 - Jun 26) ----
  group("G", "BEL", "EGY", PT(6, 15, 15, 0), "lumen"),
  group("G", "IRN", "NZL", PT(6, 15, 21, 0), "sofi"),
  group("G", "BEL", "IRN", ET(6, 21, 18, 0), "mbs"),
  group("G", "EGY", "NZL", ET(6, 21, 21, 0), "hardrock"),
  group("G", "NZL", "BEL", PT(6, 26, 18, 0), "bcplace"),
  group("G", "EGY", "IRN", PT(6, 26, 21, 0), "lumen"),

  // ---- Group H (Jun 15 - Jun 26) ----
  group("H", "ESP", "CPV", ET(6, 15, 12, 0), "mbs"),
  group("H", "KSA", "URU", ET(6, 15, 18, 0), "hardrock"),
  group("H", "ESP", "KSA", CT(6, 21, 18, 0), "att"),
  group("H", "CPV", "URU", MXT(6, 21, 18, 0), "bbva"),
  group("H", "URU", "ESP", ET(6, 26, 21, 0), "hardrock"),
  group("H", "CPV", "KSA", MXT(6, 26, 18, 0), "akron"),

  // ---- Group I (Jun 16 - Jun 26) ----
  group("I", "FRA", "SEN", ET(6, 16, 15, 0), "metlife"),
  group("I", "IRQ", "NOR", ET(6, 16, 18, 0), "gillette"),
  group("I", "FRA", "IRQ", ET(6, 22, 18, 0), "lincoln"),
  group("I", "SEN", "NOR", ET(6, 22, 21, 0), "bmo"),
  group("I", "NOR", "FRA", ET(6, 26, 21, 0), "metlife"),
  group("I", "SEN", "IRQ", ET(6, 26, 18, 0), "gillette"),

  // ---- Group J (Jun 16 - Jun 27) ----
  group("J", "ARG", "ALG", CT(6, 16, 20, 0), "arrowhead"),
  group("J", "AUT", "JOR", PT(6, 16, 18, 0), "levis"),
  group("J", "ARG", "AUT", CT(6, 22, 18, 0), "att"),
  group("J", "ALG", "JOR", PT(6, 22, 15, 0), "sofi"),
  group("J", "JOR", "ARG", PT(6, 27, 18, 0), "lumen"),
  group("J", "ALG", "AUT", MXT(6, 27, 17, 0), "bbva"),

  // ---- Group K (Jun 17 - Jun 27) ----
  group("K", "POR", "COD", ET(6, 17, 18, 0), "mbs"),
  group("K", "UZB", "COL", MXT(6, 17, 17, 0), "akron"),
  group("K", "POR", "UZB", ET(6, 23, 15, 0), "lincoln"),
  group("K", "COD", "COL", ET(6, 23, 18, 0), "hardrock"),
  group("K", "COL", "POR", CT(6, 27, 18, 0), "att"),
  group("K", "COD", "UZB", MXT(6, 27, 17, 0), "bbva"),

  // ---- Group L (Jun 17 - Jun 27) ----
  group("L", "ENG", "CRO", PT(6, 17, 15, 0), "bcplace"),
  group("L", "GHA", "PAN", PT(6, 17, 18, 0), "sofi"),
  group("L", "ENG", "GHA", ET(6, 22, 18, 0), "bmo"),
  group("L", "CRO", "PAN", ET(6, 22, 21, 0), "gillette"),
  group("L", "PAN", "ENG", ET(6, 27, 21, 0), "lincoln"),
  group("L", "CRO", "GHA", ET(6, 27, 18, 0), "metlife"),
];

const KNOCKOUT_MATCHES: Match[] = [
  // ---- Round of 32 (Jun 28 - Jul 3) ----
  knockout("Round of 32", "Winner Group A", "Runner-up Group B", MXT(6, 28, 17, 0), "akron"),
  knockout("Round of 32", "Winner Group B", "Runner-up Group A", ET(6, 28, 12, 0), "lincoln"),
  knockout("Round of 32", "Winner Group C", "Runner-up Group D", ET(6, 28, 18, 0), "bmo"),
  knockout("Round of 32", "Winner Group D", "Runner-up Group C", ET(6, 29, 15, 0), "mbs"),
  knockout("Round of 32", "Winner Group E", "Runner-up Group F", ET(6, 29, 17, 0), "metlife"),
  knockout("Round of 32", "Winner Group F", "Runner-up Group E", MXT(6, 29, 18, 0), "bbva"),
  knockout("Round of 32", "Winner Group G", "Runner-up Group H", CT(6, 30, 12, 0), "att"),
  knockout("Round of 32", "Winner Group H", "Runner-up Group G", PT(6, 30, 12, 0), "lumen"),
  knockout("Round of 32", "Winner Group I", "Runner-up Group J", ET(6, 30, 18, 0), "hardrock"),
  knockout("Round of 32", "Winner Group J", "Runner-up Group I", PT(7, 1, 12, 0), "sofi"),
  knockout("Round of 32", "Winner Group K", "Runner-up Group L", ET(7, 1, 15, 0), "gillette"),
  knockout("Round of 32", "Winner Group L", "Runner-up Group K", PT(7, 1, 15, 0), "bcplace"),
  knockout("Round of 32", "Best Third-Placed Team 1", "Best Third-Placed Team 2", ET(7, 2, 15, 0), "lincoln"),
  knockout("Round of 32", "Best Third-Placed Team 3", "Best Third-Placed Team 4", CT(7, 2, 18, 0), "nrg"),
  knockout("Round of 32", "Best Third-Placed Team 5", "Best Third-Placed Team 6", ET(7, 3, 15, 0), "metlife"),
  knockout("Round of 32", "Best Third-Placed Team 7", "Best Third-Placed Team 8", PT(7, 3, 15, 0), "sofi"),

  // ---- Round of 16 (Jul 4 - Jul 7) ----
  knockout("Round of 16", "Winner Match 73", "Winner Match 74", CT(7, 4, 15, 0), "att"),
  knockout("Round of 16", "Winner Match 75", "Winner Match 76", PT(7, 4, 15, 0), "sofi"),
  knockout("Round of 16", "Winner Match 77", "Winner Match 78", ET(7, 5, 15, 0), "mbs"),
  knockout("Round of 16", "Winner Match 79", "Winner Match 80", ET(7, 5, 18, 0), "metlife"),
  knockout("Round of 16", "Winner Match 81", "Winner Match 82", ET(7, 6, 15, 0), "lincoln"),
  knockout("Round of 16", "Winner Match 83", "Winner Match 84", PT(7, 6, 15, 0), "lumen"),
  knockout("Round of 16", "Winner Match 85", "Winner Match 86", ET(7, 7, 15, 0), "hardrock"),
  knockout("Round of 16", "Winner Match 87", "Winner Match 88", ET(7, 7, 18, 0), "gillette"),

  // ---- Quarter Finals (Jul 9 - Jul 11) ----
  knockout("Quarter Final", "Winner Match 89", "Winner Match 90", ET(7, 9, 15, 0), "gillette"),
  knockout("Quarter Final", "Winner Match 91", "Winner Match 92", PT(7, 10, 15, 0), "sofi"),
  knockout("Quarter Final", "Winner Match 93", "Winner Match 94", CT(7, 11, 15, 0), "att"),
  knockout("Quarter Final", "Winner Match 95", "Winner Match 96", ET(7, 11, 18, 0), "mbs"),

  // ---- Semi Finals ----
  knockout("Semi Final", "Winner Match 97", "Winner Match 98", CT(7, 14, 15, 0), "att"),
  knockout("Semi Final", "Winner Match 99", "Winner Match 100", ET(7, 15, 15, 0), "mbs"),

  // ---- Third Place Play-off ----
  knockout("Third Place Play-off", "Loser Match 101", "Loser Match 102", ET(7, 18, 15, 0), "hardrock"),

  // ---- Final ----
  knockout("Final", "Winner Match 101", "Winner Match 102", ET(7, 19, 15, 0), "metlife"),
];

const SEED_MATCHES: Match[] = [...GROUP_STAGE_MATCHES, ...KNOCKOUT_MATCHES];

/**
 * Attempts to fetch a live, third-party schedule. Returns null on any
 * failure so callers fall back to the bundled seed data. Swap the URL/
 * mapping below for your chosen provider when you have an API key.
 */
async function fetchLiveSchedule(): Promise<Match[] | null> {
  const liveUrl = process.env.WORLD_CUP_DATA_URL;
  if (!liveUrl) return null;

  try {
    const res = await fetch(liveUrl, {
      next: { revalidate: 3600 }, // re-fetch at most once per hour
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const json = await res.json();
    // Expecting the same shape as `Match[]`. Adjust this mapping to match
    // your provider's response format.
    if (Array.isArray(json)) return json as Match[];
    if (Array.isArray(json?.matches)) return json.matches as Match[];
    return null;
  } catch {
    return null;
  }
}

export async function getSchedule(): Promise<ScheduleData> {
  const live = await fetchLiveSchedule();
  return {
    matches: live ?? SEED_MATCHES,
    venues: VENUES,
    lastUpdated: new Date().toISOString(),
    source: live
      ? process.env.WORLD_CUP_DATA_URL ?? "Live data source"
      : "FIFA World Cup 2026 official draw & schedule (seed dataset)",
  };
}

export function getGroups() {
  return GROUPS;
}
