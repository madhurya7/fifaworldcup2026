import { Match } from "@/lib/types";
import { VENUE_MAP } from "@/lib/venues";
import { formatISTDate, formatISTTime } from "@/lib/timezone";
import CountdownTimer from "./CountdownTimer";

export default function Hero({ nextMatch }: { nextMatch: Match | null }) {
  const venue = nextMatch ? VENUE_MAP[nextMatch.venueId] : null;

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-wc-gradient text-white"
    >
      <div className="absolute inset-0 bg-hero-grid bg-[length:24px_24px] opacity-30" />
      <div className="absolute -left-24 -top-24 h-72 w-72 animate-float rounded-full bg-wc-gold/20 blur-3xl" />
      <div className="absolute -right-16 bottom-0 h-80 w-80 animate-float rounded-full bg-wc-blue/30 blur-3xl [animation-delay:2s]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-16 text-center sm:px-6 sm:py-24">
        <span className="pill animate-fade-in border border-white/30 bg-white/10 backdrop-blur-md">
          🌎 USA · Mexico · Canada
        </span>

        <h1 className="animate-slide-up font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          FIFA World Cup 2026
          <span className="block bg-gradient-to-r from-wc-gold to-yellow-300 bg-clip-text text-transparent">
            Match Schedule
          </span>
        </h1>

        <p className="max-w-xl animate-slide-up text-balance text-sm text-white/80 sm:text-base [animation-delay:0.1s]">
          All 104 matches, 48 nations and 16 stadiums — every kickoff time
          converted to <strong>Indian Standard Time (IST)</strong> so you
          never miss a game.
        </p>

        {nextMatch && venue && (
          <div className="glass w-full max-w-2xl animate-slide-up rounded-3xl p-5 text-slate-900 [animation-delay:0.2s] dark:text-white sm:p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-wc-gold">
              ⏱ Countdown to Next Match
            </p>
            <div className="mb-4 flex items-center justify-center gap-3 text-xl font-bold sm:text-3xl">
              <span className="text-3xl sm:text-4xl">{nextMatch.home.flag}</span>
              <span>{nextMatch.home.name}</span>
              <span className="text-base font-normal text-slate-400 sm:text-lg">vs</span>
              <span>{nextMatch.away.name}</span>
              <span className="text-3xl sm:text-4xl">{nextMatch.away.flag}</span>
            </div>
            <div className="mb-5 flex justify-center">
              <CountdownTimer targetUTC={nextMatch.kickoffUTC} />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
              <span>📅 {formatISTDate(nextMatch.kickoffUTC)}</span>
              <span>🕒 {formatISTTime(nextMatch.kickoffUTC)}</span>
              <span>🏟 {venue.name}</span>
              <span>🏆 {nextMatch.group ? `Group ${nextMatch.group}` : nextMatch.stage}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
