"use server";

import ErrorReport from "@/app/helpers/ErrorReport";
import { connect } from "@/app/modals/dbConfig";
import { TRANSACTION } from "@/app/modals/modal";
import { NextResponse } from "next/server";

export async function GET() {
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

    return NextResponse.json({
      status: 200,
      data: { deposits, withdrawals },
      message: "data fetched",
    });
  } catch (error) {
    if (
      error?.code === 500 ||
      error?.status === 500 ||
      !error?.code ||
      !error?.status
    ) {
      ErrorReport(error);
    }
    return NextResponse.json({
      status: 500,
      message: JSON.stringify(error),
      data: {},
    });
  }
}
