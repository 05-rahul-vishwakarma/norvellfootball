import { NextRequest, NextResponse } from "next/server";
export async function POST(NextRequest) {
  const reqBody = await NextRequest.json();
  console.log(reqBody);
  return NextResponse.json({ message: "done" });
}
