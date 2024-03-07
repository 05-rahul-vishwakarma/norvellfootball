"use client";
import Image from "next/image";
import { FaCirclePlus } from "react-icons/fa6";
import logo from "../../public/logo.png";
import MatchCard from "./components/MatchCard";
import Slider from "./components/Slider";
import { IoIosArrowBack } from "react-icons/io";
import { useContext, useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Layout from "./components/Layout";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { UserContext } from "./helpers/UserContext";
import Modal from "./components/Modal";

export default function Home() {
  const bgColor =
    "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(216,242,227,1) 0%, rgba(254,255,254,1) 0%, rgba(240,233,231,1) 46%, rgba(249,230,233,1) 100%)";
  const router = useRouter();
  const { userBalance, getBalance } = useContext(UserContext);

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
      console.log(res);
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
    setPopup(true);
  }

  useEffect(() => {
    if (!matchLoaded) {
      getLiveMatches();
      updateLoaded(true);
    }
  }, [matchLoaded]);

  return (
    <Layout>
      <main
        style={
          {
            // background:"linear-gradient(90deg,(#2885F6),(#eee))"
          }
        }
        className="h-screen  bg-no-repeat bg- bg-center bg-gradient-to-b from-[#2885F6] to-[#000]  "
      >
        <div className="flex justify-between place-items-center pt-3 pb-2  ">
          <div className="  mx-2 w-max mt-2 ">
            <div className="flex place-items-center rounded-full bg-white w-max line-clamp-1 text-ellipsis ">
              <span className=" flex place-items-center   line-clamp-1 text-ellipsis text-xs font-[500] px-3 py-1.5 ">
                <FaRupeeSign />
                100000
              </span>
              <FaCirclePlus className="text-[.9rem] mr-2 text-[#2885F6] " />
            </div>

            <h1 className=" font-bold text-[white] mt-3  ">Top Events</h1>
          </div>

          <div className="flex place-items-center mr-2 ">
            <span className="text-[0.7rem] font-semibold mt-2 leading-3 mr-1 text-white ">
              <p>Welcome Back</p>
              <p className="  line-clamp-1 text-ellipsis w-[5rem] ">
                User Name{" "}
              </p>
            </span>
            <div className="h-[4rem] w-[4rem] flex justify-center place-items-center rounded-full bg-white ">
              <Image src={"/logo.png"} alt="logo" width={55} height={55} />
            </div>
          </div>
        </div>

        <div className="h-[28%]  w-[95%] mr-auto ml-auto ">
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
            {matches.map((item, i) => (
              <div key={item.StakeId} onClick={() => getPlaceBet()}>
                <MatchCard id={i} index={i} data={{ ...item }} />
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
