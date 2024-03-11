import CustomError from "@/app/helpers/Error";
import { connect } from "@/app/modals/dbConfig";
import { USER } from "@/app/modals/modal";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/app/helpers/auth";
import { cookies } from "next/headers";

export async function GET(request) {
  await connect();
  try {
    let UserName = await isValidUser(request);
    if (!UserName) throw new CustomError(302, "Login session time out", {});
    let res = await USER.findOne({ UserName }, { Balance: 1 });
    if (!res) throw new CustomError(703, "somthing went wrong", {});
    return NextResponse.json({
      status: 200,
      message: "data fetched",
      data: { Balance: Number(res?.Balance) / 100 },
    });
  } catch (error) {
    console.log(error, "error from users");
    return NextResponse.json({
      status: error?.status || error?.code || 500,
      message: "somethign went wrong ",
      data: {},
    });
  }
}

async function isValidUser(request) {
  // const session = request.cookies.get("session")?.value || "";
  // const token = request?.cookies?.get("token")?.value || "";
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value || "";
  const token = cookieStore.get("token")?.value || "";
  const UserName = await isAuthenticated(token, session);
  if (!UserName) return false;

  return UserName;
}
