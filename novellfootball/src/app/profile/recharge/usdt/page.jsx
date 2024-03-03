import BackButton from "@/app/components/BackButton";
import React from "react";
import { RiSecurePaymentLine } from "react-icons/ri";
import { IoQrCodeOutline } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa6";

function Page() {
  return (
    <div className="w-screen h-screen bg-[#F8FCFF]  pb-[12rem] overflow-y-scroll  flex flex-col place-items-center  ">
      <div className=" w-screen mt-4 ">
        <BackButton pageName="Usdt" />
      </div>

      <div className="w-[90%] h-full mt-[2rem] ">
        <div className="flex justify-between text-[.6rem] ">
          <p>Secure</p>
          <p className="flex place-items-center ">
            <RiSecurePaymentLine className="mr-1 " /> UniPayment
          </p>
        </div>

        <div
          style={{ boxShadow: "0 5px 10px rgb(0,0,0,0.08)  " }}
          className=" bg-[#fff] mt-2 px-2 rounded-lg py-1 flex justify-between text-[0.6rem] "
        >
          <div className=" ">
            <p className="font-[500] ">
              Order <span># 12334</span>
            </p>
            <p className="font-light text-[gray] ">Norvell</p>
          </div>
          <div>
            <p className="font-[500] ">
              $<span> 12334</span> (USDT)
            </p>
          </div>
        </div>

        <div
          style={{ boxShadow: "0 5px 10px rgb(0,0,0,0.08)  " }}
          className="w-full h-min bg-[#FFF] mt-4  rounded-2xl p-3 "
        >
          <span className="flex place-items-center font-[500] text-[.65rem]  ">
            <IoQrCodeOutline className="mr-1  " /> Scan QR code{" "}
          </span>

          <div className="w-[40vw] h-[20vh] border-2 border-black mr-auto ml-auto my-3 "></div>

          <div className="flex justify-between ">
            <div className="w-[30%] ">
              <span className="text-[rgb(0,0,0,0.5)] text-[.65rem] ">Network</span>
              <button className="border-2 border-[#808080]  py-1 flex place-items-center justify-evenly w-[90%] rounded-md ">
                <IoQrCodeOutline />
                <p className="text-[rgb(0,0,0,0.5)] text-[.65rem] ">TRC20</p>
              </button>
            </div>

            <div className="w-[30%] ">
              <span className="text-[rgb(0,0,0,0.5)] text-[.65rem] ">Coin</span>
              <button className="border-2 border-[#808080]  py-1 flex place-items-center justify-evenly w-[90%] rounded-md ">
                <IoQrCodeOutline />
                <p className="text-[rgb(0,0,0,0.5)] text-[.65rem] ">USDT</p>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 ">
          <p className="font-[500] text-[.7rem] ">Deposit Address</p>
          <div className="flex justify-between bg-transparent border-2 border-[#2885F6] p-2 ">
            <input
              type="text"
              placeholder="Enter Your Deposit Address "
              className="w-[80%] bg-transparent text-[.65rem] "
            />
            <FaRegCopy className="text-[#2885F6] " />
          </div>
        </div>

        <div className="mt-4 ">
          <p className="font-[500] text-[.7rem] ">Transaction Id</p>
          <div className="flex justify-between bg-transparent border-2 border-[#2885F6] p-2 ">
            <input
              type="text"
              placeholder="Enter Your Deposit Address "
              className="w-[80%] bg-transparent text-[.65rem] "
            />
            <FaRegCopy className="text-[#2885F6] " />
          </div>
        </div>

        <div
          style={{ boxShadow: "0 0 5px 0 #c0cad9" }}
          className="bg-[#2885F6] text-center p-3 mt-4 rounded-lg flex justify-center place-items-center text-[#fff] text-[.7rem] "
        >
          Recharge
        </div>
      </div>
    </div>
  );
}

export default Page;
