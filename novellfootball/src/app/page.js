import Image from "next/image";
import { FaCirclePlus } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="h-screen ">
      <div className=" h-[10%]   ">
        <div className=" flex justify-between mt-[.5rem] ">
          <div className="flex ml-[.5rem] border-2 border-black h-max w-[30%] place-items-center justify-between py-[.1rem] px-[.2rem] ">
            <span className="flex " >₹<p>100000</p></span>
            <span className="w-[1rem] ">
              <FaCirclePlus />
            </span>
          </div>

          <div className="flex mr-[.5rem] place-items-center ">
            <span className="leading-5 mt-[.5rem] mr-[.3rem] ">
              <h1 className="font-semibold">WELCOME BACK</h1>
              <h3 className="">DARGON</h3>
            </span>
            <span className=" border-2 border-black h-[4rem] w-[4rem] rounded-[100%]  "></span>
          </div>
        </div>
      </div>
    </main>
  );
}
