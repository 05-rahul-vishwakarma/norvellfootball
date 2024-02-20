import React from "react";

function stake() {
  return (
    <div className="border-2 border-black h-[60%] w-[90%] mr-auto ml-auto rounded-[10px] mt-[.5rem] ">
      <div className="border-2 border-black w-max mr-auto ml-auto px-[1rem] py-[.1rem] rounded-b-lg font-semibold  ">
        Pending
      </div>
      <div className="text-center text-[.8rem] font-bold my-[.6rem] ">
        Primere leauge
      </div>
      <div className=" flex justify-between place-items-center ">
        <div className="w-[40%]  flex flex-col place-items-center ">
          <div className="border-2 h-[40px] w-[40px] rounded-[100%] "></div>
          <p className="">team name</p>
        </div>

        <div className="flex  flex-col place-items-center ">
          <p className="text-red-600 font-[700] text-[1.2rem] ">23:30</p>
          <p className="font-[600] ">25 FEB</p>
        </div>

        <div className="w-[40%]  flex flex-col place-items-center ">
          <div className="border-2 h-[40px] w-[40px] rounded-[100%] "></div>
          <p className="">team name</p>
        </div>
      </div>
      <hr className="border-black w-[88%] mr-auto ml-auto mt-[.7rem] " />

      <div className=" mt-[.3rem] w-[87%] mr-auto ml-auto ">
        <div className="flex  justify-between text-[.7rem] font-[600] ">
           <p className="" >Stake ID : 32100</p>
           <p className="w-[50%] ">Stake Time 12/10/12 20:00</p>
        </div>

        <div className="flex  justify-between text-[.7rem] font-[600] ">
           <p className="" >Stake Amount 100000</p>
           <p className="w-[50%]  h-[20px] text-nowrap  ">Estimated Amount 1029938</p>
        </div>

        
        <div className="flex  justify-between text-[.9rem] font-extrabold leading-5 ">
           <p className="flex place-items-center " >Score FT <p className="text-red-600 text-[1.2rem] font-extrabold ">0-0</p> </p>
           <p className="w-[50%] flex place-items-center ">Odds <p className="text-green-600 ml-[.3rem] "> 5.64%</p> </p>
        </div>
      </div>
      <button className="border-2 border-black w-[80%] mr-auto ml-auto block p-[.5rem] mt-[1rem] rounded-[5px] ">
        Cancel Stake
      </button>
    </div>
  );
}

export default stake;
