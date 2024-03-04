/*
  This function deals with creation of matches and sheduling the 
  matches , every night at 12 (midnight)
  #NOTE 
    This function has to be called manually such that cron job can be invoked
    and all set 😁
*/

import { NextResponse } from "next/server";
const moment = require("moment-timezone");
import { connect } from "@/app/modals/dbConfig";
import { BET, USER } from "@/app/modals/modal";
import { isAuthenticated } from "@/app/helpers/auth";
import CustomError from "@/app/helpers/Error";
import mongoose from "mongoose";

export async function GET(request) {
  try {
    let UserName = await isValidUser(request);
    if (!UserName)
      throw new CustomError(302, "Session time out login again", {});

    await connect();
    let pendingMatches = await BET.find({ UserName, Status: 0 });
    let settledMatches = await BET.find({ UserName, Status: { $ne: 0 } });

    return NextResponse.json({
      status: 200,
      message: "",
      data: { pendingMatches, settledMatches },
    });
  } catch (error) {
    return NextResponse.json({
      status: error?.status || error?.code || 500,
      message: error?.message || "something went wrong",
    });
  }
}

export async function POST(request) {
  try {
    let UserName = await isValidUser(request);
    if (!UserName)
      throw new CustomError(302, "Session time out login again", {});

    let { StakeId, StartsAt } = await request.json();
    if (!StakeId) throw new CustomError(703, "Error in the data provided", {});
    else if (!(await isDeletable(StartsAt)))
      throw new CustomError(703, "Match cannot be deleted now", {});

    await connect();

    let session = await mongoose.startSession();
    session.startTransaction();

    let isDeleted = await BET.findOneAndDelete(
      { UserName, StakeId },
      {
        new: true,
        session: session,
      }
    );

    let isUpdatedUser = await USER.findOneAndUpdate(
      { UserName },
      {
        $inc: {
          Balance: isDeleted?.BetAmount,
        },
      },
      { session }
    );

    if (!isDeleted || !isUpdatedUser)
      throw new CustomError(
        703,
        "Something went wrong while canceling the stake",
        {}
      );

    await session.commitTransaction();
    return NextResponse.json({
      status: 200,
      message: "Stake deleted successfully",
      data: { pendingMatches, settledMatches },
    });
  } catch (error) {
    return NextResponse.json({
      status: error?.status || error?.code || 500,
      message: error?.message || "something went wrong",
    });
  }
}

function getDate() {
  let nDate = new Date();
  let date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "Asia/Calcutta",
  }).format(nDate);
  date = moment.tz(
    date,
    "dddd, MMMM D, YYYY [at] h:mm:ss A [GMT]Z",
    "Asia/Calcutta"
  );
  date = date.toDate();
  return new Date(date);
}

async function isValidUser(request) {
  const session = request.cookies.get("session")?.value || "";
  const token = request?.cookies?.get("token")?.value || "";
  const UserName = await isAuthenticated(token, session);
  if (!UserName) return false;

  return UserName;
}

async function isDeletable(StartsAt) {
  let today = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "Asia/Calcutta",
    })
  );
  let match_date = new Date(
    new Date(StartsAt).toLocaleString("en-US", {
      timeZone: "Asia/Calcutta",
    })
  );
  if (match_date.getTime() - today.getTime() < 5 * 60 * 1000) return true;
  return false;
}
