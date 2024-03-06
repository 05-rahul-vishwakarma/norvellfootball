"use server"

import React from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";

function BackButton({pageName}) {
  return (
    <div className="flex  relative   justify-center place-items-center  ">
      <h4 className=" font-semibold text-[.8em] "> {pageName} </h4>
      <p className="absolute left-2 text-sm font-bold  flex place-items-center ">
        <MdOutlineArrowBackIos className="text-[1.3rem] " /> Back
      </p>
    </div>
  );
}

export default BackButton;
