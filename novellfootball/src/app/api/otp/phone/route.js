const oneMinute = 60 * 1000;
import { sendPhoneOtp } from "@/app/helpers/otp";
import { NextResponse } from "next/server";
import { isValidUser } from "@/app/helpers/auth";
import { USER } from "@/app/modals/modal";
import CustomError from "@/app/helpers/Error";
import { cookies } from "next/headers";
import { connect } from "@/app/modals/dbConfig";

export async function GET(request) {
  await connect();
  let { token, session } = await getCookieData();
  try {
    let UserName = await isValidUser(token, session);
    if (!UserName)
      return NextResponse.json({
        status: 302,
        message: "session time out login again",
      });
    let user = await USER.findOne({ UserName }, { PhoneNumber: 1 });

    if (!user || !user?.PhoneNumber || user?.PhoneNumber === "")
      throw new CustomError(705, "invalid phone number", {});
    let phoneNumber = user?.PhoneNumber || "";
    // phoneNumber = phoneNumber.slice(3);
    let otp = Math.ceil(Math.random() * 9000 + 999);
    let res = await sendPhoneOtp(phoneNumber, otp);

    if (res === true) {
      let response = NextResponse.json({
        status: 200,
        message: "otp sent and valid for 5 minutes",
      });
      cookies().set("otp", `${otp}`, {
        maxAge: "5m",
        expires: Date.now() + 5 * oneMinute,
      });
      return response;
    }
    return NextResponse.json({ status: 705, message: "Invalid phone number" });
  } catch (error) {
    return NextResponse.json({
      status: error?.status || error?.code || 500,
      message: error?.message || "somethign went wrong",
    });
  }
}

export async function POST(request) {
  await connect();
  try {
    let { Phone } = await request.json();
    let phoneNumber = Phone || "";
    phoneNumber = phoneNumber.slice(2);
    let otp = Math.ceil(Math.random() * 9000 + 999);
    let res = await sendPhoneOtp(phoneNumber, otp);

    if (res === true) {
      let response = NextResponse.json({
        status: 200,
        message: "otp sent and valid for 5 minutes",
      });
      cookies().set("otp", `${otp}`, {
        expires: Date.now() + 5 * oneMinute,
      });

      return response;
    }
    return NextResponse.json({ status: 705, message: "Invalid phone number" });
  } catch (error) {
    return NextResponse.json({
      status: error?.status || error?.code || 500,
      message: error?.message || "somethign went wrong",
    });
  }
}

export async function PUT(request) {
  await connect();
  try {
    let { UserName } = await request.json();
    UserName = UserName?.trim();

    let userExists = await USER.findOne({ UserName }, { PhoneNumber: 1 });
    if (!userExists) throw new Error("no user found with this user name");
    if (!userExists?.PhoneNumber)
      throw new Error("User has not registered his/her mobile number");

    let otp = Math.ceil(Math.random() * 9000 + 999);
    let res = await sendPhoneOtp(userExists?.PhoneNumber, otp);

    if (res === true) {
      let response = NextResponse.json({
        status: 200,
        message: "otp sent and valid for 5 minutes",
      });
      cookies().set("otp", `${otp}`, {
        expires: Date.now() + 5 * oneMinute,
      });
      return response;
    }
    return NextResponse.json({ status: 705, message: "Invalid phone number" });
  } catch (error) {
    return NextResponse.json({
      status: error?.status || error?.code || 500,
      message: error?.message || "somethign went wrong",
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
