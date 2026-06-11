import { formatISTDate, formatISTTime } from "@/lib/timezone";

export default function Footer({
  lastUpdated,
  source,
}: {
  lastUpdated: string;
  source: string;
}) {
  return (
    <footer className="border-t border-slate-200/60 bg-white/40 py-10 dark:border-white/10 dark:bg-black/20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center sm:px-6">
        <div className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="text-2xl">⚽</span>
          <span className="bg-gradient-to-r from-wc-green via-wc-gold to-wc-blue bg-clip-text text-transparent">
            WC 2026 Schedule
          </span>
        </div>

        <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">
          A simple, fast, mobile-friendly schedule for the FIFA World Cup 2026 —
          all kickoff times shown in Indian Standard Time (IST).
        </p>

        <div className="flex flex-col gap-1 text-xs text-slate-400 dark:text-slate-500">
          <span>
            🕒 Last updated: {formatISTDate(lastUpdated)} at {formatISTTime(lastUpdated)}
          </span>
          <span>📊 Data source: {source}</span>
          <span>
            Schedule details verified against{" "}
            <a
              href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-dotted hover:text-wc-green"
            >
              FIFA.com
            </a>
            . Knockout matchups update automatically once group results are confirmed.
          </span>
        </div>

        <p className="text-[11px] text-slate-400 dark:text-slate-600">
          © 2026 World Cup Schedule. Not affiliated with FIFA. Built for fans, by fans.
        </p>
      </div>
    </footer>
  );
}
