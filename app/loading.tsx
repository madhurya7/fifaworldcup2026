import { MatchGridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-16 w-full glass" />
      <div className="bg-wc-gradient py-20">
        <div className="mx-auto max-w-2xl px-4">
          <div className="skeleton mx-auto mb-4 h-10 w-2/3" />
          <div className="skeleton mx-auto h-6 w-1/2" />
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="skeleton mb-6 h-8 w-48" />
        <MatchGridSkeleton count={6} />
      </div>
    </div>
  );
}
