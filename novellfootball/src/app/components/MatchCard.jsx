"use client"

import React from "react";

function MatchCard() {
  return (
    <div className="  h-[100px] flex mr-auto ml-auto my-[1rem] w-[95%] shadow-md rounded-lg ">
      <div className="h-[100%] w-[30%] flex place-items-center ">
        <div className="w-[90px] h-[90px] border-2 border-black rounded-[100%] mr-auto ml-auto " ></div>
      </div>

      <div className="flex flex-col justify-center ml-[.5rem] " >
        <div className="flex text-[.8rem] ">
          <p>12 feb 2024 - 23:45</p> <p className="ml-[.2rem] " >league name</p>
        </div>
        <div className="flex">
          <p className="mr-[.7rem] " >team A</p> VS <p className="ml-[.7rem]  " >team B</p>
        </div>
        <div className="font-bold ">
          Full Time, odds <span>0-3</span>@<span>5.63%</span>
        </div>
        <p className="text-[.8rem] my-[.4rem] "style={
                {
                  color:"#2785f6"
                }
              } >
          Start in <span>00:00:00</span>
        </p>
      </div>
    </div>
  );
}

export default MatchCard;
