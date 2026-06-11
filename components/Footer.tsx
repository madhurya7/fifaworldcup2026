import { formatISTDate, formatISTTime } from "@/lib/timezone";

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

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

        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
          <p className="flex flex-wrap items-center justify-center gap-1.5">
            <span>I am a passionate builder with a love for football. Connect with me on</span>
            <a
              href="https://www.linkedin.com/in/madhurya-gogoi-95501555"
              target="_blank"
              rel="noreferrer"
              aria-label="Connect with Madhurya on LinkedIn"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0A66C2]/10 px-2.5 py-1 font-medium text-[#0A66C2] underline decoration-dotted transition hover:bg-[#0A66C2]/20 dark:bg-[#0A66C2]/20 dark:text-sky-300"
            >
              <LinkedInIcon />
              Madhurya
            </a>
            <span>.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
