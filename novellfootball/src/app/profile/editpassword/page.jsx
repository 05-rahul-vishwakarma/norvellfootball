"use client";
import Layout from "@/app/components/Layout";
import VerificationPopup from "@/app/components/VerificationPopup";
import React from "react";

const Page = () => {
  return (
    <Layout>
      <section className="h-full w-full">
        <VerificationPopup />
      </section>
    </Layout>
  );
};

export default Page;
