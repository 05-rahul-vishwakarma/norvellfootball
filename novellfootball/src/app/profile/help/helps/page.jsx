"use client";

import React, { useState } from "react";
import Link from "next/link";
import BackButton from "@/app/components/BackButton";
import { LiaAngleDownSolid, LiaAngleRightSolid } from "react-icons/lia";
import { IoIosArrowDropup } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { motion } from "framer-motion";

import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Layout from "@/app/components/Layout";

const accorodient = {
  show: {
    height: "12vh",
    opacity: 1,
    duration: 1,
  },
  hide: {
    height: "0rem",
    opacity: 0,
    duration: 0,
  },
  showTwo: {
    height: "55vh",
    opacity: 1,
    duration: 1,
  },
  hideTwo: {
    height: "0rem",
    opacity: 0,
    duration: 0,
  },
};

function Page() {
  const [isVisible, setVisible] = useState(false);
  const [isVisibleTwo, setVisibleTwo] = useState(false);
  const [isHide, setHide] = useState(true);

  return (
    <Layout>
      <section className="h-screen bg-[#F8FCFF] ">
        <Link href="/profile/help/">
          <div className="pt-3   ">
            <BackButton pageName="Help?" />
          </div>
        </Link>

        <div className="mt-[2rem] w-[90%]  mr-auto ml-auto  ">
          <div
            style={{ boxShadow: "0 10px 10px rgba(0,0,0,0.05) " }}
            className="flex justify-between px-3 place-items-center py-3  rounded-xl bg-[#fff] text-[0.7rem]    "
          >
            <p className="font-[600]">Terms and conditions</p>
            <span className="h-full rounded-full bg-gray-300 text-black p-1">
              <LiaAngleRightSolid />
            </span>
          </div>

          <div
            style={{ boxShadow: "0 10px 10px rgba(0,0,0,0.05) " }}
            className="mt-3 py-3 font-[600] rounded-xl bg-[#fff] text-[0.7rem] "
          >
            <div className="flex justify-between place-items-center px-3 ">
              <p>Game Rule</p>
              <span
                onClick={() => setVisible(!isVisible) || setHide(!isHide)}
                className="h-full rounded-full bg-gray-300 text-black p-1"
              >
                {isVisible ? <IoIosArrowUp /> : <LiaAngleDownSolid />}
              </span>
            </div>
            <div>
              <motion.p
                variants={accorodient}
                animate={isVisible ? "show" : "hide"}
                transition={{ duration: 0.5 }}
                className="text-[#00000091] text-[0.6rem] overflow-scroll  flex justify-center place-items-center px-4  "
              >
                There are 18 possible scores ranging from 0-0 to 4-4 and
                "Other." If same score FT comes which you have stake on it, It's
                means you loose. As long as the selected score doesn't match the
                final result, there will be a profit.
              </motion.p>
            </div>
          </div>

          {isHide ? (
            <div
              style={{ boxShadow: "0 10px 10px rgba(0,0,0,0.05) " }}
              className="mt-3 py-3  rounded-xl bg-[#fff] text-[0.7rem] "
            >
              <div className="flex justify-between place-items-center px-3 ">
                <p className="font-[600] ">Commission Rule</p>
                <span
                  onClick={() => setVisibleTwo(!isVisibleTwo)}
                  className="h-full rounded-full bg-gray-300 text-black p-1"
                >
                  {isVisibleTwo ? <IoIosArrowUp /> : <LiaAngleDownSolid />}
                </span>
              </div>
              <div>
                <motion.div
                  variants={accorodient}
                  animate={isVisibleTwo ? "showTwo" : "hideTwo"}
                  transition={{ duration: 0.5 }}
                  className="text-[0.6rem] overflow-scroll  flex flex-col  place-items-center px-4  "
                >
                  <p className="my-3 text-[#00000091] font-[600]">
                    Our commission structure operates across three levels,
                    ensuring rewarding opportunities for all members.
                  </p>

                  <p className="mb-3 text-[#00000091] font-[600]">
                    Level 1 members yield a 10% commission, Level 2 members
                    offer a 7% commission, and Level 3 members provide a 3%
                    commission.
                  </p>

                  <p className="text-[#00000091] font-[600]">
                    For instance, if a (Level 1 member places a stake of Rs.
                    500k and earns Rs. 25k, you receive Rs. 2500 as commission).
                  </p>
                  <p className="mb-3 text-[#00000091] font-[600]">
                    Similarly, from a (Level 2 member's Rs. 25k earnings, you
                    receive Rs. 1750), and from a (Level 3 member, you receive
                    Rs. 750).
                  </p>

                  <h1 className="text-left font-bold w-full text-[#000000e7] ">
                    This result in a daily income of Rs.5000
                  </h1>

                  <p className="my-3 text-[#00000091] font-[600]">
                    Invite your family and friends to partake in these benefits
                    and maximize their earnings. Together, we can create a
                    thriving community where everyone prospers. Join us today
                    and unlock the potential for substantial and sustainable
                    income. Don't miss out on this opportunity to elevate your
                    financial prospects while sharing the rewards with your
                    loved ones. Embrace the power of our commission structure
                    and embark on a journey towards financial freedom and
                    prosperity.
                  </p>
                </motion.div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* <Terms /> */}
      </section>
    </Layout>
  );
}

export default Page;

// function Terms() {
//   return (
//     <section className="absolute top-0 left-0 bg-white h-screen w-screen ">
//       <div className="p-1 mt-3  ">
//         <BackButton pageName="Terms and Conditions" />
//       </div>
//       <div className=" mt-4 w-[90%] mr-auto ml-auto h-full overflow-y-scroll pb-[8rem] ">
//         {/* Introduction part */}
//         <div className="my-3">
//           <h1 className="font-bold tracking-wide text-[0.7rem] ">
//             A. INTRODUCTION
//           </h1>
//           <p className="text-[0.6rem] my-3 ">
//             1. By using, visiting and/or accessing any part (including, but not
//             limited to, sub-domains, source code and/or website APIs, whether
//             visible or not) of the Norvell Football website or mobile
//             application or any other websites or applications that we own or
//             operate (the “Website”) and/or registering on the Website, you
//             acknowledge and agree to be bound by our policies and terms as
//             follows: (i) these Terms and Conditions; (ii) our Privacy Policy;
//             (iii) our Cookies Policy and (iv) the Rules applicable to our
//             betting or gaming products as further referenced at paragraph A.2
//             below (together the "Terms"), and are deemed to have accepted and
//             understood all the Terms.
//           </p>

//           <p className="text-[0.6rem] my-3 ">
//             Our Privacy Policy and Cookies Policy are provided for informational
//             purposes only.
//           </p>

//           <p className="text-[0.6rem] mb-3 ">
//             By creating a personal player account (as described in Section B) on
//             the Website and checking the box on the sign-up page, you explicitly
//             accept and agree to these Terms and Conditions and the Rules. You
//             may at any time download these Terms and Conditions and the Rules by
//             clicking the link above.
//           </p>

//         </div>
//       </div>
//     </section>
//   );
// }
