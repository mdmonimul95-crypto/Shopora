import { ChevronDown, Clock3, CreditCard, Package, RefreshCcw, Truck, XCircle } from 'lucide-react';
import React from 'react'
const orderStatuses = [
  {
    label: "Pending",
    count: "12",
    percentage: "3.2%",
    icon: Clock3,
    iconClass: "bg-[#FFF4E5] text-[#F59E0B]",
  },
  {
    label: "Paid",
    count: "78",
    percentage: "20.8%",
    icon: CreditCard,
    iconClass: "bg-[#E8F5F3] text-[#0F766E]",
  },
  {
    label: "Processing",
    count: "98",
    percentage: "25.6%",
    icon: RefreshCcw,
    iconClass: "bg-[#EAF2FF] text-[#2563EB]",
  },
  {
    label: "Packed",
    count: "54",
    percentage: "14.4%",
    icon: Package,
    iconClass: "bg-[#F1EBFF] text-[#7C3AED]",
  },
  {
    label: "Shipped",
    count: "56",
    percentage: "14.9%",
    icon: Truck,
    iconClass: "bg-[#E8F5F3] text-[#0F766E]",
  },
  {
    label: "Delivered",
    count: "120",
    percentage: "31.9%",
    icon: Package,
    iconClass: "bg-[#EEF8E8] text-[#65A30D]",
  },
  {
    label: "Cancelled",
    count: "8",
    percentage: "2.1%",
    icon: XCircle,
    iconClass: "bg-[#FFF0F0] text-[#EF4444]",
  },
  {
    label: "Refunded",
    count: "4",
    percentage: "1.1%",
    icon: RefreshCcw,
    iconClass: "bg-[#F1F5F9] text-[#64748B]",
  },
];

const lowStockProducts = [
  {
    name: "Wireless Headphones",
    stock: 5,
    width: "20%",
  },
  {
    name: "Smart Watch Series 8",
    stock: 5,
    width: "20%",
  },
  {
    name: "LED Desk Lamp",
    stock: 7,
    width: "32%",
  },
  {
    name: "Running Shoes",
    stock: 6,
    width: "27%",
  },
  {
    name: "Coffee Maker",
    stock: 4,
    width: "18%",
  },
];

const SalesOrderLowstockStatus = () => {
  return (
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-12">

          {/* =================================================
              SALES OVERVIEW
          ================================================= */}

          <div className="rounded-xl border border-[#E8EEEE] bg-white p-4 xl:col-span-6">

            <div className="flex items-center justify-between">

              <h2 className="font-['Poppins'] text-[15px] font-semibold text-[#1E293B]">
                Sales Overview
              </h2>

              <button className="flex items-center gap-2 rounded-md border border-[#E8EEEE] px-3 py-1.5 font-['Poppins'] text-[11px] text-[#475569]">
                This Week
                <ChevronDown size={12} />
              </button>

            </div>

            <div className="mt-4 flex items-center gap-5">

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#0F766E]" />
                <span className="font-['Poppins'] text-[11px] text-[#64748B]">
                  This Week
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#CBD5E1]" />
                <span className="font-['Poppins'] text-[11px] text-[#64748B]">
                  Last Week
                </span>
              </div>

            </div>

            {/* Chart */}

            <div className="mt-4 h-55 w-full">

              <svg
                viewBox="0 0 700 260"
                className="h-full w-full"
                preserveAspectRatio="none"
              >

                {/* Grid */}

                {[40, 90, 140, 190, 240].map((y) => (
                  <line
                    key={y}
                    x1="45"
                    y1={y}
                    x2="680"
                    y2={y}
                    stroke="#E8EEEE"
                    strokeWidth="1"
                  />
                ))}

                {/* Area */}

                <path
                  d="M45 190 C100 160, 120 140, 170 135 C220 130, 230 155, 275 140 C320 125, 335 150, 380 145 C425 140, 455 105, 500 115 C545 125, 570 70, 610 85 C640 95, 660 120, 680 105 L680 240 L45 240 Z"
                  fill="#E8F5F3"
                  opacity="0.8"
                />

                {/* This week */}

                <path
                  d="M45 190 C100 160, 120 140, 170 135 C220 130, 230 155, 275 140 C320 125, 335 150, 380 145 C425 140, 455 105, 500 115 C545 125, 570 70, 610 85 C640 95, 660 120, 680 105"
                  fill="none"
                  stroke="#0F766E"
                  strokeWidth="3"
                />

                {/* Last week */}

                <path
                  d="M45 220 C100 195, 120 190, 170 185 C220 180, 230 205, 275 190 C320 175, 335 200, 380 195 C425 190, 455 160, 500 175 C545 190, 570 135, 610 150 C640 160, 660 175, 680 165"
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />

                {/* Points */}

                {[45, 170, 275, 380, 500, 610, 680].map((x, index) => {
                  const points = [190, 135, 140, 145, 115, 85, 105];

                  return (
                    <circle
                      key={x}
                      cx={x}
                      cy={points[index]}
                      r="4"
                      fill="white"
                      stroke="#0F766E"
                      strokeWidth="2"
                    />
                  );
                })}

              </svg>

            </div>

            <div className="mt-1 flex justify-between pl-10 font-['Poppins'] text-[10px] text-[#94A3B8]">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

          </div>


          {/* =================================================
              ORDER STATUS
          ================================================= */}

          <div className="rounded-xl border border-[#E8EEEE] bg-white p-4 xl:col-span-3">

            <div className="flex items-center justify-between">

              <h2 className="font-['Poppins'] text-[15px] font-semibold text-[#1E293B]">
                Order Status
              </h2>

              <button className="font-['Poppins'] text-[11px] font-medium text-[#0F766E]">
                View All
              </button>

            </div>

            <div className="mt-3 space-y-2">

              {orderStatuses.map((status) => {
                const Icon = status.icon;

                return (
                  <div
                    key={status.label}
                    className="flex items-center justify-between"
                  >

                    <div className="flex items-center gap-2">

                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full ${status.iconClass}`}
                      >
                        <Icon size={11} />
                      </div>

                      <span className="font-['Poppins'] text-[11px] text-[#475569]">
                        {status.label}
                      </span>

                    </div>

                    <div className="flex items-center gap-4">

                      <span className="font-['Poppins'] text-[10px] font-medium text-[#1E293B]">
                        {status.count}
                      </span>

                      <span className="w-8 text-right font-['Poppins'] text-[9px] text-[#94A3B8]">
                        {status.percentage}
                      </span>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>


          {/* =================================================
              LOW STOCK ALERTS
          ================================================= */}

          <div className="rounded-xl border border-[#E8EEEE] bg-white p-4 xl:col-span-3">

            <div className="flex items-center justify-between">

              <h2 className="font-['Poppins'] text-[15px] font-semibold text-[#1E293B]">
                Low Stock Alerts
              </h2>

              <button className="font-['Poppins'] text-[11px] font-medium text-[#0F766E]">
                View All
              </button>

            </div>

            <div className="mt-3 space-y-3">

              {lowStockProducts.map((product) => (
                <div key={product.name}>

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2">

                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F8FAFC]">
                        <Package
                          size={14}
                          className="text-[#475569]"
                        />
                      </div>

                      <div>
                        <p className="font-['Poppins'] text-[10px] font-medium text-[#334155]">
                          {product.name}
                        </p>

                        <p className="font-['Poppins'] text-[9px] text-[#94A3B8]">
                          Stock: {product.stock}
                        </p>
                      </div>

                    </div>

                  </div>

                  <div className="mt-1 h-1 rounded-full bg-[#F1F5F9]">
                    <div
                      className="h-full rounded-full bg-[#0F766E]"
                      style={{ width: product.width }}
                    />
                  </div>

                </div>
              ))}

            </div>

            <button className="mt-4 w-full rounded-md border border-[#0F766E] py-2 font-['Poppins'] text-[11px] font-medium text-[#0F766E] transition-colors hover:bg-[#0F766E] hover:text-white">
              View All Products
            </button>

          </div>

        </div>
  )
}

export default SalesOrderLowstockStatus