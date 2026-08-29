import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import React, { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({
  children,
}: DashboardLayoutProps) => {
  return (
    <div className=" min-h-screen bg-[#FCFDFD]">
      <div className="flex-none md:flex min-h-screen">

        {/* Sidebar */}
        <DashboardSidebar />

        {/* Dashboard Content */}
        <main className="flex-1">
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;