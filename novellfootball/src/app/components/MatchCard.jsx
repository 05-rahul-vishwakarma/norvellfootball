"use client";
import { useEffect, useState } from "react";
import HomeGradient from "./HomeGradient";
import { IoColorFilterSharp } from "react-icons/io5";
const colorArr = [
  { start: "#FFBFBF", stop: "#EC2020" },
  { start: "#F0FFF6", stop: "#00DB58" },
  { start: "#DFFAFE", stop: "#1FE4FF" },
  { start: "#FFEBC9", stop: "#F7A928" },
];

function MatchCard({ bgColor, id, data, index }) {
  const [istTime, setISTTime] = useState("");
  const [timeString, setTimeString] = useState("");

  const convertToIST = () => {
    const currentTime = new Date(data.StartsAt); // Get the current time
    const istTime = new Date(
      currentTime.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    setISTTime(istTime.toLocaleString());
  };

  useEffect(() => {
    if (data.StartsAt) {
      const dateObject = new Date(data.StartsAt);
      const hours = dateObject.getHours().toString().padStart(2, "0"); // Get hours
      const minutes = dateObject.getMinutes().toString().padStart(2, "0"); // Get minutes
      const seconds = dateObject.getSeconds().toString().padStart(2, "0"); // Get seconds
      const formattedTime = `${hours}:${minutes}:${seconds}`;
      setTimeString(formattedTime);
      convertToIST();
    }
  }, [data.StartsAt]);

  let [percentage, updatePercentage] = useState(0);
  let [colors, updateColors] = useState({});

  useEffect(() => {
    updatePercentage(Math.random() * 105);
    let rand = Math.floor(Math.random() * colorArr.length);
    updateColors({ ...colorArr[rand] });
  }, []);
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
                style={{ color: `${colors.stop}` }}
                className={`text-md font-bold`}
              >
                77M
              </p>
              <p className="text-[0.5rem] ">total </p>
              <p className="text-[0.5rem] ">quantity</p>
            </div>
          </div>
          <div className="absolute flex justify-center items-center h-full w-full">
            <HomeGradient id={id} percentage={percentage} colors={colors} />
          </div>
        </div>
      </div>

      <div className=" capitalize  flex flex-col justify-center w-[68%] h-[90%] ">
        <p className="hidden">{data.StakeId}</p>
        <div className="flex  line-clamp-1  font-light text-[#6F6F6F] text-[.6rem] ">
          <span className="flex  ">{istTime}</span>
          <span className="ml-2 line-clamp-1 text-ellipsis w-[50%] ">
            {data?.LeagueName || "no league available"}
          </span>
        </div>

        <div className="flex  line-clamp-1 text-[.7rem] font-normal text-[#6E6E6E] place-items-center ">
          <span className="line-clamp-1 text-ellipsis  ">
            {data?.Team_a || "no team a"}
          </span>
          <span className="mx-1 "> VS </span>
          <span className="line-clamp-1 text-ellipsis  text-center ">
            {data?.Team_b || "no team a"}
          </span>
        </div>

        <div className="flex line-clamp-1  font-semibold text-[.8rem] place-items-center  ">
          <span>full time , odds</span>
          <span className="flex  line-clamp-1 text-ellipsis place-items-center  ">
            <p className="ml-1">
              {" "}
              {data.Score_a}:{data.Score_b}{" "}
            </p>{" "}
            <p className="ml-1"> @{data.FixedPercent} </p>{" "}
          </span>
        </div>

        <div className="font-light text-[#2885F6] text-[.6rem] ">
          <p>start in {timeString} </p>
        </div>
      </div>
    </div>
  );
}

export default MatchCard;
