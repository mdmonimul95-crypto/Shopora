import { Box, CircleDollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import React from 'react'
const stats = [
  {
    title: "Total Sales",
    value: "$24,590.00",
    change: "+18.6%",
    icon: CircleDollarSign,
    type: "teal",
  },
  {
    title: "Total Orders",
    value: "320",
    change: "+12.4%",
    icon: ShoppingCart,
    type: "teal",
  },
  {
    title: "Total Customers",
    value: "1,245",
    change: "+9.3%",
    icon: Users,
    type: "teal",
  },
  {
    title: "Average Order Value",
    value: "$76.84",
    change: "+7.8%",
    icon: Package,
    type: "coral",
  },
  {
    title: "Total Products",
    value: "842",
    change: "+5.2%",
    icon: Box,
    type: "teal",
  },
];

const StatCards = () => {
  return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

          {stats.map((stat) => {
            const Icon = stat.icon;

            const iconStyle =
              stat.type === "coral"
                ? "bg-[#FFF0F0] text-[#FF6B6B]"
                : "bg-[#E8F5F3] text-[#0F766E]";

            const chartClass =
              stat.type === "coral"
                ? "text-[#FF6B6B]"
                : "text-[#0F766E]";

            return (
              <div
                key={stat.title}
                className="overflow-hidden rounded-xl border border-[#E8EEEE] bg-white p-4 shadow-[0_2px_10px_rgba(15,118,110,0.04)]"
              >

                <div className="flex items-start justify-between">

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${iconStyle}`}
                  >
                    <Icon size={19} strokeWidth={1.7} />
                  </div>

                </div>

                <p className="mt-3 font-['Poppins'] text-[13px] text-[#64748B]">
                  {stat.title}
                </p>

                <h2 className="mt-0.5 font-['Poppins'] text-xl font-bold text-[#1E293B]">
                  {stat.value}
                </h2>

                <p className="mt-1 font-['Poppins'] text-[11px] text-[#65A30D]">
                  ↑ {stat.change}{" "}
                  <span className="text-[#94A3B8]">
                    vs last week
                  </span>
                </p>

                {/* Small chart */}

                <div className={`mt-3 h-8 ${chartClass}`}>
                  <svg
                    viewBox="0 0 180 35"
                    className="h-full w-full"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 27 C15 17, 22 31, 35 23 C49 15, 57 29, 72 20 C87 11, 92 27, 108 18 C123 10, 132 23, 145 14 C158 5, 168 14, 180 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

              </div>
            );
          })}

        </div>
  )
}

export default StatCards