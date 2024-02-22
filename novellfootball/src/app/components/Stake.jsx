import React from "react";
import Image from "next/image";
import teamlogo from "../../../public/logo.png";

function stake() {
  return (
    <div className="border-2 border-gray-[#e2dbd3] h-[65%] w-[90%] mr-auto ml-auto rounded-[10px] mt-[.5rem] bg-[#fbf3eb] shadow-sm ">
      <div
        // style={{ color }}
        className="w-max mr-auto ml-auto px-[1rem] py-[.1rem] rounded-b-lg font-semibold bg-[#ec8220] text-white "
      >
        Pending
      </div>
      <div className="text-center text-[.8rem] font-bold my-[.6rem] ">
        Primere leauge
      </div>

      <div className=" flex justify-between place-items-center ">
        <div className="w-[40%]  flex flex-col place-items-start   ">
          <div className=" w-[90%] flex justify-center " > 
            <div className="border-2 h-[40px] w-[40px] rounded-[100%] ">
              <Image src={teamlogo} alt="teamlogo" width={150} height={150} />
            </div>
          </div>
          <p className=" text-xs line-clamp-2 flex-[2]  font-bold capitalize w-[95%] text-center overflow-ellipsis break-words ">
            team name hii sir how are you{" "}
          </p>
        </div>

        <div className="flex  flex-col place-items-center  ">
          <p className="text-red-600 font-[700] text-[1.2rem] ">23:30</p>
          <p className="font-[600] ">25 FEB</p>
        </div>

        <div className="w-[40%]  flex flex-col place-items-end   ">
          <div className=" w-[90%] flex justify-center " > 
            <div className="border-2 h-[40px] w-[40px] rounded-[100%] ">
              <Image src={teamlogo} alt="teamlogo" width={150} height={150} />
            </div>
          </div>
          <p className=" w-[95%] text-center overflow-ellipsis break-words text-xs line-clamp-2 flex-[2]  font-bold capitalize ">
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
          <p className="w-[50%] line-clamp-1 text-ellipsis ">Stake Time 12/10/12 20:00</p>
        </div>

        <div
          className="flex  justify-between text-[.65rem] line-clamp-1 font-[600] "
          style={{ color: "gray" }}
        >
          <p className="line-clamp-1 text-ellipsis">Stake Amount 100000</p>
          <span className="w-[50%]  h-[20px] text-nowrap flex line-clamp-1 text-ellipsis ">
            Estimated Income
            <p className="text-nowrap ml-[.4rem] " style={{ color: "#00db58" }}>
              1029938
            </p>{" "}
          </span>
        </div>

        <div className="flex  justify-between text-[.8rem] line-clamp-1  font-extrabold leading-3 ">
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

      <button className=" bg-[#2885f6]  w-[85%] h-[50px] mr-auto ml-auto block  mt-[1rem] rounded-[5px] font-bold text-white ">
        Cancel Stake
      </button>
    </div>
  );
}

export default stake;
