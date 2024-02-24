"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { BiHomeSmile } from "react-icons/bi";
import { PiSoccerBall } from "react-icons/pi";
import { GiNetworkBars } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { motion } from "framer-motion";

import Home from "../../../public/Home.svg";
import StakeImgTwo from "../../../public/vector.svg";
import Football from "../../../public/Football.svg";
import profileImg from "../../../public/profile.svg";

import HomeTwo from "../../../public/homeTwo.svg";
import StakeImg from "../../../public/vectorTwo.svg";
import FootballTwo from "../../../public/footballTwo.svg";
import profileImgTwo from "../../../public/profileTwo.svg";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Router from "next/router";

const variants = {
  open: { width: "140px" },
  closed: { width: "58px" },
  visible: {
    scale: 1,
  },
  hidden: {
    scale: 0,
  },
};

function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(true);

  const [home, setHome] = useState(false);
  const [stake, setStake] = useState(false);
  const [match, setMatch] = useState(false);
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    if (
      pathname == "/" ||
      pathname == "/home" ||
      pathname == "/stake" ||
      pathname == "/profile"
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    if (pathname == "/") {
      setHome(true);
    } else {
      setHome(false);
    }

    if (pathname == "/stake") {
      setStake(true);
    } else {
      setStake(false);
    }

    if (pathname == "/matches") {
      setMatch(true);
    } else {
      setMatch(false);
    }

    if (pathname == "/profile" || pathname == "/profile/recharge" ) {
      setProfile(true);
    } else {
      setProfile(false);
    }
  });

  return (
    <div className=" w-[100vw] h-[68px] z-30 fixed bottom-[1.5rem] flex justify-center place-items-center  ">
      <div
        style={{
          boxShadow: "0px 5px 5px 0px rgba(0,0,0,0.15)",
          border: "1px solid lightgray",
        }}
        className="w-[340px] h-[68px]   shadow-[0 4px 28% rgba(0, 0, 0, 0.2)]
         backdrop-blur-sm  flex bg-[#c6cacc91]  justify-evenly  rounded-full place-items-center  "
      >
        <motion.div
          variants={variants}
          animate={home ? "open" : "closed"}
          className=" bg-[#00000036] h-[58px] w-[140px] rounded-[100px] flex place-items-center justify-center "
        >
          <Link href="/" className="text-white  ">
            <div className="relative flex place-items-center">
              <motion.div
                variants={variants}
                animate={home ? "visible" : "hidden"}
              >
                <p className="flex place-items-center text-[14px] w-[83px] h-[35px] justify-around font-semibold">
                  <Image src={HomeTwo} alt="teamlogo" width={28} height={28} />
                  Home
                </p>
              </motion.div>

              <motion.div
                variants={variants}
                animate={home ? "hidden" : "visible"}
                className=" w-[100%] h-[100%] absolute top-0 left-0 flex justify-center place-items-center  "
              >
                <div className="flex justify-center place-items-center   ">
                  <Image src={Home} alt="teamlogo" width={28} height={28} />
                </div>
              </motion.div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          variants={variants}
          animate={stake ? "open" : "closed"}
          className=" bg-[#00000036]  w-[58px] h-[58px]   rounded-[100px] flex place-items-center justify-center "
        >
          <Link href="/stake" className="text-white  ">
            <div className="relative ">
              <motion.div
                variants={variants}
                animate={stake ? "visible" : "hidden"}
              >
                <p className="  flex place-items-center  text-[14px] w-[130px] h-[35px] justify-center font-semibold ">
                  <Image
                    src={StakeImgTwo}
                    alt="teamlogo"
                    width={28}
                    height={28}
                    className="mr-2"
                  />
                  Stake List
                </p>
              </motion.div>

              <motion.div
                variants={variants}
                animate={stake ? "hidden" : "visible"}
                className="w-[100%] h-[100%] absolute top-0 left-0 flex justify-center place-items-center "
              >
                <div className="flex justify-center place-items-center ">
                  <Image src={StakeImg} alt="teamlogo" width={28} height={28} />
                </div>
              </motion.div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          variants={variants}
          animate={match ? "open" : "closed"}
          className=" bg-[#00000036]  h-[58px]   rounded-[100px] flex place-items-center justify-center "
        >
          <Link href="/matches" className="text-white  ">
            <div className="relative ">
              <motion.div
                variants={variants}
                animate={match ? "visible" : "hidden"}
              >
                <p className="flex place-items-center  text-[14px] w-[83px] h-[35px] justify-around font-semibold">
                  <Image
                    src={FootballTwo}
                    alt="teamlogo"
                    width={28}
                    height={28}
                    className="mr-2 "
                  />
                  Match
                </p>
              </motion.div>

              <motion.div
                variants={variants}
                animate={match ? "hidden" : "visible"}
                className="w-[100%] h-[100%] absolute top-0 left-0 flex justify-center place-items-center "
              >
                <div className="flex justify-center place-items-center ">
                  <Image src={Football} alt="teamlogo" width={28} height={28} />
                </div>
              </motion.div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          variants={variants}
          animate={profile ? "open" : "closed"}
          className=" bg-[#00000036]  h-[58px]   rounded-[100px] flex place-items-center justify-center "
        >
          <Link href="/profile" className="text-white  ">
            <div className="relative ">
              <motion.div
                variants={variants}
                animate={profile ? "visible" : "hidden"}
              >
                <p className="flex place-items-center text-[14px] w-[83px] h-[35px] justify-around font-semibold ">
                  <Image
                    src={profileImgTwo}
                    alt="teamlogo"
                    width={28}
                    height={28}
                  />
                  Profile
                </p>
              </motion.div>

              <motion.div
                variants={variants}
                animate={profile ? "hidden" : "visible"}
                className="w-[100%] h-[100%] absolute top-0 left-0 flex justify-center place-items-cente "
              >
                <div className="flex justify-center place-items-center ">
                  <Image
                    src={profileImg}
                    alt="teamlogo"
                    width={28}
                    height={28}
                  />
                </div>
              </motion.div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default Footer;
