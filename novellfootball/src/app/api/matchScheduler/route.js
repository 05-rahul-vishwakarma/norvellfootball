/*
  This function deals with creation of matches and sheduling the 
  matches , every night at 12 (midnight)
  #NOTE 
    This function has to be called manually such that cron job can be invoked
    and all set 😁
*/

import { NextResponse } from "next/server";
const moment = require("moment-timezone");
import cron from "node-cron";
import { MATCH } from "@/app/modals/modal";
import { connect } from "@/app/modals/dbConfig";

export async function GET(request) {
  if (request?.nextUrl?.searchParams?.get("id") === "2002") {
    await scheduleMatches();
    cron.schedule("0 0 * * *", async () => {
      await scheduleMatches();
    });
  }
  return NextResponse.json({ status: 200, msg: "done" });
}

export async function scheduleMatches() {
  connect();
  let today = getDate();
  today = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(today);
  today = today.split("/");
  let parsed_date = `${today[2]}-${today[1]}-${today[0]}`;

  try {
    let searchParams = new URLSearchParams({
      date: `${parsed_date}`,
      status: "NS",
    });
    let res = await fetch(
      `https://v3.football.api-sports.io/fixtures?${searchParams}`,
      {
        method: "get",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-apisports-key": `${process.env.NEXT_PUBLIC_LIVE_MATCH_KEY}`,
        },
      }
    );
    if (res) {
      res = await res.json();
      if (!res?.response) return false;
      let data = [];
      res.response.forEach((element) => {
        let match = {
          Team_a: element?.teams?.home?.name || "",
          Team_b: element?.teams?.away?.name || "",
          StakeId: element?.fixture?.id || "",
          LeagueName: element?.league?.name,
          Team_a_logo: element?.teams?.home?.logo || "",
          Team_b_logo: element?.teams?.away?.logo || "",
          StartsAt: element?.fixture?.date || "",
          Percents: [],
          Score_a: 0,
          Score_b: 0,
          FixedPercent: (Math.random() * 6 + 1.5).toFixed(2),
        };
        for (let i = 0; i < 17; i++) {
          match["Percents"].push((Math.random() * 5 + 1).toFixed(2));
        }
        data.push(match);
      });
      let stringData = JSON.stringify(data);
      if (!data) return false;
      let isCreated = await MATCH.findOneAndUpdate(
        { _id: process.env.NEXT_PUBLIC_MATCH_ID },
        { data: stringData }
      );
      return isCreated ? true : false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
  return false;
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
