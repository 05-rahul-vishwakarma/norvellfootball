import { connect } from "@/app/modals/dbConfig";
import { TRANSACTION } from "@/app/modals/modal";
import DepositCard from "../adminComponents/Deposit/DepositCard";
import { FaSearch } from "react-icons/fa";

const Page = async () => {
  let data = [];
  data = await getAllTransactions();

  return (
    <div className="bg-green-100 pb-8  ">
      <div className="text-center py-4">
        <h1>Deposit</h1>
      </div>
      <div className="my-2 w-[95%] text-[0.66rem] relative mx-auto bg-white rounded-md p-2">
        <input
          type="text"
          placeholder="Enter referance no."
          className="w-full"
        />
        <FaSearch
          className="absolute top-1/2 text-xl -translate-y-1/2 right-3 "
          color="skyblue"
        />
      </div>
      <div className="rounded-xl py-1 mx-auto w-[95%] mt-6 bg-[#ffff]">
        <div className="py-2 px-3">
          <h1 className="font-bold text-sm">UPI/USDT Upcomming request</h1>
        </div>
        {/* boxes */}
        <div className="space-y-3 px-1.5">
          {(data || []).map((ele, idx) => (
            <DepositCard
              key={idx}
              idx={idx}
              data={JSON.parse(JSON.stringify(ele))}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;

async function getAllTransactions() {
  "use server";
  try {
    await connect();
    let data = await TRANSACTION.find({ Type: "deposit" }).sort({
      createdAt: -1,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
