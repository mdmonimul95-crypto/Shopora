"use client";

import React from "react";
import { useSession } from "@/app/lib/auth-client";
import HeaderStart from "@/components/dashboard/customer/HeaderStart";
import StateCardsComponent from "@/components/dashboard/customer/StateCardsComponent";
import OrderAndTracking from "@/components/dashboard/customer/OrderAndTracking";
import RecommendedAndAccountSummery from "@/components/dashboard/customer/RecommendedAndAccountSummery";



const CustomerDashboard = () => {
  const { isPending } = useSession();

  /* =========================================================
     LOADING STATE
  ========================================================= */

  if (isPending) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="flex items-center gap-3 font-['Poppins'] text-[14px] text-[#475569]">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#0F766E] border-t-transparent" />
          Loading dashboard...
        </div>
      </div>
    );
  }



  /* =========================================================
     MAIN DASHBOARD
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-3 py-4 sm:px-5 md:px-6 lg:px-7 xl:px-8">

      <HeaderStart></HeaderStart>
      <StateCardsComponent></StateCardsComponent>
      <OrderAndTracking></OrderAndTracking>
      <RecommendedAndAccountSummery></RecommendedAndAccountSummery>

    </main>
  );
};

export default CustomerDashboard;