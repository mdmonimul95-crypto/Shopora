
import { StatCard } from '@/type/dashboard/Seller';
import { Eye, Package, ShoppingCart, TrendingUp, Wallet } from 'lucide-react'
import React from 'react'


const stats: StatCard[] = [
  {
    title: "Total Sales",
    value: "$8,456.70",
    growth: "18.7%",
    icon: <span className="text-2xl font-bold">$</span>,
    iconBg: "bg-[#E8F7F4]",
    iconColor: "text-[#0F766E]",
    chartColor: "#0F766E",
  },
  {
    title: "Total Orders",
    value: "156",
    growth: "12.4%",
    icon: <ShoppingCart size={24} />,
    iconBg: "bg-[#E8F7F4]",
    iconColor: "text-[#0F766E]",
    chartColor: "#0F766E",
  },
  {
    title: "Products Sold",
    value: "312",
    growth: "16.3%",
    icon: <Package size={24} />,
    iconBg: "bg-[#F2ECFF]",
    iconColor: "text-[#8B5CF6]",
    chartColor: "#8B5CF6",
  },
  {
    title: "Total Earnings",
    value: "$6,784.50",
    growth: "15.8%",
    icon: <Wallet size={24} />,
    iconBg: "bg-[#FFF2E8]",
    iconColor: "text-[#F97316]",
    chartColor: "#F97316",
  },
  {
    title: "Store Views",
    value: "3,921",
    growth: "9.6%",
    icon: <Eye size={24} />,
    iconBg: "bg-[#EAF3FF]",
    iconColor: "text-[#3B82F6]",
    chartColor: "#3B82F6",
  },
];

const MiniChart = ({ color }: { color: string }) => {
  return (
    <div className="mt-3 h-12 w-full overflow-hidden">
      <svg
        viewBox="0 0 220 55"
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M2 43 C18 28, 24 39, 38 35 C51 30, 59 45, 73 35 C88 24, 98 39, 111 28 C125 17, 137 30, 151 27 C164 24, 172 8, 184 15 C198 21, 208 6, 218 4"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
const SellerStatCard = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border border-[#E8EEEE] bg-white p-5 shadow-[0_2px_10px_rgba(15,118,110,0.04)]"
            >

              <div className="flex items-start justify-between">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.iconBg} ${stat.iconColor}`}
                >
                  {stat.icon}
                </div>

              </div>

              <p className="mt-4 font-['Poppins'] text-[14px] font-medium text-[#64748B]">
                {stat.title}
              </p>

              <h2 className="mt-1 font-['Poppins'] text-2xl font-bold text-[#1E293B]">
                {stat.value}
              </h2>

              <div className="mt-1 flex items-center gap-1">
                <TrendingUp
                  size={14}
                  className="text-[#0F766E]"
                />

                <span className="font-['Poppins'] text-[14px] font-semibold text-[#0F766E]">
                  {stat.growth}
                </span>

                <span className="font-['Poppins'] text-[14px] text-[#64748B]">
                  vs last week
                </span>
              </div>

              <MiniChart color={stat.chartColor} />

            </div>
          ))}

        </div>
  )
}

export default SellerStatCard