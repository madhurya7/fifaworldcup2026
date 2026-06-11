import { Match, Venue } from "@/lib/types";
import { VENUE_MAP } from "@/lib/venues";

export default function StructuredData({ matches }: { matches: Match[] }) {
  // Limit to next 20 upcoming matches to keep the payload light.
  const now = Date.now();
  const upcoming = matches
    .filter((m) => new Date(m.kickoffUTC).getTime() > now)
    .sort((a, b) => new Date(a.kickoffUTC).getTime() - new Date(b.kickoffUTC).getTime())
    .slice(0, 20);

  const events = upcoming.map((m) => {
    const venue: Venue = VENUE_MAP[m.venueId];
    return {
      "@type": "SportsEvent",
      name: `${m.home.name} vs ${m.away.name}`,
      sport: "Soccer",
      startDate: m.kickoffUTC,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: venue.name,
        address: venue.city,
      },
      competitor: [
        { "@type": "SportsTeam", name: m.home.name },
        { "@type": "SportsTeam", name: m.away.name },
      ],
      superEvent: {
        "@type": "SportsEvent",
        name: "FIFA World Cup 2026",
      },
    };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "FIFA World Cup 2026 Schedule",
        url: "https://worldcup2026-schedule.example.com",
      },
      ...events,
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
