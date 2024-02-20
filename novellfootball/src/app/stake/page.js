"use client";

import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Stake from "../components/Stake";
import { easeInOut, motion } from "framer-motion";

// const containerVariants = {
//   hidden: { opacity: 1, scale: 1 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       delay: 0.1,
//       staggerChildren: 0.1,
//       damping: 15,
//     },
//   },
// };

const variantOne = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
  justifyCenter: {
    justifyContent: 'end',
  },
  justifyCenterTwo: {
    justifyContent: 'start',
  },
};

function page() {
  const [swipe, setSwipe] = useState(true);

  return (
    <div className="h-screen w-screen overflow-y-hidden bg-[#f8fcff] " >
      <div className="py-[1rem] ">
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

      <div className=" h-[60px] w-[90%] mr-auto ml-auto rounded-[10px] relative  bg-[#e8e8e8] ">
        <div className="h-[100%] w-[100%] mr-auto ml-auto rounded-[10px] flex justify-between place-items-center  ">
          <div
            className="w-[50%]  h-[100%] flex place-items-center  justify-center z-[1] "
            onClick={() => setSwipe(true)}
          >
            My Stake
          </div>
          <div
            onClick={() => setSwipe(false)} //swipe = false
            className="w-[50%]  h-[100%] flex place-items-center  justify-center z-[1] "
          >
            History
          </div>
        </div>

        <motion.div
        variants={variantOne}
        animate={swipe?"justifyCenterTwo":"justifyCenter"}
        className="h-[100%] w-[100%] mr-auto ml-auto rounded-[10px] absolute top-0 left-0  flex place-items-center justify-start shadow-sm  ">
          <div className="ml-[.2rem] mr-[.2rem] w-[45%]  h-[90%] bg-white rounded-[10px] "></div>
        </motion.div>
      </div>

      <div 
      style={{
          background: "#e0f9ef",
          border: "1px solid #00db58",
          color: "#707d77"
      }}
      className="h-[38px] font-[600] w-[90%] mr-auto ml-auto rounded-[10px]   border-2 border-black flex justify-center mt-[.7rem] place-items-center ">
        <p className="text-center flex ">
          Total earned from stakes $<p>10000</p>
        </p>
      </div>

      <div className=" h-[75%] mt-[.6rem] relative ">
        <motion.div
          animate={swipe ? "visible" : "hidden"}
          variants={variantOne}
          className=" absolute top-0 left-0 w-full h-full opacity-[1] "
        >
          <Stake />
        </motion.div>

        <motion.div
          variants={variantOne}
          animate={swipe ? "hidden" : "visible"}
          className="  absolute  top-0 left-0  w-full h-full opacity-0 "
        >
          <Stake />
        </motion.div>
      </div>
    </div>
  );
}

export default page;
