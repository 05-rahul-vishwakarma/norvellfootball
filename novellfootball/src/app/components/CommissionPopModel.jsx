"use client";

import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion } from "framer-motion";
import Image from "next/image";
import RecordAccordians from "./RecordAccordian";

function CommissionPopModel({ closeModel }) {
  const [swipe, setSwipe] = useState(1);
  const [scoreData, updateData] = useState([
    {
      score: "0-0",
      percent: "4.5",
      selected: false,
    },
    {
      score: "0-1",
      percent: "4.5",
      selected: false,
    },
    {
      score: "0-2",
      percent: "4.5",
      selected: false,
    },
    {
      score: "0-3",
      percent: "4.5",
      selected: false,
    },
    {
      score: "0-4",
      percent: "4.5",
      selected: false,
    },
    {
      score: "0-0",
      percent: "4.5",
      selected: false,
    },
    {
      score: "0-0",
      percent: "4.5",
      selected: false,
    },
  ]);

  function setActive(idx) {
    let newData = JSON.parse(JSON.stringify(scoreData));
    newData.forEach((element, i) => {
      idx === i ? (element.selected = true) : (element.selected = false);
    });
    updateData(newData);
  }
  function setDeactivated() {
    updateData((prev) => {
      return prev.map((ele) => ({ ...ele, selected: false }));
    });
  }
  return (
    <div className="h-screen w-screen overflow-y-hidden bg-[#f8fcff] ">
      <div className="py-[1rem] h-[10%] ">
        <div className="grid grid-flow-col  place-items-center">
          <span
            onClick={() => closeModel(false)}
            className="flex place-items-center justify-self-start p-[0.5rem]"
          >
            <IoIosArrowBack className="text-[0.8rem]   " />
            <p className="text-[.7rem] font-medium ">Back</p>
          </span>
          <div className="flex place-items-center justify-self-start">
            <span className="font-bold text-[0.8rem] capitalize ">
              new register
            </span>
          </div>
          <span></span>
        </div>
      </div>

      {/* toggler */}
      <div className="h-fit">
        <div className=" h-[60px] w-[90%] flex mr-auto ml-auto rounded-[10px] relative  bg-[#e8e8e8] ">
          <div
            onClick={() => setSwipe(1)}
            className={`flex-[1] z-[3] flex justify-center items-center text-sm capitalize ${
              swipe === 1 ? " font-bold " : "  "
            }`}
          >
            today
          </div>
          <div
            onClick={() => setSwipe(2)}
            className={`flex-[1] z-[3] flex justify-center items-center text-sm capitalize ${
              swipe === 3 ? " font-bold " : "  "
            }`}
          >
            overall
          </div>
          {/* toggler */}
          <div className="h-full grid grid-cols-2 justify-center w-full absolute top-0 p-1">
            <div
              style={{ gridColumnStart: swipe }}
              className={`col-span-1 rounded-md   bg-white z-[1]`}
            ></div>
          </div>
        </div>
      </div>

      <div className=" h-[80%]  relative ">
        <div className="relative px-4  h-[10%] flex items-center ">
          <input
            type="text"
            name=""
            style={{ boxShadow: " 0px 5px 10px 1px #cfd8e4" }}
            className="text-center px-4 rounded-full py-1.5 outline-none
              shadow-gray-500
            border-none bg-white w-full"
            placeholder="Search Username"
            id=""
          />
          <div className="absolute left-4 top-0 h-full flex justify-center items-center aspect-square ">
            <Image src="/search.png" alt="logo" height={25} width={25}></Image>
          </div>
        </div>
        <div className="relative px-4 h-[10%] flex items-center justify-evenly ">
          <div className="flex shadow-sm items-center bg-white space-x-3 py-2 px-3 text-sm font-bold rounded-md">
            <p>level 1</p>
            <input
              type="radio"
              className="text-blue-500  size-5 radio-primary outline-blue-400"
              name="level"
              id=""
            />
          </div>
          <div className="flex shadow-sm items-center bg-white space-x-3 py-2 px-3 text-sm font-bold rounded-md">
            <p>level 2</p>
            <input
              type="radio"
              className="text-blue-500 size-5 radio-primary outline-blue-400"
              name="level"
              id=""
            />
          </div>
          <div className="flex shadow-sm items-center bg-white space-x-3 py-2 px-3 text-sm font-bold rounded-md">
            <p>level 3</p>
            <input
              type="radio"
              className="text-blue-500 size-5 radio-primary outline-blue-400"
              name="level"
              id=""
            />
          </div>
        </div>
        <div className="h-[80%] overflow-y-auto px-6 pb-[15rem] w-full">
          {scoreData.map((item, idx) => (
            <RegisterAcordian
              key={idx}
              idx={idx}
              cardDetails={item}
              setActive={setActive}
              setDeactivated={setDeactivated}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommissionPopModel;

// new register accordian button
function RegisterAcordian({ cardDetails, setActive, setDeactivated, idx }) {
  return (
    <div className="bg-white mb-4 w-full px-6 py-2 shadow-md rounded-md">
      <div className="grid grid-cols-3 justify-between ">
        <motion.div
          layoutId={idx + 1}
          className="space-y-0.5 flex col-span-2 justify-between "
        >
          <h2 className="font-bold capitalize truncate text-sm">Deposit</h2>
          <div className="flex text-xs text-gray-600 font-bold items-center">
            <h2>12/02/2023</h2>
            <h2>-</h2>
            <h2>10:00</h2>
          </div>
        </motion.div>
        <div className="flex justify-self-end space-x-4">
          <div
            onClick={() =>
              cardDetails.selected ? setDeactivated() : setActive(idx)
            }
            className=" flex justify-end h-fit"
          >
            <span className="p-[0.1rem] bg-gray-300 text-gray-600 rounded-full">
              {cardDetails.selected ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </div>
        </div>
      </div>
      {cardDetails.selected && (
        <motion.div
          layoutId={idx + 1}
          className="mt-0 capitalize text-[0.56rem] space-y-[1.25px] text-black font-medium"
        >
          <div className="pb-2">
            <h2 className="font-bold text-[0.7rem] capitalize">user profile</h2>
          </div>
          <div className=" space-y-1">
            <span className="space-x-1 flex">
              <h2 className="text-semibold">status -</h2>
              <h2 className="text-green-400 font-semibold">Active</h2>
            </span>
            <span className="space-x-1 flex">
              <h2>username -</h2>
              <h2 className=" font-semibold">tester</h2>
            </span>
            <span className="space-x-1 flex">
              <h2>parent username -</h2>
              <h2 className=" font-semibold">tester 0123</h2>
            </span>
            <span className="space-x-1 flex">
              <h2>current balance -</h2>
              <h2 className=" font-semibold">123987</h2>
            </span>
            <span className="space-x-1 flex">
              <h2>total deposit -</h2>
              <h2 className=" font-semibold">309482</h2>
            </span>
            <span className="space-x-1 flex">
              <h2>joining level -</h2>
              <h2 className=" font-semibold">1</h2>
            </span>
            <span className="space-x-1 flex">
              <h2>total withdrawal -</h2>
              <h2 className=" font-semibold">23904</h2>
            </span>
            <span className="space-x-1 flex">
              <h2>date/time -</h2>
              <h2 className=" font-semibold">12/02/2020 - 10:10</h2>
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// this component can be used for new deposit and new withdrawal also
function NewDeposit() {
  return (
    <div className="flex text-sm mb-4 bg-white text-gray-700 shadow-sm font-bold items-center capitalize justify-between px-3 py-2.5 rounded-md">
      <h2>user name</h2>
      <h2>109283</h2>
    </div>
  );
}
