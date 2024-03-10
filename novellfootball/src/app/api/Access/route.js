import { NextRequest, NextResponse } from "next/server";
import { USER } from "@/app/modals/modal";
import { redirect } from "next/navigation";
import { generateToken, verifyToken } from "@/app/helpers/auth";
import { connect } from "@/app/modals/dbConfig";
import CustomError from "@/app/helpers/Error";
import crypto from "crypto";

// 200 -> Everything went fine
// 700 -> something went wrong with data sent by the client;
// 703 -> database issue;
// 705 -> server got crashed;

// post request will handle the login functionality
export async function POST(NextRequest) {
  await connect();
  try {
    const { UserName, Password } = await NextRequest.json();
    if (!UserName || !Password)
      throw new CustomError(700, "Username or password is missing", {});

    let res = await USER.findOne({ UserName });
    if (!res) throw new CustomError(700, "User not found.", {});
    else if (Password !== res.Password)
      throw new CustomError(700, "Invalid Password!", {});

    const sessionToken = await generateSessionToken();
    const token = await generateToken({
      UserName,
      InvitationCode: res.InvitationCode,
    });
    let isUpdated = await USER.findOneAndUpdate(
      { UserName },
      { Session: sessionToken },
      { new: true }
    );
    const response = NextResponse.json({ status: 200, message: "logged in" });
    response.cookies.set("token", `${token}`, {
      httpOnly: true,
      maxAge: "1d",
      secure: true,
    });
    response.cookies.set("session", `${sessionToken}`, {
      httpOnly: true,
      maxAge: "1d",
      secure: true,
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: error?.status || error?.code || 500,
      message: error?.message || "something went wrong",
    });
  }
}

// CREATE request will handle the signup functionality;
export async function PUT(NextRequest) {
  try {
    await connect();
    // get data from client side
    let { UserName, Phone, Email, ConfPassword, Password, Invitation } =
      await NextRequest.json();

    Phone = Phone.slice(2);
    UserName = UserName.trim();
    Password = Password.trim();
    // if the user has a invitation code check for its parent ;
    let parentExists;
    if (Invitation) {
      parentExists = await USER.findOne({ InvitationCode: Invitation });
      if (!parentExists)
        throw new CustomError(700, "Invalid Invitation code", {});
    }

    let userName = await USER.findOne({ UserName });
    let phone = await USER.findOne({ PhoneNumber: Phone });

    if (userName) throw new CustomError(700, "user name already exists");
    if (phone) throw new CustomError(700, "phone number already exists");

    if (Email) {
      let emailExists = await USER.findOne({ EmailId: Email });
      if (emailExists)
        throw new CustomError(700, "Email id already exists", {});
    }
    const sessionToken = await generateSessionToken();
    const token = generateToken({ UserName, session: sessionToken });
    let newUser = {
      Session: sessionToken,
      UserName,
      PhoneNumber: Phone,
      Email,
      Password,
      ParentInv: Invitation === "" ? 0 : Invitation,
      InvitationCode: await generateInvitationCode(),
      Parent: parentExists?.UserName || "",
    };

    let isCreated = await USER.create(newUser);
    if (!isCreated)
      throw new CustomError(
        703,
        "something went wrong while creating the user please try again after some time",
        {}
      );
    if (Invitation && Invitation !== "") await updateParent(Invitation);

    const response = NextResponse.json({
      status: 200,
      message: "user created",
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: "1d",
      secure: true,
    });
    response.cookies.set("session", `${sessionToken}`, {
      httpOnly: true,
      maxAge: "1d",
      secure: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({
      status: error?.status || error?.code || 500,
      message: error?.message || "something went wrong",
    });
  }
}

async function updateParent(inviteId) {
  try {
    let isUpdated = await USER.findOneAndUpdate(
      { InvitationCode: inviteId },
      {
        $inc: {
          Members: 1,
        },
      }
    );
    if (!isUpdated)
      throw new CustomError(703, "Error while updating the parent", {});
  } catch (error) {
    throw new CustomError(703, "Something went wrong", {});
  }
}

async function generateSessionToken() {
  return crypto.randomBytes(64).toString("hex");
}

async function generateInvitationCode() {
  const min = 10000; // Minimum 5-digit number
  const max = 99999; // Maximum 5-digit number
  const randomBuffer = crypto.randomBytes(4); // Generate 4 random bytes
  const randomNumber = Math.floor(
    min + (randomBuffer.readUInt32BE() % (max - min + 1))
  ); // Convert the random bytes to a number between min and max
  return randomNumber;
}
