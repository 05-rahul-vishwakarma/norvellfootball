import React from "react";

import Image from "next/image";
import teamlogo from "../../../public/logo.png";

function StakeHistory({ color, loss ,bgColor }) {
  return (
    <div
     style={{background:bgColor}}
    className="border-2 border-gray-[#e2dbd3] min-h-min  w-[90%] mr-auto ml-auto rounded-[10px] mt-[.5rem] bg-[#fbf3eb] shadow-sm pb-2  ">
      <div
        style={{ background: color }}
        className="w-max mr-auto ml-auto px-[1rem] py-[.1rem] rounded-b-lg font-semibold  text-white "
      >
        {loss}
      </div>
      <div className="text-center text-[.8rem] font-bold my-[.6rem] ">
        Primere leauge
      </div>

      <div className=" flex justify-between place-items-center w-[95%] mr-auto ml-auto ">
        <div className="w-[35%]  flex flex-col place-items-center   ">
          <div className="border-2 h-[40px] w-[40px] rounded-[100%] ">
            <Image src={teamlogo} alt="teamlogo" width={150} height={150} />
          </div>
          <p className=" text-[.65rem] leading-3  line-clamp-2 flex-[2]  font-bold capitalize w-[95%] text-center overflow-ellipsis break-words ">
            team name hii sir how are you{" "}
          </p>
        </div>

        <div className="flex  flex-col place-items-center  ">
          <p className="text-red-600 font-[700] text-[1.2rem] ">23:30</p>
          <p className="font-[600] ">25 FEB</p>
        </div>
        
        <div className="w-[35%]  flex flex-col place-items-center   ">
          <div className="border-2 h-[40px] w-[40px] rounded-[100%] ">
            <Image src={teamlogo} alt="teamlogo" width={150} height={150} />
          </div>
          <p className=" text-[.65rem] leading-3  line-clamp-2 flex-[2]  font-bold capitalize w-[95%] text-center overflow-ellipsis break-words ">
            team name hii sir how are you{" "}
          </p>
        </div>
      </div>

      <hr className=" w-[88%] mr-auto ml-auto mt-[.7rem] bg-black opacity-50 " />

      <div className=" mt-[.3rem] w-[87%] mr-auto ml-auto ">
        <div
          className="flex  justify-between text-[.65rem] line-clamp-1 font-[600] "
          style={{ color: "gray" }}
        >
          <p className="">Stake ID : 32100</p>
          <span className="w-[50%] line-clamp-1 text-ellipsis  flex  ">
            Stake Time 12/10/12 <p className="ml-2" >20:20</p>
          </span>
        </div>

        <div
          className="flex  justify-between text-[.65rem] line-clamp-1 font-[600]   "
          style={{ color: "gray" }}
        >
          <p className="line-clamp-1 text-ellipsis">Stake Amount 100000</p>
          <span className="w-[50%]  text-nowrap flex line-clamp-1 text-ellipsis ">
            Estimated Income
            <p className="text-nowrap ml-[.4rem] " style={{ color: "#00db58" }}>
              1029938
            </p>{" "}
          </span>
        </div>

        <div className="flex  justify-between text-[.8rem] line-clamp-1  font-extrabold leading-4 ">
          <span className="flex place-items-center ">
            Score FT{" "}
            <p className="text-red-600 text-[1.2rem] font-extrabold ">0-0</p>{" "}
          </span>
          <span className="w-[50%] flex place-items-center ">
            Odds{" "}
            <p className=" ml-[.3rem] " style={{ color: "#00db58" }}>
              {" "}
              5.64%
            </p>{" "}
          </span>
        </div>
      </div>

      <div className=" flex justify-center mt-[1rem] ">
        <div className=" h-[50px] w-[50px] flex place-items-center justify-center  m-[.2rem] font-extrabold text-[1.4rem] text-[#757f79] ">
          FT
        </div>
        <div className=" h-[50px] w-[50px] flex place-items-center justify-center  m-[.2rem] rounded-[100px] font-extrabold text-[1.4rem] text-red bg-white ">
          1
        </div>
        <div className=" h-[50px] w-[50px] flex place-items-center justify-center  m-[.2rem] rounded-[100px] font-extrabold text-[1.4rem] text-[#a0a3a1] bg-[#f9fffb] ">
          3
        </div>
      </div>

    </div>
  );
}

export default StakeHistory;
