export type Stage =
  | "Group Stage"
  | "Round of 32"
  | "Round of 16"
  | "Quarter Final"
  | "Semi Final"
  | "Third Place Play-off"
  | "Final";

export const STAGE_ORDER: Stage[] = [
  "Group Stage",
  "Round of 32",
  "Round of 16",
  "Quarter Final",
  "Semi Final",
  "Third Place Play-off",
  "Final",
];

export interface Venue {
  id: string;
  name: string;
  city: string;
  country: "USA" | "Mexico" | "Canada";
  timezone: string; // IANA timezone
}

export interface Team {
  name: string;
  flag: string; // emoji
  /** Optional team crest image URL, supplied by live data sources */
  crest?: string;
}

export type MatchStatus =
  | "SCHEDULED"
  | "TIMED"
  | "IN_PLAY"
  | "PAUSED"
  | "LIVE"
  | "FINISHED"
  | "POSTPONED"
  | "SUSPENDED"
  | "CANCELLED"
  | "AWARDED";

export interface Score {
  home: number | null;
  away: number | null;
  winner?: "HOME_TEAM" | "AWAY_TEAM" | "DRAW" | null;
}

export interface Match {
  id: string;
  matchNumber: number;
  stage: Stage;
  group?: string; // "A" - "L" for group stage matches
  home: Team;
  away: Team;
  /** ISO 8601 UTC kickoff timestamp */
  kickoffUTC: string;
  venueId: string;
  /** True if either side is still undecided (knockout placeholders) */
  isTBD: boolean;
  /** Live match status, when available from a live data source */
  status?: MatchStatus;
  /** Current match minute, when live */
  minute?: number | null;
  /** Live/finished score, when available */
  score?: Score;
  /** When this match record was last updated by the data source (UTC ISO) */
  lastUpdatedUTC?: string;
}

export interface ScheduleData {
  matches: Match[];
  venues: Venue[];
  lastUpdated: string;
  source: string;
}
