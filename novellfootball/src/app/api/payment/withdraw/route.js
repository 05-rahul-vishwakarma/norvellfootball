import CustomError from "@/app/helpers/Error";
import { USER, TRANSACTION } from "@/app/modals/modal";
import { NextResponse } from "next/server";
const { mongoose } = require("mongoose");

/**
 *
 *   As the name suggest this will handle the withdrawals made by users;
 *
 */

export async function POST(request) {
  let Session = await mongoose.startSession();
  Session.startTransaction();
  try {
    const session = request.cookies.get("session")?.value || "";
    const token = request?.cookies?.get("token")?.value || "";
    const UserName = await isAuthenticated(token, session);
    if (!UserName)
      return NextResponse.json({
        status: 302,
        message: "Session Expired login again",
      });
    let verifiedOtp = true; //make it false and create a helper function that will evaluate the hash from teh users end;
    if (!verifiedOtp) throw new CustomError(702, "Invalid otp provided ", {});

    let body = await request.json();
    let { Ammount } = body;
    Ammount = Number(Ammount);
    if (!(await vipVerified(UserName, body?.Ammount)))
      throw new CustomError(705, "Your vip level is low", {});

    if (body?.isLocalBank) {
      if (!Ammount) throw new CustomError(705, "Missing Fields", {});
      Ammount = Ammount * 100;
      let updatedUser = await updateUser(
        UserName,
        Ammount,
        Session,
        "LocalBankAdded"
      );

      if (!updatedUser)
        throw new CustomError(705, "Bank already added or error field", {});
    } else {
      if (!Ammount) throw new CustomError(705, "Field missing", {});
      Ammount = Number(Ammount) * 100;
      let updatedUser = await updateUser(
        UserName,
        Ammount,
        Session,
        "UsdtBankAdded"
      );

      if (!updatedUser)
        throw new CustomError(705, "Bank already added or error field", {});
    }
    let TransactionId = await genTransactionID();
    let isTransCreated = await TRANSACTION.create(
      {
        UserName,
        Ammount: Ammount * 100,
        TransactionId,
        Method: body?.isLocalBank ? "Local bank transfer" : "usdt transfer",
        Status: 0,
        Remark: "pending",
        Type: "withdrawal",
      },
      { session }
    );
    if (!isTransCreated)
      throw new CustomError(500, "something went wrong while withdrawal", {});
    Session.commitTransaction();
    return NextResponse.json({
      status: 200,
      message: "Withdrawall is in processing",
      data: {},
    });
  } catch (error) {
    Session.abortTransaction();
    return NextResponse.json({
      status: error?.code || error?.status || 500,
      message: error?.message || "something went wrong",
      data: {},
    });
  }
}

async function updateUser(UserName, Ammount, session, Bank) {
  try {
    let user = await USER.findOneAndUpdate(
      { UserName, [Bank]: true, $get: { Balance: Number(Ammount) } },
      {
        $inc: {
          Balance: -Ammount,
          Withdrawal: Ammount,
        },
      },
      { session }
    );
    if (!user) throw Error("Low balance");
    return true;
  } catch (error) {
    throw new CustomError(705, "Low balance or bank not added");
  }
}

async function vipVerified(UserName, Ammount) {
  let vipMax = [25000, 50000, 75000, 200000, 500000];
  try {
    // here the amount is not multiplied by 100 for  convenience reasons;
    Ammount = Number(Ammount);
    let { VipLevel } = await USER.findOne({ UserName }, { VipLevel: 1 });

    if (Ammount >= 500 && Ammount <= vipMax[VipLevel]) {
      return true;
    }
    throw new Error(
      "Your vip level is " +
        VipLevel +
        " you can withdraw from 500 - " +
        vipMax[VipLevel]
    );
  } catch (error) {
    throw new Error(error?.message);
  }
}

async function genTransactionID() {
  const PART_A = Math.floor(Math.random() * 90000 + 10000).toString();
  const PART_B = Math.floor(Math.random() * 90000 + 10000).toString();
  return PART_A + PART_B;
}
