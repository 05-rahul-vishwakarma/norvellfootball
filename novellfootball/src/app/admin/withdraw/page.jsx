import { connect } from "@/app/modals/dbConfig";
import { TRANSACTION } from "@/app/modals/modal";
import WithdrawCard from "../adminComponents/Withdrawal/WithdrawalCard";
import Search from "../adminComponents/Search/Search";

const Page = async ({ searchParams }) => {
  let data = [];
  data = await getAllTransactions();

  return (
    <div className="bg-red-100  pb-8  ">
      <div className="text-center py-4">
        <h1>Withdraw</h1>
      </div>
      <Search from={"withdraw"} />
      <div className="rounded-xl py-1 mx-auto w-[95%] mt-6 bg-[#ffff]">
        <div className="py-2 px-3">
          <h1 className="font-bold text-sm">UPI/USDT Withdrawal request</h1>
        </div>
        <div className=" space-y-2 divide-gray-300">
          {(data || []).map((ele, idx) => {
            if (
              searchParams?.search &&
              ele?.TransactionId?.toString()?.startsWith(searchParams?.search)
            ) {
              return (
                <WithdrawCard
                  idx={idx}
                  key={idx}
                  data={JSON.parse(JSON.stringify(ele))}
                />
              );
            } else if (!searchParams?.search) {
              return (
                <WithdrawCard
                  idx={idx}
                  key={idx}
                  data={JSON.parse(JSON.stringify(ele))}
                />
              );
            }
          })}
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
    let data = await TRANSACTION.find({ Type: "withdrawal" }).sort({
      createdAt: -1,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const dynamic = "force-dynamic";
