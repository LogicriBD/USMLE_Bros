import type { NextRequest } from "next/server";
import { Authorization } from "@/utils/Authorization";

export const runtime = "experimental-edge";

export async function middleware(request: NextRequest) {
  const authorization = new Authorization(request);
  return await authorization.authorize();
}

export const config = { matcher: ["/:path*"] };
