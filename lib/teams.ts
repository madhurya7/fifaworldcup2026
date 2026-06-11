import { Team } from "./types";

/**
 * All 48 qualified nations with display name and flag emoji.
 * England & Scotland use the Unicode regional flag tag sequences.
 */
export const TEAMS: Record<string, Team> = {
  MEX: { name: "Mexico", flag: "🇲🇽" },
  RSA: { name: "South Africa", flag: "🇿🇦" },
  KOR: { name: "South Korea", flag: "🇰🇷" },
  CZE: { name: "Czechia", flag: "🇨🇿" },

  CAN: { name: "Canada", flag: "🇨🇦" },
  BIH: { name: "Bosnia and Herzegovina", flag: "🇧🇦" },
  QAT: { name: "Qatar", flag: "🇶🇦" },
  SUI: { name: "Switzerland", flag: "🇨🇭" },

  BRA: { name: "Brazil", flag: "🇧🇷" },
  MAR: { name: "Morocco", flag: "🇲🇦" },
  HAI: { name: "Haiti", flag: "🇭🇹" },
  SCO: { name: "Scotland", flag: "🏴" },

  USA: { name: "United States", flag: "🇺🇸" },
  PAR: { name: "Paraguay", flag: "🇵🇾" },
  AUS: { name: "Australia", flag: "🇦🇺" },
  TUR: { name: "Türkiye", flag: "🇹🇷" },

  GER: { name: "Germany", flag: "🇩🇪" },
  CUW: { name: "Curaçao", flag: "🇨🇼" },
  CIV: { name: "Ivory Coast", flag: "🇨🇮" },
  ECU: { name: "Ecuador", flag: "🇪🇨" },

  NED: { name: "Netherlands", flag: "🇳🇱" },
  JPN: { name: "Japan", flag: "🇯🇵" },
  SWE: { name: "Sweden", flag: "🇸🇪" },
  TUN: { name: "Tunisia", flag: "🇹🇳" },

  BEL: { name: "Belgium", flag: "🇧🇪" },
  EGY: { name: "Egypt", flag: "🇪🇬" },
  IRN: { name: "Iran", flag: "🇮🇷" },
  NZL: { name: "New Zealand", flag: "🇳🇿" },

  ESP: { name: "Spain", flag: "🇪🇸" },
  CPV: { name: "Cape Verde", flag: "🇨🇻" },
  KSA: { name: "Saudi Arabia", flag: "🇸🇦" },
  URU: { name: "Uruguay", flag: "🇺🇾" },

  FRA: { name: "France", flag: "🇫🇷" },
  SEN: { name: "Senegal", flag: "🇸🇳" },
  IRQ: { name: "Iraq", flag: "🇮🇶" },
  NOR: { name: "Norway", flag: "🇳🇴" },

  ARG: { name: "Argentina", flag: "🇦🇷" },
  ALG: { name: "Algeria", flag: "🇩🇿" },
  AUT: { name: "Austria", flag: "🇦🇹" },
  JOR: { name: "Jordan", flag: "🇯🇴" },

  POR: { name: "Portugal", flag: "🇵🇹" },
  COD: { name: "DR Congo", flag: "🇨🇩" },
  UZB: { name: "Uzbekistan", flag: "🇺🇿" },
  COL: { name: "Colombia", flag: "🇨🇴" },

  ENG: { name: "England", flag: "🏴" },
  CRO: { name: "Croatia", flag: "🇭🇷" },
  GHA: { name: "Ghana", flag: "🇬🇭" },
  PAN: { name: "Panama", flag: "🇵🇦" },
};

/** Returns a Team for a known code, or a TBD placeholder for knockout slots. */
export function team(code: string): Team {
  return TEAMS[code] ?? { name: code, flag: "🏆" };
}

/** Build a placeholder "team" for knockout-stage slots not yet decided. */
export function tbd(label: string): Team {
  return { name: label, flag: "🏆" };
}

/** Group -> list of team codes, used for the Group Stage section & search. */
export const GROUPS: Record<string, string[]> = {
  A: ["MEX", "RSA", "KOR", "CZE"],
  B: ["CAN", "BIH", "QAT", "SUI"],
  C: ["BRA", "MAR", "HAI", "SCO"],
  D: ["USA", "PAR", "AUS", "TUR"],
  E: ["GER", "CUW", "CIV", "ECU"],
  F: ["NED", "JPN", "SWE", "TUN"],
  G: ["BEL", "EGY", "IRN", "NZL"],
  H: ["ESP", "CPV", "KSA", "URU"],
  I: ["FRA", "SEN", "IRQ", "NOR"],
  J: ["ARG", "ALG", "AUT", "JOR"],
  K: ["POR", "COD", "UZB", "COL"],
  L: ["ENG", "CRO", "GHA", "PAN"],
};
