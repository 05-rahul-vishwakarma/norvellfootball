import CustomError from "@/app/helpers/Error";
import { NextResponse } from "next/server";
import { USER } from "@/app/modals/modal";
import { cookies } from "next/headers";
/*
  
🏦🏧

   This function will handle the creation and updation of accounts
   for local banks and usdt banks

   ## POST request will handle creation of banks ;
   ## UPDATE  request will handle the updation of banks detail ;
*/

export async function POST(request) {
  try {
    // const session = request.cookies.get("session")?.value || "";
    // const token = request?.cookies?.get("token")?.value || "";
    // const UserName = await isAuthenticated(token, session);
    const UserName = await isValidUser(request);
    if (!UserName)
      return NextResponse.json({
        status: 302,
        message: "Session Expired login again",
      });

    let body = await request.json();
    if (body?.isLocalBank) {
      let { AccHolderName, BankName, AccNumber, Ifsc, BranchName } = body;
      if (!AccHolderName || !BankName || !AccNumber || !Ifsc || !BankName)
        throw new CustomError(705, "Missing Fields", {});

      let isLocalBankAdded = await USER.findOneAndUpdate(
        { UserName, LocalBankAdded: false },
        {
          LocalBank: {
            AccHolderName,
            BankName,
            AccNumber,
            Ifsc,
            BranchName,
          },
        }
      );
      if (!isLocalBankAdded)
        throw new CustomError(705, "Bank already added or error field", {});

      return NextResponse.json({
        status: 200,
        message: "Account added successfully",
      });
    } else {
      let { UsdtAddress, AppName } = body;
      if (!UsdtAddress || !AppName)
        throw new CustomError(705, "Field missing", {});

      isUsdtBankAdded = await USER.findOneAndUpdate(
        { UserName, UsdtBankAdded: false },
        {
          UsdtBank: {
            UsdtAddress,
            AppName,
          },
        }
      );
      if (!isUsdtBankAdded)
        throw new CustomError(705, "Error while creating bank account", {});
      return NextResponse.json({
        status: 200,
        message: "Account added successfully",
        data: {},
      });
    }
    return NextResponse.json({
      status: 500,
      message: "something went wrong",
      data: {},
    });
  } catch (error) {
    return NextResponse.json({
      status: error?.code || error?.status || 500,
      message: error?.message || "something went wrong",
      data: {},
    });
  }
}

export async function PATCH(request) {
  try {
    // const session = request.cookies.get("session")?.value || "";
    // const token = request?.cookies?.get("token")?.value || "";
    // const UserName = await isAuthenticated(token, session);
    const UserName = await isValidUser(request);
    if (!UserName)
      return NextResponse.json({
        status: 302,
        message: "Session Expired login again",
      });

    let body = await request.json();
    if (body?.isLocalBank) {
      let { AccHolderName, BankName, AccNumber, Ifsc, BranchName } = body;
      if (!AccHolderName || !BankName || !AccNumber || !Ifsc || !BankName)
        throw new CustomError(705, "Missing Fields", {});

      let isLocalBankAdded = await USER.findOneAndUpdate(
        { UserName, LocalBankAdded: false },
        {
          LocalBank: {
            AccHolderName,
            BankName,
            AccNumber,
            Ifsc,
            BranchName,
          },
        }
      );
      if (!isLocalBankAdded)
        throw new CustomError(705, "Bank already added or error field", {});

      return NextResponse.json({
        status: 200,
        message: "Account added successfully",
      });
    } else {
      let { UsdtAddress, AppName } = body;
      if (!UsdtAddress || !AppName)
        throw new CustomError(705, "Field missing", {});

      isUsdtBankAdded = await USER.findOneAndUpdate(
        { UserName, UsdtBankAdded: false },
        {
          UsdtBank: {
            UsdtAddress,
            AppName,
          },
        }
      );
      if (!isUsdtBankAdded)
        throw new CustomError(705, "Error while creating bank account", {});
      return NextResponse.json({
        status: 200,
        message: "Account added successfully",
        data: {},
      });
    }
    return NextResponse.json({
      status: 500,
      message: "something went wrong",
      data: {},
    });
  } catch (error) {
    return NextResponse.json({
      status: error?.code || error?.status || 500,
      message: error?.message || "something went wrong",
      data: {},
    });
  }
}
async function isValidUser(request) {
  // const session = request.cookies.get("session")?.value || "";
  // const token = request?.cookies?.get("token")?.value || "";
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value || "";
  const token = cookieStore.get("token")?.value || "";
  const UserName = await isAuthenticated(token, session);
  if (!UserName) return false;

  return UserName;
}
