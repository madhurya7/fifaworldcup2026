"use client";

import { useState } from "react";
import { Match, Stage } from "@/lib/types";
import MatchCard from "./MatchCard";

const KNOCKOUT_STAGES: Stage[] = [
  "Round of 32",
  "Round of 16",
  "Quarter Final",
  "Semi Final",
  "Third Place Play-off",
  "Final",
];

export default function KnockoutSection({ matches }: { matches: Match[] }) {
  const [activeStage, setActiveStage] = useState<Stage>("Round of 32");

  const stageMatches = matches
    .filter((m) => m.stage === activeStage)
    .sort((a, b) => new Date(a.kickoffUTC).getTime() - new Date(b.kickoffUTC).getTime());

  return (
    <section id="knockout" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-3xl">🏆</span>
        <h2 className="section-heading">Knockout Stage Schedule</h2>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {KNOCKOUT_STAGES.map((s) => (
          <button
            key={s}
            onClick={() => setActiveStage(s)}
            className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
              activeStage === s
                ? "bg-wc-purple text-white shadow-lg shadow-wc-purple/30"
                : "glass-card text-slate-600 hover:text-wc-purple dark:text-slate-300"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {stageMatches.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Fixtures for this stage will appear here once group results are confirmed.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stageMatches.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      )}

      <p className="mt-6 text-xs text-slate-400 dark:text-slate-500">
        ℹ️ Knockout matchups (e.g. &quot;Winner Group A&quot;) will be replaced with confirmed
        team names automatically once the group stage concludes.
      </p>
    </section>
  );
}
