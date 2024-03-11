/**
 *
 *   This file will provide the data needed in the profile section like:-
 *
 *      for records
 *          deposit data
 *          withdrawal data
 *          overall data
 *
 */

import { NextResponse } from "next/server";
import { TRANSACTION } from "@/app/modals/modal";
import { cookies } from "next/headers";
export async function GET() {
  try {
    // const session = request.cookies.get("session")?.value || "";
    // const token = request?.cookies?.get("token")?.value || "";
    // const UserName = await isAuthenticated(token, session);
    const UserName = await isValidUser(request);
    if (!UserName)
      return NextResponse.json({
        status: 302,
        message: "Session Expired login again",
      });
    let res = await TRANSACTION.find({ UserName });
    if (!res) throw new Error("somethign went wrong");
    return NextResponse.json({
      status: 200,
      message: "data fetched",
      data: res,
    });
  } catch (error) {
    return NextResponse.json({
      status: 302,
      message: "somethign went wrong",
      data: {},
    });
  }
}

async function isValidUser(request) {
  // const session = request.cookies.get("session")?.value || "";
  // const token = request?.cookies?.get("token")?.value || "";
  const cookieStore = cookies();
  const session = cookieStore.get("session") || "";
  const token = cookieStore.get("token") || "";
  const UserName = await isAuthenticated(token, session);
  if (!UserName) return false;

  return UserName;
}
