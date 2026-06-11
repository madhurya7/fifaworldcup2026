export default function EmptyState({
  title = "No matches found",
  message = "Try adjusting your search or filters.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="glass-card flex flex-col items-center gap-3 px-6 py-14 text-center">
      <span className="text-5xl">🔍</span>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">{message}</p>
    </div>
  );
}
