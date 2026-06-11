"use client";

import { useState } from "react";
import { Match } from "@/lib/types";
import MatchCard from "./MatchCard";

const GROUP_LETTERS = "ABCDEFGHIJKL".split("");

export default function GroupStageSection({ matches }: { matches: Match[] }) {
  const [activeGroup, setActiveGroup] = useState("A");

  const groupMatches = matches
    .filter((m) => m.group === activeGroup)
    .sort((a, b) => new Date(a.kickoffUTC).getTime() - new Date(b.kickoffUTC).getTime());

  return (
    <section id="groups" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-3xl">📋</span>
        <h2 className="section-heading">Group Stage Schedule</h2>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {GROUP_LETTERS.map((letter) => (
          <button
            key={letter}
            onClick={() => setActiveGroup(letter)}
            className={`h-10 w-10 rounded-xl text-sm font-bold transition ${
              activeGroup === letter
                ? "bg-wc-green text-white shadow-lg shadow-wc-green/30"
                : "glass-card text-slate-600 hover:text-wc-green dark:text-slate-300"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groupMatches.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </div>
    </section>
  );
}
