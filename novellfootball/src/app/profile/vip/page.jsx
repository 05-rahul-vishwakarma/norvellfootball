"use client";
import BackButton from "@/app/components/BackButton";
import Layout from "@/app/components/Layout";
import Vip from "@/app/components/Vip";
import { UserContext } from "@/app/helpers/UserContext";
import Link from "next/link";
import React, { useContext } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
function Page() {
  const { userOtherData } = useContext(UserContext);

  const VipData = [
    {
      id: 1,
      imagesrc: "/emerald.png",
      tittle: "Emerald Member",
      textColor:"#5F5F5F",
      color:"#fff",
      icons: [
        <IoCloseCircle className="text-[red] text-[1.4rem] " />,
        <IoCloseCircle className="text-[red] text-[1.4rem]  " />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
      ],
      wideRange: "Range 500 - 25,000",
      depositRange: "Deposit range: 500 to 50K is required individually.",
    },
    {
      id: 2,
      imagesrc: "/ruby.png",
      tittle: "Ruby Member",
      textColor:"#D1D1D1",
      color:"#fff",
      icons: [
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
        <IoCloseCircle className="text-[red] text-[1.4rem] " />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
      ],
      wideRange: "Range 500 - 50,000",
      depositRange: "Deposit range: 55K to 100K is required individually.",
    },
    {
      id: 3,
      imagesrc: "/sapphire.png",
      tittle: "Sapphire Member",
      textColor:"#90a0be",
      color:"#fff",
      icons: [
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
        <IoCloseCircle className="text-[1.4rem] text-[red]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
      ],
      wideRange: "Range 500 - 75,000",
      depositRange: "Deposit range: 105K to 200K is required individually.",
    },
    {
      id: 4,
      imagesrc: "/whiteDiamond.png",
      tittle: "Diamond Member",
      textColor:"#b0b0b0",
      color:"#000",
      icons: [
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
      ],
      wideRange: "Range 500 - 200K",
      depositRange: "Deposit range: 300K to 500K is required individually.",
    },
    {
      id: 5,
      imagesrc: "/#2885F6Diamond.png",
      tittle: "#2885F6 Diamond Member",
      textColor:"#b0b0b0",
      color:"#002b5c",
      icons: [
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[#2885F6]" />,
      ],
      wideRange: "Range 500 - 500K",
      depositRange: "Deposit range: 700 to 1000K is required individually.",
    },
  ];

  return (
    <Layout>
      <section>
        <Link href="/profile">
          <div className="py-4">
            <BackButton pageName="See Membership" />
          </div>
        </Link>
        <section className=" mt-2 h-full fixed w-full overflow-y-scroll pb-[12rem]  ">
          {VipData.map((item, i) => (
            <Vip
              key={i}
              isActive={userOtherData?.VipLevel === i}
              data={{ ...item }}
            />
          ))}
        </section>
      </section>
    </Layout>
  );
}

export default Page;
