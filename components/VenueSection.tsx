import { Match, Venue } from "@/lib/types";

const COUNTRY_FLAGS: Record<string, string> = {
  USA: "🇺🇸",
  Mexico: "🇲🇽",
  Canada: "🇨🇦",
};

export default function VenueSection({
  matches,
  venues,
}: {
  matches: Match[];
  venues: Venue[];
}) {
  const counts = new Map<string, number>();
  matches.forEach((m) => counts.set(m.venueId, (counts.get(m.venueId) ?? 0) + 1));

  const sorted = [...venues].sort(
    (a, b) => (counts.get(b.id) ?? 0) - (counts.get(a.id) ?? 0)
  );

  return (
    <section id="venues" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-3xl">🏟</span>
        <h2 className="section-heading">Stadiums &amp; Venues</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sorted.map((v) => (
          <div key={v.id} className="glass-card flex flex-col gap-2 p-4">
            <div className="flex items-start justify-between">
              <span className="text-2xl">{COUNTRY_FLAGS[v.country]}</span>
              <span className="pill bg-wc-green/10 text-wc-green dark:bg-wc-green/20 dark:text-emerald-300">
                {counts.get(v.id) ?? 0} matches
              </span>
            </div>
            <h3 className="font-display text-base font-bold leading-tight">{v.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{v.city}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
