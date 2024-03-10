import { sendEmailOtp } from "@/app/helpers/otp";
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
    let user = await USER.findOne({ UserName }, { EmailId: 1 });

    if (!user || !user?.EmailId || user?.EmailId === "")
      throw new CustomError(705, "invalid email id", {});
    let EmailId = user?.EmailId || "";
    EmailId = EmailId.slice(3);
    let otp = Math.ceil(Math.random() * 9000 + 1000);
    let res = await sendEmailOtp(EmailId, otp);

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
    return NextResponse.json({ status: 705, message: "Invalid email id" });
  } catch (error) {
    return NextResponse.json({
      status: error?.status || error?.code || 500,
      message: error?.message || "somethign went wrong",
    });
  }
}
