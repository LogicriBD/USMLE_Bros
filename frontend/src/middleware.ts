import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { appStore } from "./context/store/redux-store";
import { validateUserSession } from "@/database/config/auth";

export function middleware(request: NextRequest) {
  validateUserSession();
  const user = appStore.getState().user;
  const isLoggedIn = appStore.getState().auth.isLoggedIn;
  const url = request.url;
  if (url.includes("/admin")) {
    if (user.role !== "Admin") {
      return NextResponse.redirect(new URL("/access-denied", request.url));
    }
  } else {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
