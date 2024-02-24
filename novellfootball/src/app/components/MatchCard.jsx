"use client";

import React from "react";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function MatchCard({bgColor}) {
  const percentage = 66;

  return (
    <div
      style={{
        boxShadow: "0px 5px 5px 0px rgba(0,0,0,0.1)",
        background:bgColor
      }}
      className=" bg-[#FFD1D1]  h-[100px] flex mr-auto ml-auto my-[1rem] w-[95%]  rounded-xl place-items-center justify-around"
    >
      <div className="w-[27%] flex place-items-center h-[90%] justify-center ">
        <div className="h-[90%] w-[90%] flex place-items-center justify-center ">
          <CircularProgressbar
            styles={{ fontSize: "10px" }}
            className="bg-black rounded-[100%] p-[8px] text-[.2rem]    "
            value={percentage}
            strokeWidth={20}
            text={`${percentage}M`}
          />
        </div>
      </div>

      <div className=" capitalize  flex flex-col justify-center w-[68%] h-[90%] ">
        <div className="flex  line-clamp-1 text-[.7rem] font-light text-[#6F6F6F] ">
          <span className="flex ">
            12th feb 2024 <p>20:30</p>{" "}
          </span>
          <span className="ml-2 line-clamp-1 text-ellipsis w-[50%] ">
            League Namie hii there here{" "}
          </span>
        </div>

        <div className="flex  line-clamp-1 text-[.8rem] font-normal text-[#6E6E6E]  w-[70%] justify-between ">
          <span className="line-clamp-1 text-ellipsis w-[70%] mr-1 ">
            Team one and hello i am her
          </span>
          <span>VS</span>
          <span className="line-clamp-1 text-ellipsis w-[70%] ml-1 ">
            Team two hello there i am here{" "}
          </span>
        </div>

        <div className="flex line-clamp-1  font-semibold text-[.9rem]  ">
          <span>full time , odds</span>
          <span className="flex  line-clamp-1 text-ellipsis ">
            <p className="ml-1">0-3</p> <p>@ 5.45%</p>{" "}
          </span>
        </div>

        <div className="font-light text-[#2885F6] text-[.7rem] ">
          <p>start in 00:00:00</p>
        </div>
      </div>
    </div>
  );
}

export default MatchCard;
