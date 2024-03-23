"use client";

import React, { useState, useEffect, Suspense, useContext } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { LiaAngleDownSolid, LiaAngleRightSolid } from "react-icons/lia";
import { LiaRupeeSignSolid } from "react-icons/lia";
import Modal from "@/app/components/Modal";
import { AlertContext } from "@/app/helpers/AlertContext";

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
  let { getAlert } = useContext(AlertContext);
  const [isVisible, setVisible] = useState(false);
  const [isHide, setHide] = useState(true);
  const [amount,setAmount] = useState();





  // immplementing the utr number value
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 12) {
      setValue(inputValue);
    } else if (!inputValue) {
      getAlert("opps", "fill the utr number first");
    } else {
      getAlert("opps", "fill 12 digit values only");
    }
  };

  const submitData = async () => {
    getAlert();
    if (!value || !amount) {
      getAlert("opps", "kindly fill the  form completely");
    } else if (value.length !== 12) {
      getAlert("opps", "fill 12 digit values only");
    } else {
      try {
        let body = {
          TransactionId: value,
          Amount: amount,
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
          getAlert("success", "your deposit is under verification");
        } else if (res?.status === 500 || res?.status === 302) {
          getAlert("redirect", "something went wrong login again");
        } else {
          getAlert("opps", res?.message || "something went wrong login again");
        }
      } catch (error) {
        getAlert("redirect", "something went wrong login again");
      }
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
          <Suspense>
            <RechargeAmount getAmount = {setAmount} />
          </Suspense>
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
          pay <LiaRupeeSignSolid /> <p className=" "></p>
          pay <LiaRupeeSignSolid /> <p className=" "></p>
        </div>

        <div
          style={{ boxShadow: "0 0 5px 0 #c0cad9" }}
          className="bg-white text-center p-3 mt-4 flex justify-center place-items-center text-[#9fa8b8]  text-[.7rem] "
        >
          Payment Failed
        </div>
      </div>

      
    </div>
  );
}

export default Page;

function RechargeAmount({getAmount}) {
  const [receivedAmount, setReceivedAmount] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    let amount = searchParams.get("data");
    if (amount) {
      setReceivedAmount(amount);
      getAmount(amount)
    }
  }, []);

  return (
    <div className="flex  items-center ">
      <LiaRupeeSignSolid />
      <h1 className="text-[.7rem] font-semibold text-[#2888f6] ">
        {receivedAmount}
      </h1>
    </div>
  );
}
