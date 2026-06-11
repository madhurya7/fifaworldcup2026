"use client";

import { Match } from "@/lib/types";
import { VENUE_MAP } from "@/lib/venues";
import { formatISTDate, formatISTTime, formatISTWeekday, relativeISTDateLabel } from "@/lib/timezone";
import CountdownTimer from "./CountdownTimer";

const STAGE_STYLES: Record<string, string> = {
  "Group Stage": "bg-wc-green/15 text-wc-green dark:bg-wc-green/25 dark:text-emerald-300",
  "Round of 32": "bg-wc-blue/15 text-wc-blue dark:bg-wc-blue/25 dark:text-sky-300",
  "Round of 16": "bg-indigo-500/15 text-indigo-600 dark:bg-indigo-500/25 dark:text-indigo-300",
  "Quarter Final": "bg-wc-purple/15 text-wc-purple dark:bg-wc-purple/25 dark:text-violet-300",
  "Semi Final": "bg-orange-500/15 text-orange-600 dark:bg-orange-500/25 dark:text-orange-300",
  "Third Place Play-off": "bg-slate-500/15 text-slate-600 dark:bg-slate-400/20 dark:text-slate-300",
  Final: "bg-wc-gold/20 text-amber-600 dark:bg-wc-gold/25 dark:text-wc-gold",
};

const LIVE_STATUSES = new Set(["IN_PLAY", "PAUSED", "LIVE"]);

function TeamCrest({ flag, crest, name }: { flag: string; crest?: string; name: string }) {
  if (crest) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={crest} alt={`${name} crest`} className="h-10 w-10 object-contain sm:h-12 sm:w-12" />;
  }
  return <span className="text-4xl sm:text-5xl">{flag}</span>;
}

export default function MatchCard({
  match,
  highlight = false,
}: {
  match: Match;
  highlight?: boolean;
}) {
  const venue = VENUE_MAP[match.venueId];
  const stageLabel = match.group ? `Group ${match.group}` : match.stage;

  const isLive = !!match.status && LIVE_STATUSES.has(match.status);
  const isFinished = match.status === "FINISHED";
  const hasScore =
    match.score && (match.score.home !== null || match.score.away !== null);

  const handleShare = async () => {
    const scoreText = hasScore
      ? ` (${match.score!.home} - ${match.score!.away})`
      : "";
    const text = `${match.home.flag} ${match.home.name} vs ${match.away.name}${scoreText} ${match.away.flag}\n📅 ${formatISTDate(
      match.kickoffUTC
    )} 🕒 ${formatISTTime(match.kickoffUTC)} 🏟 ${venue.name} 🏆 ${stageLabel}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "FIFA World Cup 2026", text });
      } catch {
        /* user cancelled */
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      alert("Match details copied to clipboard!");
    }
  };

  return (
    <article
      className={`glass-card flex flex-col gap-4 p-4 sm:p-5 ${
        highlight ? "ring-2 ring-wc-gold/70" : ""
      } ${isLive ? "ring-2 ring-wc-red/60" : ""}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className={`pill ${STAGE_STYLES[match.stage] ?? STAGE_STYLES["Group Stage"]}`}>
          🏆 {stageLabel}
        </span>
        {isLive && (
          <span className="pill animate-pulse bg-wc-red/15 text-wc-red dark:bg-wc-red/25">
            🔴 LIVE{match.minute ? ` · ${match.minute}'` : ""}
          </span>
        )}
        {!isLive && highlight && (
          <span className="pill bg-wc-gold/20 text-amber-600 dark:text-wc-gold">
            ⭐ Next Up
          </span>
        )}
        {isFinished && (
          <span className="pill bg-slate-500/15 text-slate-600 dark:bg-white/10 dark:text-slate-300">
            ✅ Full Time
          </span>
        )}
        <span className="pill bg-slate-500/10 text-slate-600 dark:bg-white/10 dark:text-slate-300">
          {relativeISTDateLabel(match.kickoffUTC)}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 text-center">
        <div className="flex flex-1 flex-col items-center gap-1">
          <TeamCrest flag={match.home.flag} crest={match.home.crest} name={match.home.name} />
          <span className="text-sm font-semibold sm:text-base">{match.home.name}</span>
        </div>

        <div className="flex flex-col items-center gap-1 px-2">
          {isLive || isFinished ? (
            hasScore ? (
              <span className="font-display text-2xl font-bold tabular-nums sm:text-3xl">
                {match.score!.home ?? "-"} : {match.score!.away ?? "-"}
              </span>
            ) : (
              <span className="font-display text-lg font-bold text-slate-400 sm:text-xl">VS</span>
            )
          ) : (
            <>
              <span className="font-display text-lg font-bold text-slate-400 sm:text-xl">VS</span>
              <CountdownTimer targetUTC={match.kickoffUTC} compact />
            </>
          )}
        </div>

        <div className="flex flex-1 flex-col items-center gap-1">
          <TeamCrest flag={match.away.flag} crest={match.away.crest} name={match.away.name} />
          <span className="text-sm font-semibold sm:text-base">{match.away.name}</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 border-t border-slate-200/60 pt-3 text-xs text-slate-600 dark:border-white/10 dark:text-slate-300 sm:text-sm">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>📅 {formatISTWeekday(match.kickoffUTC)}, {formatISTDate(match.kickoffUTC)}</span>
          <span>🕒 {formatISTTime(match.kickoffUTC)}</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span>🏟 {venue.name} · {venue.city}</span>
          <button
            onClick={handleShare}
            className="pill bg-wc-green/10 text-wc-green transition hover:bg-wc-green/20 dark:bg-wc-green/20 dark:text-emerald-300"
            aria-label="Share match"
          >
            🔗 Share
          </button>
        </div>
      </div>
    </article>
  );
}
