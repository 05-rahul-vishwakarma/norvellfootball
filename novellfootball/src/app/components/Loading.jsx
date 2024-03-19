import React from "react";
import "@/app/style/loading.css";
import Image from "next/image";
function Loading() {
  return (
    <div className="w-dvw h-dvh absolute top-0 left-0  z-[20] ">
      <div className="w-full h-screen flex flex-col justify-center items-center   ">
        <div className=" h-[25%] relative " >
          <div className="football ">
            <Image src={"/load.png"} alt="loading" width={50} height={50} />
          </div>
          <div className="shadow"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
