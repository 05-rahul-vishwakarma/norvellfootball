import { connect } from "@/app/modals/dbConfig";
import { TRANSACTION } from "@/app/modals/modal";
import WithdrawalCard from "../adminComponents/test/WithdrawalCard";

const Page = async () => {
  let data = await getAllTransactions();
  async function test(formData) {
    "use server";
    console.log(formData.get("name"));
  }
  return (
    <div>
      <h1>admin</h1>
      <form action={test}>
        {data.map((ele, idx) => (
          <WithdrawalCard key={idx} data={ele} />
        ))}
        {/* <button type="submit">submit</button> */}
      </form>

      {/* <WithdrawalCard update={getAllTransactions} /> */}
    </div>
  );
};

export default Page;

async function getAllTransactions() {
  try {
    connect();
    let data = await TRANSACTION.find({ Status: 0 });
    return data;
  } catch (error) {
    console.log(error);
  }
}
