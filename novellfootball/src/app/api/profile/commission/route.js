const oneDay = 24 * 60 * 60 * 1000;
/**
 *
 * This file is responsible to take care of the commission center
 *
 * ### GET request will provide all the commission related data bounded with today and overall commission
 *
 * ### POST request will allow the functionality to claim the unclaimed commissions of previous week;
 *
 */
import CustomError from "@/app/helpers/Error";
import { NextResponse } from "next/server";
import { COMMISSION, USER } from "@/app/modals/modal";
import { isValidUser } from "@/app/helpers/auth";
import { cookies } from "next/headers";
import { connect } from "@/app/modals/dbConfig";
import ErrorReport from "@/app/helpers/ErrorReport";

// function to retrive the commission and the corresponding bet data using aggregation pipeline
export async function GET(request) {
  let { token, session } = await getCookieData();
  try {
    await connect();
    const UserName = await isValidUser(token, session);
    if (!UserName)
      return NextResponse.json({
        status: 302,
        message: "Session Expired login again",
      });
    let UserCreatedOn = await USER.findOne({ UserName }, { createdAt: 1 });
    let registrationDate = new Date(UserCreatedOn?.createdAt);
    let today = new Date();
    const daysOfRegistration = Math.floor((today - registrationDate) / oneDay);

    let previousDates = await getPreviousDates(daysOfRegistration % 7);
    let res = await getBetAndCommissionData(previousDates, UserName);
    return NextResponse.json({
      status: 200,
      message: "Data fetched",
      data: res,
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
      status: error?.status || 500,
      message: error?.message,
      data: {},
    });
  }
}

async function getBetAndCommissionData(commissionDates, UserName) {
  try {
    await connect();
    let aggregatedData = {};

    for (let date of commissionDates) {
      const result = await COMMISSION.aggregate([
        {
          $match: {
            UserName: UserName,
            Date: date,
            Claimed: false,
          },
        },
        {
          $lookup: {
            from: "bets",
            let: { comStakeId: "$StakeId", comFrom: "$From" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$UserName", "$$comFrom"] },
                      { $eq: ["$StakeId", "$$comStakeId"] },
                    ],
                  },
                },
              },
              {
                $project: {
                  BetAmount: 1,
                  LeagueName: 1,
                  Percentage: 1,
                  Remark: 1,
                  Score_a: 1,
                  Score_b: 1,
                  Result_a: 1,
                  Result_b: 1,
                  StartsAt: 1,
                  Team_a: 1,
                  Team_a_logo: 1,
                  Team_b: 1,
                  Team_b_logo: 1,
                  createdAt: 1,
                  _id: 0,
                },
              },
            ],
            as: "details",
          },
        },
      ]);
      aggregatedData[date] = result;
    }

    return [aggregatedData];
  } catch (error) {
    if (
      error?.code === 500 ||
      error?.status === 500 ||
      !error?.code ||
      !error?.status
    ) {
      ErrorReport(error);
    }
    throw new Error(error);
  }
}

// claim functionality
export async function POST(request) {
  let { token, session } = await getCookieData();
  try {
    await connect();
    const UserName = await isValidUser(token, session);
    if (!UserName)
      return NextResponse.json({
        status: 302,
        message: "Session Expired login again",
      });
    let UserCreatedOn = await USER.findOne({ UserName }, { createdAt: 1 });
    let registrationDate = new Date(UserCreatedOn?.createdAt);
    let today = new Date();
    const daysOfRegistration = Math.floor((today - registrationDate) / oneDay);
    if (daysOfRegistration < 7)
      throw new CustomError(
        705,
        `You can claim after ${7 - (daysOfRegistration % 7)} days`,
        {}
      );
    let previousDates = await getPreviousDates(daysOfRegistration % 7);

    let isClaimed = await claimBonusFor(UserName, previousDates);
    if (!isClaimed)
      throw Error("something went wrong while claiming commission");
    return NextResponse.json({
      status: 200,
      message: "commission claimed",
      data: {},
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
      status: error?.status || 500,
      message: error?.message,
      data: {},
    });
  }
}

async function getPreviousDates(tillDate) {
  let previousDates = [];
  for (let i = 0; i < tillDate; i++) {
    let today = new Date();
    let prevDate = new Date(today);
    prevDate.setDate(prevDate.getDate() - i);
    let formattedDate = `${prevDate.getDate()}/${
      prevDate.getMonth() + 1
    }/${prevDate.getFullYear()}`;

    previousDates.push(formattedDate);
  }
  return previousDates;
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

// claim commission bonus;
async function claimBonusFor(UserName, dates) {
  try {
    await connect();
    let totalCommission = 0;
    for (let date of dates) {
      let res = await COMMISSION.find({
        UserName,
        Date: date,
        Claimed: false,
      });
      if (res) {
        for (let commission of res) {
          totalCommission += Math.max(0, Number(commission?.Commission));
        }
      }
    }
    if (totalCommission === 0) return true; // no unclaimed commission found
    let isUserUpdated = USER.findOneAndUpdate(
      { UserName },
      {
        $inc: {
          Balance: totalCommission,
          Commission: totalCommission,
        },
      }
    );
    if (!isUserUpdated) return false;
    return true;
  } catch (error) {
    if (
      error?.code === 500 ||
      error?.status === 500 ||
      !error?.code ||
      !error?.status
    ) {
      ErrorReport(error);
    }
    throw Error(error);
  }
}
