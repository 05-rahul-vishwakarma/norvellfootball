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
      style={{ boxShadow: "0px 1px 10px -1px #b9b9b9" }}
      className=" rounded-lg py-1 px-3 bg-[#fafbff]"
    >
      <div
        style={{ gridTemplateColumns: "1fr 0.5fr 1fr" }}
        className=" justify-center items-center grid space-x-2"
      >
        <div className="flex items-center justify-end">
          <span className="text-xs font-bold capitalize">team 1</span>
          <span className="h-full aspect-square">
            <Image
              src={imgSrc || "/search.png"}
              width={55}
              onError={(e) => updateSrc(null)}
              height={55}
              alt=""
            />
          </span>
        </div>
        <div className="text-center">
          <h2 className="text-xs font-bold text-red-600">23:00</h2>
          <h2 className="text-xs font-bold">23 Feb</h2>
        </div>
        <div className="flex flex-row-reverse items-center justify-end ">
          <span className="text-xs font-bold capitalize">team 1</span>
          <span className="h-full aspect-square">
            <Image
              src={imgSrc || "/email.png"}
              width={55}
              onError={(e) => updateSrc(null)}
              height={55}
              alt=""
            />
          </span>
        </div>
      </div>
      <div className="text-center py-[0.1rem] pb-1 capitalize text-xs font-semibold">
        <h2>lets say league</h2>
      </div>
    </div>
  );
};

export default MatchCard2;
