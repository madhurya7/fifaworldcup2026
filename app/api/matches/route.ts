import { NextResponse } from "next/server";
import { getSchedule } from "@/lib/data";

export const revalidate = 3600;

export async function GET() {
  try {
    const schedule = await getSchedule();
    return NextResponse.json(schedule, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load schedule", details: String(err) },
      { status: 503 }
    );
  }
}
