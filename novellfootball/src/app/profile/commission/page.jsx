"use client";
import CommissionPopModel from "@/app/components/CommissionPopModel";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaRupeeSign, FaShare } from "react-icons/fa";
import { FaInfo } from "react-icons/fa6";
import {
  LiaAngleLeftSolid,
  LiaAngleRightSolid,
  LiaAngleUpSolid,
} from "react-icons/lia";
import { MdOutlineShare } from "react-icons/md";

const Page = () => {
  const [infoModel, updateInfoModel] = useState(false);
  const [claimModel, updateclaimModel] = useState(false);

  return (
    <section className=" bg-[#f8f8f8] w-full relative h-[100dvh]">
      <div className="relative text-center py-4 h-[8%] ">
        <h2 className=" capitalize text-[0.8rem] font-bold my-0">Profile</h2>
      </div>
      <main className=" space-y-1  h-fit px-4 ">
        {/* hero section */}
        <div
          style={{
            background: "url(../../profile-bg.png) center no-repeat",
            backgroundSize: "cover",
          }}
          className=" h-[65%] py-4 ring-[0.2px] ring-gray-600 w-full relative 
       rounded-2xl"
        >
          <div className="flex flex-col w-full mt-2 justify-center items-center py-3">
            <span
              className="
               relative text-gray-500 font-bold rounded-full capitalize text-sm text-center "
            >
              <h2>Total commission</h2>
              <h2>Earned by members</h2>
            </span>
            <span className="flex items-center text-4xl mt-4 text-white space-x-1">
              <h2>
                <FaRupeeSign />
              </h2>
              <h2 className="capitalize  truncate font-bold ">190238</h2>
            </span>
          </div>
          <div className="absolute flex justify-center items-center text-3xl text-white -bottom-6 rounded-full left-[50%] translate-x-[-50%] size-12 bg-blue-500">
            <MdOutlineShare />
          </div>
          <div className="absolute flex items-center space-x-2 top-4 left-4 ">
            <div
              onClick={() => updateInfoModel((prev) => !prev)}
              className="rounded-full flex justify-center items-center size-8 bg-red-500/80 text-white"
            >
              <FaInfo />
            </div>
            {infoModel && (
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{ duration: 0.3 }}
                className=" normal-case flex flex-col text-gray-800 py-1 px-2 text-[0.4rem] bg-white rounded-md h-full w-fit font-bold"
              >
                <span>Total commission earned from your friends:</span>
                <span>
                  Calculating the sum of commissions accumulated through
                </span>
                <span>referrals from your acquaintances.</span>
              </motion.p>
            )}
          </div>
        </div>
      </main>
      <div className="h-[60%] pt-6 mt-10  shadow-gray-900 rounded-t-[1.5rem]">
        <div className="h-full overflow-y-scroll pb-40 px-4">
          <div
            style={{ boxShadow: "0px 4px 10px 3px #dddee5" }}
            className="shadow-md mt-3 items-center py-2.5   rounded-2xl  px-4"
          >
            <div className="flex items-center ">
              <div className="h-full   w-full flex text-[0.6rem] font-semibold capitalize  items-center flex-[2]">
                weekly commission
              </div>
              <div className="h-full  w-full flex-[2] capitalize font-bold text-[0.6rem] text-gray-600 flex items-center justify-between">
                <div className="flex justify-center items-center">
                  <h2>
                    <FaRupeeSign />
                  </h2>
                  <h2>1092</h2>
                </div>
                <div className="py-1 bg-blue-500 rounded-md px-3 capitalize text-white font-semibold text-[0.6rem]">
                  claim
                </div>
              </div>
              <div
                onClick={() => updateclaimModel((prev) => !prev)}
                className="h-full w-full flex justify-center items-center flex-[1]"
              >
                <div className="p-1 ml-3 rounded-full bg-gray-200 text-sm">
                  {claimModel ? <LiaAngleUpSolid /> : <LiaAngleRightSolid />}
                </div>
              </div>
            </div>
            {/* modal */}
            {claimModel && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className=" grid grid-cols-2 pt-2 border-t-2 border-solid text-[0.6rem] font-bold gap-y-1 text-gray-700 border-gray-300 mt-2 "
              >
                {[1, 2, 3, 4, 5, 6, 7].map((ele, idx) => (
                  <span
                    key={idx}
                    className={`flex items-center ${
                      idx % 2 && " justify-self-end "
                    } `}
                  >
                    <div className="flex gap-x-1 items-center">
                      Day {idx + 1} commission
                      <h2 className="text-gray-600">
                        <FaRupeeSign />
                      </h2>
                    </div>
                    <h2>10</h2>
                  </span>
                ))}
              </motion.div>
            )}
          </div>
          <div
            style={{ boxShadow: "0px 4px 10px 3px #dddee5" }}
            className="shadow-md flex mt-3 items-center py-2.5  rounded-full  px-2"
          >
            <div className="h-full pl-2  w-full flex text-[0.6rem] font-semibold capitalize  items-center flex-[2]">
              new deposit
            </div>
            <div className="h-full  w-full flex-[2] capitalize font-bold text-[0.6rem] text-gray-400 flex items-center justify-between">
              <h2>9000000 new deposit</h2>
            </div>
            <div className="h-full w-full flex justify-center items-center flex-[1]">
              <div className="p-1 rounded-full bg-gray-200 text-sm">
                <LiaAngleRightSolid />
              </div>
            </div>
          </div>
          <div
            style={{ boxShadow: "0px 4px 10px 3px #dddee5" }}
            className="shadow-md flex mt-3 items-center py-2.5  rounded-full  px-2"
          >
            <div className="h-full pl-2  w-full flex text-[0.6rem] font-semibold capitalize  items-center flex-[2]">
              total withdrawal
            </div>
            <div className="h-full  w-full flex-[2] capitalize font-bold text-[0.6rem] text-gray-400 flex items-center justify-between">
              <h2>89390 total withdrawal</h2>
            </div>
            <div className="h-full w-full flex justify-center items-center flex-[1]">
              <div className="p-1 rounded-full bg-gray-200 text-sm">
                <LiaAngleRightSolid />
              </div>
            </div>
          </div>
          <div
            style={{ boxShadow: "0px 4px 10px 3px #dddee5" }}
            className="shadow-md flex mt-3 items-center py-2.5  rounded-full  px-2"
          >
            <div className="h-full pl-2  w-full flex text-[0.6rem] font-semibold capitalize  items-center flex-[2]">
              today&apos;s commission
            </div>
            <div className="h-full  w-full flex-[2] capitalize font-bold text-[0.6rem] text-gray-400 flex items-center justify-between">
              <h2>1000 today commission</h2>
            </div>
            <div className="h-full w-full flex justify-center items-center flex-[1]">
              <div className="p-1 rounded-full bg-gray-200 text-sm">
                <LiaAngleRightSolid />
              </div>
            </div>
          </div>
          <div
            style={{ boxShadow: "0px 4px 10px 3px #dddee5" }}
            className="shadow-md flex mt-3 items-center py-2.5  rounded-full  px-2"
          >
            <div className="h-full pl-2  w-full flex text-[0.6rem] font-semibold capitalize  items-center flex-[2]">
              new register
            </div>
            <div className="h-full  w-full flex-[2] capitalize font-bold text-[0.6rem] text-gray-400 flex items-center justify-between">
              <h2>50 new members joined</h2>
            </div>
            <div className="h-full w-full flex justify-center items-center flex-[1]">
              <div className="p-1 rounded-full bg-gray-200 text-sm">
                <LiaAngleRightSolid />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* commission popups */}
      <section className="absolute top-0 left-0 h-full w-full bg-slate-50">
        <CommissionPopModel />
      </section>
    </section>
  );
};

export default Page;
