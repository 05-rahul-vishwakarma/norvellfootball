"use server";
import CustomError from "@/app/helpers/Error";
import { bulkWrite } from "mongoose";
import { mongoose } from "mongoose";
import { performance } from "perf_hooks";
import { USER, BET, COMMISSION } from "@/app/modals/modal";
import { connect } from "@/app/modals/dbConfig";
import { revalidatePath } from "next/cache";

const CHUNK_SIZE = 100;

// function is responsible to settle the unsettled bets placed by the user's
let update_user = [];
let update_bet = [];
let create_commission = [];

export async function settle(prevState, formData) {
  try {
    let StakeId = formData?.get("StakeId");
    let s_first = formData?.get("score_a_result");
    let s_second = formData?.get("score_b_result");
    let g_first = formData?.get("score_a_own");
    let g_second = formData?.get("score_b_own");
    if (formData.get("stat_1")) {
      let res = await betParser({
        StakeId,
        s_first,
        s_second,
        g_first,
        g_second,
      });
      return res;
    } else if (formData.get("stat_2")) {
      let res = await cancelBet({ StakeId });
      return res;
    }
    return {
      message: "select either cancel or success",
    };
  } catch (error) {
    return {
      message: error?.message || error,
    };
  }
}

async function betParser({ StakeId, s_first, s_second, g_first, g_second }) {
  await connect();
  create_commission = [];
  update_bet = [];
  update_user = [];
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // S_first , s_second resembles the actual scores of the live match.
    // g_first ,g_second resembles the score given by the admin to the users.

    // let startTime = performance.now();
    if (
      !StakeId ||
      (!s_first && s_first !== 0) ||
      (!s_second && s_second !== 0) ||
      (!g_first && g_first !== 0) ||
      (!g_second && g_second !== 0)
    )
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
    revalidatePath("/admin/betsettlement");
    return {
      message: JSON.stringify(
        `users_updated -> ${JSON.stringify(
          updatedUsers
        )} , updated_Bets -> ${JSON.stringify(
          updatedBets
        )} , created_commissions -> ${JSON.stringify(updatedCommissions)}`
      ),
    };
  } catch (error) {
    await session.abortTransaction();
    return {
      message: error?.message || "something went wrong ",
    };
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
  try {
    let Profit =
      Number(Number(match?.BetAmount) / 10000) *
      Number(match?.Percentage) *
      0.05;
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
              Result_a: s_first,
              Result_b: s_second,
              Remark: "lose",
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
              ValidAmount: Number((Number(match?.BetAmount) * 0.2).toFixed(2)),
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
              Result_a: s_first,
              Result_b: s_second,
              Remark: "win",
              Status: 1,
            },
          },
        },
      });
    }
  } catch (error) {
    throw Error(error?.message || error);
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
  await connect();
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
            Commission: rebade * 100,
            From: UserName,
            StakeId,
            Level: LEVEL,
            UserName: Parent,
            Claimed: false,
          },
        },
      });
      if (Parent !== parent_user.Parent) {
        Parent = parent_user?.Parent || false;
      } else {
        Parent = false;
      }
      LEVEL++;
    }
    return true;
  } catch (error) {
    console.log("error in parent bonus ", error);
    return false;
  }
}

// =================== cancel Bet =================

async function cancelBet({ StakeId }) {
  await connect();
  let betsToCancel = [];
  let updateUsers = [];
  const Session = await mongoose.startSession();
  Session.startTransaction();

  try {
    let cancelable_bets = await BET.find({ StakeId, Status: 0 });
    for (let bet of cancelable_bets) {
      updateUsers.push({
        updateOne: {
          filter: { UserName: bet?.UserName },
          update: {
            $inc: {
              Balance: bet?.BetAmount,
            },
          },
        },
      });
      betsToCancel.push({
        updateOne: {
          filter: { UserName: bet?.UserName, StakeId: bet?.StakeId },
          update: {
            $set: {
              Status: 2,
              Remark: "canceled",
              Result_a: 9,
              Result_b: 9,
            },
          },
        },
      });
    }
    let updatedBets = await BET.bulkWrite(betsToCancel, { session: Session });
    let updatedUsers = await USER.bulkWrite(updateUsers, { session: Session });
    await Session.commitTransaction();
    revalidatePath("/betsettlement");
    return {
      message: `updated bets ===> ${JSON.stringify(
        updatedBets
      )} and updated users ====> ${JSON.stringify(updatedUsers)}`,
      received: true,
    };
  } catch (error) {
    return {
      message: JSON.stringify(error),
      received: true,
    };
  }
}

// ===================== functions to block unblock ==========================
export async function BlockUnblockUser(prevState, formData) {
  try {
    await connect();
    let UserName = formData?.get("userName") || "";
    let toBlock = formData?.get("block") === "block";
    let isUpdated = await USER.findOneAndUpdate(
      { UserName },
      {
        Blocked: toBlock,
      }
    );
    if (!isUpdated)
      throw new Error(`No user with username "${UserName}" found`);
    revalidatePath("/admin/betsettlement");
    return {
      message: toBlock ? "blocked" : "unblocked",
    };
  } catch (error) {
    return {
      message: error?.message || "something went wrong",
    };
  }
}
