"use client";

import Link from "next/link";
import React, { useState, useRef } from "react";
import { BiHomeSmile } from "react-icons/bi";
import { PiSoccerBall } from "react-icons/pi";
import { GiNetworkBars } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { motion } from "framer-motion";

const variants = {
  open: { width: "35%" },
  closed: { width: "60px" },
};

function Footer() {
  const [width, setWidth] = useState(false);
  const refOne = useRef([]);
  const refTwo = useRef([]);
  const refThree = useRef([]);
  const refFour = useRef([]);

  // Function to add refs to the array
  const animatefooter = () => {
    refOne.current.style.width = "35%";
    refTwo.current.style.width = "60px";
    refThree.current.style.width = "60px";
    refFour.current.style.width = "60px";
  };

  const animateStake = () => {
    refOne.current.style.width = "60px";
    refTwo.current.style.width = "35%";
    refThree.current.style.width = "60px";
    refFour.current.style.width = "60px";
  };

  const animateMatch = () => {
    refOne.current.style.width = "60px";
    refTwo.current.style.width = "60px";
    refThree.current.style.width = "35%";
    refFour.current.style.width = "60px";
  };

  const animateProfile = () => {
    refOne.current.style.width = "60px";
    refTwo.current.style.width = "60px";
    refThree.current.style.width = "60px";
    refFour.current.style.width = "35%";
  };

  return (
    <div className="w-[100vw] h-[60px] z-30 absolute bottom-[1.5rem] flex justify-center place-items-center ">
      <div className=" bg-[#71787a] w-[80%] h-[100%] rounded-[100px] flex justify-between place-items-center pl-[.2rem] pr-[.2rem]  ">
        <motion.div
          ref={refOne}
          onClick={animatefooter}
          className=" h-[90%] w-[35%] flex justify-center place-items-center rounded-[50px]  "
        >
          <Link
            href="/"
            className=" bg-[#eef1f2] border-2 border-black   w-[100%] flex  rounded-[100px] h-[100%] place-items-center "
          >
            <BiHomeSmile className="text-[1.6rem] text-blue-900  " />
            <p className="ml-[.3rem] font-semibold ">Home</p>
          </Link>
        </motion.div>

        <motion.div
          ref={refTwo}
          onClick={animateStake}
          className="bg-[#eef1f2] h-[90%] w-[60px]   rounded-[100px] flex justify-center place-items-center "
        >
          <Link href="/stake">
            <GiNetworkBars className="text-[1.6rem] text-blue-600" />
            {/* <p>Stake</p> */}
          </Link>
        </motion.div>

        <motion.div
          ref={refThree}
          onClick={animateMatch}
          className="bg-[#eef1f2] h-[90%] w-[60px] rounded-[100px] flex justify-center place-items-center"
        >
          <Link href="/matches">
            <PiSoccerBall className="text-[1.6rem] text-blue-600" />
            {/* <p>Match</p> */}
          </Link>
        </motion.div>

        <motion.div
          ref={refFour}
          onClick={animateProfile}
          className="bg-[#eef1f2] h-[90%] w-[60px] rounded-[100px] flex justify-center place-items-center "
        >
          <Link href="/profile">
            <CgProfile className="text-[1.6rem] text-blue-600" />
            {/* <p>Profile</p> */}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default Footer;
