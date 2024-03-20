/**
 *
 * this file will handle the transactions done by the subordinates till level3 and will also only get the
 * data for 7 days;
 *
 */
import { TRANSACTION } from "@/app/modals/modal";
import CustomError from "@/app/helpers/Error";
import { NextResponse } from "next/server";
import { isAuthenticated, isValidUser } from "@/app/helpers/auth";
import { cookies } from "next/headers";
import { connect } from "@/app/modals/dbConfig";

export async function GET(request) {
  let { session, token } = await getCookieData();
  try {
    await connect();
    const UserName = await isValidUser(token, session);
    if (!UserName)
      return NextResponse.json({
        status: 302,
        message: "Session Expired login again",
      });
    let level1_transactions = await TRANSACTION.find({
      Parent: UserName,
      Status: 1,
      Type: { $in: ["withdrawal", "deposit"] },
    });
    if (!level1_transactions)
      throw new CustomError(705, "something went wrong", {});
    let level2_transactions = [];
    let level3_transactions = [];

    for (let transaction of level1_transactions) {
      let level2Trans = await TRANSACTION.find({
        Parent: transaction?.UserName,
        Status: 1,
        Type: { $in: ["withdrawal", "deposit"] },
      });
      level2_transactions.push(...level2Trans);
      for (let transaction_lev2 of level2_transactions) {
        let lev3Trans = await TRANSACTION.find({
          Parent: transaction_lev2?.UserName,
          Status: 1,
          Type: { $in: ["withdrawal", "deposit"] },
        });
        level3_users.push(...lev3Trans);
      }
    }
    let total_deposit = 0;
    let total_withdrawal = 0;
    for (let data of level1_transactions) {
      if (data.Type == "deposit") {
        total_deposit += parseFloat(data.Amount) / 100;
      } else if (data?.Type === "withdrawal") {
        total_withdrawal += parseFloat(data.Amount) / 100;
      }
    }
    for (let data of level2_transactions) {
      if (data.Type == "deposit") {
        total_deposit += parseFloat(data.Amount) / 100;
      } else if (data?.Type === "withdrawal") {
        total_withdrawal += parseFloat(data.Amount) / 100;
      }
    }
    for (let data of level3_transactions) {
      if (data.Type == "deposit") {
        total_deposit += parseFloat(data.Amount) / 100;
      } else if (data?.Type === "withdrawal") {
        total_withdrawal += parseFloat(data.Amount) / 100;
      }
    }
    return NextResponse.json({
      status: 200,
      message: "data fetched",
      data: {
        level1_transactions,
        level2_transactions,
        level3_transactions,
        total_deposit,
        total_withdrawal,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: error?.code || error?.status || 500,
      message: "something went wrong",
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
