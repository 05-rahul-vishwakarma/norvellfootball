import Image from "next/image";
import { FaCirclePlus } from "react-icons/fa6";
import logo from "../../public/logo.png";
import MatchCard from "./components/MatchCard";
import BetPlaced from "./components/BetPlaced";

export default function Home() {
  return (
// <<<<<<< HEAD
    <main className="h-screen bg-[url('../../public/home.png')] bg-no-repeat bg-cover bg-center  overflow-y-hidden ">
      <div className=" h-[10%]  pt-[.5rem] ">
        <div className=" flex justify-between px-[.2rem] py-[.1rem] ml-[.5rem] ">
          <div>
            <div
              className=" flex place-items-center justify-between px-[.3rem] py-[.1rem] rounded-[100px]"
              style={{ background: "#f8fcff" }}
            >
              <span className="flex">
                ₹ <p>100000</p>
              </span>
              <FaCirclePlus
                style={{
                  color: "#2785f6",
                }}
              />
            </div>

            <h1 className=" mt-[.5rem] font-extrabold text-[1.2rem] text-white ">
              TOP EVENTS
            </h1>
          </div>

          <div className="flex mr-[.5rem] place-items-center ">
            <span className="leading-5 mt-[.5rem] mr-[.3rem] ">
              <h1 className="font-semibold text-white ">WELCOME BACK</h1>
              <h3 className=" text-white text-end ">DARGON</h3>
            </span>
            <span
              className="h-[4rem] w-[4rem] rounded-[100%] "
              style={{ background: "#f8fcff" }}
            >
              <Image src={logo} alt="logo" width={100} height={100} />
            </span>
          </div>
        </div>
      </div>

      <div className="border-2 border-black h-[30%] mt-[1rem] w-[95%] mr-auto ml-auto "></div>

      <div
        className="h-[55%] mt-[2rem] rounded-t-[30px] bg-#f8fcff shadow-2xl shadow-black"
        style={{
          background: "#f8fcff",
        }}
      >
        <div className="h-[70px] rounded-t-[30px] flex flex-col justify-around  ">
          <div
            className="w-[70px] h-[5px]  mr-auto ml-auto rounded-2xl "
            style={{
              background: "#2785f6",
            }}
          ></div>
          <div className="flex  justify-between  ">
            <h1 className="ml-[.5rem] font-bold ">Hot Matches</h1>
            <h1 className="flex mr-[.5rem] text-[.8rem] ">
              Online Users : <p>10000000</p>{" "}
            </h1>
          </div>
        </div>
        <div className=" overflow-y-scroll h-[80%] pb-[6rem] ">
          <MatchCard />
          <MatchCard />
          <MatchCard />
          <MatchCard />
          <MatchCard />
        </div>
      </div>

      <BetPlaced />
    </main>
  )
}
