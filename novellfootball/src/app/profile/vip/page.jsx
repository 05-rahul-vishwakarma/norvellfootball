import BackButton from "@/app/components/BackButton";
import Layout from "@/app/components/Layout";
import Vip from "@/app/components/Vip";
import Link from "next/link";
import React from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
function Page() {
  const VipData = [
    {
      id: 1,
      imagesrc: "/emerald.png",
      tittle: "Emerald Member",
      icons: [
        <IoCloseCircle className="text-[red] text-[1.4rem] " />,
        <IoCloseCircle className="text-[red] text-[1.4rem]  " />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
      ],
      wideRange: "Range 500 - 25,000",
      depositRange: "Deposit range: 500 to 50K is required individually.",
    },
    {
      id: 2,
      imagesrc: "/ruby.png",
      tittle: "Ruby Member",
      icons: [
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
        <IoCloseCircle className="text-[red] text-[1.4rem] " />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
      ],
      wideRange: "Range 500 - 50,000",
      depositRange: "Deposit range: 55K to 100K is required individually.",
    },
    {
      id: 3,
      imagesrc: "/sapphire.png",
      tittle: "Sapphire Member",
      icons: [
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
        <IoCloseCircle className="text-[1.4rem] text-[red]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
      ],
      wideRange: "Range 500 - 75,000",
      depositRange: "Deposit range: 105K to 200K is required individually.",
    },
    {
      id: 4,
      imagesrc: "/whiteDiamond.png",
      tittle: "Diamond Member",
      icons: [
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
      ],
      wideRange: "Range 500 - 200K",
      depositRange: "Deposit range: 300K to 500K is required individually.",
    },
    {
      id: 5,
      imagesrc: "/blueDiamond.png",
      tittle: "Blue Diamond Member",
      icons: [
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
        <IoMdCheckmarkCircle className="text-[1.4rem] text-[blue]" />,
      ],
      wideRange: "Range 500 - 500K",
      depositRange: "Deposit range: 700 to 1000K is required individually.",
    },
  ];

  return (
    <Layout>
      <section>
        <Link href="/profile">
          <div className="py-4" >
            <BackButton pageName="See Membership" />
          </div>
        </Link>
        <section className=" mt-2 h-full fixed w-full overflow-y-scroll pb-[12rem]  ">
          {VipData.map((item, i) => (
            <Vip key={i} data={{ ...item }} />
          ))}
        </section>
      </section>
    </Layout>
  );
}

export default Page;
