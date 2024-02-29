import { NextRequest, NextResponse } from "next/server";
import { USER } from "@/app/modals/modal";
import { redirect } from "next/navigation";
import { generateToken, verifyToken } from "@/app/helpers/auth";
import { connect } from "@/app/modals/dbConfig";
import CustomError from "@/app/helpers/Error";

// 200 -> Everything went fine
// 700 -> something went wrong with data sent by the client;
// 703 -> database issue;
// 705 -> server got crashed;

// post request will handle the login functionality
export async function POST(NextRequest) {
  try {
    console.log(NextRequest.cookies.get("session")?.value);
    await connect();
    const { UserName, Password } = await NextRequest.json();
    if (!UserName || !Password)
      throw new CustomError(700, "Username or password is missing", {});

    let res = await USER.findOne({ UserName });
    if (!res) throw new CustomError(700, "User not found.", {});
    else if (Password !== res.Password)
      throw new CustomError(700, "Invalid Password!", {});

    const token = generateToken({
      UserName,
      InvitationCode: res.InvitationCode,
    });
    const response = NextResponse.json({ status: 200, message: "logged in" });
    response.cookies.set("session", `${token}`, {
      httpOnly: true,
      maxAge: "1d",
      secure: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({
      status: error?.status || 500,
      message: error?.message || "something went wrong",
    });
  }
}

// CREATE request will handle the signup functionality;
export async function CREATE(NextRequest) {
  await connect();
  // get data from client side
  let { name, email, password } = NextRequest.json();
  if (!name || !email || !password)
    return new Response("Missing Data", { status: 400 });

  // check if user already exists in database
  const usersRef = db.collection("users");
}
