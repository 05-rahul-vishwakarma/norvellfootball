"use client";
import { useEffect, useState } from "react";
import LineChart from "../adminComponents/LineChart/LineChart";
import { getTransactionDetails } from "../adminComponents/LineChart/Action";

const customSort = (a, b) => {
  // Convert dates to JavaScript Date objects for comparison
  const dateA = new Date(a._id.split("/").reverse().join("/"));
  const dateB = new Date(b._id.split("/").reverse().join("/"));

  // Compare dates
  if (dateA < dateB) return -1;
  if (dateA > dateB) return 1;
  return 0; // Dates are equal
};

const Page = async () => {
  let deposits,
    withdrawals = [];
  const [res, updateRes] = useState({
    deposits: [],
    withdrawal: [],
  });
  deposits = res?.deposits;
  withdrawals = res?.withdrawal;

  deposits.sort(customSort);
  withdrawals.sort(customSort);
  let confDeposit = {
    labels: deposits?.map((ele) => `${ele?._id}`),
    datasets: [
      {
        label: "success",
        data: deposits?.map((ele) => ele?.total / 100),
        fill: false,
        borderColor: "lime",
        tension: 0.1,
      },
    ],
  };
  let confWithdrawal = {
    labels: withdrawals?.map((ele) => `${ele?._id}`),
    datasets: [
      {
        label: "success",
        data: withdrawals?.map((ele) => ele?.total / 100),
        fill: false,
        borderColor: "#00FFF5",
        tension: 0.1,
      },
    ],
  };

  let totalDeposits = deposits.reduce(
    (acc, currVal) => acc + currVal?.total / 100,
    0
  );
  let totalWithdrawals = withdrawals.reduce(
    (acc, currVal) => acc + currVal?.total / 100,
    0
  );
  async function gatherData() {
    console.log("called");
    let data = await getTransactionDetails();
    updateRes(data);
  }
  useEffect(() => {
    gatherData();
    let revalidateData = setInterval(() => gatherData(), 60 * 1000);
    return () => clearInterval(revalidateData);
  }, []);
  return (
    <div className=" h-screen bg-[#352F44]">
      <div className="text-center uppercase py-2 text-green-400">
        <h1>Statistics</h1>
      </div>
      <div className="flex space-x-3 h-[90%] justify-evenly py-3 px-4">
        <div className="w-[40%] relative rounded-xl shadow-md bg-[#3c364d] text-center h-full">
          <h1 className="py-3 h-[10%] text-[#F4EEE0] font-bold">Deposit</h1>
          <div className="mt-4 h-[90%] px-2 flex items-center">
            <LineChart dataSet={JSON.parse(JSON.stringify(confDeposit))} />
          </div>
        </div>
        <div className="w-[20%] h-full flex flex-col space-y-4 justify-center">
          <div className="bg-[#433c56] text-slate-50 rounded-md text-center shadow-md py-2 space-y-3 px-1">
            <h1 className="text-[0.9rem]">Finance Status</h1>
            <div
              style={{
                background:
                  totalDeposits - totalWithdrawals < 0
                    ? "#f04650"
                    : totalDeposits - totalWithdrawals > 600000
                    ? "#4adb7f"
                    : "#9ff046",
              }}
              className="rounded-md text-lg bg-green-400 py-4 text-center font-bold text-white"
            >
              <p>
                {totalDeposits - totalWithdrawals < 0
                  ? "BAD"
                  : totalDeposits - totalWithdrawals > 600000
                  ? "EXCELENT"
                  : "GOOD"}
              </p>
            </div>
          </div>
          <div className="bg-[#433c56] text-slate-50 rounded-md text-center shadow-md py-2 space-y-3 px-1">
            <h1 className="text-[0.9rem]">Total deposit/withdrawal</h1>
            <div className="rounded-md flex px-2 flex-col text-start space-x-2 py-3 font-bold text-md bg-red-400 text-white">
              <div>Deposit {totalDeposits}</div>
              <div className="m-0">Withdrawal {totalWithdrawals}</div>
            </div>
          </div>
        </div>
        <div className="w-[40%] rounded-xl text-center shadow-md bg-[#3c364d] h-full">
          <h1 className="py-3 h-[10%] text-[#F4EEE0] font-bold">Withdrawal</h1>
          <div className="mt-4 h-[90%] flex px-2 items-center">
            <LineChart dataSet={JSON.parse(JSON.stringify(confWithdrawal))} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
