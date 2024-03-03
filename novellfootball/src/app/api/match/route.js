/*
 This api route will handle the match page which consists of all the 
 matches that are ongoing and not started .
 This will also handle the function to place bet's on the matches provided
*/

import { NextResponse } from "next/server";
import { isAuthenticated } from "@/app/helpers/auth";
import { USER, MATCH, BET } from "@/app/modals/modal";
import { connect } from "@/app/modals/dbConfig";
import mongoose from "mongoose";
import { scheduleMatches } from "@/app/api/matchScheduler/route";
import CustomError from "@/app/helpers/Error";

// 200 -> Everything went fine
// 700 -> something went wrong with data sent by the client;
// 703 -> database issue;
// 705 -> server got crashed;

// this function will deal with the user's balance and the 10 match home data which will be fetched from the MATCH modal

const MATCH_ID = process.env.NEXT_PUBLIC_MATCH_ID;

export async function GET(request) {
  try {
    let UserName = await isValidUser(request);
    if (!UserName)
      throw new CustomError(302, "Session time out login again", {});

    await connect();
    let userData = await USER.findOne({ UserName }, { _id: 0, Balance: 1 });
    let matches = await getLiveBets();
    if (!userData || !matches) throw new CustomError(703, "Login again", {});

    let ExtractedMatches = await getExtractedMatches(matches);

    return NextResponse.json({
      status: 200,
      message: "",
      data: { userData, matches: ExtractedMatches },
    });
  } catch (error) {
    return NextResponse.json({
      status: error?.status || error?.code || 500,
      message: error?.message || "something went wrong",
    });
  }
}

async function getLiveBets() {
  try {
    let current_version = await MATCH.findOne(
      { _id: MATCH_ID },
      { _id: 0, version: 1 }
    );
    let matches = await MATCH.findOne({
      _id: MATCH_ID,
      version: current_version?.version || 1,
    });

    if (!matches || matches?.data?.length < 30) {
      current_version = await MATCH.findOne(
        { _id: MATCH_ID },
        { _id: 0, version: current_version?.version }
      );
      matches = await MATCH.findOne({
        _id: MATCH_ID,
        version: current_version?.version || 1,
      });
    }
    if (!matches || matches?.data?.length < 30) {
      await scheduleMatches();
      matches = await MATCH.findOne({
        _id: MATCH_ID,
        version: current_version?.version || 1,
      });
    }
    if (matches?.data) {
      return await JSON.parse(matches?.data || `{}`);
    } else {
      return false;
    }
  } catch (error) {
    return new CustomError(703, "Something went wrong", {});
  }
}

async function getExtractedMatches(matches) {
  let ExtractedMatches = [];
  // match_date.getTime() - today.getTime() < 5 * 60 * 1000
  for (let match of matches) {
    let today = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Calcutta",
      })
    );
    let match_date = new Date(
      new Date(match?.StartsAt).toLocaleString("en-US", {
        timeZone: "Asia/Calcutta",
      })
    );
    if (match_date.getTime() - today.getTime() < 6 * 60 * 1000) continue;
    ExtractedMatches.push(match);
  }
  return ExtractedMatches;
}

// this function will handle functionality of bet placement;
export async function POST(request) {
  try {
    let UserName = await isValidUser(request);
    if (!UserName)
      throw new CustomError(302, "Session time out login again ", {});

    let {
      Team_a,
      Team_b,
      StakeId,
      LeagueName,
      Team_a_logo,
      Team_b_logo,
      StartsAt,
      Score_a,
      Score_b,
      Percentage,
      BetAmount,
    } = await request.json();

    if (
      !Team_a ||
      !Team_b ||
      !StakeId ||
      !LeagueName ||
      !Team_a_logo ||
      !Team_b_logo ||
      !StartsAt ||
      !Score_a ||
      !Score_b ||
      !Percentage ||
      !BetAmount
    )
      throw new CustomError(700, "please fill all the details", {});

    await connect();

    // check for existing bet on this match
    const isBetExists = await BET.findOne({
      UserName,
      StakeId,
    });
    if (isBetExists)
      throw new CustomError(
        409,
        "You have already placed a bet on this match.",
        {}
      );

    BetAmount = BetAmount * 100;

    const session = await mongoose.startSession();
    session.startTransaction();

    let user_updated = await USER.findOneAndUpdate(
      {
        UserName,
        Balance: { $gte: parseFloat(BetAmount) },
      },
      {
        $inc: {
          Balance: -parseFloat(BetAmount),
        },
      },
      { new: true, session }
    );
    if (!user_updated) throw new CustomError(703, "Low balance");

    const newBet = await BET.create(
      [
        {
          StakeId,
          Team_a,
          Team_b,
          BetAmount: BetAmount,
          LeagueName,
          StartsAt,
          Score_a,
          Score_b,
          Percentage,
          Parent: user_updated?.Parent,
          UserName,
          InvitationCode: user_updated?.InvitationCode,
          Remark: "Pending",
        },
      ],
      { session }
    );
    if (!newBet) throw new CustomError(500, "Failed to create bets");
    await session.commitTransaction();
    return NextResponse.json({ status: 200, message: "bet placed" });
  } catch (error) {
    return NextResponse.json({
      status: error?.status || error?.code || 500,
      message: error?.message || "something went wrong",
    });
  }
}

async function isValidUser(request) {
  const session = request.cookies.get("session")?.value || "";
  const token = request?.cookies?.get("token")?.value || "";
  const UserName = await isAuthenticated(token, session);
  if (!UserName) return false;

  return UserName;
}