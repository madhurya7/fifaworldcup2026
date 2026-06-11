export function MatchCardSkeleton() {
  return (
    <div className="glass-card flex flex-col gap-4 p-5">
      <div className="flex justify-between">
        <div className="skeleton h-5 w-24" />
        <div className="skeleton h-5 w-16" />
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 flex-col items-center gap-2">
          <div className="skeleton h-10 w-10 rounded-full" />
          <div className="skeleton h-4 w-20" />
        </div>
        <div className="skeleton h-4 w-8" />
        <div className="flex flex-1 flex-col items-center gap-2">
          <div className="skeleton h-10 w-10 rounded-full" />
          <div className="skeleton h-4 w-20" />
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-slate-200/60 pt-3 dark:border-white/10">
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-4 w-1/2" />
      </div>
    </div>
  );
}

export function MatchGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <MatchCardSkeleton key={i} />
      ))}
    </div>
  );
}
