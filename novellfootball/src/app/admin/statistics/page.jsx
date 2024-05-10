"use client";
import { LineChart } from "../adminComponents/LineChart/LineChart";
import { connect } from "@/app/modals/dbConfig";
import { TRANSACTION } from "@/app/modals/modal";

async function Stats() {
    // let data = [];
    // data = await getTransactionDetails();

    return (
        <div className=" h-screen bg-[#352F44]">
            <div className="text-center uppercase py-2 h-full text-green-400">
                <h1>Statistics</h1>
                <LineChart
                // deposit={data?.deposits}
                // withdrawal={data?.withdrawals}
                />
            </div>
        </div>
    );
}

export default Stats;

// async function getTransactionDetails() {
//   "use server";
//   try {
//     await connect();
//     let deposits = await TRANSACTION.aggregate([
//       {
//         $match: { Type: "deposit" , Status : 1 },
//       },
//       {
//         $group: {
//           _id: "$Date",
//           total: { $sum: "$Amount" },
//         },
//       },
//     ]);
//     let withdrawals = await TRANSACTION.aggregate([
//       {
//         $match: { Type: "withdrawal" , Status : 1 },
//       },
//       {
//         $group: {
//           _id: "$Date",
//           total: { $sum: "$Amount" },
//         },
//       },
//     ]);

//     return { deposits, withdrawals };
//   } catch (error) {
//     console.log(error);
//     return JSON.stringify(error);
//   }
// }

// export const dynamic = "force-dynamic";
