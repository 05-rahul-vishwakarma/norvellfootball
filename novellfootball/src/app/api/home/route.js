import { NextResponse } from "next/server";
import { isAuthenticated } from "@/app/helpers/auth";

export async function GET(request) {
  const session = request.cookies.get("session")?.value || "";
  const token = request?.cookies?.get("token")?.value || "";
  const res = await isAuthenticated(token, session);
  if (!res)
    return NextResponse.json({
      status: 302,
      message: "Session Expired login again",
    });

  return NextResponse.json({ status: 200, message: "hello there" });
}
