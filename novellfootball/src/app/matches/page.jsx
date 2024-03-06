"use client";

import Image from "next/image";
import MatchCard2 from "../components/MatchCard2";
import PlaceBet from "../components/PlaceBet";
import Layout from "../components/Layout";
import { useEffect, useState, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../helpers/UserContext";

function Page() {
  const { userBalance, getBalance } = useContext(UserContext);
  const [isPlaceBet, togglePlaceBet] = useState(false);
  const [placeBetData, updatePlaceBetData] = useState({});

  console.log(placeBetData);

  const [matches, updateMatches] = useState([]);
  const [matchLoaded, updateLoaded] = useState(false);

  let [slice_length, updateSliceLength] = useState({
    start: 0,
    end: 10,
  });
  let matches_box = useRef();
  let router = useRouter();

  async function getPlaceBet(bool, data) {
    updatePlaceBetData(data);
    togglePlaceBet(bool);
  }

  async function getLiveMatches() {
    try {
      let res = await fetch(`${window.location.origin}/api/match`);
      if (!res.ok) throw new Error("Error while fetching matches");
      res = await res.json();
      if (res?.status === 200) {
        updateMatches(res?.data?.matches);
      } else {
        throw new Error("Somethign went wrong");
      }
    } catch (error) {
      router.push("/access/login");
    }
  }

  useEffect(() => {
    if (!userBalance) {
      getBalance();
    }
    if (!matchLoaded) {
      getLiveMatches();
      updateLoaded(true);
    }
  }, [matchLoaded]);

  useEffect(() => {
    let box = matches_box.current;
    function handleScroll() {
      if (box.clientHeight + box.scrollTop >= box.scrollHeight - 10) {
        let update_len =
          parseInt(slice_length.end) + 10 > matches.length
            ? Math.abs(parseInt(matches.length - slice_length.end))
            : 10;
        updateSliceLength((prev) => {
          return { ...prev, end: prev.end + update_len };
        });
      }
    }

    box.addEventListener("scroll", handleScroll);
    return () => {
      box.removeEventListener("scroll", handleScroll);
    };
  }, [matches, slice_length]);

  return (
    <Layout>
      <section className="bg-[#f7f8ff] relative h-[100dvh]">
        <div className="relative text-center py-4 h-[8%] ">
          <h2 className=" capitalize text-sm font-bold my-0">matches</h2>
        </div>
        <main className=" space-y-4 grid h-[92%] ">
          {/* search box */}
          <div className="relative px-4  h-full max-h-[4rem] flex items-center ">
            <input
              type="text"
              name=""
              className="text-center px-4 rounded-full py-1.5 outline-none shadow-md
            border-none bg-white w-full"
              placeholder="Search Matches"
              id=""
            />
            <div className="absolute left-4 top-0 h-full flex justify-center items-center aspect-square ">
              <Image
                src="/search.png"
                alt="logo"
                height={25}
                width={25}
              ></Image>
            </div>
          </div>
          <div
            ref={matches_box}
            className="w-full px-4 overflow-y-scroll pb-[5rem] max-h-[100%] space-y-3 "
          >
            {matches.length > 2 &&
              matches
                .slice(0, slice_length.end || 10)
                .map((item, i) => (
                  <MatchCard2
                    key={item.StakeId}
                    index={i}
                    placeBet={getPlaceBet}
                    data={{ ...item }}
                  />
                ))}
            {!!matchLoaded && (
              <div className="text-center w-full text-xl capitalize">
                Loading...
              </div>
            )}


          </div>
        </main>
        {/* popup */}
        {isPlaceBet && (
          <PlaceBet data={placeBetData} togglePopup={togglePlaceBet} />
        )}
      </section>
    </Layout>
  );
}

export default Page;
