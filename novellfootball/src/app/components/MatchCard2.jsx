"use client";
// This match card is for match section and does not contain start in coundoun

import Image from "next/image";
import React, { useEffect, useState } from "react";
const MatchCard2 = () => {
  const [imgSrc, updateSrc] = useState();
  useEffect(() => {
    updateSrc("/logo.png");
  }, []);
  return (
    <div
      style={{ boxShadow: "0px 7px 17px 6px #c7d4d6d9" }}
      className=" rounded-lg py-1 px-3  "
    >
      <div
        style={{ gridTemplateColumns: "1fr 0.5fr 1fr" }}
        className=" justify-center items-center grid space-x-2"
      >
        <div className="flex items-center  justify-end">
          <span className="text-xs line-clamp-2 flex-[2]  font-bold capitalize">
            tea and the anme is m 1 an the other one is
          </span>
          <span className="h-full relative  flex-[1] aspect-square">
            <Image
              src={imgSrc || "/search.png"}
              layout="fill"
              objectFit="cover"
              onError={(e) => updateSrc(null)}
              alt=""
            />
          </span>
        </div>
        <div className="text-center">
          <h2 className="text-xs font-bold text-red-600">23:00</h2>
          <h2 className="text-xs font-bold">23 Feb</h2>
        </div>
        <div className="flex flex-row-reverse items-center justify-end ">
          <span className="text-xs flex-[2] line-clamp-2 font-bold capitalize">
            team 1 and the ma an the other oe
          </span>
          <span className="h-full relative w-full  flex-[1] aspect-square">
            <Image
              src={imgSrc || "/email.png"}
              onError={(e) => updateSrc(null)}
              layout="fill"
              objectFit="cover"
              alt=""
            />
          </span>
        </div>
      </div>
      
      <div className="text-center py-[0.1rem] pb-1 capitalize text-[0.7rem] font-bold">
        <h2>lets say league</h2>
      </div>
    </div>
  );
};

export default MatchCard2;
