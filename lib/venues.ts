import { Venue } from "./types";

export const VENUES: Venue[] = [
  {
    id: "azteca",
    name: "Estadio Azteca",
    city: "Mexico City, Mexico",
    country: "Mexico",
    timezone: "America/Mexico_City",
  },
  {
    id: "akron",
    name: "Estadio Akron",
    city: "Guadalajara, Mexico",
    country: "Mexico",
    timezone: "America/Mexico_City",
  },
  {
    id: "bbva",
    name: "Estadio BBVA",
    city: "Monterrey, Mexico",
    country: "Mexico",
    timezone: "America/Mexico_City",
  },
  {
    id: "bmo",
    name: "BMO Field",
    city: "Toronto, Canada",
    country: "Canada",
    timezone: "America/Toronto",
  },
  {
    id: "bcplace",
    name: "BC Place",
    city: "Vancouver, Canada",
    country: "Canada",
    timezone: "America/Vancouver",
  },
  {
    id: "att",
    name: "AT&T Stadium",
    city: "Dallas, USA",
    country: "USA",
    timezone: "America/Chicago",
  },
  {
    id: "nrg",
    name: "NRG Stadium",
    city: "Houston, USA",
    country: "USA",
    timezone: "America/Chicago",
  },
  {
    id: "sofi",
    name: "SoFi Stadium",
    city: "Los Angeles, USA",
    country: "USA",
    timezone: "America/Los_Angeles",
  },
  {
    id: "levis",
    name: "Levi's Stadium",
    city: "San Francisco Bay Area, USA",
    country: "USA",
    timezone: "America/Los_Angeles",
  },
  {
    id: "lumen",
    name: "Lumen Field",
    city: "Seattle, USA",
    country: "USA",
    timezone: "America/Los_Angeles",
  },
  {
    id: "mbs",
    name: "Mercedes-Benz Stadium",
    city: "Atlanta, USA",
    country: "USA",
    timezone: "America/New_York",
  },
  {
    id: "hardrock",
    name: "Hard Rock Stadium",
    city: "Miami, USA",
    country: "USA",
    timezone: "America/New_York",
  },
  {
    id: "lincoln",
    name: "Lincoln Financial Field",
    city: "Philadelphia, USA",
    country: "USA",
    timezone: "America/New_York",
  },
  {
    id: "gillette",
    name: "Gillette Stadium",
    city: "Boston, USA",
    country: "USA",
    timezone: "America/New_York",
  },
  {
    id: "arrowhead",
    name: "Arrowhead Stadium",
    city: "Kansas City, USA",
    country: "USA",
    timezone: "America/Chicago",
  },
  {
    id: "metlife",
    name: "MetLife Stadium",
    city: "New York / New Jersey, USA",
    country: "USA",
    timezone: "America/New_York",
  },
];

export const VENUE_MAP: Record<string, Venue> = Object.fromEntries(
  VENUES.map((v) => [v.id, v])
);
