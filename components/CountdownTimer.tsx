"use client";

import { useEffect, useState } from "react";
import { getCountdown } from "@/lib/timezone";

export default function CountdownTimer({
  targetUTC,
  compact = false,
}: {
  targetUTC: string;
  compact?: boolean;
}) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    // Avoid hydration mismatch — render nothing until mounted
    return <span className="opacity-0">--:--:--</span>;
  }

  const cd = getCountdown(targetUTC, now);

  if (cd.isPast) {
    return (
      <span className="pill bg-wc-red/15 text-wc-red dark:bg-wc-red/20">
        ⚽ Match Live / Finished
      </span>
    );
  }

  const units = [
    { label: "d", value: cd.days },
    { label: "h", value: cd.hours },
    { label: "m", value: cd.minutes },
    { label: "s", value: cd.seconds },
  ];

  if (compact) {
    return (
      <span className="font-mono text-sm font-semibold tabular-nums text-wc-green dark:text-wc-gold">
        {cd.days > 0 && `${cd.days}d `}
        {String(cd.hours).padStart(2, "0")}:{String(cd.minutes).padStart(2, "0")}:
        {String(cd.seconds).padStart(2, "0")}
      </span>
    );
  }

  return (
    <div className="flex gap-2 sm:gap-3">
      {units.map((u) => (
        <div
          key={u.label}
          className="glass flex h-16 w-16 flex-col items-center justify-center rounded-2xl sm:h-20 sm:w-20"
        >
          <span className="font-display text-2xl font-bold tabular-nums sm:text-3xl">
            {String(u.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {u.label === "d" ? "days" : u.label === "h" ? "hrs" : u.label === "m" ? "min" : "sec"}
          </span>
        </div>
      ))}
    </div>
  );
}
