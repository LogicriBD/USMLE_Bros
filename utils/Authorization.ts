import { NextRequest, NextResponse } from "next/server";
import { logger } from "./Logger";
import { cookies } from "next/headers";
import { FetchHandler } from "./FetchHandler";
import { routes } from "@/src/api/Routes";

type AuthorizationRequest = {
  accessToken?: string;
  type: "role" | "verification";
};

export class Authorization {
  private redirectUrl: string;
  private isAdminRoute: boolean;
  private ProtectedRoutes: string[] = ["/admin", "/chat", "/content"];
  constructor(private request: NextRequest) {
    this.redirectUrl = request.nextUrl.pathname.includes("/admin")
      ? "/access-denied"
      : "/authentication/login";
    this.isAdminRoute = request.nextUrl.pathname.includes("/admin");
  }

  isProtectedRoute(pathname: string) {
    for (const route of this.ProtectedRoutes) {
      if (pathname.includes(route)) {
        return true;
      }
    }
    return false;
  }

  isNotLoggedInRoute(pathname: string) {
    if (pathname === "/") {
      return true;
    }
    return false;
  }

  async authorize(): Promise<NextResponse> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("access");

    const token = cookie?.value;
    if (!this.isProtectedRoute(this.request.nextUrl.pathname)) {
      if (this.isNotLoggedInRoute(this.request.nextUrl.pathname)) {
        if (token) {
          return NextResponse.redirect(
            new URL("/home", this.request.url).toString()
          );
        }
      }
      return NextResponse.next();
    } else {
      try {
        const fetchHandler = new FetchHandler<AuthorizationRequest>();
        const response = await fetchHandler.postRequest(routes.auth.verify, {
          accessToken: token,
          type: this.isAdminRoute ? "role" : "verification",
        });
        if (!this.isAdminRoute) {
          if (!response.success) {
            return NextResponse.redirect(
              new URL(this.redirectUrl, this.request.url).toString()
            );
          }
          return NextResponse.next();
        } else {
          const role = response.role;
          if (this.isAdminRoute && role !== "Admin") {
            return NextResponse.redirect(
              new URL("/access-denied", this.request.url).toString()
            );
          }
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
}
