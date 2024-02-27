import React from "react";
import BackButton from "./BackButton";
import Image from "next/image";
import Link from "next/link";

function Popup({ image, condtions, onClick }) {
  return (
    <div className="h-full w-full bg-[#F8FCFF]  z-[3]  ">
      <div onClick={() => onClick()} className="pt-[2rem]">
        <BackButton pageName="" />
      </div>
      <div className=" h-[80%] mt-[2rem]    ">
        <div className=" h-[50vh] flex flex-col justify-center place-items-center ">
          <div className="border-2 border-[#2885F6] w-[4rem] h-[4rem] flex justify-center place-items-center rounded-[100%] ">
            <Image src={image} width={25} height={25} alt="success" />
          </div>
          <p className="my-[.7rem] font-bold text-xl ">{condtions}</p>
          <p className="w-[70vw] text-center font-[500] text-[#0000009a] ">
            Check the result in Stoke list after finish the match
          </p>
        </div>

        <div
          onClick={() => onClick()}
          className="text-center p-3 mt-4 rounded-lg flex justify-center place-items-center text-[#000] w-[90%] mr-auto ml-auto  "
        >
          Cancel Stake
        </div>

        <Link
          href="/matches"
          style={{ boxShadow: "0 0 5px 0 #c0cad9" }}
          className="bg-[#2885F6] text-center p-3 mt-4 rounded-lg flex justify-center place-items-center text-[#fff] w-[90%] mr-auto ml-auto  "
        >
          Done
        </Link>
      </div>
    </div>
  );
}

export default Popup;
