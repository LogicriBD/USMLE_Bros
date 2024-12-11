import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export async function POST(req: NextRequest) {
  const path = "logs/activity.log";
  const { message, level } = await req.json();
  const logMessage = `${level}:: ${message}`;
  fs.writeFileSync(path, logMessage, { flag: "a+" });
  return NextResponse.json("Log written successfully", { status: 200 });
}
