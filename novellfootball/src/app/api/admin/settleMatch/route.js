import CustomError from "@/app/helpers/Error";
import { bulkWrite } from "mongoose";
import { mongoose } from "mongoose";
import { NextResponse } from "next/server";
import { performance } from "perf_hooks";
import { USER, BET, COMMISSION } from "@/app/modals/modal";
import { connect } from "@/app/modals/dbConfig";
import { resolve } from "styled-jsx/css";

const CHUNK_SIZE = 100;

// function is responsible to settle the unsettled bets placed by the user's
let update_user = [];
let update_bet = [];
let create_commission = [];

connect();
export async function POST(request) {
  create_commission = [];
  update_bet = [];
  update_user = [];
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // S_first , s_second resembles the actual scores of the live match.
    // g_first ,g_second resembles the score given by the admin to the users.

    // let startTime = performance.now();

    let { StakeId, s_first, s_second, g_first, g_second } =
      await request.json();
    if (!StakeId || !s_first || !s_second || !g_first || !g_second)
      throw new CustomError(703, "every data is needed", {});

    let unsettledBets = await BET.find({ StakeId });
    if (!unsettledBets || unsettledBets?.length < 1)
      throw new CustomError(
        705,
        "No matches exists with StakeId " + StakeId,
        {}
      );
    for (let i = 0; i < unsettledBets.length; i += CHUNK_SIZE) {
      let chunk = unsettledBets.slice(i, i + CHUNK_SIZE);
      await __init(chunk, StakeId, s_first, s_second, g_first, g_second);
    }

    // let endTime = performance.now();
    // console.log("performance", endTime - startTime);
    let updatedUsers = await USER.bulkWrite(update_user, { session });
    let updatedBets = await BET.bulkWrite(update_bet, { session });
    let updatedCommissions = await COMMISSION.bulkWrite(create_commission, {
      session,
    });
    await session.commitTransaction();
    return NextResponse.json({
      status: 200,
      message: "updated everything ",
      data: JSON.stringify({ updatedUsers, updatedBets, updatedCommissions }),
    });
  } catch (error) {
    await session.abortTransaction();
    return NextResponse.json({
      status: error?.code || error?.status || 500,
      message: error?.message || "Something went wrong",
      data: { err: JSON.stringify(error) },
    });
  } finally {
    session.endSession();
  }
}

async function __init(
  unsettledBets,
  StakeId,
  s_first,
  s_second,
  g_first,
  g_second
) {
  try {
    await Promise.all(
      unsettledBets.map((match) =>
        initiateParallelProcess(match, s_first, s_second, g_first, g_second)
      )
    );
  } catch (error) {
    throw new Error("something went wrong while processing the error");
  }
}

async function initiateParallelProcess(
  match,
  s_first,
  s_second,
  g_first,
  g_second
) {
  // Asynchronously perform operations in settle_bet
  let Profit =
    Number(Number(match?.BetAmount) / 10000) * Number(match?.Percentage);
  let res = await settle_bet(
    match,
    Profit,
    s_first,
    s_second,
    g_first,
    g_second
  );
  if (!res) {
    update_bet.push({
      updateOne: {
        filter: { StakeId: match?.StakeId, UserName: match?.UserName },
        update: {
          $set: {
            Result_a: g_first,
            Result_b: g_second,
            Remark: "Lose",
            Status: 1,
          },
        },
      },
    });
  } else {
    let BetAmount = Number(match?.BetAmount) / 100;
    update_user.push({
      updateOne: {
        filter: { UserName: match?.UserName },
        update: {
          $inc: {
            ValidAmount: Number(
              ((Number(match?.BetAmount) / 100) * 0.4).toFixed(2)
            ),
            Balance: Number(Number((BetAmount + Profit).toFixed(2)) * 100),
          },
        },
      },
    });
    update_bet.push({
      updateOne: {
        filter: { StakeId: match?.StakeId, UserName: match?.UserName },
        update: {
          $set: {
            Result_a: g_first,
            Result_b: g_second,
            Remark: "win",
            Status: 1,
          },
        },
      },
    });
  }
}

async function settle_bet(match, Profit, s_first, s_second, g_first, g_second) {
  try {
    let win = false;

    if (
      Number(match?.Score_a) === Number(g_first) &&
      Number(match?.Score_b) === Number(g_second) &&
      (Number(match?.Score_a) !== Number(s_first) ||
        Number(match?.Score_b) !== Number(s_second))
    ) {
      win = true;
    }
    if (match?.Parent && !!match?.Parent) {
      // (parent , the user profit ,bet amount ,  match win)

      let isBonusGiven = await give_parent_bonus(
        match?.Parent,
        match?.UserName,
        match?.StakeId,
        Profit,
        Number(match?.BetAmount) / 100,
        win
      );
      if (!isBonusGiven)
        throw new CustomError(705, "something went wrong abort", {});
    }

    return win;
  } catch (error) {
    console.log(error);
    throw new CustomError(705, "something went wrong ", {
      data: error,
    });
  }
}

async function give_parent_bonus(
  Parent,
  UserName,
  StakeId,
  Profit,
  BetAmount,
  win
) {
  let today = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "Asia/Calcutta",
    })
  );
  let LEVEL = 1;
  let REBADE_PERCENT = [10, 5, 2];
  try {
    while (LEVEL <= 3 && Parent !== false) {
      let parent_user = await USER.findOne({ UserName: Parent });
      if (!parent_user) {
        Parent = false;
        throw new Error("Parent not found invalid parent");
      }

      // the rebade will become the negative if the user has lost the bet

      let rebade = win
        ? ((Profit / 100) * REBADE_PERCENT[LEVEL - 1]).toFixed(2)
        : Number(BetAmount - BetAmount * 2);

      create_commission.push({
        insertOne: {
          document: {
            Date: `${today.getDate()}/${
              today.getMonth() + 1
            }/${today.getFullYear()}`,
            Commission: rebade,
            From: UserName,
            StakeId,
            Level: LEVEL,
            UserName: Parent,
            Claimed: false,
          },
        },
      });

      Parent = parent_user?.Parent || false;
      LEVEL++;
    }
    return true;
  } catch (error) {
    console.log("error in parent bonus ", error);
    return false;
  } finally {
    LEVEL++;
  }
}
