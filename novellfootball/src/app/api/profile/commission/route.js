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
import { COMMISSION } from "@/app/modals/modal";
import { isAuthenticated } from "@/app/helpers/auth";
import { cookies } from "next/headers";
// function to retrive the commission and the corresponding bet data using aggregation pipeline

export async function GET(request) {
  try {
    // const session = request.cookies.get("session")?.value || "";
    // const token = request?.cookies?.get("token")?.value || "";

    // const UserName = await isAuthenticated(token, session);
    const UserName = await isValidUser(request);
    if (!UserName)
      return NextResponse.json({
        status: 302,
        message: "Session Expired login again",
      });

    let previousDates = await getPreviousDates(7);

    let res = await getBetAndCommissionData(previousDates, UserName);
    return NextResponse.json({
      status: 200,
      message: "Data fetched",
      data: res,
    });
  } catch (error) {
    return NextResponse.json({ data: error });
  }
}

async function getBetAndCommissionData(commissionDates, UserName) {
  try {
    let aggregatedData = {};

    for (let date of commissionDates) {
      const result = await COMMISSION.aggregate([
        {
          $match: {
            UserName: UserName,
            Date: date,
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
    console.error("Error retrieving data:", error);
    throw error;
  }
}

async function POST(request) {
  // have to work on this funciton since its possible the their dosenot exists any commission of some date in between 7 days yet 7 days is complete;
  let prevDates = getPreviousDates(7);
  let commissionData = [];
  for (let date of prevDates) {
    let res = await COMMISSION({ UserName, date });
    if (!res) throw new CustomError(705, "somethign went wrong");
    commissionData.push(...res);
  }
}

async function getPreviousDates(tillDate) {
  let previousDates = [];
  for (let i = 0; i < tillDate; i++) {
    let today = new Date();
    let prevDate = new Date(today);
    prevDate.setDate(prevDate.getDate() - i);

    // let formattedDate = `${prevDate.getDate().toString().padStart(2, "0")}/${(
    //   prevDate.getMonth() + 1
    // )
    //   .toString()
    //   .padStart(2, "0")}/${prevDate.getFullYear()}`;
    let formattedDate = `${prevDate.getDate()}/${
      prevDate.getMonth() + 1
    }/${prevDate.getFullYear()}`;

    previousDates.push(formattedDate);
  }
  return previousDates;
}

async function isValidUser(request) {
  // const session = request.cookies.get("session")?.value || "";
  // const token = request?.cookies?.get("token")?.value || "";
  const cookieStore = cookies();
  const session = cookieStore.get("session") || "";
  const token = cookieStore.get("token") || "";
  const UserName = await isAuthenticated(token, session);
  if (!UserName) return false;

  return UserName;
}
