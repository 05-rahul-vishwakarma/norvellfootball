"use client";

import BackButton from "@/app/components/BackButton";
import { TbCoinRupeeFilled } from "react-icons/tb";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Layout from "@/app/components/Layout";

function Page() {
  const router = useRouter();
  return (
    <Layout>
      <div className="h-screen w-screen bg-[#F8FCFF] pb-[7rem] overflow-y-scroll ">
        <div className="h-screen w-screen ">
          <div className="pt-2 ">
            <BackButton pageName="Recharge" />
          </div>

          <div className=" w-[90%] h-[30%] mr-auto ml-auto mt-4  ">
            <Image
              src={"/recharge.png"}
              alt="recharge"
              width={100}
              height={100}
              className="w-full h-full "
            />
          </div>
          <div className="w-[90%]   mr-auto ml-auto my-3  ">
            <p className="text-[.8rem] ">
              Please Select Or Enter The Desired Amount{" "}
            </p>
            <div className=" my-1 flex justify-around place-items-center py-1 ">
              <div
                style={{ boxShadow: "0 10px 10px rgb(0,0,0,0.1)" }}
                className="h-[2.5rem] w-[23%] bg-[#2885F6] text-white text-center text-[0.8rem] grid place-items-center rounded-2xl "
              >
                500
              </div>
              <div
                style={{ boxShadow: "0 10px 10px rgb(0,0,0,0.1)" }}
                className="h-[2.5rem] w-[23%] bg-[#ffffff] text-[#000000] text-[0.8rem] text-center grid place-items-center rounded-2xl "
              >
                1000
              </div>
              <div
                style={{ boxShadow: "0 10px 10px rgb(0,0,0,0.1)" }}
                className="h-[2.5rem] w-[23%] bg-[#ffffff] text-[#000000] text-[0.8rem] text-center grid place-items-center rounded-2xl "
              >
                10000
              </div>
              <div
                style={{ boxShadow: "0 10px 10px rgb(0,0,0,0.1)" }}
                className="h-[2.5rem] w-[23%] bg-[#ffffff] text-[#000000] text-[0.8rem]  text-center grid place-items-center rounded-2xl "
              >
                100000
              </div>
            </div>
            <div>
              <h3>Enter Amount</h3>
              <div
                style={{ boxShadow: "0 4px 10px rgb(0,0,0,.1) " }}
                className="flex border-2 border-[#2785F6] w-[98%] pl-2 mr-auto ml-auto place-items-center my-1 rounded-lg "
              >
                <TbCoinRupeeFilled className="text-3xl text-[#2785F6] " />{" "}
                <input
                  type="number"
                  placeholder="10000"
                  className=" py-2 w-[80%] ml-2 bg-transparent outline-none focus-within "
                />{" "}
              </div>
              <div
                style={{ boxShadow: "0 10px 5px rgb(0,0,0,0.08)" }}
                className="flex justify-between px-2 py-3 place-items-center mt-2 w-[98%] mr-auto ml-auto rounded-lg   "
              >
                <p>Payment link 1</p>
                <input
                  type="radio"
                  name="link"
                  id=""
                  onClick={() =>
                    router.push("/profile/recharge/paymentChannelOne")
                  }
                />
              </div>
              <div
                style={{ boxShadow: "0 10px 5px rgb(0,0,0,0.08)" }}
                className="flex justify-between  px-2 py-3 place-items-center mt-2 w-[98%] mr-auto ml-auto rounded-lg  "
              >
                <p>Payment link 2</p>
                <input
                  type="radio"
                  name="link"
                  id=""
                  onClick={() =>
                    router.push("/profile/recharge/paymentChannelTwo")
                  }
                />
              </div>
              <div
                onClick={() => router.push("/profile/recharge/usdt")}
                style={{ boxShadow: "0 10px 5px rgb(0,0,0,0.08)" }}
                className="flex justify-between px-2 py-3 place-items-center mt-2 w-[98%] mr-auto ml-auto rounded-lg  "
              >
                <p>Usdt</p>
                <input type="radio" name="link" id="" />
              </div>

              <div
                style={{ boxShadow: "0 0 5px 0 #c0cad9" }}
                className="bg-[#2885F6] text-center p-3 mt-[2rem] rounded-lg flex justify-center place-items-center text-[#fff] "
              >
                Recharge
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Page;
