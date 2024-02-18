"use client";
import Input from "@/app/components/Input";
import { useState } from "react";
import { motion } from "framer-motion";

const Signup = () => {
  const [credentials, updateCredentials] = useState({
    Username: "",
    Phone: "",
    Email: "",
    ConfPassword: "",
    Password: "",
    Invitation: "",
  });
  function update(e) {
    updateCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const sendData = async (e) => {
    e.preventDefault();
    let config = {
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify(credentials),
    };
    let res = await fetch("http://localhost:3000/api/Access", config);
    res = await res.json();
    console.log(res);
  };

  const containerVariants = {
    hidden: { opacity: 1, scale: 1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.1,
        damping: 15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 150 },
    visible: { opacity: 1, y: 0 },
  };
  const itemVariants2 = {
    hidden: { opacity: 0, y: -150 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <motion.form className="space-y-3">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-3"
          >
            <motion.div variants={itemVariants}>
              <label
                htmlFor="User"
                className="block text-sm font-semibold leading-6 text-balance"
              >
                Username
              </label>
              <Input
                credentials={credentials}
                inputType="text"
                image="user.png"
                id="Username"
                update={update}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label
                htmlFor="User"
                className="block text-sm font-semibold leading-6 text-balance"
              >
                Phone Number
              </label>
              <Input
                credentials={credentials}
                inputType="text"
                image="user.png"
                id="Phone"
                update={update}
              />
            </motion.div>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-3"
          >
            <motion.div variants={itemVariants2}>
              <label
                htmlFor="User"
                className="block text-sm font-semibold leading-6 text-balance"
              >
                Email ID
              </label>
              <Input
                credentials={credentials}
                inputType="email"
                image="email.png"
                id="Email"
                update={update}
              />
            </motion.div>
            <motion.div variants={itemVariants2}>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold leading-6 text-black"
                >
                  Password
                </label>
              </div>
              <Input
                credentials={credentials}
                inputType="password"
                id="Password"
                image="lock.png"
                update={update}
              />
            </motion.div>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-3"
          >
            <motion.div variants={itemVariants2}>
              <label
                htmlFor="User"
                className="block text-sm font-semibold leading-6 text-balance"
              >
                Confirm Password
              </label>
              <Input
                credentials={credentials}
                inputType="text"
                image="lock.png"
                id="ConfPassword"
                update={update}
              />
            </motion.div>
            <motion.div variants={itemVariants2}>
              <label
                htmlFor="User"
                className="block text-sm font-semibold leading-6 text-balance"
              >
                Invite Code
              </label>
              <Input
                credentials={credentials}
                inputType="number"
                image="invite.png"
                id="Invitation"
                update={update}
                required={false}
              />
            </motion.div>
            <motion.div variants={itemVariants2}>
              <button
                type="submit"
                className="flex mt-6 w-full justify-center rounded-md bg-blue-500 px-3 py-[0.6rem] font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 "
              >
                Signup
              </button>
            </motion.div>
          </motion.div>

          <div className="inline-flex mt-10 items-center">
            <label
              className="relative flex items-center p-3 rounded-full cursor-pointer"
              htmlFor="check"
            >
              <input
                type="checkbox"
                required
                className="before:content[''] peer relative h-10 w-10 cursor-pointer appearance-none rounded-md border border-gray-400 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-400 checked:bg-gray-200 checked:before:bg-gray-200 hover:before:opacity-10"
                id="check"
              />
              <span className="absolute text-green-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
            <label
              className="mt-px text-xs font-light text-gray-600 cursor-pointer select-none"
              htmlFor="check"
            >
              By creating an account, I hereby confirm that I am over 18 years
              of age. I have read and accept the privacy policy and terms and
              conditions.
            </label>
          </div>
        </motion.form>

        <p className="mt-2 text-center font-semibold text-sm">
          <a
            href="/access/login"
            className="font-semibold leading-6 hover:text-blue-800"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
