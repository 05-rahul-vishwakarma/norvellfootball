"use client";
// This match card is for match section and does not contain start in coundoun

import Image from "next/image";
import React, { useEffect, useState } from "react";
const MatchCard2 = ({ data, index, placeBet }) => {
  const [Team_a_logo, updateSrcTeam_a] = useState();
  const [Team_b_logo, updateSrcTeam_b] = useState();

  useEffect(() => {
    updateSrcTeam_a(data?.Team_a_logo);
    updateSrcTeam_b(data?.Team_b_logo);
  }, []);
  return (
    <div
      onClick={() => placeBet(true, data)}
      style={{ boxShadow: "0px 7px 17px 6px #c7d4d6d9" }}
      className=" rounded-lg py-1.5 px-3  "
    >
      <div
        style={{ gridTemplateColumns: "1fr 0.5fr 1fr" }}
        className=" justify-center items-center grid space-x-2"
      >
        <div className="flex items-center gap-x-2  justify-end">
          <span className="text-[0.65rem] line-clamp-2 text-end flex-[2]  font-bold capitalize">
            {data?.Team_a || "no team a"}
          </span>
          <span className="h-full flex justify-center items-center relative  flex-[1] aspect-square">
            <Image
              src={Team_a_logo || "/search.png"}
              width={35}
              height={35}
              onError={(e) => updateSrcTeam_a(null)}
              alt="search"
            />
          </span>
        </div>
        <div className="text-center">
          <h2 className="text-xs font-extrabold text-red-500">23:00</h2>
          <h2 className="text-xs font-semibold">23 Feb</h2>
        </div>
        <div className="flex gap-x-2 flex-row-reverse items-center justify-end ">
          <span className="text-[0.65rem] flex-[2] line-clamp-2 font-bold capitalize">
            {data?.Team_b || "No Team B"}
          </span>
          <span className="h-full flex justify-center items-center relative w-full  flex-[1] aspect-square">
            <Image
              src={Team_b_logo || "/search.png"}
              onError={(e) => updateSrcTeam_b(null)}
              height={35}
              width={35}
              alt="team b  logo"
            />
          </span>
        </div>
      </div>

      <div className="text-center py-[0.2rem] pb-1 capitalize text-xs font-bold">
        <h2>{data?.LeagueName || "no league available"}</h2>
      </div>
    </div>
  );
};

export default MatchCard2;
