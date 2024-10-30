import type { NextRequest } from "next/server";
import { Authorization } from "@/utils/Authorization";

export async function middleware(request: NextRequest) {
  const authorization = new Authorization(request);
  return await authorization.authorize();
}

//Protected Routes Matcher
export const config = {
  matcher: ["/admin/:path*", "/content/:path*"],
};
