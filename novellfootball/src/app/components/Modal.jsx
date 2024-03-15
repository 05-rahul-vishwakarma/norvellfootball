import Image from "next/image";
import React from "react";

function Modal({ message, onClose ,status ,statusImage}) {
  return (
    <section
      // isOpen={isOpen}
      // onRequestClose={onClose}
      className="fixed top-0 left-0 z-[6] grid place-items-center h-screen w-screen backdrop-blur-xl "
    >
      <div className="w-[65%] h-[40%]  bg-[#ffffffa2] flex rounded-[15px] ">
        <div className="flex place-items-center  w-full justify-center relative ">
          <div className="flex flex-col place-items-center justify-around  h-[65%]   ">
            <Image src={statusImage} alt="logo" width={70} height={70} />
            <h1 className=" font-extrabold  ">{status}</h1>
            <p className="w-[95%] text-[.7rem] text-center  ">{message}</p>
          </div>

          <button
            onClick={onClose}
            className="border-t-2 border-[#00000033] absolute bottom-0 w-full py-2 text-[#2885F6] font-semibold "
          >
            Done
          </button>
        </div>
      </div>
    </section>
  );
}

export default Modal;
