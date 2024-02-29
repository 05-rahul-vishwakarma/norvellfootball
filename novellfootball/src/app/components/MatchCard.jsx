"use client";

import React from "react";

import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import HomeGradient from "./HomeGradient";

function MatchCard({ bgColor, id }) {
  const percentage = 66;
  const colorArr = [
    { start: "#FFBFBF", stop: "#EC2020" },
    { start: "#F0FFF6", stop: "#00DB58" },
    { start: "#DFFAFE", stop: "#1FE4FF" },
    { start: "#FFEBC9", stop: "#F7A928" },
  ];
  const rand = Math.floor(Math.random() * colorArr.length);
  return (
    <div
      style={{
        boxShadow: "0px 5px 5px 0px rgba(0,0,0,0.1)",
        background: bgColor,
      }}
      className=" bg-[#FFD1D1]  h-[100px] flex mr-auto ml-auto my-[1rem] w-[95%]  rounded-xl place-items-center justify-around"
    >
      <div className="w-[27%] flex place-items-center h-[90%] justify-center ">
        <div className="h-[100%] aspect-square relative rounded-full bg-[#000000] flex place-items-center justify-center ">
          <div className="h-[90%] flex justify-center items-center text-white ">
            <div style={{ lineHeight: 1 }} className="capitalize text-center">
              <p
                style={{ color: `${colorArr[rand].stop}` }}
                className="text-md font-bold"
              >
                77M
              </p>
              <p className="text-[0.5rem] ">total </p>
              <p className="text-[0.5rem] ">quantity</p>
            </div>
          </div>
          <div className="absolute flex justify-center items-center h-full w-full">
            <HomeGradient
              id={id}
              percentage={Math.random() * 105}
              colors={colorArr[rand]}
            />
          </div>
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
