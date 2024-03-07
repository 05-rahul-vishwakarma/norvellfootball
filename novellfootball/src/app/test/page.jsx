"use client";
import React, { useEffect } from "react";

const Page = () => {
  async function settleBet() {
    let config = {
      method: "POST",
      header: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        StakeId: 1060996,
        s_first: 1,
        s_second: 1,
        g_first: 1,
        g_second: 2,
      }),
    };
    let res = await fetch(
      window.location.origin + "/api/admin/settleMatch",
      config
    );
    res = await res.json();
    console.log(res);
  }
  useEffect(() => {
    settleBet();
  }, []);
  return <div>hello</div>;
};

export default Page;
