import React from "react";
import Image from "next/image";
import { FaRegCopy } from "react-icons/fa6";

function Page() {
  return (
    <div className='className="bg-white w-screen h-screen overflow-y-scroll pb-[12rem]'>
      <div className="flex place-items-center w-[90%] mr-auto ml-auto border-b-2 border-[lightgray] mt-2 py-3 px-2 text-[.7rem] ">
        $<p className="ml-1 text-[.65rem] font-semibold ">500</p>
      </div>

      <div className="flex place-items-center w-[90%] mr-auto ml-auto  mt-2 py-3 px-2 justify-between text-[.6rem] ">
        <p>UPI ID</p>
        <span className="text-red-600 flex  w-[50%] justify-around place-items-center ">
          <p className=""> 1234567890@jio</p>
          <FaRegCopy />
        </span>
      </div>

      <div className="h-[35%] mt-3 flex flex-col justify-center place-items-center  text-[.6rem] ">
        <div className="w-[60%] h-[90%] border-2 border-[lightgray] "></div>
        <p className="mt-2 font-[500] text-[#cf4b4b] ">
          have you paid successfully?
        </p>
      </div>

      <div className="mt-2 ">
        <p className="uppercase text-center font-semibold text-[#0000009a] text-[.65rem] ">
          Paytm, phonepe, googlepay, other bank
        </p>
        <div className="grid grid-cols-2 gap-3 w-[90%] mr-auto ml-auto p-2 mt-2  text-[.75rem] ">
          <div className="flex rounded-lg place-items-center  border-2 border-[lightgray] ">
            <div className="h-[3rem] w-[3rem] grid place-items-center  ">
              <Image
                src={"/paytm.png"}
                alt="paytm"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span>Paytm</span>
          </div>

          <div className="flex rounded-lg place-items-center  border-2 border-[lightgray] ">
            <div className="h-[3rem] w-[3rem] grid place-items-center  ">
              <Image
                src={"/GooglePay.svg"}
                alt="paytm"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span>Google pay</span>
          </div>

          <div className="flex rounded-lg place-items-center  border-2 border-[lightgray] ">
            <div className="h-[3rem] w-[3rem] grid place-items-center  ">
              <Image
                src={"/phonePay.svg"}
                alt="paytm"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span>Phonepe</span>
          </div>

          <div className="flex rounded-lg place-items-center  border-2 border-[lightgray] ">
            <div className="h-[3rem] w-[3rem] grid place-items-center  ">
              <Image
                src={"/bhim.png"}
                alt="paytm"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span>Bhim</span>
          </div>
        </div>

        <div className=" flex   w-[90%] mr-auto ml-auto  mt-3 ">
          <p className="grid place-items-center font-semibold  text-[.75rem] ">UTR</p>
          <div className=" flex w-[90%] justify-between ml-1 ">
            <input
              type="number"
              placeholder="Input 12 digits here"
              className="border-2 border-[#8080807a] w-[75%] p-1 outline-none bg-transparent  text-[.75rem] "
            />

            <button className="bg-[#2885F6] text-white  w-[23%]  text-[.65rem] ">
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="w-[90%] mr-auto ml-auto pb-2 ">
        <p className="text-center mt-5 text-red-600 text-xs  ">
          Important reminder: After completing the UPI transaction,please
          backfill Ref No./UTR No./Google Pay : UPI Transaction ID/Freecharge:
          Transaction ID (12digits). If you do not back fill UTR, 100% of the
          deposit transaction will fail. Please be sure to backfill!
        </p>
        <div className="w-[100%] mt-2  ">
          <Image
            src={"/channeltwo.png"}
            alt="paytm"
            width={100}
            height={100}
            className=" w-[100%] h-full object-contain "
          />
        </div>
      </div>

      <div className="h-[1rem] w-full bg-[#e0dfdf] "></div>

      <div className="w-[90%] h-[100%]  mr-auto ml-auto mt-2 ">
        <Image
          src={"/channelTwoInst.png"}
          alt="paytm"
          width={100}
          height={100}
          className="object-contain w-[100%] h-full  "
        />
      </div>
    </div>
  );
}

export default Page;
