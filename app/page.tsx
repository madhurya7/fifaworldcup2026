import { getSchedule } from "@/lib/data";
import { LIVE_REVALIDATE_SECONDS } from "@/lib/footballData";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TodaysMatches from "@/components/TodaysMatches";
import ScheduleExplorer from "@/components/ScheduleExplorer";
import GroupStageSection from "@/components/GroupStageSection";
import KnockoutSection from "@/components/KnockoutSection";
import VenueSection from "@/components/VenueSection";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import EmptyState from "@/components/EmptyState";

// Re-fetch / revalidate the schedule frequently so live scores and
// schedule changes from football-data.org show up automatically.
export const revalidate = LIVE_REVALIDATE_SECONDS;

export default async function HomePage() {
  let schedule;
  try {
    schedule = await getSchedule();
  } catch {
    schedule = null;
  }

  if (!schedule || schedule.matches.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="mx-auto flex w-full max-w-2xl flex-1 items-center justify-center px-4 py-24">
          <EmptyState
            title="Schedule temporarily unavailable"
            message="We couldn't load the FIFA World Cup 2026 schedule right now. Please refresh the page in a few minutes."
          />
        </main>
      </div>
    );
  }

  const { matches, venues, lastUpdated, source } = schedule;

  const now = Date.now();
  const upcomingAll = matches
    .filter((m) => new Date(m.kickoffUTC).getTime() > now)
    .sort((a, b) => new Date(a.kickoffUTC).getTime() - new Date(b.kickoffUTC).getTime());

  const groupStageMatches = matches.filter((m) => m.stage === "Group Stage");
  const knockoutMatches = matches.filter((m) => m.stage !== "Group Stage");

  return (
    <div className="flex min-h-screen flex-col">
      <StructuredData matches={matches} />
      <Navbar />
      <Hero nextMatch={upcomingAll[0] ?? null} />

      <main className="flex-1">
        <TodaysMatches matches={matches} />

        <section id="upcoming" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-3xl">📆</span>
            <h2 className="section-heading">Upcoming Matches</h2>
          </div>
          <ScheduleExplorer matches={matches} />
        </section>

        <GroupStageSection matches={groupStageMatches} />
        <KnockoutSection matches={knockoutMatches} />
        <VenueSection matches={matches} venues={venues} />
      </main>

      <Footer lastUpdated={lastUpdated} source={source} />
    </div>
  );
}
