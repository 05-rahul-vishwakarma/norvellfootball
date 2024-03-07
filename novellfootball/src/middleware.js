import { NextResponse } from "next/server";
import { verifyToken } from "@/app/helpers/auth";

export async function middleware(NextRequest) {
  const { pathname } = NextRequest.nextUrl;
  const isPublic = pathname.startsWith === "/access";
  const token = NextRequest.cookies?.get("token")?.value || "";
  if (!token || token === "")
    return NextResponse.redirect(new URL("/access/login", NextRequest.nextUrl));
  const isValidToken = await verifyToken(token);

  if (!isPublic && !isValidToken?.success) {
    return NextResponse.redirect(new URL("/access/login", NextRequest.nextUrl));
  }

  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    "/stake/:path*",
    "/recharge/:path*",
    "/matches/:path*",
  ],
};
