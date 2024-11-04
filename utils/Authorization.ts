import { NextRequest, NextResponse } from "next/server";
import { logger } from "./Logger";
import { cookies } from "next/headers";
import { FetchHandler } from "./FetchHandler";
import { routes } from "@/src/api/Routes";

type AuthorizationRequest = {
  accessToken?: string;
};

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

    const token = cookie?.value;
    try {
      const fetchHandler = new FetchHandler<AuthorizationRequest>();
      const response = await fetchHandler.postRequest(routes.auth.verify, {
        accessToken: token,
      });
      if (!this.isAdminRoute) {
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
