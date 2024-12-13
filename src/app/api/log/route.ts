import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export async function POST(req: NextRequest) {
  const path = "etc/logs/activity.log";
  const { message, level } = await req.json();
  const currentDate = new Date();
  const timestamp = currentDate.toISOString();
  const logMessage = `${timestamp} ${level}:: ${message}`;
  fs.writeFileSync(path, logMessage, { flag: "a+" });
  return NextResponse.json("Log written successfully", { status: 200 });
}
