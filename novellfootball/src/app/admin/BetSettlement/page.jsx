import { connect } from "@/app/modals/dbConfig";
import { BET } from "@/app/modals/modal";
import BetCard from "../adminComponents/Bets/BetCard";
const Page = async () => {
  let data = [];
  data = await getAllBets();

  return (
    <div className="bg-orange-100 pb-8 min-h-screen ">
      <div className="text-center capitalize py-4">
        <h1>bet settlement</h1>
      </div>
      <div className="rounded-xl py-1 mx-auto w-[95%] mt-6 bg-[#ffff]">
        <div className="py-2 px-3">
          <h1 className="font-bold text-sm">UPI/USDT Withdrawal request</h1>
        </div>
        <div
          className=" bg-gray-200 px-2 items-center divide-x-[1.2px]  divide-secondary-400 gap-x-2 sm:text-[0.66rem] text-[0.5rem]
        font-bold grid-cols-9 w-full py-2 grid"
        >
          <div className="col-span-1.5 ">
            <h1>League Id</h1>
          </div>
          <div>
            <h1>First own score</h1>
          </div>
          <div>
            <h1>Second own score</h1>
          </div>
          <div>
            <h1>First result score</h1>
          </div>
          <div className="col-span-1">
            <h1>Second result score</h1>
          </div>
          <div>
            <h1>Status</h1>
          </div>
          <div>
            <h1>T.T. Users</h1>
          </div>
          <div>
            <h1>Edit</h1>
          </div>
          <div>
            <h1>submit</h1>
          </div>
        </div>
        <div className="divide-y-2 divide-gray-300">
          {data.map((ele, idx) => (
            <BetCard key={idx} data={JSON.parse(JSON.stringify(ele))} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;

async function getAllBets() {
  "use server";
  try {
    await connect();
    let data = await BET.aggregate([
      {
        $match: { Status: 0 },
      },
      {
        $group: {
          _id: "$StakeId",
          bet: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: { newRoot: "$bet" },
      },
    ]);
    for (let bet of data) {
      let count = await BET.find({ StakeId: bet?.StakeId }).count();
      data[data.indexOf(bet)]["Count"] = count;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}
