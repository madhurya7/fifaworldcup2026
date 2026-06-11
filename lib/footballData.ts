import { Match, MatchStatus, Score, Stage, Team } from "./types";
import { TEAMS, tbd } from "./teams";
import { VENUES } from "./venues";

/**
 * ---------------------------------------------------------------------------
 * football-data.org v4 integration
 * ---------------------------------------------------------------------------
 * Docs: https://www.football-data.org/documentation/quickstart
 *
 * Auth: every request must include header `X-Auth-Token: <your token>`.
 * Set FOOTBALL_DATA_API_TOKEN in your environment (see .env.local.example).
 *
 * Endpoint used: GET /v4/competitions/WC/matches
 *   "WC" = FIFA World Cup competition code in football-data.org.
 *
 * This module ONLY runs server-side (Server Components / Route Handlers),
 * so the token is never exposed to the browser.
 * ---------------------------------------------------------------------------
 */

const API_BASE = "https://api.football-data.org/v4";
const COMPETITION_CODE = "WC"; // FIFA World Cup
const SEASON_YEAR = 2026;

// How often Next.js is allowed to re-fetch from football-data.org.
// football-data.org's free tier allows 10 requests/minute, so 60s is safe
// while still feeling "real-time" for live scores.
export const LIVE_REVALIDATE_SECONDS = 60;

const STAGE_MAP: Record<string, Stage> = {
  GROUP_STAGE: "Group Stage",
  LAST_32: "Round of 32",
  ROUND_OF_32: "Round of 32",
  LAST_16: "Round of 16",
  ROUND_OF_16: "Round of 16",
  QUARTER_FINALS: "Quarter Final",
  SEMI_FINALS: "Semi Final",
  THIRD_PLACE: "Third Place Play-off",
  FINAL: "Final",
};

/**
 * football-data.org sometimes uses slightly different country names than
 * our local TEAMS table (lib/teams.ts). Map those here so flags/names match.
 */
const NAME_ALIASES: Record<string, string> = {
  "Korea Republic": "South Korea",
  "Korea, South": "South Korea",
  "South Korea Republic": "South Korea",
  "IR Iran": "Iran",
  "Islamic Republic of Iran": "Iran",
  "United States": "United States",
  USA: "United States",
  "United States of America": "United States",
  "Côte d'Ivoire": "Ivory Coast",
  "Cote d'Ivoire": "Ivory Coast",
  "Ivory Coast": "Ivory Coast",
  "Cabo Verde": "Cape Verde",
  "Czech Republic": "Czechia",
  Czechia: "Czechia",
  Türkiye: "Türkiye",
  Turkey: "Türkiye",
  "DR Congo": "DR Congo",
  "Congo DR": "DR Congo",
  "Bosnia & Herzegovina": "Bosnia and Herzegovina",
};

const TEAMS_BY_NAME: Map<string, Team> = new Map(
  Object.values(TEAMS).map((t) => [t.name.toLowerCase(), t])
);

interface ApiTeam {
  id: number | null;
  name: string | null;
  shortName?: string | null;
  tla?: string | null;
  crest?: string | null;
}

interface ApiMatch {
  id: number;
  utcDate: string;
  status: MatchStatus;
  minute?: number | null;
  stage: string;
  group?: string | null;
  matchday?: number | null;
  venue?: string | null;
  lastUpdated?: string;
  homeTeam: ApiTeam;
  awayTeam: ApiTeam;
  score?: {
    winner?: Score["winner"];
    fullTime?: { home: number | null; away: number | null };
  };
}

function resolveTeam(apiTeam: ApiTeam): Team {
  const rawName = apiTeam?.name ?? apiTeam?.shortName ?? "TBD";
  const aliased = NAME_ALIASES[rawName] ?? rawName;
  const known = TEAMS_BY_NAME.get(aliased.toLowerCase());
  if (known) {
    return apiTeam.crest ? { ...known, crest: apiTeam.crest } : known;
  }
  // Unknown / not-yet-confirmed team (knockout placeholder)
  return apiTeam.crest
    ? { name: rawName, flag: "🏆", crest: apiTeam.crest }
    : tbd(rawName);
}

/** football-data.org sends groups as e.g. "GROUP_A" -> we want "A" */
function extractGroupLetter(group?: string | null): string | undefined {
  if (!group) return undefined;
  const match = group.match(/([A-L])$/);
  return match ? match[1] : undefined;
}

/** Best-effort match of the API's free-text venue name to one of our 16 stadiums. */
function resolveVenueId(venueName?: string | null): string {
  if (venueName) {
    const normalized = venueName.toLowerCase();
    const found = VENUES.find(
      (v) =>
        normalized.includes(v.name.toLowerCase()) ||
        v.name.toLowerCase().includes(normalized) ||
        normalized.includes(v.city.toLowerCase().split(",")[0])
    );
    if (found) return found.id;
  }
  return "metlife"; // sensible fallback
}

function mapApiMatch(m: ApiMatch): Match {
  const stage = STAGE_MAP[m.stage] ?? "Group Stage";
  const home = resolveTeam(m.homeTeam);
  const away = resolveTeam(m.awayTeam);
  const isTBD = !m.homeTeam?.name || !m.awayTeam?.name;

  const score: Score = {
    home: m.score?.fullTime?.home ?? null,
    away: m.score?.fullTime?.away ?? null,
    winner: m.score?.winner ?? null,
  };

  return {
    id: `fd-${m.id}`,
    matchNumber: m.matchday ?? 0,
    stage,
    group: extractGroupLetter(m.group),
    home,
    away,
    kickoffUTC: m.utcDate,
    venueId: resolveVenueId(m.venue),
    isTBD,
    status: m.status,
    minute: m.minute ?? null,
    score,
    lastUpdatedUTC: m.lastUpdated,
  };
}

/**
 * Fetches the full World Cup 2026 schedule (with live scores/status where
 * available) from football-data.org. Returns null if the token is missing,
 * the request fails, or the response doesn't contain 2026 fixtures yet —
 * callers should fall back to the bundled seed schedule in that case.
 */
export async function fetchFootballDataSchedule(): Promise<Match[] | null> {
  const token = process.env.FOOTBALL_DATA_API_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch(
      `${API_BASE}/competitions/${COMPETITION_CODE}/matches?season=${SEASON_YEAR}`,
      {
        headers: { "X-Auth-Token": token },
        // Re-validated frequently so live scores stay fresh, but capped to
        // respect football-data.org's free-tier rate limit (10 req/min).
        next: { revalidate: LIVE_REVALIDATE_SECONDS },
      }
    );

    if (!res.ok) {
      console.error(
        `[football-data] request failed: ${res.status} ${res.statusText}`
      );
      return null;
    }

    const json = await res.json();
    const rawMatches: ApiMatch[] | undefined = json?.matches;
    if (!Array.isArray(rawMatches) || rawMatches.length === 0) return null;

    const matches = rawMatches
      .map(mapApiMatch)
      .filter((m) => new Date(m.kickoffUTC).getUTCFullYear() === SEASON_YEAR);

    return matches.length > 0 ? matches : null;
  } catch (err) {
    console.error("[football-data] fetch error:", err);
    return null;
  }
}
