import { auth } from "@/database/config/adminApp";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const userRecord = await auth.getUserByEmail(email);
    await auth.deleteUser(userRecord.uid);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
