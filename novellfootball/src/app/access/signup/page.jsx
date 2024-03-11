"use client";
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Input from "@/app/components/Input";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import OtpInputs from "@/app/components/OtpInputs";

const containerVariants = {
  hidden: { opacity: 1, scale: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.1,
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

function VerificationPopup({
  sentTo,
  toggleVerification,
  resend,
  setVerified,
}) {
  // have to create a funciton that will change the tab index on each click;
  const [otp, setOtp] = useState(new Array(4).fill(""));

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
      alert("verified");
      setVerified(true);
      toggleVerification(false);
    }
  }

  return (
    <div className="absolute z-[30] left-0 flex bg-slate-950/70 items-center justify-center right-0 h-full w-full opacity-1">
      <div className=" w-[80%] bg-slate-100 rounded-[2rem] px-6 pt-6 pb-4">
        <div className="flex relative flex-col space-y-5">
          <div className="flex px-2 justify-center">
            <h4 className="uppercase text-center font-bold">
              otp verification
            </h4>
            <p
              className="absolute right-0 font-bold top-[-0.5rem] p-2"
              onClick={() => toggleVerification(false)}
            >
              X
            </p>
          </div>
          <div className="text-start flex flex-col">
            <span className="uppercase font-regular text-gray-500 text-[0.6rem]">
              Enter the otp you received on
            </span>
            <span className="uppercase font-bold text-xs">
              +{sentTo?.slice(0, 3)}******{sentTo?.slice(-3)}
            </span>
          </div>
          <div className="flex space-x-2 flex-row items-center justify-between mx-auto w-full max-w-xs">
            <OtpInputs otp={otp} setOtp={setOtp} />
          </div>
          <div className="flex items-center text-center text-sm font-medium space-x-1 uppercase text-gray-500">
            <a
              onClick={resend}
              className="flex flex-row items-center font-semibold text-slate-900"
            >
              Resend
            </a>
            <Image src={"/play.png"} alt="play" width={12} height={12}></Image>
          </div>

          <div className="flex flex-col space-y-5">
            <div>
              <button
                onClick={verify}
                className="flex flex-row items-center justify-center text-center w-full  font-bold tracking-wide text-md rounded-xl outline-none py-4 bg-blue-600 border-none text-white text-sm uppercase  shadow-sm"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Signup = () => {
  const [credentials, updateCredentials] = useState({
    UserName: "",
    Phone: "",
    Email: "",
    ConfPassword: "",
    Password: "",
    Invitation: "",
  });

  const [getVerification, updateGetVerif] = useState(true);
  const [isInternational, updtInternational] = useState(false);
  const [isVerified, setVerified] = useState(false);

  function update(e) {
    updateCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const searchParams = useSearchParams();

  useEffect(() => {
    let invitationCode = searchParams.get("id");
    if (invitationCode) {
      updateCredentials((prev) => ({ ...prev, Invitation: invitationCode }));
    }
  }, []);

  const sendData = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      alert("not verified");
      return;
    }
    if (
      !credentials.UserName ||
      !credentials.ConfPassword ||
      !credentials.Password ||
      credentials.ConfPassword !== credentials.Password
    ) {
      alert("get error some fields are not filled");
      return;
    }
    if (isInternational && !credentials.Email) {
      // also validate that this user has validated the email after otp;
      alert("email is required for international");
      return;
    }
    if (!isInternational && credentials.Email) {
      alert("If you want to have a email please verify it first");
      return;
    }
    if (!isInternational && !credentials.Phone) {
      // also validate that this user has validated the phone after otp;
      alert("phone is required for indian");
      return;
    }
    let config = {
      method: "PUT",
      contentType: "application/json",
      body: JSON.stringify({ ...credentials }),
    };
    let res = await fetch("/api/access", config);
    res = await res.json();
    console.log(res);
  };
  async function getPhoneOtp() {
    try {
      if (credentials?.Phone?.length === 12) {
        // setIsLoading(true);
        let config = {
          method: "POST",
          header: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ Phone: credentials?.Phone }),
        };
        let res = await fetch("/api/otp/phone", config);
        res = await res.json();
        if (res?.status === 200) {
          alert(res?.message);
          updateGetVerif(true);
        } else {
          alert(res?.message);
        }
      } else {
        alert("invalid phone number");
      }
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div className="flex relative min-h-[100dvh] flex-col justify-center px-6 py-12 lg:px-8">
      <div className="absolute top-0 left-0 z-[-1]  h-full w-full">
        <Image
          fill
          style={{ objectFit: "cover" }}
          alt="background"
          src={"/signup_bg.png"}
        />
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <motion.form onSubmit={sendData} className="space-y-3">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-3"
          >
            <motion.div variants={itemVariants}>
              <label
                htmlFor="User"
                className="block text-sm font-bold leading-6 text-balance"
              >
                Username
              </label>
              <Input
                credentials={credentials}
                inputType="text"
                image="user.png"
                id="UserName"
                update={update}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label
                htmlFor="User"
                className="block text-sm font-bold leading-6 text-balance"
              >
                Phone number
              </label>
              <div className="mt-0 flex shadow-sm relative">
                <div className="absolute top-0 flex justify-center items-center left-0 h-full aspect-square px-1.5 py-1.5 "></div>
                <div className="absolute top-0 flex justify-center items-center right-0  h-full aspect-square px-1.5 py-1.5 ">
                  {credentials.Phone && credentials.Phone.length >= 10 ? (
                    <div
                      className={` py-[1px] px-[1px] bg-gradient-to-r ${
                        !isInternational && "from-blue-500 to-black"
                      } z-[20] rounded-md flex items-center justify-center `}
                    >
                      {isInternational ? (
                        <Image
                          src={`/tick_mark.png`}
                          alt="correct"
                          width={25}
                          className="z-[10]"
                          height={25}
                        ></Image>
                      ) : (
                        <button
                          onClick={() => getPhoneOtp()}
                          className="rounded-md py-1 px-2.5 bg-slate-100 text-xs capitalize fobold"
                        >
                          verify
                        </button>
                      )}
                    </div>
                  ) : (
                    <Image
                      src={`/wrong.png`}
                      alt="wrong"
                      width={20}
                      className="z-[10]"
                      height={20}
                    ></Image>
                  )}
                </div>
                <PhoneInput
                  country={"in"}
                  value={credentials.Phone}
                  className=" border-blue-600"
                  inputProps={{
                    name: "Phone",
                    required: !isInternational,
                  }}
                  onChange={(phone, country, e) => {
                    country?.dialCode !== "91"
                      ? updtInternational(true)
                      : updtInternational(false);
                    updateCredentials((prev) => ({ ...prev, Phone: phone }));
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <label
              htmlFor="Email"
              className="block text-sm font-bold leading-6 text-balance"
            >
              Email ID
            </label>
            <div className="mt-0 flex shadow-sm relative">
              <div className="absolute top-0 flex justify-center items-center left-0 h-full aspect-square px-1.5 py-1.5 ">
                <Image
                  src={`/email.png`}
                  alt="correct"
                  width={20}
                  height={20}
                ></Image>
              </div>
              <div className="absolute top-0 flex justify-center items-center right-0  h-full aspect-square px-1.5 py-1.5 ">
                {credentials.Email && credentials.Email.length >= 3 ? (
                  <div className=" py-[1px] px-[1px] bg-gradient-to-r from-blue-500 to-black  rounded-md flex items-center justify-center">
                    <button
                      onClick={() => updateGetVerif(true)}
                      className="rounded-md py-1 px-2.5 bg-slate-100 text-xs capitalize font-semibold"
                    >
                      verify
                    </button>
                  </div>
                ) : (
                  <Image
                    src={`/wrong.png`}
                    alt="correct"
                    width={20}
                    height={20}
                  ></Image>
                )}
              </div>
              <input
                id="Email"
                name="Email"
                type="email"
                value={credentials.Email}
                onChange={update}
                minLength={3}
                placeholder="Eg.Abcd@xyz"
                className="block w-full px-[2.7rem] rounded-md border-0 bg-white/50 py-[0.7rem] text-slate-800 shadow-md ring-2 ring-inset outline-none focus:ring-2 ring-blue-500 focus:ring-inset  sm:text-sm sm:leading-6"
              />
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-3"
          >
            <motion.div variants={itemVariants2}>
              <label
                htmlFor="Password"
                className="block text-sm font-bold leading-6 text-balance"
              >
                Password
              </label>
              <Input
                credentials={credentials}
                inputType="password"
                image="lock.png"
                id="Password"
                update={update}
              />
            </motion.div>
            <motion.div variants={itemVariants2}>
              <label
                htmlFor="ConfirmPassword"
                className="block text-sm font-bold leading-6 text-balance"
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
                className="block text-sm font-bold leading-6 text-balance"
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
            <div className="inline-flex mt-10 items-center">
              <label
                className="relative flex items-center py-3 mr-3 rounded-full cursor-pointer"
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
                className="mt-px text-[0.6rem] font-medium text-gray-900 cursor-pointer select-none"
                htmlFor="check"
              >
                By creating an account, I hereby confirm that I am over 18 years
                of age. I have read and accept the privacy policy and terms and
                conditions.
              </label>
            </div>
            <motion.div variants={itemVariants2}>
              <button
                type="submit"
                className="flex my-6 w-full justify-center rounded-md bg-blue-500 px-3 py-[0.6rem] font-semibold leading-6 text-white capitalize shadow-sm hover:bg-blue-400 "
              >
                create new account
              </button>
            </motion.div>
          </motion.div>
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

      {getVerification && (
        <VerificationPopup
          sentTo={credentials?.Phone}
          setVerified={setVerified}
          resend={getPhoneOtp}
          toggleVerification={updateGetVerif}
        />
      )}
    </div>
  );
};

export default Signup;
