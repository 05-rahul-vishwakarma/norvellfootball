"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { BiHomeSmile } from "react-icons/bi";
import { PiSoccerBall } from "react-icons/pi";
import { GiNetworkBars } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { motion } from "framer-motion";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Router from "next/router";

const variants = {
  open: { width: "35%" },
  closed: { width: "60px" },
};

function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  // const refOne = useRef(null);
  // const refTwo = useRef(null);
  // const refThree = useRef(null);
  // const refFour = useRef(null);
  const [home, setHome] = useState(false);
  const [stake, setStake] = useState(false);
  const [match, setMatch] = useState(false);
  const [profile, setProfile] = useState(false);

  useEffect(() => {
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

    if (pathname == "/profile") {
      setProfile(true);
    } else {
      setProfile(false);
    }
  });

  return (
    <div className="w-[100vw] h-[60px] z-30 fixed bottom-[1.5rem] flex justify-center place-items-center ">
      <div className=" bg-[#71787a] w-[80%] h-[100%] rounded-[100px] flex justify-between place-items-center pl-[.2rem] pr-[.2rem]  ">
        <motion.div
          variants={variants}
          animate={home ? "open" : "closed"}
          className="border-2 border-black h-[90%] w-[60px] rounded-[100px] flex place-items-center justify-center "
        >
          <Link href="/">home</Link>
        </motion.div>

        <motion.div
          variants={variants}
          animate={stake ? "open" : "closed"}
          className="border-2 border-black h-[90%] w-[60px] rounded-[100px] flex place-items-center justify-center "
        >
          <Link href="/stakes">Stake</Link>
        </motion.div>

        <motion.div
          variants={variants}
          animate={match ? "open" : "closed"}
          className="border-2 border-black h-[90%] w-[60px] rounded-[100px] flex place-items-center justify-center "
        >
          <Link href="/matches">Match</Link>
        </motion.div>

        <motion.div
          variants={variants}
          animate={profile ? "open" : "closed"}
          className="border-2 border-black h-[90%] w-[60px] rounded-[100px] flex place-items-center justify-center "
        >
          <Link href="/profile">Profile</Link>
        </motion.div>
      </div>
    </div>
  );
}

export default Footer;
