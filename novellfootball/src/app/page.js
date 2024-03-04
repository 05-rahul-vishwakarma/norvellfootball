"use client";
import Image from "next/image";
import { FaCirclePlus } from "react-icons/fa6";
import logo from "../../public/logo.png";
import MatchCard from "./components/MatchCard";
import Slider from "./components/Slider";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Layout from "./components/Layout";
import { LiaRupeeSignSolid } from "react-icons/lia";

export default function Home() {
  const bgColor =
    "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(216,242,227,1) 0%, rgba(254,255,254,1) 0%, rgba(240,233,231,1) 46%, rgba(249,230,233,1) 100%)";
  const router = useRouter();

  const [matches, updateMatches] = useState([]);
  const [matchLoaded, updateLoaded] = useState(false);
  const [isPlaceBet, togglePlaceBet] = useState(false);
  const [placeBetData, updatePlaceBetData] = useState({});
  


  const [popup, setPopup] = useState(false);

  const backbtn = () => {
    setPopup(false);
  };

  async function getLiveMatches() {
    try {
      let res = await fetch(`${window.location.origin}/api/home`);
      if (!res.ok) throw new Error("Error while fetching matches");
      res = await res.json();
      if (res?.status === 200) {
        updateMatches(res?.data?.matches);
      } else {
        throw new Error("Somethign went wrong");
      }
    } catch (error) {
      router.push("/access/login");
    }
  }

  async function getPlaceBet(data) {
    updatePlaceBetData(data);
    setPopup(true)
  }

  useEffect(() => {
    if (!matchLoaded) {
      getLiveMatches();
      updateLoaded(true);
    }
  }, [matchLoaded]);

  return (
    <Layout>
      <main className="h-screen bg-[url('../../public/home.png')] bg-no-repeat bg- bg-center   ">
        <div className="pt-[1rem]">
          <div className=" flex justify-between place-items-center  mx-1 ">
            <div
              className="pl-1  leading-4
             "
            >
              <div
                onClick={() => router.push("/profile/recharge")}
                className=" w-[100%] line-clamp-1 text-ellipsis flex justify-between px-1 place-items-center bg-[#f8fcff] p-1 rounded-[100px] "
              >
                <span className="flex place-items-center ">
                  <LiaRupeeSignSolid />
                  <p className=" w-[80%] text-ellipsis line-clamp-1 break-words text-wrap text-[0.65rem] ">
                    10000000
                  </p>
                </span>
                <FaCirclePlus className="text-[#2785f6] " />
              </div>

              <h1 className=" mt-[.5rem] font-extrabold text-[1rem] text-white ">
                TOP EVENTS
              </h1>
            </div>

            <div className="flex place-items-center pr-1 ">
              <span className="leading-5 ">
                <h1 className="font-bold text-white ">WELCOME BACK</h1>
                <h3 className=" text-white text-end ">DARGON</h3>
              </span>

              <span
                className="h-[4rem] w-[4rem] rounded-[100%] "
                style={{ background: "#f8fcff" }}
              >
                <Image src={logo} alt="logo" width={90} height={90} />
              </span>
            </div>
          </div>
        </div>

        <div className="h-[28%] mt-[1rem] w-[95%] mr-auto ml-auto ">
          <Slider />
        </div>

        <div className="h-[65%] mt-[1rem] rounded-t-[30px]  shadow-2xl shadow-black  bg-[#F8FCFF]">
          <div className="h-[70px] rounded-t-[30px] flex flex-col justify-around  ">
            <div className="w-[70px] h-[5px]  mr-auto ml-auto rounded-2xl bg-blue-500 "></div>
            <div className="flex  justify-between w-[90%] mr-auto ml-auto  ">
              <h1 className="ml-[.5rem] font-bold ">Hot Matches</h1>
              <h1 className="flex mr-[.5rem] text-[12px] font-light text-[#989898] line-clamp-1 text-ellipsis ">
                Online Users : <p>10000000</p>{" "}
              </h1>
            </div>
          </div>

          <div className=" overflow-y-scroll h-[80%] pb-[6rem] ">
            {/* <MatchCard
              id={1}
              bgColor="linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(216,242,227,1) 0%, rgba(254,255,254,1) 0%, rgba(240,233,231,1) 46%, rgba(249,230,233,1) 100%)"
            />
            <MatchCard
              id={2}
              bgColor="linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(216,242,227,1) 0%, rgba(140,236,249,0.8911939775910365) 100%)"
            />
            <MatchCard
              id={3}
              bgColor="linear-gradient(90deg, rgba(227,251,240,1) 0%, rgba(223,221,243,1) 47%, rgba(219,192,246,1) 100%)"
            />
            <MatchCard
              id={4}
              bgColor="linear-gradient(90deg, rgba(224,235,229,1) 0%, rgba(226,235,228,0.9528186274509804) 7%, rgba(243,231,221,1) 100%)"
            />
            <MatchCard
              id={5}
              bgColor="linear-gradient(90deg, rgba(224,235,229,1) 0%, rgba(226,235,228,0.9528186274509804) 7%, rgba(243,231,221,1) 100%)"
            /> */}

            {matches.map((item, i) => (
              <div onClick={() => getPlaceBet()}>
                <MatchCard
                  key={item.StakeId}
                  index={i}
                  data={{ ...item }}
                />
              </div>
            ))}

            {popup ? <MatchPopup data={placeBetData} onClick={backbtn} /> : ""}
          </div>
        </div>
      </main>
    </Layout>
  );
}

function ScoreCards() {
  return (
    <div className="w-[100%] ">
      <div
        style={{
          gridTemplateColumns: "1fr 2fr 1fr",
          boxShadow: "0 4px 4px rgb(0,0,0,0.1)",
        }}
        className=" mt-[1rem] rounded-xl bg-[#F8FCFF]  w-[100%] flex justify-around text-[.65rem]  font-semibold   h-[3rem] place-items-center  "
      >
        <span
          className="flex items-center justify-center 
        "
        >
          Score <h2 className="ml-1 text-red-500 ">0-0</h2>
        </span>
        <span className="flex items-center">
          Odds percentage -<h2 className=" ml-1 text-green-400"></h2>
          <h2 className="text-green-400">3.4%</h2>
        </span>
        <span className="flex items-center justify-center py-2 px-2 bg-[#5A5A5A] text-white rounded-[7px] ">
          Place stake
        </span>
      </div>

      <div className="space-y-4 mt-3 px-2">
        <div className="flex justify-between ">
          <span className=" text-[0.65rem] text-gray-600 font-bold">
            Handling fee 5%
          </span>
          <div className=" rounded-full py-0.5 ring-1 ring-gray-600/30 px-1 w-fit bg-white space-x-1 flex justify-center items-center">
            <div className="flex pl-1 justify-center items-center h-[90%] space-x-1">
              <span
                className=" h-full aspect-square rounded-full text-white 
             bg-blue-700 flex text-[0.5rem] justify-center items-center"
              >
                <FaRupeeSign />
              </span>

              <span className="text-xs font-bold pr-3">109230</span>
            </div>
            <span className="h-[90%] font-bolder text-white aspect-square rounded-full bg-blue-700 flex justify-center items-center">
              <IoIosAdd />
            </span>
          </div>
        </div>

        <div className="grid px-0 ">
          <span className="grid grid-cols-2">
            <h2 className="text-[0.65rem]  font-bold capitalize ">
              stake amount
            </h2>
            <h2 className="text-[0.65rem] pl-1 font-bold capitalize ">
              estimated amount
            </h2>
          </span>

          <div
            className="flex ring-2 px-1 ring-blue-600
           mt-1 py-1 rounded-md items-center"
          >
            <div className="flex pl-1 space-x-1 max-w-[50%] min-w-[50%]  items-center h-[90%]">
              <span
                className=" h-[80%] aspect-square rounded-full text-white 
             bg-blue-600 flex text-[0.65rem] justify-center items-center"
              >
                <FaRupeeSign />
              </span>
              <input
                type="number"
                className="focus:outline-none h-8 w-[80%] border-none bg-transparent outline-none "
                placeholder="Add"
                name=""
                id=""
              />
            </div>
            <div className="flex pl-1 min-w-[50%] space-x-2  items-center h-[90%] ">
              <span
                className=" h-[80%] aspect-square rounded-full text-white 
             bg-green-400 text-[0.65rem] flex justify-center items-center"
              >
                <FaRupeeSign />
              </span>

              <span className="text-xs font-bold text-green-500 pr-3">
                109230
              </span>
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <button className="py-2 px-1 font-bold w-[30%] text-sm text-white rounded-md capitalize bg-gray-900">
            all amount
          </button>
          <button className="py-2 px-2 w-[70%] bg-blue-600 font-bold text-sm text-white rounded-md capitalize">
            confirm
          </button>
        </div>
      </div>
    </div>
  );
}

function MatchPopup({ onClick }) {
  return (
    <div className="h-full absolute  top-0 left-0 flex justify-center items-end bg-black/70 w-full  ">
      <div className=" h-[80%] pt-[2rem] pb-[6rem]  bg-slate-100 overflow-y-scroll rounded-t-[2rem] w-[98%]">
        <div className="flex  relative px-2  justify-center">
          <h4 className="border-2 border-solid border-blue-700 min-w-[20%] rounded-full"></h4>
          <p
            onClick={onClick}
            className="absolute left-2 text-sm font-bold mt-[-1rem] p-2"
          >
            &lt; Back
          </p>
        </div>

        <div className=" px-6 mt-4 text-white">
          <div className="rounded-2xl relative  pt-4 bg-[url(../../public/betplace.png)]  h-full  text-center  w-full">
            <h2 className="capitalize text-sm font-bold truncate text-white">
              premier league
            </h2>
            <div className="w-full mt-3 flex px-2">
              <div className="flex-[2] flex-col flex w-full items-center h-full ">
                <span className="h-[60px] w-[60px] rounded-full relative ">
                  <Image src={"/logo.png"} objectFit="cover" layout="fill" />
                </span>
                <span className="line-clamp-2 w-[80%] text-[.6rem] capitalize font-bold">
                  team a and here am i
                </span>
              </div>
              <div className="flex-[1] flex items-center justify-center flex-col">
                <span className="text-xl block font-bold text-red-600">
                  23:40
                </span>
                <span className="uppercase text-sm font-bold">27 FEB</span>
              </div>
              <div className="flex-[2] flex-col flex w-full items-center h-full ">
                <span className="h-[60px] w-[60px] rounded-full relative ">
                  <Image src={"/logo.png"} objectFit="cover" layout="fill" />
                </span>
                <span className="line-clamp-2 w-[80%] text-[.6rem] capitalize font-bold">
                  team a and here am i
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <div className="rounded-t-xl bg-red-600 px-3 py-1 h-full">
                <h2 className="capitalize font-bold text-sm text-white">
                  full-time
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5">
          <h2 className="text-[0.7rem] mt-3 font-semibold text-slate-500">
            Please choose a match score to place your stake.
          </h2>
        </div>

        <div className="mt-2 px-4 space-y-4">
          <ScoreCards />
        </div>
      </div>
    </div>
  );
}
