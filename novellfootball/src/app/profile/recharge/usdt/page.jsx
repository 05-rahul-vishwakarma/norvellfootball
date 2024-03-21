"use client";
import BackButton from "@/app/components/BackButton";
import React, { useState, useEffect, Suspense } from "react";
import { RiSecurePaymentLine } from "react-icons/ri";
import { IoQrCodeOutline } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Modal from "@/app/components/Modal";
import { useSearchParams } from "next/navigation";

function Page() {
  // Popup handling here //
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [opps, setopps] = useState("Opps!");
  const [statusImage, setStatusImage] = useState("/success.png");

  const handleCloseErrorPopup = () => {
    setModalOpen(false);
  };

  const router = useRouter();

  // implementing the function which copies the address value //
  const [text, setText] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [copied, setCopied] = useState(false);
  const [details, setDetails] = useState();

  const copyAddress = async () => {
    if (text.trim() === "") {
      alert("Please enter some text to copy");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      alert("copied");
      return true; // Return true if successful
    } catch (error) {
      alert("something went wrong");
      return false; // Return false if failed
    }
  };

  const copyTransactionId = async () => {
    if (transactionId.trim() === "") {
      alert("Please enter some text to copy");
      return;
    }
    try {
      await navigator.clipboard.writeText(transactionId);
      alert("copied");
      return true; // Return true if successful
    } catch (error) {
      alert("something went wrong");
      return false; // Return false if failed
    }
  };

  async function usdtDetails() {
    let depositAddress;
    let transId, usdtAmount;
    if (!transactionId || !text || !receivedData) {
      setStatusImage("/opps.png");
      setopps("Opps!");
      setModalMessage("Please fill the details");
      setModalOpen(true);
    } else {
      depositAddress = text;
      transId = transactionId;
      usdtAmount = receivedData;

      try {
        let body = {
          TransactionId: transId,
          Amount: usdtAmount,
          Channel: 3,
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
        } else if (res?.status === 500) {
          setStatusImage("/opps.png");
          setopps("Opps!");
          setModalMessage(res.message);
          setModalOpen(true);
        }
      } catch (error) {}
    }
  }

  return (
    <div className="w-screen h-screen bg-[#F8FCFF]  pb-[12rem] overflow-y-scroll  flex flex-col place-items-center  ">
      <div onClick={() => router.back()} className=" w-screen mt-4 ">
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
            <Suspense>
              {" "}
              <RechargeAmount />{" "}
            </Suspense>
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
              <span className="text-[rgb(0,0,0,0.5)] text-[.65rem] ">
                Network
              </span>
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
              placeholder="Enter Your Deposit Address"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-[80%] bg-transparent text-[.65rem] "
            />
            <FaRegCopy
              onClick={() => copyAddress()}
              className="text-[#2885F6] "
            />
          </div>
        </div>

        <div className="mt-4 ">
          <p className="font-[500] text-[.7rem] ">Transaction Id</p>
          <div className="flex justify-between bg-transparent border-2 border-[#2885F6] p-2 ">
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter Your Deposit Address "
              className="w-[80%] bg-transparent text-[.65rem] "
            />
            <FaRegCopy
              onClick={() => copyTransactionId()}
              className="text-[#2885F6] "
            />
          </div>
        </div>

        <div
          onClick={() => usdtDetails()}
          style={{ boxShadow: "0 0 5px 0 #c0cad9" }}
          className="bg-[#2885F6] text-center p-3 mt-4 rounded-lg flex justify-center place-items-center text-[#fff] text-[.7rem] "
        >
          Recharge
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

function RechargeAmount() {
  const [receivedAmount, setReceivedAmount] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    let amount = searchParams.get("data");
    if (amount) {
      setReceivedAmount(amount);
    }
  }, []);

  // implementing the function which converts indian rupees value into usdt values
  const [usdt, SetUsdt] = useState("");
  function usdtConvertor() {
    let usdtValue = (receivedAmount / 80).toFixed(2);
    SetUsdt(usdtValue);
  }

  useEffect(() => {
    usdtConvertor();
  });

  return (
    <div className="flex  items-center ">
      <p className="ml-1 text-[.65rem] font-[500]"> ${usdt} </p>
      <p className="ml-1 text-[.65rem] font-[500]">(USDT)</p>
    </div>
  );
}
