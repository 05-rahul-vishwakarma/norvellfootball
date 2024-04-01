"use client";
import Input from "@/app/components/Input";
import Layout from "@/app/components/Layout";
import Modal from "@/app/components/Modal";
import OtpInputs from "@/app/components/OtpInputs";
import { AlertContext } from "@/app/helpers/AlertContext";
import { UserContext } from "@/app/helpers/UserContext";
import { motion } from "framer-motion";

// import VerificationPopup from "@/app/components/VerificationPopup";
import React, { useContext, useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa6";

const Page = () => {
  let { userOtherData, getBalance } = useContext(UserContext);
  let [isPhoneVerified, updatePhoneVerified] = useState(true);
  useEffect(() => {
    if (!userOtherData) {
      getBalance();
    } else {
      updatePhoneVerified(!userOtherData?.International);
    }
  }, [userOtherData?.International]);
  return (
    <Layout>
      <section className="h-full w-full">
        <VerificationPopup
          isPhoneVerified={isPhoneVerified}
          otpSentTo={
            isPhoneVerified
              ? userOtherData?.PhoneNumber
              : userOtherData?.EmailId
          }
        />
      </section>
    </Layout>
  );
};

export default Page;

const VerificationPopup = ({
  toggleVerification,
  isPhoneVerified,
  otpSentTo,
}) => {
  // Popup handling here //
  const { getAlert } = useContext(AlertContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [opps, setopps] = useState("Opps!");
  const [statusImage, setStatusImage] = useState("/success.png");
  const [otpSent, updateOtpSent] = useState(false);
  const [verifPhone, updateVerifType] = useState(isPhoneVerified);
  const [credentials, updateCredentials] = useState({
    confPassword: "",
    Password: "",
  });
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [isVerified, setVerified] = useState(false);

  const handleCloseErrorPopup = () => {
    setModalOpen(false);
  };

  function verify() {
    let EnteredOtp = otp.join("");
    EnteredOtp = Number(EnteredOtp);
    let cookies = document.cookie;
    let providedOtp;
    const [name, value] = cookies.split("=");
    if (name === "otp") {
      providedOtp = value;
    }
    if (EnteredOtp === Number(providedOtp)) {
      getAlert("success", "otp  verified successfully");
      setVerified(true);
    }
  }

  function update(e) {
    updateCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function getOtp() {
    try {
      getAlert();
      let res = await fetch("/api/otp/" + `${verifPhone ? "phone" : "email"}`);
      res = await res.json();
      if (res?.status === 200) {
        getAlert("success", "otp sent successfully and valid for 5 minutes");
      } else if (res?.status === 500 || res?.status === 302) {
        getAlert("redirect", "something went wrong login again");
      } else {
        getAlert("opps", res?.message || "something went wrong");
      }
    } catch (error) {
      getAlert("redirect", "something went wrong login again");
    }
  }

  async function resetPassword() {
    try {
      getAlert();
      if (!isVerified) {
        getAlert("opps", "verify first");
        return;
      }
      if (credentials?.confPassword !== credentials?.Password) {
        getAlert("opps", "password mismatch enter same password");
        return;
      } else if (!UserName) {
        getAlert("opps", "username is needed");
        return;
      }

      let config = {
        method: "POST",
        header: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ UserName, Password: credentials?.Password }),
      };
      let res = await fetch("/api/access/resetPassword", config);
      res = await res.json();
      if (res?.status === 200) {
        getAlert("redirect", "password updated successfull");
      } else if (res?.status === 500 || res?.status === 302) {
        getAlert("redirect", res?.message || "something went wrong");
      } else {
        getAlert("opps", res?.message || "something went wrong");
      }
    } catch (error) {
      getAlert("redirect", "something went wrong login again");
    }
  }
  useEffect(() => {
    getOtp();
  }, []);
  return (
    <motion.div className="h-full absolute top-0 left-0 flex justify-center items-end  w-full">
      <motion.div className=" h-full pt-4 pb-40  bg-[#f8fbfe] overflow-y-auto rounded-t-[2rem] w-full">
        <div className="flex  relative px-2  justify-center">
          <h4 className="capitalize text-center font-bold">change password</h4>
          <p
            className="absolute right-2 font-bold top-[-0.5rem] p-2"
            // onClick={() => toggleVerification(false)}
          ></p>
        </div>

        <div className="px-14 mt-6">
          <h3 className="font-bold text-xs  capitalize">
            select prefered method for verification
          </h3>
        </div>
        <div className="flex flex-col items-center mt-1 space-y-3">
          <div className="flex items-center w-[70%] px-2 justify-between bg-[#ffffff] rounded-md ">
            <h3 className="font-semibold py-3  text-xs">Phone Verification</h3>
            <input
              type="radio"
              checked={verifPhone}
              onChange={(e) => updateVerifType(verifPhone)}
              className=" border-2 size-4 border-solid border-blue-600"
              name="verificationType"
            />
          </div>
          <div className="flex items-center w-[70%] px-2 justify-between bg-[#ffffff] rounded-md ">
            <h3 className="font-semibold py-3  text-xs">Email Verification</h3>
            <input
              type="radio"
              checked={!verifPhone}
              onChange={(e) => updateVerifType(verifPhone)}
              className=" border-2 size-4 border-solid border-blue-600"
              name="verificationType"
            />
          </div>
        </div>
        <div className="mt-1 uppercase text-[0.6rem] mx-auto w-[70%]">
          <p>Enter the otp you received on</p>
          <p className="font-bold">
            {" "}
            {isPhoneVerified
              ? `+91 ${otpSentTo?.slice(0, 3)}*****${otpSentTo?.slice(-3)}`
              : `${otpSentTo?.slice(0, 3)}*****${otpSentTo?.slice(-10)}`}
          </p>
        </div>
        <div className="flex space-x-1 mt-2 px-8 flex-row items-center justify-between mx-auto w-[80%] max-w-xs">
          <OtpInputs otp={otp} setOtp={setOtp} />
        </div>

        <div className="px-14 mt-2">
          <div
            onClick={verify}
            className=" bg-gradient-to-r p-[2px] rounded-md from-blue-700 to-slate-950"
          >
            <button className="h-full font-bold py-2 rounded-md w-full bg-slate-100">
              VERIFY
            </button>
          </div>
        </div>
        <div
          onClick={getOtp}
          className="mt-2 font-bold flex space-x-1 items-center uppercase text-[0.65rem] mx-auto w-[70%]"
        >
          <p>RESEND</p>
          <p>
            <FaPlay />
          </p>
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
        <div onClick={resetPassword} className="px-5 mt-3">
          <button className=" rounded-md text-white font-bold tracking-wider capitalize w-full py-3 bg-blue-500">
            reset password
          </button>
        </div>
      </motion.div>
      {modalOpen && (
        <Modal
          message={modalMessage}
          statusImage={statusImage}
          status={opps}
          onClose={handleCloseErrorPopup}
        />
      )}
    </motion.div>
  );
};
