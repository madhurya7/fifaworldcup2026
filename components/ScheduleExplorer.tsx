"use client";

import { useMemo, useState } from "react";
import { Match, STAGE_ORDER } from "@/lib/types";
import { VENUE_MAP } from "@/lib/venues";
import {
  formatISTDate,
  formatISTTime,
  formatISTWeekday,
  istDateKey,
} from "@/lib/timezone";
import MatchCard from "./MatchCard";
import EmptyState from "./EmptyState";

const STAGE_FILTERS = ["All Stages", ...STAGE_ORDER];

export default function ScheduleExplorer({ matches }: { matches: Match[] }) {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("All Stages");
  const [favorite, setFavorite] = useState("All Teams");
  const [view, setView] = useState<"list" | "calendar">("list");

  const teamOptions = useMemo(() => {
    const set = new Set<string>();
    matches.forEach((m) => {
      set.add(m.home.name);
      set.add(m.away.name);
    });
    return ["All Teams", ...Array.from(set).sort()];
  }, [matches]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return matches
      .filter((m) => {
        if (stage !== "All Stages" && m.stage !== stage) return false;
        if (
          favorite !== "All Teams" &&
          m.home.name !== favorite &&
          m.away.name !== favorite
        )
          return false;
        if (q) {
          const haystack = `${m.home.name} ${m.away.name}`.toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => new Date(a.kickoffUTC).getTime() - new Date(b.kickoffUTC).getTime());
  }, [matches, search, stage, favorite]);

  // Next upcoming match across ALL matches (for highlighting), independent of filters
  const nextUpcomingId = useMemo(() => {
    const now = Date.now();
    const upcoming = matches
      .filter((m) => new Date(m.kickoffUTC).getTime() > now)
      .sort((a, b) => new Date(a.kickoffUTC).getTime() - new Date(b.kickoffUTC).getTime());
    return upcoming[0]?.id;
  }, [matches]);

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="glass-card flex flex-col gap-3 p-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by country (e.g. Brazil, Argentina, India)"
            className="w-full rounded-xl border border-slate-200 bg-white/70 py-2.5 pl-9 pr-3 text-sm outline-none ring-wc-green/40 transition focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </div>

        <select
          value={stage}
          onChange={(e) => setStage(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2.5 text-sm outline-none ring-wc-green/40 transition focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          {STAGE_FILTERS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={favorite}
          onChange={(e) => setFavorite(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2.5 text-sm outline-none ring-wc-green/40 transition focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          {teamOptions.map((t) => (
            <option key={t} value={t}>
              {t === "All Teams" ? "⭐ All Teams" : `⭐ ${t}`}
            </option>
          ))}
        </select>

        <div className="flex gap-1 rounded-xl bg-slate-200/60 p-1 dark:bg-white/10">
          <button
            onClick={() => setView("list")}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              view === "list"
                ? "bg-white text-wc-green shadow dark:bg-white/20 dark:text-wc-gold"
                : "text-slate-500 dark:text-slate-300"
            }`}
          >
            🗂 List
          </button>
          <button
            onClick={() => setView("calendar")}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              view === "calendar"
                ? "bg-white text-wc-green shadow dark:bg-white/20 dark:text-wc-gold"
                : "text-slate-500 dark:text-slate-300"
            }`}
          >
            📅 Calendar
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400">
        Showing <strong>{filtered.length}</strong> of {matches.length} matches · all
        times in IST
      </p>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, 24).map((m) => (
            <MatchCard key={m.id} match={m} highlight={m.id === nextUpcomingId} />
          ))}
        </div>
      ) : (
        <CalendarView matches={filtered} nextUpcomingId={nextUpcomingId} />
      )}

      {view === "list" && filtered.length > 24 && (
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Showing the first 24 results. Refine your search or filters to narrow down.
        </p>
      )}
    </div>
  );
}

function CalendarView({
  matches,
  nextUpcomingId,
}: {
  matches: Match[];
  nextUpcomingId?: string;
}) {
  const groups = useMemo(() => {
    const map = new Map<string, Match[]>();
    matches.forEach((m) => {
      const key = istDateKey(m.kickoffUTC);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(m);
    });
    return Array.from(map.entries()).slice(0, 10);
  }, [matches]);

  return (
    <div className="flex flex-col gap-6">
      {groups.map(([dateKey, dayMatches]) => (
        <div key={dateKey} className="glass-card p-4 sm:p-5">
          <h3 className="mb-3 font-display text-lg font-bold">
            {formatISTWeekday(dayMatches[0].kickoffUTC)}, {formatISTDate(dayMatches[0].kickoffUTC)}
          </h3>
          <div className="flex flex-col divide-y divide-slate-200/60 dark:divide-white/10">
            {dayMatches.map((m) => {
              const venue = VENUE_MAP[m.venueId];
              return (
                <div
                  key={m.id}
                  className={`flex flex-wrap items-center justify-between gap-3 py-3 ${
                    m.id === nextUpcomingId ? "rounded-xl bg-wc-gold/10 px-2" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm font-medium sm:text-base">
                    <span className="text-2xl">{m.home.flag}</span>
                    <span>{m.home.name}</span>
                    <span className="text-slate-400">vs</span>
                    <span>{m.away.name}</span>
                    <span className="text-2xl">{m.away.flag}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                    <span className="pill bg-wc-green/10 text-wc-green dark:bg-wc-green/20 dark:text-emerald-300">
                      {m.group ? `Group ${m.group}` : m.stage}
                    </span>
                    <span>🕒 {formatISTTime(m.kickoffUTC)}</span>
                    <span>🏟 {venue.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      {matches.length > groups.reduce((acc, [, v]) => acc + v.length, 0) && (
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Showing the next {groups.length} match days. Refine filters to see more.
        </p>
      )}
    </div>
  );
}
