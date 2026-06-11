import { NextResponse } from "next/server";
import { getSchedule } from "@/lib/data";
import { LIVE_REVALIDATE_SECONDS } from "@/lib/footballData";

export const revalidate = LIVE_REVALIDATE_SECONDS;

export async function GET() {
  try {
    const schedule = await getSchedule();
    return NextResponse.json(schedule, {
      headers: {
        "Cache-Control": `public, s-maxage=${LIVE_REVALIDATE_SECONDS}, stale-while-revalidate=300`,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load schedule", details: String(err) },
      { status: 503 }
    );
  }
}
