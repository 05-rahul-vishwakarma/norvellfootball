"use client";
import Image from "next/image";
import { FaRupeeSign } from "react-icons/fa";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";
import {
  FaArrowDown,
  FaCross,
  FaDollarSign,
  FaPlay,
  FaPlus,
} from "react-icons/fa6";
import { GrFormEdit } from "react-icons/gr";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import AddBank from "@/app/components/AddBank";

function page({ closePopup }) {
  const [getVerification, updateGetVerif] = useState(false);
  const [editBank, updateEditBank] = useState(true);

  const [isLocalBank, updateBank] = useState(true);
  return (
    <section className="bg-[#F8FCFF] relative top-0 left-0 overflow-hidden w-full h-[100dvh]">
      <div className="h-[10%] flex justify-center relative items-center">
        <span className="font-bold capitalize text-sm">payment withdrawal</span>
        <span
          //   onClick={() => closePopup(false)}
          className="space-x-2 absolute top-[50%] translate-y-[-50%] left-2 flex justify-center items-center font-semibold text-sm"
        >
          <LiaAngleLeftSolid />
          Back
        </span>
      </div>
      <main className=" space-y-1  h-fit px-4 ">
        {/* hero section */}
        <div
          style={{
            background: "url(../../profile-bg.png) center no-repeat",
            backgroundSize: "cover",
          }}
          className=" h-[65%] py-4  relative w-full  
       rounded-xl"
        >
          <div className="flex  flex-col w-full justify-center items-center py-3">
            <span
              className=" size-16
              ring-[3px] relative ring-white rounded-full "
            >
              <Image
                style={{ height: "100%", width: "100%" }}
                src="/logo.png"
                height={40}
                width={40}
                alt="logo"
              ></Image>
            </span>
            <h2 className="capitalize text-sm mt-2 truncate font-extrabold text-white">
              hello there
            </h2>
          </div>
          <div className="w-full mt-1  px-2">
            <div className="rounded-full   py-0.5 flex justify-between">
              <div
                className="flex  text-white rounded-full flex-row-reverse bg-gray-500/50 px-2 space-x-1
              gap-x-2 items-center justify-end"
              >
                <span className=" aspect-square relative flex justify-center items-center text-gray-600 rounded-full bg-gray-200  p-0.5 ">
                  <Image
                    src={"/tick_mark.png"}
                    height={8}
                    width={8}
                    alt="added"
                  />
                </span>
                <p className="capitalize  font-bold text-[0.65rem]">
                  bank account
                </p>
              </div>
              <div
                className="flex  text-white rounded-full py-0.5 bg-gray-500/50 px-2 space-x-1
              gap-x-2 items-center justify-end"
              >
                <span className=" aspect-square relative flex justify-center items-center text-gray-600 rounded-full bg-gray-200  p-0.5 ">
                  <Image src={"/wrong.png"} height={8} width={8} alt="added" />
                </span>
                <p className="capitalize  font-bold text-[0.65rem]">
                  USDT account
                </p>
              </div>
            </div>
          </div>
          <div
            onClick={() => updateGetVerif(true)}
            className="absolute top-2 right-2 text-center "
          >
            <div className="rounded-full flex justify-center items-center size-7 bg-blue-500 text-xl text-center text-white ">
              <GrFormEdit />
            </div>
            <p className="capitalize text-[0.5rem] text-white font-bold">
              edit
            </p>
          </div>
          <div
            onClick={() => updateEditBank(true)}
            className=" absolute h-[30%] bg-blue-500 rounded-full text-white left-[50%] translate-x-[-50%] top-[100%] translate-y-[-50%] aspect-square flex text-[2rem] justify-center items-center"
          >
            <FaPlus />
          </div>
        </div>
        {/* reacharge and balance section */}
        <div className="pt-1  px-1">
          <div className=" py-2 mt-4 relative  flex justify-between flex-row-reverse rounded-full p-1">
            <div className="flex pl-1 bg-slate-50 ring-1 ring-gray-200 rounded-full p-0.5 justify-center items-center px-1 space-x-1">
              <span
                className=" h-full aspect-square rounded-full text-white 
             bg-blue-500 flex text-[0.7rem] p-0.5 justify-center items-center"
              >
                <FaRupeeSign />
              </span>

              <span className="text-sm font-bold pr-3">109230</span>
              <span
                className=" h-full aspect-square rounded-full text-white 
             bg-blue-500 flex text-[0.8rem] p-0.5 justify-center items-center"
              >
                <FaPlus />
              </span>
            </div>

            <div className="flex pl-1   justify-center flex-row-reverse items-center space-x-1">
              <span className=" text-[0.8rem] text-gray-800 font-extrabold capitalize pr-3">
                transfer to bank
              </span>
            </div>
          </div>
        </div>
      </main>
      <div className="h-[60%] pt-2 ">
        <div className="h-full overflow-y-scroll pb-40 px-4">
          <div className="px-1">
            <div className=" relative  flex justify-between flex-row-reverse rounded-full p-1">
              <div className="flex  bg-slate-50 ring-1 ring-gray-200 rounded-full py-1 text-xs justify-center items-center px-2 space-x-2">
                <span
                  className=" h-full font-semibold capitalize  rounded-full 
              flex   justify-center items-center"
                >
                  valid amount
                </span>
                <div className="flex text-xs text-red-500 font-medium space-x-0">
                  <span>109230</span>
                  <span>/</span>
                  <span>109230</span>
                </div>
              </div>

              <div className="flex pl-1 justify-center flex-row-reverse items-center space-x-1">
                <span className="  text-gray-800 font-bold text-[0.6rem] capitalize pr-3">
                  choose bank transfer
                </span>
              </div>
            </div>
          </div>
          {/* radio buttons */}
          <div className="px-2 space-y-3  rounded-md  py-2">
            <div className="flex px-3 py-2  bg-white rounded-md items-center">
              <div className=" mr-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_131_380)">
                    <path
                      d="M4.16665 10.4165V17.7082H7.29165V10.4165H4.16665ZM10.4166 10.4165V17.7082H13.5416V10.4165H10.4166ZM2.08331 22.9165H21.875V19.7915H2.08331V22.9165ZM16.6666 10.4165V17.7082H19.7916V10.4165H16.6666ZM11.9791 1.0415L2.08331 6.24984V8.33317H21.875V6.24984L11.9791 1.0415Z"
                      fill="#000"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_131_380">
                      <rect width="25" height="25" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="flex-[3] capitalize font-semibold text-[0.6rem]">
                {" "}
                local bank transfer
              </div>
              <div className="flex-[1] flex justify-end items-center">
                <input
                  type="radio"
                  name="bank"
                  onChange={() => updateBank((prev) => !prev)}
                  checked={isLocalBank}
                  value={"local"}
                  className="size-5"
                  id=""
                />
              </div>
            </div>
            <div className="flex px-3 py-2  bg-white rounded-md items-center">
              <div className=" mr-2">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6484 9.72266V7.2793H20.207V3.42383H4.77734V7.2793H10.3516V9.72266C5.68164 9.94727 2.17578 10.8848 2.17578 12.0078C2.17578 13.1309 5.67773 14.0625 10.3516 14.293V22.3574H14.6484V14.293C19.3184 14.0703 22.8242 13.1328 22.8242 12.0078C22.8242 10.8828 19.3223 9.94727 14.6484 9.72266ZM12.5 13.5625C7.44336 13.5625 3.34375 12.7812 3.34375 11.8398C3.34375 11.0293 6.33008 10.3496 10.3477 10.168V12.9277C11.0391 12.959 11.7578 12.9766 12.4961 12.9766C13.2344 12.9766 13.957 12.959 14.6445 12.9277V10.168C18.6621 10.3496 21.6484 11.0293 21.6484 11.8398C21.6562 12.791 17.5566 13.5625 12.5 13.5625Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="flex-[3] capitalize font-semibold text-[0.6rem]">
                {" "}
                USDT transfer
              </div>
              <div className="flex-[1] flex justify-end items-center">
                <input
                  type="radio"
                  name="bank"
                  onChange={() => updateBank((prev) => !prev)}
                  checked={!isLocalBank}
                  value={"usdt"}
                  className="size-5"
                  id=""
                />
              </div>
            </div>
          </div>

          <div className=" px-2 mt-2">
            {isLocalBank ? (
              <>
                <div>
                  <div className="flex capitalize font-semibold text-[0.6rem] space-x-2 ">
                    <span className="w-[50%]">transfer amount</span>
                    <span className="w-[50%] pl-3">after tax of 10%</span>
                  </div>
                </div>
                <div className="ring-[1.5px] ring-blue-600 py-2 mt-1 rounded-md">
                  <div className="flex capitalize font-semibold text-[0.65rem] space-x-2 ">
                    <div className=" flex w-[50%] space-x-2 px-2">
                      <span
                        className=" h-full aspect-square rounded-full text-white 
           bg-blue-500 flex text-[0.7rem] p-1 justify-center items-center"
                      >
                        <FaRupeeSign />
                      </span>
                      <input
                        type="number"
                        placeholder="Enter value"
                        className="w-full h-full outline-none text-gray-600"
                        name=""
                      />
                    </div>
                    <div className=" flex w-[50%] space-x-2 px-2">
                      <span
                        className=" h-full aspect-square rounded-full text-white 
           bg-blue-500 flex text-[0.7rem] p-1 justify-center items-center"
                      >
                        <FaRupeeSign />
                      </span>
                      <input
                        type="number"
                        className="w-full h-full outline-none text-green-600"
                        name=""
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-[0.69rem] capitalize font-bold text-gray-800">
                    FX current exchange rate Rs. 80 = $1
                  </p>
                  <div className="flex mt-3 capitalize font-semibold text-[0.6rem] space-x-2 ">
                    <span className="w-[50%]">transfer amount</span>
                    <span className="w-[50%] text-[0.5rem] px-3 text-gray-500">
                      USDT converted with 10% tax
                    </span>
                  </div>
                </div>
                <div className="ring-[1.5px] ring-blue-600 py-2 mt-1 rounded-md">
                  <div className="flex capitalize font-semibold text-[0.65rem] space-x-2 ">
                    <div className=" flex w-[50%] space-x-2 px-2">
                      <span
                        className=" h-full aspect-square rounded-full text-white 
           bg-blue-500 flex text-[0.7rem] p-1 justify-center items-center"
                      >
                        <FaRupeeSign />
                      </span>
                      <input
                        type="number"
                        placeholder="Enter value"
                        className="w-full h-full outline-none text-gray-600"
                        name=""
                      />
                    </div>
                    <div className=" flex w-[50%] space-x-2 px-2">
                      <span
                        className=" h-full aspect-square rounded-full text-white 
           bg-orange-500 flex text-[0.7rem] p-1 justify-center items-center"
                      >
                        <FaDollarSign />
                      </span>
                      <input
                        type="number"
                        disabled
                        placeholder="0"
                        className="w-full h-full outline-none text-green-600"
                        name=""
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="mt-5">
              <div className="capitalize font-semibold text-[0.6rem]">
                <span className="w-[50%]">
                  verify with one-time password &#40;OTP&#41;
                </span>
              </div>
            </div>
            <div className="ring-[1.5px] ring-blue-600 pb-2 mt-1 rounded-md">
              <div className="flex capitalize font-semibold text-[0.65rem] space-x-2 ">
                <div className=" flex w-[70%] space-x-2 px-2">
                  <div className="flex space-x-1 mt-2 flex-row items-center justify-between mx-auto w-full ">
                    <div className="w-10 h-12 ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-md border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                      />
                    </div>
                    <div className="w-10 h-12 ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-md border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                      />
                    </div>
                    <div className="w-10 h-12 ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-md border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                      />
                    </div>
                    <div className="w-10 h-12 ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-md border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                      />
                    </div>
                  </div>
                </div>
                <div className=" flex  flex-col justify-end w-[30%] space-y-2 text-center px-2">
                  <span
                    className="  
            flex text-[0.7rem] justify-center items-center"
                  >
                    <Image
                      src={"/tick_mark.png"}
                      alt="sent"
                      width={25}
                      height={25}
                    />
                  </span>
                  <div className="flex text-center justify-center text-xs items-center h-[20%]">
                    <p>Resend OTP</p>
                    <FaPlay />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-2 py-1">
            <button className="w-full capitalize rounded-md mt-4 shadow-md bg-blue-500 text-white font-bold py-2 ">
              transfer to bank
            </button>
          </div>
        </div>
      </div>
      {getVerification && (
        <VerificationPopup toggleVerification={updateGetVerif} />
      )}
      {editBank && <AddBank closePopup={updateEditBank} />}
    </section>
  );
}

export default page;

function VerificationPopup({ toggleVerification }) {
  const [phone, updateVerificationMethod] = useState(true);
  return (
    <div className="absolute z-[30] top-0 left-0 flex bg-black/50 items-center justify-center right-0 h-full w-full opacity-1">
      <div className=" w-[80%] bg-slate-100 rounded-[1.3rem] px-6 pt-3 pb-4">
        <div className="flex relative flex-col space-y-2">
          <div className="flex px-2 justify-center">
            <h4 className="uppercase text-[0.8rem] text-center font-bold">
              otp verification
            </h4>
            <p
              className="absolute right-0 font-bold text-2xl top-[-0.5rem] pt-2"
              onClick={() => toggleVerification(false)}
            >
              <IoIosClose />
            </p>
          </div>
          <div>
            <p className="capitalize text-[0.6rem] font-bold">
              select prefered method for verification
            </p>
            <p className="capitalize text-[0.5rem] text-gray-700">
              to update bank details, please verify with OTP.
            </p>
          </div>
          <div className=" space-y-2  rounded-md  py-2">
            <div className="flex px-3 py-2  bg-white rounded-md items-center">
              <div className="flex-[3] capitalize font-semibold text-[0.6rem]">
                {" "}
                phone verification
              </div>
              <div className="flex-[1] flex justify-end items-center">
                <input
                  type="radio"
                  name="verification"
                  onChange={() => updateVerificationMethod((prev) => !prev)}
                  checked={phone}
                  value={"phone"}
                  className="size-5"
                  id=""
                />
              </div>
            </div>
            <div className="flex px-3 py-2  bg-white rounded-md items-center">
              <div className="flex-[3] capitalize font-semibold text-[0.6rem]">
                {" "}
                email verification
              </div>
              <div className="flex-[1] flex justify-end items-center">
                <input
                  type="radio"
                  name="verification"
                  onChange={() => updateVerificationMethod((prev) => !prev)}
                  checked={!phone}
                  value={"email"}
                  className="size-5"
                  id=""
                />
              </div>
            </div>
          </div>
          <div className="text-start flex flex-col">
            <span className="uppercase font-regular text-gray-500 text-[0.6rem]">
              Enter the otp you received on
            </span>
            <span className="uppercase font-bold text-xs">+91******9182</span>
          </div>
          <div className="flex space-x-2 flex-row items-center justify-between mx-auto w-full max-w-xs">
            <div className="w-16 h-16 ">
              <input
                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-md border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="w-16 h-16 ">
              <input
                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-md border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="w-16 h-16 ">
              <input
                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-md border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="w-16 h-16 ">
              <input
                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-md border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                type="text"
                name=""
                id=""
              />
            </div>
          </div>
          <div className="flex flex-row pt-2 items-center text-center text-sm font-medium space-x-1 uppercase text-gray-500">
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

          <div className="flex flex-col pt-4">
            <div>
              <button className="flex flex-row items-center justify-center text-center w-full  font-bold tracking-wide text-md rounded-md outline-none py-4 bg-blue-500 border-none text-white text-sm uppercase  shadow-sm">
                edit bank details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
