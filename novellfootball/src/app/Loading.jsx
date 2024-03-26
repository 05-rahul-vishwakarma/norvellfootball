import React from "react";
import "@/app/style/loading.css";

import Image from "next/image";
function loading() {
  return (
    <div className="w-dvw h-dvh absolute top-0 left-0  z-[20] ">
      <div className="suport  h-full grid place-items-center ">
        {/* <div className="smash">
          <div className="shadow">
            <div className="rotateimg">
               <Image src={'/load.png'} alt="loading" width={50} height={50} className="w-full h-full " />
            </div>
          </div>
        </div> */}
       <Image src={'/loading.gif'} alt="loading" width={100} height={100} />
      </div>
    </div>
  );
}

export default loading;
