"use server";

import { connect } from "@/app/modals/dbConfig";
import { ADMIN } from "@/app/modals/modal";

export async function editBank(prevState, formData) {
  try {
    await connect();
    let BankName = formData?.get("BankName") || "";
    let AccNumber = formData?.get("AccNumber") || "";
    let AccHolderName = formData?.get("AccHolderName") || "";
    let Ifsc = formData?.get("Ifsc") || "";
    if (!BankName || !AccNumber || !AccHolderName || !Ifsc)
      throw new Error("every field is required");

    let isUpdated = await ADMIN.findOneAndUpdate(
      { _id: "6602ad529ec6624c93d770ce" },
      {
        $set: {
          "BankDetails.BankName": BankName,
          "BankDetails.AccNumber": AccNumber,
          "BankDetails.AccHolderName": AccHolderName,
          "BankDetails.Ifsc": Ifsc,
        },
      }
    );
    if (!isUpdated) throw new Error("something went wrong with the data");
    return {
      message: "updated details",
    };
  } catch (error) {
    return {
      message: error?.message || JSON.stringify(error),
    };
  }
}