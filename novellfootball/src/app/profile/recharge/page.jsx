"use client";

import BackButton from "@/app/components/BackButton";
import { TbCoinRupeeFilled } from "react-icons/tb";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Layout from "@/app/components/Layout";
import Modal from "@/app/components/Modal";
import { useContext } from "react";
import { AlertContext } from "@/app/helpers/AlertContext";

function Page() {


  //--------------------------------- popup handler ------------------------------------//
  const { getAlert } = useContext(AlertContext);

  const router = useRouter();

  // change the value of input box whenever user click any div
  const [inputValue, setInputValue] = useState("");

  const handleDivClick = (value) => {
    if (value) {
      setInputValue(value);
    }
  };

  const [selectedDiv, setSelectedDiv] = useState(null);
  const chnageBgColor = (divNumber) => {
    setSelectedDiv(divNumber);
  };

  // implementing condtion based redireacting
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleRedirect = () => {
    if (!inputValue) {

      getAlert("opps", "please enter the deposit amount");
    } else {
      if (selectedOption === "option1") {
        router.push(
          `/profile/recharge/paymentChannelOne?data=${encodeURIComponent(
            inputValue
          )}`
        );
      } else if (selectedOption === "option2") {
        router.push(
          `/profile/recharge/paymentChannelTwo?data=${encodeURIComponent(
            inputValue
          )}`
        );
      } else if (selectedOption === "option3") {
        router.push(
          `/profile/recharge/usdt?data=${encodeURIComponent(inputValue)}`
        );
      } else if (selectedOption === "") {
        getAlert("opps", "please choose any one payment method");
      }
    }
  };

  return (
    <Layout>
      <div className="h-screen w-screen bg-[#F8FCFF] pb-[7rem] overflow-y-scroll ">
        <div className="h-screen w-screen ">
          <div onClick={() => router.back()} className="pt-2 ">
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
            <p className="text-[.7rem] ">
              Please Select Or Enter The Desired Amount{" "}
            </p>

            <div className=" my-1 flex justify-around place-items-center py-1 text-xs ">
              <div
                onClick={() =>
                  handleDivClick(document.getElementById("div1").innerText) ||
                  chnageBgColor(1)
                }
                style={{
                  boxShadow: "0 2px 4px rgb(0,0,0,0.05)",
                  backgroundColor: selectedDiv === 1 ? "#2885F6" : "white",
                  color: selectedDiv === 1 ? "white" : "black",
                }}
                className="h-[2.2rem] w-[23%] bg-[#2885F6] text-white text-center  grid place-items-center rounded-2xl "
                id="div1"
              >
                500
              </div>

              <div
                onClick={() =>
                  handleDivClick(document.getElementById("div2").innerText) ||
                  chnageBgColor(2)
                }
                style={{
                  boxShadow: "0 2px 4px rgb(0,0,0,0.05)",
                  backgroundColor: selectedDiv === 2 ? "#2885F6" : "white",
                  color: selectedDiv === 2 ? "white" : "black",
                }}
                className="h-[2.2rem] w-[23%] bg-[#ffffff] text-[#000000]  text-center grid place-items-center rounded-2xl "
                id="div2"
              >
                1000
              </div>

              <div
                onClick={() =>
                  handleDivClick(document.getElementById("div3").innerText) ||
                  chnageBgColor(3)
                }
                style={{
                  boxShadow: "0 2px 4px rgb(0,0,0,0.05)",
                  backgroundColor: selectedDiv === 3 ? "#2885F6" : "white",
                  color: selectedDiv === 3 ? "white" : "black",
                }}
                id="div3"
                className="h-[2.2rem] w-[23%] bg-[#ffffff] text-[#000000]  text-center grid place-items-center rounded-2xl "
              >
                10000
              </div>

              <div
                onClick={() =>
                  handleDivClick(document.getElementById("div4").innerText) ||
                  chnageBgColor(4)
                }
                style={{
                  boxShadow: "0 2px 4px rgb(0,0,0,0.05)",
                  backgroundColor: selectedDiv === 4 ? "#2885F6" : "white",
                  color: selectedDiv === 4 ? "white" : "black",
                }}
                className="h-[2.2rem] w-[23%] bg-[#ffffff] text-[#000000]   text-center grid place-items-center rounded-2xl "
                id="div4"
              >
                100000
              </div>
            </div>

            <div>
              <h3 className="text-[.75rem] ">Enter Amount</h3>
              <div
                style={{ boxShadow: "0 2px 5px rgb(0,0,0,.06) " }}
                className="flex border-2 border-[#2785F6] w-[98%] pl-2 mr-auto ml-auto place-items-center my-1 rounded-lg "
              >
                <TbCoinRupeeFilled className="text-[1.5rem] text-[#2785F6] " />{" "}
                <input
                  placeholder="10000"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className=" py-2 w-[80%] ml-2 bg-transparent outline-none focus-within text-[.65rem] "
                />{" "}
              </div>
              <div
                style={{ boxShadow: "0 2px 5px rgb(0,0,0,0.06)" }}
                className="flex justify-between px-2 py-3 place-items-center mt-2 w-[98%] mr-auto ml-auto rounded-lg   "
              >
                <p className="text-[0.7rem] ">Payment link 1</p>
                <input
                  type="radio"
                  name="link"
                  id=""
                  value="option1"
                  checked={selectedOption === "option1"}
                  onChange={handleOptionChange}
                />
              </div>
              <div
                style={{ boxShadow: "0 2px 5px rgb(0,0,0,0.06)" }}
                className="flex justify-between  px-2 py-3 place-items-center mt-2 w-[98%] mr-auto ml-auto rounded-lg  "
              >
                <p className="text-[0.7rem] ">Payment link 2</p>
                <input
                  type="radio"
                  name="link"
                  id=""
                  value="option2"
                  checked={selectedOption === "option2"}
                  onChange={handleOptionChange}
                />
              </div>
              <div
                style={{ boxShadow: "0 2px 5px rgb(0,0,0,0.06)" }}
                className="flex justify-between px-2 py-3 place-items-center mt-2 w-[98%] mr-auto ml-auto rounded-lg  "
              >
                <p className="text-[0.7rem] ">Usdt</p>
                <input
                  type="radio"
                  name="link"
                  id=""
                  value="option3"
                  checked={selectedOption === "option3"}
                  onChange={handleOptionChange}
                />
              </div>

              <div
                onClick={handleRedirect}
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
