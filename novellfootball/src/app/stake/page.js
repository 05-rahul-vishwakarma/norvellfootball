import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import Stake from "../components/Stake";


function page() {
  return (
    <div className="h-screen w-screen overflow-y-hidden">
      <div className="py-[1rem] ">
        <div className="grid grid-flow-col  place-items-center">
          <span className="flex place-items-center justify-self-start p-[.5rem]">
            <IoIosArrowBack className="text-[1.5rem]   " />
            <p className="text-[.8rem] font-medium ">Back</p>
          </span>
          <div className="flex place-items-center justify-self-start">
            <span className="font-bold  ">Stake list</span>
          </div>
          <span></span>
        </div>
      </div>

      <div className=" h-[60px] w-[90%] mr-auto ml-auto rounded-[10px] relative " >
        <div className="h-[100%] w-[100%] mr-auto ml-auto rounded-[10px] flex justify-between place-items-center  ">
          <div className="w-[50%]  h-[100%] flex place-items-center  justify-center z-[1] ">
            My Stake
          </div>
          <div className="w-[50%]  h-[100%] flex place-items-center  justify-center z-[1] ">
            History
          </div>
        </div>

        <div className="h-[100%] w-[100%] mr-auto ml-auto rounded-[10px] absolute top-0 left-0  flex place-items-center justify-end  " >
           <div className="ml-[.2rem] mr-[.2rem] w-[45%]  h-[90%] bg-yellow-100 rounded-[10px] "></div>
        </div>
      </div>

      <div className="h-[35px] w-[90%] mr-auto ml-auto rounded-[10px]   border-2 border-black flex justify-center mt-[.7rem] place-items-center ">
        <p className="text-center flex ">
          Total earned from stakes $<p>10000</p>
        </p>
      </div>

      <div className=" h-[75%] mt-[.6rem] relative ">
        <div className=" absolute top-0 left-0 bg-red-600 w-full h-full ">
          <Stake />
        </div>

        <div className="  absolute  top-0 left-0 bg-yellow-300 w-full h-full ">
          <Stake />
        </div>
      </div>
    </div>
  );
}

export default page;
