import { sendPhoneOtp } from "@/app/helpers/otp";
import { NextResponse } from "next/server";
import { isValidUser } from "@/app/helpers/auth";
import { USER } from "@/app/modals/modal";
import CustomError from "@/app/helpers/Error";

export async function GET(request) {
  try {
    let UserName = await isValidUser(request);
    if (!UserName)
      return NextResponse.json({
        status: 302,
        message: "session time out login again",
      });
    let user = await USER.findOne({ UserName }, { PhoneNumber: 1 });

    if (!user || !user?.PhoneNumber || user?.PhoneNumber === "")
      throw new CustomError(705, "invalid phone number", {});
    let phoneNumber = user?.PhoneNumber || "";
    phoneNumber = phoneNumber.slice(3);
    let otp = Math.ceil(Math.random() * 9000 + 1000);
    let res = await sendPhoneOtp(phoneNumber, otp);

    if (res === true) {
      let response = NextResponse.json({
        status: 200,
        message: "otp sent and valid for 5 minutes",
      });
      response.cookies.set("otp", `${otp}`, {
        httpOnly: true,
        maxAge: "5M",
        secure: true,
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
  try {
    let { Phone } = await request.json();
    console.log(Phone);
    let phoneNumber = Phone || "";
    phoneNumber = phoneNumber.slice(2);
    let otp = Math.ceil(Math.random() * 9000 + 1000);
    let res = await sendPhoneOtp(phoneNumber, otp);

    if (res === true) {
      let response = NextResponse.json({
        status: 200,
        message: "otp sent and valid for 5 minutes",
      });
      response.cookies.set("otp", `${otp}`, {
        httpOnly: true,
        maxAge: "5M",
        secure: true,
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
