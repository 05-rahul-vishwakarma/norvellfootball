import CustomError from "@/app/helpers/Error";
import { connect } from "@/app/modals/dbConfig";
import { USER } from "@/app/modals/modal";
import { NextResponse } from "next/server";
import { isValidUser } from "@/app/helpers/auth";
import { cookies } from "next/headers";
import ErrorReport from "@/app/helpers/ErrorReport";

export async function GET(req) {
  await connect();
  const { token, session } = await getCookieData();
  try {
    const UserName = await isValidUser(token, session);
    if (!UserName) throw new CustomError(302, "Login session time out", {});
    const res = await USER.findOne(
      { UserName },
      {
        _id: 0,
      }
    );
    if (!res) throw new CustomError(703, "something went wrong", {});
    return NextResponse.json({
      status: 200,
      message: "data fetched",
      data: { Balance: Number(res?.Balance) / 100, Other: res },
    });
  } catch (error) {
    return NextResponse.json({
      status: error?.status || error?.code || 500,
      message: error,
      data: {},
    });
  }
}

export async function POST() {
  const { token, session } = await getCookieData();
  try {
    const UserName = await isValidUser(token, session);
    if (!UserName) throw new CustomError(302, "Login session time out", {});
    const cookiesInstance = cookies();
    cookiesInstance.delete("session");
    cookiesInstance.delete("token");
    return NextResponse.json({
      status: 200,
      message: "logged out successfully",
      data: {},
    });
  } catch (error) {
    if (error?.code === 500 || error?.status === 500 || !error?.status) {
      ErrorReport(error);
    }
    return NextResponse.json({
      status: 302,
      message: "something went wrong while logging out",
      data: {},
    });
  }
}

async function getCookieData() {
  const cookiesInstance = cookies();
  const token = await cookiesInstance.get("token")?.value || "";
  const session = await cookiesInstance.get("session")?.value || "";
  return { token, session };
}
