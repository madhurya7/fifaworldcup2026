import { Match } from "@/lib/types";
import { istDateKey } from "@/lib/timezone";
import MatchCard from "./MatchCard";
import EmptyState from "./EmptyState";

export default function TodaysMatches({ matches }: { matches: Match[] }) {
  const todayKey = istDateKey(new Date().toISOString());
  const todays = matches
    .filter((m) => istDateKey(m.kickoffUTC) === todayKey)
    .sort((a, b) => new Date(a.kickoffUTC).getTime() - new Date(b.kickoffUTC).getTime());

  return (
    <section id="today" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-3xl">🔥</span>
        <h2 className="section-heading">Today&apos;s Matches (IST)</h2>
      </div>

      {todays.length === 0 ? (
        <EmptyState
          title="No matches scheduled for today"
          message="Check the Upcoming Matches section below for the next fixtures, all converted to IST."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {todays.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      )}
    </section>
  );
}
