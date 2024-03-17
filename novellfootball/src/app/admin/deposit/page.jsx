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
      <div className="rounded-xl py-1 mx-auto w-[95%] mt-6 bg-[#ffff]">
        <div className="py-2 px-3">
          <h1 className="font-bold text-sm">UPI/USDT Upcomming request</h1>
        </div>
        <div
          className=" bg-gray-200 px-2 items-center divide-x-[1.2px]  divide-secondary-400 gap-x-2 sm:text-[0.66rem] text-[0.5rem]
        font-bold grid-cols-9 w-full py-2 grid"
        >
          <div className="col-span-1.5 ">
            <h1>Referance no.</h1>
          </div>
          <div>
            <h1>Username</h1>
          </div>
          <div>
            <h1>Amount</h1>
          </div>
          <div>
            <h1>Date/Time</h1>
          </div>
          <div className="col-span-1">
            <h1>Pay method</h1>
          </div>
          <div>
            <h1>Status</h1>
          </div>
          <div>
            <h1>Remark</h1>
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
            // <form key={idx} action={update_user}>
            <DepositCard key={idx} data={JSON.parse(JSON.stringify(ele))} />
            // </form>
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
    let data = await TRANSACTION.find({ Type: "deposit" });
    return data;
  } catch (error) {
    console.log(error);
  }
}
