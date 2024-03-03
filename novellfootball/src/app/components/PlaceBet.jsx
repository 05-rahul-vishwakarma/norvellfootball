"use client";
// this component is used when the user try's to place a bet by clicking on matchCard2 -> this popup
// this popup will allow users to select the score to bet on.
import { easeInOut, motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa";
import { useRouter } from "next/navigation";

const PlaceBet = ({ data, togglePopup }) => {
  const [Team_a_logo, updateSrcTeam_a] = useState();
  const [Team_b_logo, updateSrcTeam_b] = useState();
  const [credentials, updateCredentials] = useState({
    confPassword: "",
    Password: "",
  });

  const [scoreData, updateData] = useState([
    { score: "0-0", selected: false },
    { score: "0-1", selected: false },
    { score: "0-2", selected: false },
    { score: "0-3", selected: false },
    { score: "1-0", selected: false },
    { score: "1-1", selected: false },
    { score: "1-2", selected: false },
    { score: "1-3", selected: false },
    { score: "2-0", selected: false },
    { score: "2-1", selected: false },
    { score: "2-2", selected: false },
    { score: "2-3", selected: false },
    { score: "3-0", selected: false },
    { score: "3-1", selected: false },
    { score: "3-2", selected: false },
    { score: "3-3", selected: false },
    { score: "4-4", selected: false },
  ]);
  let router = useRouter();

  function setActive(idx) {
    let newData = JSON.parse(JSON.stringify(scoreData));
    newData.forEach((element, i) => {
      idx === i ? (element.selected = true) : (element.selected = false);
    });
    updateData(newData);
  }
  function setDeactivated() {
    updateData((prev) => {
      return prev.map((ele) => ({ ...ele, selected: false }));
    });
  }

  function update(e) {
    updateCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function placeBet(Percentage, score, BetAmount) {
    try {
      let [Score_a, Score_b] = score.split("-");
      let body = {
        ...data,
        BetAmount,
        Percentage,
        Score_a,
        Score_b,
      };
      let config = {
        method: "POST",
        headers: {
          "content-type": "applicaiton/json",
        },
        body: JSON.stringify(body),
      };
      let res = await fetch(`${window.location.origin}/api/match`, config);
      res = await res.json();
      if (res?.status === 200) {
        alert("bet placed");
      } else if (res?.status === 500 || res?.status === 302) {
        router.push("/access/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    updateSrcTeam_a(data?.Team_a_logo);
    updateSrcTeam_b(data?.Team_b_logo);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full absolute  top-0 left-0 flex justify-center items-end bg-black/70 w-full"
    >
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className=" h-[85%] py-8 pb-12  bg-slate-100 overflow-y-auto rounded-t-[2rem] w-[98%]"
      >
        <div className="flex  relative px-2  justify-center">
          <h4 className="border-2 border-solid border-blue-700 min-w-[20%] rounded-full"></h4>
          <p
            className="absolute left-2 text-sm font-bold mt-[-1rem] p-2"
            onClick={() => togglePopup(false)}
          >
            &lt; Back
          </p>
        </div>

        <div className=" px-6 mt-8 text-white">
          <div
            style={{
              background: "url(./betplace.png)",
              backgroundSize: "cover",
            }}
            className="rounded-2xl relative pt-4  h-full  text-center  w-full"
          >
            <h2 className="capitalize text-sm font-bold truncate text-white">
              {data?.LeagueName || "No league available"}
            </h2>
            <div className="w-full mt-3 flex px-2">
              <div className="flex-[2] flex-col flex w-full items-center h-full ">
                <span className="h-[60px] flex justify-center items-center w-[60px] rounded-full relative ">
                  <Image
                    src={Team_a_logo || "/search.png"}
                    onError={(e) => updateSrcTeam_b(null)}
                    height={38}
                    width={38}
                    alt="team a  logo"
                  />
                </span>
                <span className="line-clamp-2 w-[80%] text-xs capitalize font-bold">
                  {data?.Team_a || "team a unavailable"}
                </span>
              </div>
              <div className="flex-[1] flex items-center justify-center flex-col">
                <span className="text-xl block font-bold text-red-600">
                  23:40
                </span>
                <span className="uppercase text-sm font-bold">27 FEB</span>
              </div>
              <div className="flex-[2] flex-col flex w-full items-center h-full ">
                <span className="h-[60px] flex justify-center items-center w-[60px] rounded-full relative ">
                  <Image
                    src={Team_b_logo || "/search.png"}
                    onError={(e) => updateSrcTeam_b(null)}
                    height={38}
                    width={38}
                    alt="team b  logo"
                  />
                </span>
                <span className="line-clamp-2 w-[80%] text-xs capitalize font-bold">
                  {data?.Team_b || "Team b unavailable"}
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <div className="rounded-t-xl bg-red-600 px-3 py-1 h-full">
                <h2 className="capitalize font-bold text-sm text-white">
                  full-time
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5">
          <h2 className="text-[0.7rem] mt-3 font-semibold text-slate-500">
            Please choose a match score to place your stake.
          </h2>
        </div>

        <div className="mt-3 px-4 pb-40 space-y-4">
          {/* score cards */}
          {scoreData.map((item, i) => (
            <ScoreCards
              cardDetails={{ ...item, idx: i }}
              setActive={setActive}
              setDeactivated={setDeactivated}
              key={i}
              placeBet={placeBet}
              percent={data?.Percents[i]}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PlaceBet;

function ScoreCards({
  percent,
  cardDetails,
  setActive,
  setDeactivated,
  placeBet,
}) {
  const [estimatedIncome, updateEstimated] = useState(0);
  const [betAmount, updateBetAmount] = useState(0);

  function updateAmount(e) {
    updateBetAmount(e?.target?.value || "");
    updateEstimated(() => {
      let estimated = (
        (Number(e?.target?.value) / 100) *
        Number(percent)
      ).toFixed(2);
      return Math.abs(
        Number(estimated) - (Number(estimated) / 100) * 5
      ).toFixed(2);
    });
  }

  return (
    <div>
      <div
        style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
        className="rounded-xl bg-[#fff] space-x-2 grid text-xs font-bold py-2 px-2 shadow-md"
      >
        <span className="flex items-center justify-center">
          Score <h2 className="ml-1 text-red-500 ">{cardDetails.score}</h2>
        </span>
        <span className="flex items-center">
          Odds percentage -<h2 className="ml-1 text-green-400">{percent}</h2>
          <h2 className="text-green-400">%</h2>
        </span>
        <span
          onClick={() =>
            cardDetails.selected ? setDeactivated() : setActive(cardDetails.idx)
          }
          className={`h-full w-[90%] py-1 px-1 text-center text-[0.6rem] rounded-md ${
            cardDetails.selected ? " bg-gray-600 " : " bg-blue-600 "
          }  text-white justify-center`}
        >
          Place stake
        </span>
      </div>
      {/* settlement */}
      {cardDetails.selected && (
        <motion.div
          initial={{ opacity: 0, y: -50, transitionDuration: 0.5 }}
          animate={{ transition: easeInOut, y: 0, opacity: 1 }}
          className="space-y-4 mt-3 px-2"
        >
          <div className="flex justify-between ">
            <span className=" text-[0.65rem] text-gray-600 font-bold">
              Handling fee 5%
            </span>
            <div className=" rounded-full py-0.5 ring-1 ring-gray-600/30 px-1 w-fit bg-white space-x-1 flex justify-center items-center">
              <div className="flex pl-1 justify-center items-center h-[90%] space-x-1">
                <span
                  className=" h-full aspect-square rounded-full text-white 
             bg-blue-700 flex text-[0.5rem] justify-center items-center"
                >
                  <FaRupeeSign />
                </span>

                <span className="text-xs font-bold pr-3">109230</span>
              </div>
              <span className="h-[90%] font-bolder text-white aspect-square rounded-full bg-blue-700 flex justify-center items-center">
                <IoIosAdd />
              </span>
            </div>
          </div>
          <div className="grid px-0 ">
            <span className="grid grid-cols-2">
              <h2 className="text-[0.65rem]  font-bold capitalize ">
                stake amount
              </h2>
              <h2 className="text-[0.65rem] pl-1 font-bold capitalize ">
                estimated amount
              </h2>
            </span>
            <div
              className="flex ring-2 px-1 ring-blue-600
           mt-1 py-1 rounded-md items-center"
            >
              <div className="flex pl-1 space-x-1 max-w-[50%] min-w-[50%]  items-center h-[90%]">
                <span
                  className=" h-[80%] aspect-square rounded-full text-white 
             bg-blue-600 flex text-[0.65rem] justify-center items-center"
                >
                  <FaRupeeSign />
                </span>
                <input
                  type="number"
                  className="focus:outline-none h-8 w-[80%] border-none bg-transparent outline-none "
                  placeholder="Add"
                  name=""
                  onChange={updateAmount}
                  value={betAmount}
                  id=""
                />
              </div>
              <div className="flex pl-1 min-w-[50%] space-x-2  items-center h-[90%] ">
                <span
                  className=" h-[80%] aspect-square rounded-full text-white 
             bg-green-400 text-[0.65rem] flex justify-center items-center"
                >
                  <FaRupeeSign />
                </span>

                <span className="text-xs font-bold text-green-500 pr-3">
                  {estimatedIncome || 0}
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="py-2 px-1 font-bold w-[30%] text-sm text-white rounded-md capitalize bg-gray-900">
              all amount
            </button>
            <button
              onClick={() => placeBet(percent, cardDetails?.score, betAmount)}
              className="py-2 px-2 w-[70%] bg-blue-600 font-bold text-sm text-white rounded-md capitalize"
            >
              confirm
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// this function will return a boolean value wether the match is valid according to time or not;

function isValidMatch(inputDateString) {
  // Convert the input date string to a Date object in the "Asia/Calcutta" timezone
  const inputDate = new Date(inputDateString);
  inputDate.setTime(
    inputDate.getTime() + inputDate.getTimezoneOffset() * 60000
  );
  inputDate.setTime(inputDate.getTime() + 330 * 60000);

  // Get the current time in the "Asia/Calcutta" timezone
  const now = new Date();
  now.setTime(now.getTime() + now.getTimezoneOffset() * 60000);
  now.setTime(now.getTime() + 330 * 60000);

  // Calculate the difference between the input date and the current time in minutes
  const diffInMinutes = (inputDate - now) / 60000;

  // Check if the difference is less than 5 minutes
  if (Math.abs(diffInMinutes) < 5) {
    return false;
  } else {
    return true;
  }
}
