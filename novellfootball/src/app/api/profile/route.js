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
import { isValidUser } from "@/app/helpers/auth";

export async function GET() {
  let { session, token } = await getCookieData();
  try {
    const UserName = await isValidUser(token, session);
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

async function getCookieData() {
  let token = cookies().get("token")?.value || "";
  let session = cookies().get("session")?.value || "";
  const cookieData = { token, session };
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData);
    }, 1000)
  );
}
