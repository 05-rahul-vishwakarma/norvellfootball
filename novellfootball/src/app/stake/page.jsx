"use client";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

import React, { useEffect, useState, useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import StakeHistory from "../components/StakeHistory";
import { motion } from "framer-motion";
import Popup from "../components/Popup";
import Image from "next/image";
import Layout from "../components/Layout";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";

const variantOne = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
  justifyCenter: {
    justifyContent: "end",
  },
  justifyCenterTwo: {
    justifyContent: "start",
  },
  showPopup: {
    scale: 1,
    opacity: 1,
  },
  hidePopup: {
    scale: 0,
    opacity: 0,
  },
};

const accentColors = {
  1: { bg_color: "#EBFFF3", remark_color: "green" },
  2: { bg_color: "#FFECEC", remark_color: "red" },
  3: { bg_color: "#FFECEC", remark_color: "red" },
};

function Page() {
  const [swipe, setSwipe] = useState(true);
  const [iShow, setShow] = useState(false);
  const [pendingMatches, updatePendingMatches] = useState([]);
  const [settledMatches, updateSettledMatches] = useState([]);
  const [isDltMatch, setDltMatch] = useState([]);
  const [amounts, setAmounts] = useState();
  const [loading, setLoading] = useState(true);

  let router = useRouter();
  function stakeAmount() {
    let totalAmount = 0;
    pendingMatches.forEach((element) => {
      totalAmount += element.BetAmount;
    });
    return setAmounts(totalAmount);
  }

  // # function to cancel the stake
  const showPopup = async (match) => {
    setDltMatch(match);
    setShow(true);
  };

  const backBtn = async () => {
    try {
      let StakeId = isDltMatch.StakeId;
      let StartTime = isDltMatch.StartsAt;

      let body = {
        StakeId,
        StartsAt: StartTime,
      };

      let config = {
        method: "POST",
        headers: {
          "content-type": "applicaiton/json",
        },
        body: JSON.stringify(body),
      };
      let res = await fetch(`/api/stake`, config);
      res = await res.json();
      alert(JSON.stringify(res));
      getStakeData();
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  async function getStakeData() {
    try {
      let res = await fetch(`/api/stake`);
      res = await res.json();
      if (res?.status === 200) {
        setLoading(false); // Set loading to false when data is fetched
        updatePendingMatches(res?.data?.pendingMatches);
        updateSettledMatches(res?.data?.settledMatches);
      }
      if (res?.status === 302) router.push("/access/login");
    } catch (error) {
      router.push("/access/login");
    }
  }

  useEffect(() => {
    getStakeData();
    stakeAmount();
  }, []);

  return (
    <Layout>
      <div className="h-screen w-screen  bg-[#f8fcff]   ">
        {loading && <Loading />}
        <div onClick={() => router.back()} className="py-[1rem] ">
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

        <div className=" h-[60px] w-[90%] mr-auto ml-auto rounded-[15px] relative  bg-[#e8e8e8] ">
          <div className="h-[100%] w-[100%] mr-auto ml-auto rounded-[15px] flex justify-between place-items-center  ">
            <div
              className="w-[50%]  h-[100%] flex place-items-center  justify-center z-[1] text-[.8rem] "
              onClick={() => setSwipe(true)}
            >
              My Stake
            </div>
            <div
              onClick={() => setSwipe(false)} //swipe = false
              className="w-[50%]  h-[100%] flex place-items-center text-[.8rem]  justify-center z-[1] "
            >
              History
            </div>
          </div>

          <motion.div
            variants={variantOne}
            animate={swipe ? "justifyCenterTwo" : "justifyCenter"}
            className="h-[100%] w-[100%] mr-auto ml-auto rounded-[15px] absolute top-0 left-0  flex place-items-center justify-start shadow-sm  "
          >
            <div className="ml-[.2rem] mr-[.2rem] w-[45%]  h-[90%] bg-white rounded-[10px] "></div>
          </motion.div>
        </div>

        <div
          style={{
            background: "#e0f9ef",
            border: "1px solid #00db58",
            color: "#707d77",
          }}
          className="h-[38px] font-[600] w-[90%] mr-auto ml-auto rounded-[15px]   border-2 border-black flex justify-center mt-[.7rem] place-items-center "
        >
          <span className="text-center flex text-[.7rem] ">
            Total earned from stakes ₹{" "}
            <p className="ml-1 "> {amounts / 100} </p>
          </span>
        </div>

        <div className="h-[65%] mt-[.6rem]  overflow-y-scroll relative  pb-[12rem] ">
          {swipe ? (
            <div className=" h-full absolute top-0 left-0 w-full  ">
              {pendingMatches?.map((match, idx) => (
                <Stake
                  key={match?.StakeId || idx}
                  data={match}
                  amount={match?.BetAmount}
                  onClick={() => showPopup(match)}
                />
              ))}
              {pendingMatches?.length <= 0 && (
                <p
                  style={{ background: "url(/noData.svg) center norepeat" }}
                  className="h-40 w-full"
                ></p>
              )}
            </div>
          ) : (
            <div className=" h-full absolute top-0 left-0 w-full  ">
              {settledMatches.map((match, idx) => (
                <StakeHistory
                  data={match}
                  key={match?.StakeId || idx}
                  id={match?.StakeId}
                  result={match?.Remark}
                  bgColor={accentColors[match?.Status]?.bg_color}
                  resultbg={accentColors[match?.Status]?.remark_color}
                />
              ))}
              {settledMatches?.length <= 0 && (
                <p
                  style={{ background: "url(./noData.svg) center no-repeat" }}
                  className="h-full w-full"
                ></p>
              )}
            </div>
          )}
        </div>

        <motion.div
          variants={variantOne}
          animate={iShow ? "showPopup" : "hidePopup"}
          transition={{ duration: 0.5 }}
          className="bg-white h-screen w-screen absolute top-0 left-0 opacity-0 scale-0 z-[6] "
        >
          <Popup
            image="/cancel.svg"
            condtions="Cancelled Success!"
            onClick={() => backBtn()}
          />
        </motion.div>
      </div>
    </Layout>
  );
}

export default Page;

function Stake({ onClick, data }) {
  const [Team_a_logo, update_logo_a] = useState(null);
  const [Team_b_logo, update_logo_b] = useState(null);
  const [MatchStartTime, updateTime] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [showCancelButton, setShowCancelButton] = useState(false);

  useEffect(() => {
    const MatchTime = new Date(
      new Date(data?.StartsAt).toLocaleString("en-US", {
        timeZone: "asia/calcutta",
      })
    );
    updateTime(MatchTime);
    update_logo_a(data?.Team_a_logo);
    update_logo_b(data?.Team_b_logo);
  }, []);

  function calculateTimeLeft() {
    const difference = +new Date(MatchStartTime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
      if (timeLeft.minutes > 5) {
        setShowCancelButton(true);
      } else {
        setShowCancelButton(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  // ------------------------------------------------------------------------------------

  return (
    <div className="border-2 border-gray-[#e2dbd3] min-h-min w-[90%] mr-auto ml-auto rounded-[15px] mt-[.5rem] bg-[#fbf3eb] shadow-sm relative pb-4 ">
      <div className="w-max mr-auto ml-auto px-[1rem] py-[.2rem] rounded-b-lg font-semibold bg-[#ec8220] text-white text-[.6rem] ">
        Pending
      </div>
      <div className="text-center text-[.65rem] font-bold my-[.5rem] ">
        {data?.LeagueName || "no league available"}
      </div>

      <div className=" flex justify-between place-items-center w-[95%] mr-auto ml-auto ">
        <div className="w-[35%]  flex flex-col place-items-center   ">
          <div className=" h-[40px] w-[40px] rounded-[100%] ">
            <Image
              src={Team_a_logo || "/search.png"}
              onError={() => update_logo_a(null)}
              alt="teamlogo"
              width={150}
              height={150}
            />
          </div>
          <p className=" leading-3 text-xs  line-clamp-2 flex-[2]  font-bold capitalize w-[95%] text-center overflow-ellipsis break-words ">
            {data?.Team_a || "no team available"}
          </p>
        </div>

        <div className="flex  flex-col place-items-center  ">
          <p className="text-red-600 font-[700] text-[.8rem] ">
            {" "}
            {MatchStartTime.getHours() - 12 < 10
              ? `0${MatchStartTime.getHours() - 12}`
              : `${MatchStartTime.getHours() - 12}`}
            :
            {MatchStartTime.getHours() < 10
              ? `0${MatchStartTime.getMinutes()}`
              : `${MatchStartTime.getMinutes()}`}
          </p>
          <p className="font-[600] text-[.7rem] ">
            {MatchStartTime.getDate()}
            {MatchStartTime.toDateString().slice(3, 8)}
          </p>
        </div>

        <div className="w-[35%]  flex flex-col place-items-center   ">
          <div className=" h-[40px] w-[40px] rounded-[100%] ">
            <Image
              src={Team_b_logo || "/search.png"}
              onError={() => update_logo_b(null)}
              alt="teamlogo"
              width={150}
              height={150}
            />
          </div>
          <p className="  leading-3 text-xs  line-clamp-2 flex-[2]  font-bold capitalize w-[95%] text-center overflow-ellipsis break-words ">
            {data?.Team_b || "no team b available"}
          </p>
        </div>
      </div>

      <hr className=" w-[88%] mr-auto ml-auto mt-[.7rem] bg-black  " />

      <div className=" mt-[.3rem] w-[87%] mr-auto ml-auto ">
        <div
          className="flex  justify-between text-xs line-clamp-1 font-[600] "
          style={{ color: "gray" }}
        >
          <p className="">Stake ID : {data?.StakeId}</p>
          <span className="w-[50%] line-clamp-1 text-ellipsis  flex  ">
            Stake Time{" "}
            {(MatchStartTime.getDate() < 10
              ? "0" + MatchStartTime.getDate()
              : MatchStartTime.getDate()) +
              MatchStartTime?.toString().slice(3, 7)}
            <p className="ml-2">
              {MatchStartTime.getHours() > 12
                ? `${MatchStartTime.getHours() - 12}`
                : `0${MatchStartTime.getHours()}`}
              :
              {MatchStartTime.getMinutes() < 10
                ? `0${MatchStartTime.getMinutes()}`
                : `${MatchStartTime.getMinutes()}`}
            </p>
          </span>
        </div>

        <div
          className="flex  justify-between text-xs line-clamp-1 font-[600] "
          style={{ color: "gray" }}
        >
          <p className="line-clamp-1 text-ellipsis">
            Stake Amount {Number(data?.BetAmount) / 100 || 0}
          </p>
          <span className="w-[50%]  text-nowrap flex line-clamp-1 text-ellipsis ">
            Estimated Income
            <p className="text-nowrap ml-[.4rem] " style={{ color: "#00db58" }}>
              1029938
            </p>{" "}
          </span>
        </div>

        <div className="flex  justify-between text-xs line-clamp-1  font-extrabold leading-4 ">
          <span className="flex place-items-center  ">
            Score FT{" "}
            <p className="text-red-600 text-[.8rem] pl-[0.1rem] font-extrabold ">
              {data?.Score_a}-{data?.Score_b}
            </p>
          </span>
          <span className="w-[50%] flex place-items-center ">
            Odds{" "}
            <p className=" ml-[.3rem] " style={{ color: "#00db58" }}>
              {" "}
              {data?.Percentage}%
            </p>{" "}
          </span>
        </div>
      </div>

      {showCancelButton && (
        <button
          onClick={() => onClick()}
          className=" bg-[#2885f6]  w-[85%] h-[2.5rem] mr-auto ml-auto block  mt-[1rem] rounded-[5px] font-bold text-white  text-[0.8rem] "
        >
          Cancel Stake
        </button>
      )}
    </div>
  );
}
