import { connect } from "@/app/modals/dbConfig";
import { TRANSACTION } from "@/app/modals/modal";
import DepositCard from "../adminComponents/Deposit/DepositCard";

const Page = async () => {
  let data = [];
  data = await getAllTransactions();

  return (
    <div className="bg-green-100 pb-8 min-h-screen ">
      <div className="text-center py-4">
        <h1>Deposit</h1>
      </div>
      <div className="rounded-xl min-h-screen max-h-screen overflow-scroll  py-1 mx-auto w-[95%] mt-6 bg-[#ffff]">
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
