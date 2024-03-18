"use server";

import { connect } from "@/app/modals/dbConfig";
import { TRANSACTION } from "@/app/modals/modal";

export async function getTransactionDetails() {
  try {
    await connect();
    let deposits = await TRANSACTION.aggregate([
      {
        $match: { Type: "deposit" },
      },
      {
        $group: {
          _id: "$Date",
          total: { $sum: "$Amount" },
        },
      },
    ]);
    let withdrawals = await TRANSACTION.aggregate([
      {
        $match: { Type: "withdrawal" },
      },
      {
        $group: {
          _id: "$Date",
          total: { $sum: "$Amount" },
        },
      },
    ]);

    return { deposits, withdrawals };
  } catch (error) {
    console.log(error);
    return JSON.stringify(error);
  }
}
