/**
 *
 *  This file will extract the registered user's data withing 3 levels of the current user;
 *
 */
import { USER } from "@/app/modals/modal";
import CustomError from "@/app/helpers/Error";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/app/helpers/auth";
import { cookies } from "next/headers";

export async function GET(request) {
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
    let level1_users = await USER.find({ Parent: UserName }, { UserName: 1 });
    if (!level1_users) throw new CustomError(705, "something went wrong", {});
    let level2_users = [];
    let level3_users = [];

    for (let user of level1_users) {
      let level2Users = await USER.find(
        { Parent: user?.UserName },
        { UserName: 1 }
      );
      level2_users.push(...level2Users);
      for (let user_lev2 of level2_users) {
        let users = await USER.find(
          { Parent: user_lev2?.UserName },
          { UserName: 1 }
        );
        level3_users.push(...users);
      }
    }
    return NextResponse.json({
      status: 200,
      message: "data fetched",
      data: { level1_users, level2_users, level3_users },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: error?.code || error?.status || 500,
      message: "something went wrong",
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
