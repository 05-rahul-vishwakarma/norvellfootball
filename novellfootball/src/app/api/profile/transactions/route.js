/**
 *
 * this file will handle the transactions done by the subordinates till level3 and will also only get the
 * data for 7 days;
 *
 */
import { TRANSACTION } from "@/app/modals/modal";
import CustomError from "@/app/helpers/Error";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/app/helpers/auth";
import { cookies } from "next/headers";

export async function GET(request) {
  try {
    // const session = request.cookies.get("session")?.value || "";
    // const token = request?.cookies?.get("token")?.value || "";
    // const UserName = await isAuthenticated(token, session);
    const UserName = await isValidUser(token, session);

    if (!UserName)
      return NextResponse.json({
        status: 302,
        message: "Session Expired login again",
      });
    let level1_transactions = await TRANSACTION.find({
      Parent: user?.UserName,
      Type: { $in: ["withdrawal", "deposit"] },
    });
    if (!level1_transactions)
      throw new CustomError(705, "something went wrong", {});
    let level2_transactions = [];
    let level3_transactions = [];

    for (let transaction of level1_transactions) {
      let level2Trans = await TRANSACTION.find({
        Parent: transaction?.UserName,
        Type: { $in: ["withdrawal", "deposit"] },
      });
      level2_transactions.push(...level2Trans);
      for (let transaction_lev2 of level2_transactions) {
        let lev3Trans = await TRANSACTION.find({
          Parent: transaction_lev2?.UserName,
          Type: { $in: ["withdrawal", "deposit"] },
        });
        level3_users.push(...lev3Trans);
      }
    }
    return NextResponse.json({
      status: 200,
      message: "data fetched",
      data: { level1_transactions, level2_transactions, level3_transactions },
    });
  } catch (error) {
    return NextResponse.json({
      status: error?.code || error?.status || 500,
      message: "something went wrong",
    });
  }
}

async function isValidUser(request) {
  // const session = request.cookies.get("session")?.value || "";
  // const token = request?.cookies?.get("token")?.value || "";
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value || "";
  const token = cookieStore.get("token")?.value || "";
  const UserName = await isAuthenticated(token, session);
  if (!UserName) return false;

  return UserName;
}
