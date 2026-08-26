import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import React, { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({
  children,
}: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#FCFDFD]">
      <div className="flex-col min-h-screen">
        <DashboardSidebar />

        <main className=" md:flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;