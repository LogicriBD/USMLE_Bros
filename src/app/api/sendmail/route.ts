import { Newsletter } from "@/utils/emails/Newsletter";
import { EmailService } from "@/utils/EmailService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { content, subject, receiver } = await req.json();

  try {
    const newsletter = new Newsletter(subject, content, receiver);
    await EmailService.sendEmail(newsletter);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
