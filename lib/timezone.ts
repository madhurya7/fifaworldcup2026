/**
 * All timestamps in the app are stored as UTC ISO strings.
 * These helpers render them in IST (Asia/Kolkata) regardless of
 * the visitor's own device timezone, as required by the brief.
 */

const IST_TZ = "Asia/Kolkata";

/** e.g. "12 June 2026" */
export function formatISTDate(utcISO: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: IST_TZ,
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(utcISO));
}

/** e.g. "Friday" */
export function formatISTWeekday(utcISO: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: IST_TZ,
    weekday: "long",
  }).format(new Date(utcISO));
}

/** e.g. "10:30 PM IST" */
export function formatISTTime(utcISO: string): string {
  const time = new Intl.DateTimeFormat("en-IN", {
    timeZone: IST_TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(utcISO));
  return `${time} IST`;
}

/** Returns YYYY-MM-DD in IST, useful for grouping matches by IST calendar day. */
export function istDateKey(utcISO: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: IST_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(utcISO));
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/** "Today" / "Tomorrow" / formatted date, all in IST. */
export function relativeISTDateLabel(utcISO: string, now: Date = new Date()): string {
  const target = istDateKey(utcISO);
  const today = istDateKey(now.toISOString());
  const tomorrow = istDateKey(
    new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString()
  );
  if (target === today) return "Today";
  if (target === tomorrow) return "Tomorrow";
  return formatISTDate(utcISO);
}

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  isPast: boolean;
}

export function getCountdown(utcISO: string, now: Date = new Date()): Countdown {
  const totalMs = new Date(utcISO).getTime() - now.getTime();
  if (totalMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs, isPast: true };
  }
  const seconds = Math.floor(totalMs / 1000) % 60;
  const minutes = Math.floor(totalMs / (1000 * 60)) % 60;
  const hours = Math.floor(totalMs / (1000 * 60 * 60)) % 24;
  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, totalMs, isPast: false };
}
