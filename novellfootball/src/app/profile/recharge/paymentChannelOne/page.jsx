"use client";

import { TbCoinRupeeFilled } from "react-icons/tb";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LiaRupeeSignSolid } from "react-icons/lia";

import { LiaAngleDownSolid, LiaAngleRightSolid } from "react-icons/lia";
import { IoIosArrowDropup } from "react-icons/io";
import Modal from "@/app/components/Modal";
import { useSearchParams } from "next/navigation";

const accorodient = {
  show: {
    height: "18vh",
    opacity: 1,
    duration: 1,
  },
  hide: {
    height: "0rem",
    opacity: 0,
    duration: 0,
  },
};

function Page() {



  // Popup handling here //
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [opps, setopps] = useState("Opps!");
  const [statusImage, setStatusImage] = useState("/success.png");

  const handleCloseErrorPopup = () => {
    setModalOpen(false);
  };

  const [isVisible, setVisible] = useState(false);
  const [isHide, setHide] = useState(true);

  const router = useRouter();

  const [receivedData, setReceivedData] = useState("");
  const searchParams = useSearchParams()
  useEffect(() => {
    const search = searchParams.get('data')
    setReceivedData(search)

  }, [searchParams]);

  // immplementing the utr number value
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 12) {
      setValue(inputValue);
    } else if (!inputValue) {
      setStatusImage("/opps.png");
      setopps("Opps!");
      setModalMessage("Kindly input utr number");
      setModalOpen(true);
    } else {
      setStatusImage("/opps.png");
      setopps("Opps!");
      setModalMessage("Please fill only 12 digits numbers");
      setModalOpen(true);
    }
  };

  const submitData = async () => {
    if (!value || !receivedData) {
      setStatusImage("/opps.png");
      setopps("Opps!");
      setModalMessage("Kindly input utr number");
      setModalOpen(true);
    } else if (value.length !== 12) {
      setStatusImage("/opps.png");
      setopps("Opps!");
      setModalMessage("UTR number should have 12 digitis");
      setModalOpen(true);
    } else {
      try {
        let body = {
          utrNumber: value,
          Amount: receivedData,
          Channel: 1,
        };
        let config = {
          method: "POST",
          headers: {
            "content-type": "applicaiton/json",
          },
          body: JSON.stringify(body),
        };

        let res = await fetch("/api/payment/deposit", config);
        res = await res.json();
        if (res?.status === 200) {
          setStatusImage("/opps.png");
          setopps("Pending");
          setModalMessage(res.message);
          setModalOpen(true);
        } else {
          setStatusImage("/opps.png");
          setopps("Pending");
          setModalMessage(res.message);
          setModalOpen(true);
        }
      } catch (error) {}
    }
  };

  return (
    <div className="bg-white w-full h-full  flex justify-center overflow-y-scroll pb-[12rem] ">
      <div className="w-[90%]  h-full flex flex-col  ">
        <div
          style={{
            boxShadow: "0 0 4px 0 #c0cad9",
          }}
          className="border-2 border-white shadow-md my-[2rem] w-[100%] py-3 flex  justify-center place-items-center flex-col rounded-lg "
        >
          <h1 className="flex place-items-center">
            <LiaRupeeSignSolid />{" "}
            <p className="text-[.6rem] text-[#0000ffce] font-bold ">
              {" "}
              {receivedData}{" "}
            </p>
          </h1>
          <p className="text-[.6rem] ">Payment Amount</p>
        </div>

        <div
          style={{
            boxShadow: "0 0 5px 0 #c0cad9",
          }}
          className=" py-2 grid place-items-center text-[.7rem] "
        >
          <div
            className=" border-b-2 border-[#d3cccc52] 
         h-[3rem] flex justify-between place-items-center w-[95%] mr-auto ml-auto my-1  "
          >
            <div className="flex justify-center place-items-center ">
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
            <div className="mr-1rem ">
              <input type="radio" name="payment" id="" />
            </div>
          </div>

          <div
            className="border-b-2 border-[#d3cccc52] pb-2
          h-[3rem] flex justify-between place-items-center w-[95%] mr-auto ml-auto my-1 "
          >
            <div className="flex justify-center place-items-center ">
              <div className="h-[3rem] w-[3rem] grid place-items-center  ">
                <Image
                  src={"/phonePay.svg"}
                  alt="paytm"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span>Phone pay</span>
            </div>
            <div className="mr-1rem ">
              <input type="radio" name="payment" id="" />
            </div>
          </div>

          <div
            className=" border-b-2 border-[#d3cccc52] pb-2
          h-[3rem] flex justify-between place-items-center w-[95%] mr-auto ml-auto my-1 "
          >
            <div className="flex justify-center place-items-center ">
              <div className="h-[3rem] w-[3rem] grid place-items-center  ">
                <Image
                  src={"/Mobikwik.svg"}
                  alt="mobi"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span>Mobikwik</span>
            </div>
            <div className="mr-1rem ">
              <input type="radio" name="payment" id="" />
            </div>
          </div>

          <div
            className=" border-b-2 border-[#d3cccc52] pb-2
         h-[3rem] flex justify-between place-items-center w-[95%] mr-auto ml-auto my-1 "
          >
            <div className="flex justify-center place-items-center ">
              <div className="h-[3rem] w-[3rem] grid place-items-center  ">
                <Image
                  src={"/GooglePay.svg"}
                  alt="google"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span>Google pay</span>
            </div>
            <div className="mr-1rem ">
              <input type="radio" name="payment" id="" />
            </div>
          </div>

          <div
            className="
         h-[3rem] flex justify-between place-items-center w-[95%] mr-auto ml-auto pb-1 "
          >
            <div className="flex justify-center place-items-center ">
              <div className="h-[3rem] w-[3rem] grid place-items-center  ">
                <Image
                  src={"/Upi.svg"}
                  alt="svg"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span>Upi</span>
            </div>
            <div className="mr-1rem ">
              <input type="radio" name="payment" id="" />
            </div>
          </div>
        </div>

        <div
          style={{ boxShadow: "0 0 4px 0 #c0cad9" }}
          className="mt-3 py-2 font-[600] rounded-xl bg-[#fff] text-[0.7rem] "
        >
          <div className="flex justify-between place-items-center px-3 ">
            <p>Click to show QRcode</p>
            <span
              onClick={() => setVisible(!isVisible) || setHide(!isHide)}
              className="h-full rounded-full bg-gray-300 text-black p-1"
            >
              {isVisible ? <LiaAngleRightSolid /> : <LiaAngleDownSolid />}
            </span>
          </div>
          <div>
            <motion.p
              variants={accorodient}
              animate={isVisible ? "show" : "hide"}
              transition={{ duration: 0.5 }}
              className="text-[#00000091] h-[18vh] text-[0.6rem] overflow-scroll  flex flex-col  justify-center place-items-center px-4 relative  "
            >
              <Image
                src={"/logo.png"}
                alt="barCode"
                height={80}
                width={80}
                className="object-contain "
              />
              <span className="text-[#992626] absolute bottom-0 font-bold   ">
                ONE QR CODE FOR THE SINGLE PAYMENT ONLY
              </span>
            </motion.p>
          </div>
        </div>

        <div
          style={{ boxShadow: "0 0 5px 0 #c0cad9" }}
          className="bg-[white] mt-4 flex place-items-center border-2 border-[#2885F6] "
        >
          <p className="w-[20%] text-center bg-[#2885F6] text-white py-2  text-[.8rem] font-semibold focus-wit  ">
            UTR
          </p>
          <input
            type="number"
            value={value}
            onChange={handleChange}
            placeholder="Enter the utr number"
            className="w-[80%] outline-none  bg-[white] pl-3 text-[.7rem] "
          />
        </div>

        <div
          onClick={() => submitData()}
          style={{ boxShadow: "0 0 5px 0 #c0cad9" }}
          className="bg-[#9fa8b8] text-center p-3 mt-4 flex justify-center place-items-center text-white  text-[.7rem] "
        >
          pay <LiaRupeeSignSolid /> <p className=" ">{receivedData}</p>
        </div>

        <div
          style={{ boxShadow: "0 0 5px 0 #c0cad9" }}
          className="bg-white text-center p-3 mt-4 flex justify-center place-items-center text-[#9fa8b8]  text-[.7rem] "
        >
          Payment Failed
        </div>
      </div>

      {modalOpen && (
        <Modal
          message={modalMessage}
          statusImage={statusImage}
          status={opps}
          onClose={handleCloseErrorPopup}
        />
      )}
    </div>
  );
}

export default Page;
