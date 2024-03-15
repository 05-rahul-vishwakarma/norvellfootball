"use client";
import React from "react";

const WithdrawalCard = ({ data }) => {
  return (
    <>
      <input
        type="text"
        name="name"
        placeholder={data?.UserName}
        value={data?.UserName}
      />
      <button type="submit">update</button>
    </>
  );
};

export default WithdrawalCard;
