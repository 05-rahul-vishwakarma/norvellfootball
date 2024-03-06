import Image from "next/image";
import React from "react";

function Modal() {
  return (
    <section className="absolute top-0 left-0 z-[6] grid place-items-center h-screen w-screen backdrop-blur-xl ">
      <div className="w-[95%] h-[60%] bg-white flex  justify-center place-items-center rounded-[30px] ">
        <div className="flex flex-col place-items-center h-[80%] justify-evenly ">
          <div className="w-[40%] h-[40%]  ">
            <Image src={"/opps.png"} alt="opps" width={50} height={50} className="w-[100%] h-[100%]  "  />
          </div>

          <h1 className=" font-extrabold " >Oops!</h1>

          <div className="w-[50%]  text-center text-[.7rem] text-[#424242] font-[500] ">
            <p>
              Kindly Select Otp verification method for your convenience.
              Thank you
            </p>
          </div>

          <button className=" bg-[#2885f6]  w-[55%] h-[2.5rem] mr-auto ml-auto block  mt-[1rem] rounded-[5px] font-bold text-white  text-[0.8rem] ">
            Done
          </button>
        </div>
      </div>
    </section>
  );
}

export default Modal;
