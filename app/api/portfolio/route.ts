import { NextResponse } from "next/server";
import { getPortfolioData } from "@/lib/portfolio-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to load portfolio data" }, { status: 500 });
  }
}
