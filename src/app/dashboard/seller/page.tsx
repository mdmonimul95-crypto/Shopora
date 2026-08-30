"use client";

import React from "react";
import { useSession } from "@/app/lib/auth-client";

import SellerHeader from "@/components/dashboard/seller/SellerHeader";
import SellerStatCard from "@/components/dashboard/seller/SellerStatCard";
import MainAnalytics from "@/components/dashboard/seller/MainAnalytics";
import SecondContentRow from "@/components/dashboard/seller/SecondContentRow";
import GrowBusinessTools from "@/components/dashboard/seller/GrowBusinessTools";




const SellerDashboard = () => {
  const {  isPending } = useSession();


  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="font-['Poppins'] text-[16px] text-[#64748B]">
          Loading dashboard...
        </p>
      </div>
    );
  }




  return (
    <section className="min-h-screen bg-[#F8FAFC] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">

        <SellerHeader></SellerHeader>
        <SellerStatCard></SellerStatCard>
        <MainAnalytics></MainAnalytics>
        <SecondContentRow></SecondContentRow>
        <GrowBusinessTools></GrowBusinessTools>
      </div>

    </section>
  );
};

export default SellerDashboard;