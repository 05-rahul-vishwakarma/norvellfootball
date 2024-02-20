"use client";

import Image from "next/image";
import MatchCard2 from "../components/MatchCard2";
import PlaceBet from "../components/PlaceBet";

function page() {
  return (
    <section className="bg-[#f7f8ff] relative h-[100dvh]">
      <div className="relative text-center py-4 h-[8%] ">
        <h2 className=" capitalize text-sm font-bold my-0">matches</h2>
      </div>
      <main className=" space-y-4 grid h-[92%] ">
        {/* search box */}
        <div className="relative px-4  h-full flex items-center ">
          <input
            type="text"
            name=""
            className="text-center px-4 rounded-full py-1.5 outline-none shadow-md
            border-none bg-white w-full"
            placeholder="Search Matches"
            id=""
          />
          <div className="absolute left-4 top-0 h-full flex justify-center items-center aspect-square ">
            <Image src="/search.png" alt="logo" height={25} width={25}></Image>
          </div>
        </div>
        <div className="w-full px-4 overflow-y-scroll pb-[5rem] max-h-[100%] space-y-3 ">
          <MatchCard2 />
          <MatchCard2 />
          <MatchCard2 />
          <MatchCard2 />
          <MatchCard2 />
          <MatchCard2 />
          <MatchCard2 />
        </div>
      </main>
      {/* popup */}
      <PlaceBet />
    </section>
  );
}

export default page;
