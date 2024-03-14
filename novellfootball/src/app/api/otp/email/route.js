import { sendEmailOtp } from "@/app/helpers/otp";
import { NextResponse } from "next/server";
import { isValidUser } from "@/app/helpers/auth";
import { USER } from "@/app/modals/modal";
import CustomError from "@/app/helpers/Error";
import { cookies } from "next/headers";

export async function GET(request) {
  let { token, session } = await getCookieData();
  try {
    let UserName = await isValidUser(token, session);
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

export async function PUT(request) {
  try {
    let { UserName } = await request.json();
    UserName = UserName?.trim();

    let userExists = await USER.findOne({ UserName }, { EmailId: 1 });
    if (!userExists) throw new Error("no user found with this user name");
    if (!userExists?.EmailId)
      throw new Error("User has not registered his/her mobile number");

    let otp = Math.ceil(Math.random() * 9000 + 1000);
    let res = await sendEmailOtp(userExists?.EmailId, otp);

    if (res === true) {
      let response = NextResponse.json({
        status: 200,
        message: "otp sent and valid for 5 minutes",
      });
      response.cookies.set("otp", `${otp}`, {
        maxAge: "5M",
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
