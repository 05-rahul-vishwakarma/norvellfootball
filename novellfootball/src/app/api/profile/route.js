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
export async function GET() {
  try {
    const session = request.cookies.get("session")?.value || "";
    const token = request?.cookies?.get("token")?.value || "";
    const UserName = await isAuthenticated(token, session);
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
