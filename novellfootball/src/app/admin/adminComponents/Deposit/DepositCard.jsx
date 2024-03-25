"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { updateTransaction } from "./Action";
import { Button, Listeners } from "../Bets/BetCard";
import { IoIosArrowDown } from "react-icons/io";

const initialState = {
  message: "",
};

const DepositCard = ({ data, idx }) => {
  const [isDocEditable, toggleEditable] = useState(false);
  const [ReferanceNo, updateReferance] = useState(data?.TransactionId);
  const [Amount, updateAmount] = useState(Number(data?.Amount) / 100);
  const [Status, updateStatus] = useState(data?.Status);
  const [createdAt] = useState(new Date(data?.createdAt));
  const [UserName, updateUserName] = useState(data?.UserName);
  const [Remark, updateRemark] = useState(data?.Remark);
  const [prevTransactionId, updateId] = useState(data?.TransactionId);
  const [state, formAction] = useFormState(updateTransaction, initialState);
  const [showExtra, getExtraData] = useState(false);
  return (
    <div className="p-1.5 flex shadow-md rounded-md bg-white">
      <div className="w-[5%] text-sm font-bold text-red-500 mt-1 text-center">
        {idx + 1}.
      </div>
      <div className="w-[95%] text-sm">
        <form className="capitalize divide-y-2" action={formAction}>
          <input
            type="text"
            className="sr-only"
            value={prevTransactionId}
            onChange={updateId}
          />
          <div
            style={{ borderColor: isDocEditable ? "skyblue" : "transparent" }}
            className="flex justify-between border-dashed border-2 py-1.5"
          >
            <p className="w-[60%]">Referance no.</p>
            <input
              disabled={!isDocEditable}
              type="text"
              className="w-[40%]"
              onChange={(e) => updateReferance(e.target.value)}
              value={ReferanceNo}
              placeholder="293847"
            />
          </div>
          <div className="flex justify-between py-1.5">
            <p className="w-[60%]">date/time</p>
            <p className="w-[40%]">
              {data?.Date}-
              {createdAt?.getHours() > 12
                ? createdAt?.getHours() - 12
                : createdAt.getHours()}
              :{createdAt?.getMinutes()}:{createdAt?.getSeconds()}
            </p>
          </div>
          <div className="flex justify-between py-1.5">
            <p className="w-[60%]">status</p>
            <div className="w-[40%] flex items-center space-x-4">
              <p
                style={{
                  background:
                    Status === 1 ? "lime" : Status === 2 ? "red" : "yellow",
                }}
                className="py-0.5 px-2 bg-yellow-300 rounded-md text-white"
              >
                {Status === 1
                  ? "success"
                  : Status === 2
                  ? "canceled"
                  : "pending"}
              </p>
              <p
                onClick={(e) => getExtraData((prev) => !prev)}
                className="rounded-full bg-gray-300 p-0.5"
              >
                <IoIosArrowDown />
              </p>
            </div>
          </div>

          {showExtra && (
            <>
              <div className="flex justify-between py-1.5">
                <p className="w-[60%]">payment method</p>
                <p className="w-[40%]">{data?.Method}</p>
              </div>
              <div className="flex justify-between py-1.5">
                <p className="w-[60%]">username</p>
                <input
                  type="text"
                  value={UserName}
                  onChange={(e) => updateUserName(UserName)}
                  className="w-[40%]"
                  placeholder="293847"
                />
              </div>

              <div
                style={{
                  borderColor: isDocEditable ? "skyblue" : "transparent",
                }}
                className="flex justify-between py-1.5 border-2 border-dashed"
              >
                <p className="w-[60%]">amount</p>
                <input
                  type="text"
                  value={Amount}
                  disabled={!isDocEditable}
                  onChange={(e) => updateAmount(e.target.value)}
                  className="w-[40%]"
                  placeholder="293847"
                />
              </div>

              <div
                style={{
                  borderColor: isDocEditable ? "skyblue" : "transparent",
                }}
                className="flex justify-between py-1.5 border-2 border-dashed"
              >
                <p className="w-[60%]">remark</p>
                <input
                  type="text"
                  disabled={!isDocEditable}
                  className="w-[40%]"
                  placeholder="enter a remark"
                  value={Remark}
                  onChange={(e) => updateRemark(e.target.value)}
                />
              </div>
              <div className="flex justify-between py-1.5">
                <p className="w-[60%]">choose</p>
                <div className="flex w-[40%] space-x-4 justify-start">
                  <div className="space-y-1">
                    <p>
                      <Image src={"/wrong.png"} width={12} height={12} />{" "}
                    </p>
                    <input
                      checked={Status === 2}
                      onChange={(e) => updateStatus(2)}
                      type="radio"
                      name="stat_2"
                    />
                  </div>
                  <div className="space-y-1">
                    <p>
                      <Image src={"/tick_mark.png"} width={12} height={12} />{" "}
                    </p>
                    <input
                      checked={Status === 1}
                      onChange={(e) => updateStatus(1)}
                      type="radio"
                      name="stat_1"
                    />
                  </div>
                </div>
              </div>
              {/* controll buttons */}
              <div className="flex space-x-12 justify-center py-2 pt-4">
                <button
                  type="button"
                  onClick={(e) => toggleEditable((prev) => !prev)}
                  className="rounded-md px-4 py-0.5 text-white bg-yellow-500"
                >
                  Edit
                </button>
                <Button isDisabled={!isDocEditable} />
              </div>
              <Listeners />
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default DepositCard;
