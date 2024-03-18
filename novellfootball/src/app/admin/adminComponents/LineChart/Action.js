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
    let withdrawal = await TRANSACTION.aggregate([
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

    return { deposits, withdrawal };
  } catch (error) {
    console.log(error);
  }
}
