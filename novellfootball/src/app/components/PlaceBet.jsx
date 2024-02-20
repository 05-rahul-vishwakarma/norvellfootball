"use client";
// this component is used when the user try's to place a bet by clicking on matchCard2 -> this popup
// this popup will allow users to select the score to bet on.
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Input from "./Input";

const PlaceBet = () => {
  const [credentials, updateCredentials] = useState({
    confPassword: "",
    Password: "",
  });
  function update(e) {
    updateCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full absolute  top-0 left-0 flex justify-center items-end bg-black/70 w-full"
    >
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className=" h-[85%] py-8 pb-12  bg-slate-100 overflow-y-auto rounded-t-[2rem] w-[98%]"
      >
        <div className="flex  relative px-2  justify-center">
          <h4 className="border-2 border-solid border-blue-700 min-w-[20%] rounded-full"></h4>
          <p
            className="absolute left-2 text-sm font-bold mt-[-1rem] p-2"
            onClick={() => toggleVerification(false)}
          >
            &lt; Back
          </p>
        </div>
        <div className=" px-6 mt-10 text-white">
          <div className="rounded-2xl bg-blue-300 pt-4  h-full text-center  w-full">
            <h2 className="capitalize text-sm font-bold text-white">
              premier league
            </h2>
            <div className="w-full mt-3 flex px-2">
              <div className="flex-[2] flex-col flex w-full items-center h-full ">
                <span className="h-[60px] w-[60px] rounded-full relative ">
                  <Image src={"/logo.png"} objectFit="cover" layout="fill" />
                </span>
                <span className="line-clamp-2 w-[80%] text-xs capitalize font-bold">
                  team a and here am i
                </span>
              </div>
              <div className="flex-[1] flex items-center justify-center flex-col">
                <span className="text-xl block font-bold text-red-600">
                  23:40
                </span>
                <span className="uppercase text-sm font-bold">27 FEB</span>
              </div>
              <div className="flex-[2] flex-col flex w-full items-center h-full ">
                <span className="h-[60px] w-[60px] rounded-full relative ">
                  <Image src={"/logo.png"} objectFit="cover" layout="fill" />
                </span>
                <span className="line-clamp-2 w-[80%] text-xs capitalize font-bold">
                  team a and here am i
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <div className="rounded-t-xl bg-red-600 px-3 py-1 h-full">
                <h2 className="capitalize font-bold text-sm text-white">
                  full-time
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="px-5">
          <h2 className="text-[0.7rem] mt-3 font-semibold text-slate-500">
            Please choose a match score to place your stake.
          </h2>
        </div>
        <div className="mt-3 px-4 space-y-4">
          {/* score cards */}
          <ScoreCards />
          <ScoreCards />
          <ScoreCards />
          <ScoreCards />
          <ScoreCards />
          <ScoreCards />
          <ScoreCards />
          <ScoreCards />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PlaceBet;

function ScoreCards() {
  return (
    <div
      style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
      className="rounded-xl bg-[#fff] space-x-2 grid text-xs font-bold py-2 px-2 shadow-md"
    >
      <span className="flex items-center justify-center">
        Score <h2 className="ml-1 text-red-500 ">0-0</h2>
      </span>
      <span className="flex items-center">
        Odds percentage -<h2 className="ml-1 text-green-400">5.45</h2>
        <h2 className="text-green-400">%</h2>
      </span>
      <span className="h-full w-[90%] py-1 px-1 text-center text-[0.6rem] rounded-md bg-blue-600 text-white justify-center">
        Place stake
      </span>
    </div>
  );
}
