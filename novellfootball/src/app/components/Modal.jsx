import Image from "next/image";
import React from "react";

function Modal() {
  return (
    <section className="absolute top-0 left-0 z-[6] grid place-items-center h-screen w-screen backdrop-blur-xl ">
      <div className="w-[65%] h-[40%]  bg-[#ffffff56] flex rounded-[15px] ">
        <div className="flex place-items-center  w-full justify-center relative ">
          <div className="flex flex-col place-items-center justify-around absolute bottom-0 h-[90%]  ">
            <Image src={"/opps.png"} alt="logo" width={70} height={70} />
            <h1 className=" font-extrabold  ">Oops!</h1>
            <p className="w-[95%] text-[.7rem] text-center  ">
              Kindly input accurate and valid data.Thank you for your attention
              to detail.
            </p>
            <button className="border-t-2 border-[#00000033] w-full py-2 text-[#2885F6] font-semibold ">
              Done
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Modal;
