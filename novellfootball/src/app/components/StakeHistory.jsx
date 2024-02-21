import React from "react";

import Image from "next/image";
import teamlogo from '../../../public/logo.png'

function StakeHistory() {
  return (
    <div className="border-2 border-gray-[#e2dbd3] h-[60%] w-[90%] mr-auto ml-auto rounded-[10px] mt-[.5rem] bg-[#fbf3eb] shadow-sm ">
      <div className="w-max mr-auto ml-auto px-[1rem] py-[.1rem] rounded-b-lg font-semibold bg-[#ec8220] text-white ">
        Win
      </div>
      <div className="text-center text-[.8rem] font-bold my-[.6rem] ">
        Primere leauge
      </div>

      <div className=" flex justify-between place-items-center ">
        <div className="w-[40%]  flex flex-col place-items-center ">
          <div className="border-2 h-[40px] w-[40px] rounded-[100%] ">
            <Image src={teamlogo} alt="teamlogo" width={150} height={150} />
          </div>
          <p className="font-bold ">team name</p>
        </div>

        <div className="flex  flex-col place-items-center ">
          <p className="text-red-600 font-[700] text-[1.2rem] ">23:30</p>
          <p className="font-[600] ">25 FEB</p>
        </div>

        <div className="w-[40%]  flex flex-col place-items-center ">
          <div className="border-2 h-[40px] w-[40px] rounded-[100%] ">
            <Image src={teamlogo} alt="teamlogo" width={150} height={150} />
          </div>
          <p className="font-bold ">team name</p>
        </div>
      </div>

      <hr className=" w-[88%] mr-auto ml-auto mt-[.7rem] bg-black opacity-50 " />

      <div className=" mt-[.3rem] w-[87%] mr-auto ml-auto ">
        <div
          className="flex  justify-between text-[.7rem] font-[600] "
          style={{ color: "gray" }}
        >
          <p className="">Stake ID : 32100</p>
          <p className="w-[50%] ">Stake Time 12/10/12 20:00</p>
        </div>

        <div
          className="flex  justify-between text-[.7rem] font-[600] "
          style={{ color: "gray" }}
        >
          <p className="">Stake Amount 100000</p>
          <p className="w-[50%]  h-[20px] text-nowrap flex ">
            Estimated Amount
            <p className="text-nowrap ml-[.4rem] " style={{ color: "#00db58" }}>
              1029938
            </p>{" "}
          </p>
        </div>

        <div className="flex  justify-between text-[.9rem] font-extrabold leading-5 ">
          <p className="flex place-items-center ">
            Score FT{" "}
            <p className="text-red-600 text-[1.2rem] font-extrabold ">0-0</p>{" "}
          </p>
          <p className="w-[50%] flex place-items-center ">
            Odds{" "}
            <p className=" ml-[.3rem] " style={{ color: "#00db58" }}>
              {" "}
              5.64%
            </p>{" "}
          </p>
        </div>
      </div>
       <div className=" flex justify-center mt-[1rem] " >
         <div className=" h-[50px] w-[50px] flex place-items-center justify-center  m-[.2rem] font-extrabold text-[1.4rem] " >FT</div>
         <div className=" h-[50px] w-[50px] flex place-items-center justify-center  m-[.2rem] rounded-[100px] font-extrabold text-[1.4rem] text-white bg-gray-300 " >1</div>
         <div className=" h-[50px] w-[50px] flex place-items-center justify-center  m-[.2rem] rounded-[100px] font-extrabold text-[1.4rem] text-white bg-gray-300 " >3</div>
       </div>
    </div>
  );
}

export default StakeHistory;
