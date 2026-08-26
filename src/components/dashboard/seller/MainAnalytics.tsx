import { Product } from '@/type/dashboard/Seller';
import { CheckCircle2, ChevronDownIcon, Clock3, Package, Truck, XCircle } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

const orderStatuses = [
  {
    name: "Pending",
    count: 8,
    percentage: "5.1%",
    icon: <Clock3 size={16} />,
    className: "bg-[#FFF2E8] text-[#F97316]",
  },
  {
    name: "Processing",
    count: 18,
    percentage: "11.5%",
    icon: <Package size={16} />,
    className: "bg-[#EAF3FF] text-[#3B82F6]",
  },
  {
    name: "Shipped",
    count: 42,
    percentage: "26.9%",
    icon: <Truck size={16} />,
    className: "bg-[#F2ECFF] text-[#8B5CF6]",
  },
  {
    name: "Delivered",
    count: 76,
    percentage: "48.7%",
    icon: <CheckCircle2 size={16} />,
    className: "bg-[#E8F7F4] text-[#0F766E]",
  },
  {
    name: "Cancelled",
    count: 4,
    percentage: "2.6%",
    icon: <XCircle size={16} />,
    className: "bg-[#FFECEC] text-[#EF4444]",
  },
];

const products: Product[] = [
  {
    name: "Wireless Headphones",
    sold: 56,
    revenue: "$2,234.44",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80",
  },
  {
    name: "Smart Watch Series 8",
    sold: 34,
    revenue: "$1,987.50",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&q=80",
  },
  {
    name: "LED Desk Lamp",
    sold: 28,
    revenue: "$559.72",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&q=80",
  },
  {
    name: "Running Shoes",
    sold: 25,
    revenue: "$449.75",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80",
  },
  {
    name: "Coffee Maker",
    sold: 22,
    revenue: "$398.21",
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=100&q=80",
  },
];

const MainAnalytics = () => {
  return (
     <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-12">

          {/* ==================================================
              SALES OVERVIEW
          ================================================== */}

          <div className="rounded-xl border border-[#E8EEEE] bg-white p-5 xl:col-span-5">

            <div className="flex items-center justify-between">

              <h2 className="font-['Poppins'] text-[17px] font-semibold text-[#1E293B]">
                Sales Overview
              </h2>

              <button
                type="button"
                className="flex items-center gap-1 rounded-lg border border-[#E2E8F0] px-3 py-2 font-['Poppins'] text-[14px] font-medium text-[#475569]"
              >
                This Week
                <ChevronDownIcon size={15} />
              </button>

            </div>

            <div className="mt-5 flex items-center gap-5">

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#0F766E]" />
                <span className="font-['Poppins'] text-[14px] text-[#475569]">
                  This Week
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm border border-[#94A3B8]" />
                <span className="font-['Poppins'] text-[14px] text-[#475569]">
                  Last Week
                </span>
              </div>

            </div>

            {/* Chart */}
            <div className="mt-5 h-56 w-full">

              <svg
                viewBox="0 0 600 240"
                className="h-full w-full"
                preserveAspectRatio="none"
              >

                {/* Grid */}
                {[30, 75, 120, 165, 210].map((y) => (
                  <line
                    key={y}
                    x1="45"
                    y1={y}
                    x2="585"
                    y2={y}
                    stroke="#E8EEEE"
                    strokeWidth="1"
                  />
                ))}

                {/* Last week */}
                <path
                  d="M45 190 C90 160, 120 180, 165 145 C210 120, 245 165, 290 150 C335 135, 375 155, 420 120 C465 95, 500 105, 540 82 C560 75, 575 100, 585 105"
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />

                {/* Current week area */}
                <path
                  d="M45 175 C90 150, 120 155, 165 130 C210 105, 245 145, 290 125 C335 105, 375 120, 420 85 C465 55, 500 72, 540 38 C560 25, 575 50, 585 60 L585 210 L45 210 Z"
                  fill="#0F766E"
                  fillOpacity="0.08"
                />

                {/* Current week */}
                <path
                  d="M45 175 C90 150, 120 155, 165 130 C210 105, 245 145, 290 125 C335 105, 375 120, 420 85 C465 55, 500 72, 540 38 C560 25, 575 50, 585 60"
                  fill="none"
                  stroke="#0F766E"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Points */}
                {[
                  [45, 175],
                  [120, 155],
                  [165, 130],
                  [245, 145],
                  [290, 125],
                  [375, 120],
                  [420, 85],
                  [500, 72],
                  [540, 38],
                  [585, 60],
                ].map(([cx, cy], index) => (
                  <circle
                    key={index}
                    cx={cx}
                    cy={cy}
                    r="4"
                    fill="white"
                    stroke="#0F766E"
                    strokeWidth="2"
                  />
                ))}

                {/* Labels */}
                {[
                  ["Mon", 45],
                  ["Tue", 120],
                  ["Wed", 195],
                  ["Thu", 285],
                  ["Fri", 375],
                  ["Sat", 480],
                  ["Sun", 575],
                ].map(([label, x]) => (
                  <text
                    key={String(label)}
                    x={Number(x)}
                    y="232"
                    textAnchor="middle"
                    fontSize="14"
                    fill="#64748B"
                  >
                    {label}
                  </text>
                ))}

              </svg>

            </div>

          </div>


          {/* ==================================================
              TOP SELLING PRODUCTS
          ================================================== */}

          <div className="rounded-xl border border-[#E8EEEE] bg-white p-5 xl:col-span-4">

            <div className="flex items-center justify-between">

              <h2 className="font-['Poppins'] text-[17px] font-semibold text-[#1E293B]">
                Top Selling Products
              </h2>

              <button
                type="button"
                className="font-['Poppins'] text-[14px] font-semibold text-[#0F766E]"
              >
                View All
              </button>

            </div>

            <div className="mt-5 grid grid-cols-[1fr_55px_85px] border-b border-[#E8EEEE] pb-3">

              <span className="font-['Poppins'] text-[14px] font-semibold text-[#64748B]">
                Product
              </span>

              <span className="text-right font-['Poppins'] text-[14px] font-semibold text-[#64748B]">
                Sold
              </span>

              <span className="text-right font-['Poppins'] text-[14px] font-semibold text-[#64748B]">
                Revenue
              </span>

            </div>

            <div>
              {products.map((product, index) => (
                <div
                  key={product.name}
                  className="grid grid-cols-[1fr_55px_85px] items-center border-b border-[#F1F5F9] py-3 last:border-0"
                >

                  <div className="flex min-w-0 items-center gap-3">

                    <span className="font-['Poppins'] text-[14px] text-[#64748B]">
                      {index + 1}.
                    </span>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E8EEEE] bg-white">

                      <Image
                        src={product.image}
                        alt={product.name}
                        className="h-8 w-8 rounded-lg object-cover"
                        height={512}
                        width={512}
                      />

                    </div>

                    <span className="truncate font-['Poppins'] text-[14px] font-medium text-[#334155]">
                      {product.name}
                    </span>

                  </div>

                  <span className="text-right font-['Poppins'] text-[14px] font-semibold text-[#334155]">
                    {product.sold}
                  </span>

                  <span className="text-right font-['Poppins'] text-[14px] font-semibold text-[#334155]">
                    {product.revenue}
                  </span>

                </div>
              ))}
            </div>

          </div>


          {/* ==================================================
              ORDERS OVERVIEW
          ================================================== */}

          <div className="rounded-xl border border-[#E8EEEE] bg-white p-5 xl:col-span-3">

            <div className="flex items-center justify-between">

              <h2 className="font-['Poppins'] text-[17px] font-semibold text-[#1E293B]">
                Orders Overview
              </h2>

              <button
                type="button"
                className="font-['Poppins'] text-[14px] font-semibold text-[#0F766E]"
              >
                View All
              </button>

            </div>

            <div className="mt-4">

              {orderStatuses.map((status) => (
                <div
                  key={status.name}
                  className="flex items-center justify-between border-b border-[#F1F5F9] py-3 last:border-0"
                >

                  <div className="flex items-center gap-3">

                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full ${status.className}`}
                    >
                      {status.icon}
                    </div>

                    <span className="font-['Poppins'] text-[14px] font-medium text-[#475569]">
                      {status.name}
                    </span>

                  </div>

                  <div className="flex items-center gap-5">

                    <span className="font-['Poppins'] text-[14px] font-semibold text-[#334155]">
                      {status.count}
                    </span>

                    <span className="w-12 text-right font-['Poppins'] text-[14px] text-[#64748B]">
                      {status.percentage}
                    </span>

                  </div>

                </div>
              ))}

            </div>

            {/* Simple Donut */}
            <div className="mt-5 flex justify-center">

              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-[conic-gradient(#EF4444_0deg_9deg,#3B82F6_9deg_50deg,#8B5CF6_50deg_147deg,#0F766E_147deg_323deg,#EF4444_323deg_360deg)]">

                <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-white">

                  <span className="font-['Poppins'] text-xl font-bold text-[#1E293B]">
                    148
                  </span>

                  <span className="font-['Poppins'] text-[14px] text-[#64748B]">
                    Total Orders
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>
  )
}

export default MainAnalytics