import { getAuthorizationInformation } from "@/src/lib/getAuthorizationInformation";
import { NextRequest, NextResponse } from "next/server";
import { logger } from "./Logger";
import { cookies } from "next/headers";

export class Authorization {
  private redirectUrl: string;
  private isAdminRoute: boolean;
  constructor(private request: NextRequest) {
    this.redirectUrl = request.url.includes("/admin") ? "/access-denied" : "/";
    this.isAdminRoute = request.url.includes("/admin");
  }

  async authorize(): Promise<NextResponse> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("access");

    if (!cookie) {
      return NextResponse.redirect(
        new URL(this.redirectUrl, this.request.url).toString()
      );
    }
    const token = cookie.value;
    if (!token) {
      return NextResponse.redirect(
        new URL(this.redirectUrl, this.request.url).toString()
      );
    }
    try {
      const { role } = await getAuthorizationInformation(
        this.request.url,
        token
      );
      if (this.isAdminRoute && role !== "Admin") {
        return NextResponse.redirect(
          new URL("/access-denied", this.request.url).toString()
        );
      }
      return NextResponse.next();
    } catch (error) {
      logger.error("Token verification failed:", error);
      return NextResponse.redirect(
        new URL(this.redirectUrl, this.request.url).toString()
      );
    }
  }
}
