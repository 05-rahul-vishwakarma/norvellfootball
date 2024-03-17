"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { FaEdit } from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { updateTransaction } from "./Action";
import { Button, Listeners } from "../Bets/BetCard";

const initialState = {
  message: "",
};

const WithdrawCard = ({ data }) => {
  const [isDocEditable, toggleEditable] = useState(true);
  const [ReferanceNo, updateReferance] = useState(data?.TransactionId);
  const [Amount, updateAmount] = useState(Number(data?.Amount) / 100);
  const [Status, updateStatus] = useState(data?.Status);
  const [createdAt] = useState(new Date(data?.createdAt));
  const [UserName, updateUserName] = useState(data?.UserName);
  const [Remark, updateRemark] = useState(data?.Remark);
  const [prevTransactionId, updateId] = useState(data?.TransactionId);
  const [state, formAction] = useFormState(updateTransaction, initialState);
  return (
    <form action={formAction}>
      <div className="grid py-2 px-2 items-center grid-cols-9 md:text-[0.66rem]  text-[0.6rem] gap-x-2 bg-white">
        <div className=" sr-only ">
          <input
            type="text"
            name="prevTransactionId"
            value={data?.TransactionId}
            onChange={(e) => updateId(prevTransactionId)}
          />
        </div>
        <div
          style={{ border: !isDocEditable ? "1px dashed blue" : "none" }}
          className="truncate size-full flex items-center "
        >
          {/* <h1>293874829307</h1> */}
          <input
            type="number"
            value={ReferanceNo}
            onChange={(e) =>
              !isDocEditable ? updateReferance(e.target.value) : null
            }
            name="RefrenceNo"
          />
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => updateUserName(UserName)}
            value={UserName}
            name="UserName"
          />
        </div>
        <div
          style={{ border: !isDocEditable ? "1px dashed blue" : "none" }}
          className="truncate size-full flex items-center "
        >
          <input
            type="text"
            value={Amount}
            onChange={(e) =>
              !isDocEditable ? updateAmount(e.target.value) : null
            }
            name="Amount"
          />
        </div>
        <div className="truncate size-full flex items-center ">
          <h1>
            {data?.Date}-
            {createdAt?.getHours() > 12
              ? createdAt?.getHours() - 12
              : createdAt.getHours()}
            :{createdAt?.getMinutes()}:{createdAt?.getSeconds()}
          </h1>
        </div>
        <div className="truncate size-full flex items-center ">
          <h1>{data?.Method}</h1>
        </div>
        <div className="flex justify-start gap-x-2">
          <div className="space-y-1">
            <span className="flex justify-center items-center">
              <MdPending className="h-[12px] w-[12px] text-yellow-500 " />
            </span>
            <input
              type="radio"
              checked={Status === 0}
              onChange={(e) => updateStatus(0)}
              name="stat_0"
            />
          </div>
          <div className="space-y-1">
            <span className="flex justify-center items-center">
              <Image
                src="/tick_mark.png"
                height={12}
                width={12}
                alt="correct"
              />
            </span>
            <input
              checked={Status === 1}
              onChange={(e) => updateStatus(1)}
              type="radio"
              name="stat_1"
            />
          </div>
          <div className="space-y-1">
            <span className="flex justify-center items-center">
              <Image src="/wrong.png" height={12} width={12} alt="correct" />
            </span>
            <input
              type="radio"
              checked={Status === 2}
              onChange={(e) => updateStatus(2)}
              name="stat_2"
            />
          </div>
        </div>
        <div
          style={{ border: !isDocEditable ? "1px dashed blue" : "none" }}
          className="truncate size-full flex items-center "
        >
          <input
            type="text"
            value={Remark}
            style={{
              background:
                Status === 0 ? "#ffff8c" : Status === 1 ? "#adffad" : "#ffbfbf",
              color:
                Status === 0 ? "#be7e25" : Status === 1 ? "#00cd00" : "#f02f52",
            }}
            className="bg-green-300 w-[50%] font-bold capitalize rounded-md py-0.5 px-1 "
            onChange={(e) =>
              !isDocEditable ? updateRemark(e.target.value) : null
            }
            name="Remark"
          />
        </div>
        <div
          onClick={() => toggleEditable((prev) => !prev)}
          className="flex  items-center"
        >
          <FaEdit className="size-4 text-blue-700" />
        </div>
        <div>
          <Button />
        </div>
      </div>
      <div className="text-sm font-semibold flex space-x-2 px-2">
        {Object.keys(data?.Bank || {}).map((key, idx) => {
          return (
            <span key={idx} className="flex space-x-1">
              <h1 className="font-medium">{key}</h1>{" "}
              <h1 className="text-red-500">:-</h1>{" "}
              <h1 className="text-purple-500">{data?.Bank[key]}</h1>
            </span>
          );
        })}
      </div>
      <Listeners message={state?.message} />
    </form>
  );
};

export default WithdrawCard;
