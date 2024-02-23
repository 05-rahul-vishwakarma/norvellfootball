import React, { useState } from "react";
import Image from "next/image";
import { easeInOut, motion } from "framer-motion";
import Input from "./Input";
const VerificationPopup = ({ toggleVerification }) => {
  const [credentials, updateCredentials] = useState({
    confPassword: "",
    Password: "",
  });
  function update(e) {
    updateCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full absolute top-0 left-0 flex justify-center items-end bg-black/70 w-full"
    >
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className=" h-[80%] py-8 pb-40  bg-slate-50 overflow-y-auto rounded-t-[2rem] w-[98%]"
      >
        <div className="flex  relative px-2  justify-center">
          <h4 className="uppercase text-center font-bold">otp verification</h4>
          <p
            className="absolute right-2 font-bold top-[-0.5rem] p-2"
            onClick={() => toggleVerification(false)}
          >
            X
          </p>
        </div>

        <div className="px-14 mt-2">
          <h3 className="font-bold text-xs  capitalize">
            select prefered method for verification
          </h3>
        </div>
        <div className="flex flex-col items-center mt-1 space-y-3">
          <div className="flex items-center w-[70%] px-2 justify-between bg-white rounded-md ">
            <h3 className="font-semibold py-3  text-xs">Phone Verification</h3>
            <input
              type="radio"
              className=" border-2 border-solid border-blue-600"
              name=""
              id=""
            />
          </div>
          <div className="flex items-center w-[70%] px-2 justify-between bg-white rounded-md ">
            <h3 className="font-semibold py-3  text-xs">Email Verification</h3>
            <input
              type="radio"
              className=" border-2 border-solid border-blue-600"
              name=""
              id=""
            />
          </div>
        </div>
        <div className="text-start mt-4 px-14 flex flex-col">
          <span className="uppercase font-regular text-gray-500 text-[0.6rem]">
            Enter the otp you received on
          </span>
          <span className="uppercase font-bold text-xs">+91******9182</span>
        </div>
        <div className="flex space-x-2 mt-2 px-8 flex-row items-center justify-between mx-auto w-full max-w-xs">
          <div className="w-16 h-16 ">
            <input
              className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="w-16 h-16 ">
            <input
              className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="w-16 h-16 ">
            <input
              className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="w-16 h-16 ">
            <input
              className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
              type="text"
              name=""
              id=""
            />
          </div>
        </div>
        <div className="flex mt-3 px-14 flex-row items-center text-center text-sm font-medium space-x-1 uppercase text-gray-500">
          <a
            className="flex flex-row items-center font-semibold text-slate-900"
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resend
          </a>
          <Image src={"/play.png"} width={12} height={12}></Image>
        </div>
        <div className="px-14 mt-2">
          <div className=" bg-gradient-to-r p-[2px] rounded-md from-blue-700 to-slate-950">
            <button className="h-full font-bold py-2 rounded-md w-full bg-slate-100">
              VERIFY
            </button>
          </div>
        </div>
        <div className="px-5 mt-4">
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-semibold leading-6 text-black"
              >
                New Password
              </label>
            </div>
            <Input
              credentials={credentials}
              inputType="password"
              id="Password"
              image="lock.png"
              update={update}
            />
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm capitalize font-semibold leading-6 text-black"
              >
                confirm Password
              </label>
            </div>
            <Input
              credentials={credentials}
              inputType="text"
              id="confPassword"
              image="lock.png"
              update={update}
            />
          </div>
        </div>
        <div className="px-5 mt-3">
          <button className=" rounded-md text-white font-bold tracking-wider capitalize w-full py-3 bg-blue-500">
            reset password
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VerificationPopup;
