import React from "react";
import DashboardHeader from "@/components/dashboard/admin/DashboardHeader";
import StatCards from "@/components/dashboard/admin/StatCards";
import SalesOrderLowstockStatus from "@/components/dashboard/admin/SalesOrderLowstockStatus";
import RecentOrderAndTopProductAndActivities from "@/components/dashboard/admin/RecentOrderAndTopProductAndActivities";
import QuickAction from "@/components/dashboard/admin/QuickAction";

const AdminDashboard = () => {

  return (
    <section className="min-h-screen bg-[#F8FAFC] px-4 py-5 sm:px-6 lg:px-7">

      <div className="mx-auto max-w-[1600px]">

        <DashboardHeader></DashboardHeader>      
        <StatCards></StatCards>
        <SalesOrderLowstockStatus></SalesOrderLowstockStatus>
        <RecentOrderAndTopProductAndActivities></RecentOrderAndTopProductAndActivities>
        <QuickAction></QuickAction>

      </div>
    </section>
  );
};

export default AdminDashboard;