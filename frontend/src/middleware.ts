import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthorizationInformation } from "./lib/getAuthorizationInformation";
import { logger } from "@/utils/Logger";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("access");

  if (!cookie) {
    return NextResponse.redirect(new URL("/", request.url).toString());
  }
  const token = cookie.value;
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url).toString());
  }
  try {
    const { role } = await getAuthorizationInformation(request.url, token);
    if (role !== "Admin") {
      return NextResponse.redirect(new URL("/", request.url).toString());
    }
    return NextResponse.next();
  } catch (error) {
    logger.error("Token verification failed:", error);
    return NextResponse.redirect(new URL("/", request.url).toString());
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
