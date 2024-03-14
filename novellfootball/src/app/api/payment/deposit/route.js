import CustomError from "@/app/helpers/Error";
import { isValidUser } from "@/app/helpers/auth";
import { getFormattedDate } from "@/app/helpers/formattedDate";
import { connect } from "@/app/modals/dbConfig";
import { TRANSACTION, USER } from "@/app/modals/modal";
import { mongoose } from "mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 *
 *   This file will handle the deposits from various channels be it usdt or local;
 *
 */

export async function POST(request) {
  await connect();
  let Session = await mongoose.startSession();
  Session.startTransaction();
  let { session, token } = await getCookieData();
  try {
    const UserName = await isValidUser(token, session);
    if (!UserName)
      return NextResponse.json({
        status: 302,
        message: "Session Expired login again",
      });

    let body = await request.json();
    let { Amount, Channel, TransactionId } = body;
    if (!Amount || !Channel || !TransactionId)
      throw new CustomError(705, "Missing fields", {});
    Amount = Number(Amount) * 100;

    let channelType;
    if (Channel === 1) {
      channelType = "Payment channel 1";
    } else if (Channel === 2) {
      channelType = "Payment channel 2";
    } else {
      channelType = "Usdt channel";
    }
    let { Parent } = await USER.findOne({ UserName });
    let isTransCreated = await TRANSACTION.create(
      [
        {
          UserName: UserName,
          Amount: Amount,
          TransactionId: TransactionId,
          Method: channelType,
          Date: getFormattedDate(),
          Parent: Parent,
          Remark: "pending",
          Type: "deposit",
        },
      ],
      { session: Session }
    );

    if (!isTransCreated)
      throw new CustomError(500, "something went wrong while withdrawal", {});
    await Session.commitTransaction();
    return NextResponse.json({
      status: 200,
      message: "deposit is in processing",
      data: {},
    });
  } catch (error) {
    await Session.abortTransaction();
    return NextResponse.json({
      status: error?.code || error?.status || 500,
      message: error?.message || "something went wrong",
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
