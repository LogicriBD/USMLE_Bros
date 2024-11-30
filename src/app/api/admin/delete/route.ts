import { auth } from "@/database/config/adminApp";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get("email");

    if (!email || typeof email !== "string") {
      throw new Error("Invalid email provided");
    }

    const userRecord = await auth.getUserByEmail(email);
    await auth.deleteUser(userRecord.uid);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || "An unexpected error occurred",
      code: 500,
    });
  }
}
