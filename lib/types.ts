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
}

export interface ScheduleData {
  matches: Match[];
  venues: Venue[];
  lastUpdated: string;
  source: string;
}
