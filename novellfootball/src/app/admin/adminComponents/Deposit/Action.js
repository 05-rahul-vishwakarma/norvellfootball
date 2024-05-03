"use server";
import ErrorReport from "@/app/helpers/ErrorReport";
import { connect } from "@/app/modals/dbConfig";
import { TRANSACTION, USER } from "@/app/modals/modal";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function updateTransaction(prevState, formData) {
  try {
    let data = {
      prevTransactionId: formData.get("prevTransactionId"),
      TransactionId: formData.get("RefrenceNo"),
      UserName: formData.get("UserName"),
      Amount: Number(formData.get("Amount")) * 100,
      Remark: formData.get("Remark"),
    };

    if (formData.get("stat_0")) {
      //its in pending state;
      return {
        message: "submitting a form in pending state is considered an error.",
      };
    } else if (formData.get("stat_1")) {
      // confirm the deposit
      let res = await settleDeposit(data);
      if (res === "ok") {
        revalidatePath("/deposit");
        return {
          message: "done",
        };
      } else {
        return {
          message: res,
        };
      }
    } else if (formData.get("stat_2")) {
      // cancel the deposit
      let res = await cancelDeposit(data);
      if (res === "ok") {
        revalidatePath("/admin/deposit");
        return {
          message: "done",
        };
      } else {
        return {
          message: res,
        };
      }
    }
  } catch (error) {
    return {
      message: error?.message || "something went wrong",
    };
  }
}

async function settleDeposit(data) {
  let Session = await mongoose.startSession();
  Session.startTransaction();
  try {
    await connect();
    //  if first deposit give 2% reward to the parent;
    let isFirstDeposit = await USER.findOne({ UserName: data?.UserName });
    if (!isFirstDeposit) {
      return "error while finding the user";
    }
    if (isFirstDeposit?.FirstDeposit === true) {
      if (isFirstDeposit?.Parent !== "") {
        let isParentUpdated = await USER.findOneAndUpdate(
          { UserName: isFirstDeposit?.Parent },
          {
            $inc: {
              Balance: data?.Amount * 0.02,
              Members: 1,
            },
          },
          { session: Session }
        );
        if (!isParentUpdated)
          throw new Error("somoething went wrong while updating the parent");
        let today = new Date();
        if (
          (Number(isParentUpdated?.Members)+1)%5 === 0 &&
          Number(isParentUpdated?.Members) !== 0
        ) {
          await USER.findOneAndUpdate(
            { UserName: isFirstDeposit?.Parent },
            {
              $inc: {
                Balance: 30000,
              },
            },
            { session: Session }
          );

          await TRANSACTION.create(
            [
              {
                UserName: isParentUpdated?.UserName,
                TransactionId: await genTransactionID(),
                Amount: 30000,
                Type: "bonus",
                Remark: "multiple invitation bonus",
                Status: 1,
                Date: `${today.getDate()}/${
                  today.getMonth() + 1
                }/${today.getFullYear()}`,
                Parent: isParentUpdated?.Parent,
                From: data?.UserName,
                Method: "reward",
              },
            ],
            { session: Session }
          );
        }
        let createBonusReward = await TRANSACTION.create(
          [
            {
              UserName: isParentUpdated?.UserName,
              TransactionId: await genTransactionID(),
              Amount: data?.Amount * 0.02,
              Type: "invitation reward",
              Remark: "success",
              Status: 1,
              Date: `${today.getDate()}/${
                today.getMonth() + 1
              }/${today.getFullYear()}`,
              Parent: isParentUpdated?.Parent,
              From: data?.UserName,
              Method: "reward",
            },
          ],
          { session: Session }
        );

        if (!createBonusReward) throw Error("Failed To Update Parent");
      }

      let userUpdated = await USER.findOneAndUpdate(
        { UserName: data?.UserName },
        {
          $inc: {
            Balance: data?.Amount + data?.Amount * 0.05,
            Deposited: data?.Amount,
            ValidDeposit: data?.Amount,
          },
          FirstDeposit: false,
        },
        { session: Session }
      );
      if (!userUpdated) throw Error("error updating user");
      let isTransactionUpdated = await TRANSACTION.findOneAndUpdate(
        {
          UserName: data?.UserName,
          TransactionId: data?.prevTransactionId,
          Status: 0,
        },
        {
          Remark: data?.Remark,
          Status: 1,
          TransactionId: data?.TransactionId,
        },
        {
          session: Session,
        }
      );
      if (!isTransactionUpdated)
        throw Error(
          "error while updating transaction or transaction was already updated check the database."
        );
      await Session.commitTransaction();
      return "ok";
    } else {
      let userUpdated = await USER.findOneAndUpdate(
        { UserName: data?.UserName },
        {
          $inc: {
            Balance: data?.Amount,
            Deposited: data?.Amount,
            ValidDeposit: data?.Amount,
          },
        },
        { session: Session }
      );
      if (!userUpdated) throw Error("error updating user");
      let isTransactionUpdated = await TRANSACTION.findOneAndUpdate(
        {
          UserName: data?.UserName,
          TransactionId: data?.prevTransactionId,
          Status: 0,
        },
        {
          Remark: data?.Remark,
          Status: 1,
          TransactionId: data?.TransactionId,
        },
        {
          session: Session,
        }
      );
      if (!isTransactionUpdated)
        throw Error(
          "error while updating transaction or transaction was already updated."
        );
      await Session.commitTransaction();
      return "ok";
    }
  } catch (error) {
    if (error?.code === 500 || error?.status === 500 || !error?.status) {
      ErrorReport(error);
    }
    await Session.abortTransaction();
    return error?.message || "somethign went wrong";
  }
}

async function cancelDeposit(data) {
  await connect();
  try {
    let isUpdatedTransaction = await TRANSACTION.findOneAndUpdate(
      { UserName: data?.UserName, TransactionId: data?.prevTransactionId },
      {
        Status: 2,
        Remark: data?.Remark,
        TransactionId: data?.TransactionId,
      }
    );
    if (isUpdatedTransaction) {
      return "done";
    } else {
      return "error while canceling the transaction";
    }
  } catch (error) {
    if (error?.code === 500 || error?.status === 500 || !error?.status) {
      ErrorReport(error);
    }
    return error?.message || "something went wrong";
  }
}

async function genTransactionID() {
  const PART_A = Math.floor(Math.random() * 90000 + 10000).toString();
  const PART_B = Math.floor(Math.random() * 90000 + 10000).toString();
  return PART_A + PART_B;
}
