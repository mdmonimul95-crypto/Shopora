"use client";

import { useSession } from "@/app/lib/auth-client";
import React from "react";
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  Box,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Package,
  ShoppingCart,
  Sparkles,
  Tag,
  Truck,
  Users,
  XCircle,
} from "lucide-react";

/* ============================================================
   DATA
============================================================ */

const stats = [
  {
    title: "Total Sales",
    value: "$24,590.00",
    change: "+18.6%",
    subtitle: "vs last week",
    icon: CircleDollarSign,
    type: "default",
  },
  {
    title: "Total Orders",
    value: "320",
    change: "+12.4%",
    subtitle: "vs last week",
    icon: ShoppingCart,
    type: "default",
  },
  {
    title: "Total Customers",
    value: "1,245",
    change: "+9.3%",
    subtitle: "vs last week",
    icon: Users,
    type: "default",
  },
  {
    title: "Average Order Value",
    value: "$76.84",
    change: "+7.8%",
    subtitle: "vs last week",
    icon: Package,
    type: "danger",
  },
  {
    title: "Total Products",
    value: "842",
    change: "+5.2%",
    subtitle: "vs last week",
    icon: Box,
    type: "default",
  },
];

const orderStatuses = [
  {
    name: "Pending",
    count: 12,
    percentage: "3.2%",
    color: "bg-orange-500",
  },
  {
    name: "Paid",
    count: 78,
    percentage: "20.8%",
    color: "bg-emerald-500",
  },
  {
    name: "Processing",
    count: 96,
    percentage: "25.6%",
    color: "bg-blue-500",
  },
  {
    name: "Packed",
    count: 54,
    percentage: "14.4%",
    color: "bg-purple-500",
  },
  {
    name: "Shipped",
    count: 56,
    percentage: "14.9%",
    color: "bg-teal-500",
  },
  {
    name: "Delivered",
    count: 120,
    percentage: "31.9%",
    color: "bg-green-500",
  },
  {
    name: "Cancelled",
    count: 8,
    percentage: "2.1%",
    color: "bg-red-500",
  },
  {
    name: "Refunded",
    count: 4,
    percentage: "1.1%",
    color: "bg-slate-500",
  },
];

const lowStockProducts = [
  {
    name: "Wireless Headphones",
    stock: 5,
  },
  {
    name: "Smart Watch Series 8",
    stock: 7,
  },
  {
    name: "LED Desk Lamp",
    stock: 2,
  },
  {
    name: "Running Shoes",
    stock: 6,
  },
  {
    name: "Coffee Maker",
    stock: 4,
  },
];

const recentOrders = [
  {
    id: "#ORD-8321",
    customer: "John Smith",
    amount: "$59.99",
    status: "Paid",
    date: "May 26, 2024",
  },
  {
    id: "#ORD-8320",
    customer: "Sarah Johnson",
    amount: "$89.99",
    status: "Processing",
    date: "May 26, 2024",
  },
  {
    id: "#ORD-8319",
    customer: "Michael Brown",
    amount: "$129.49",
    status: "Shipped",
    date: "May 25, 2024",
  },
  {
    id: "#ORD-8318",
    customer: "Emily Davis",
    amount: "$45.90",
    status: "Delivered",
    date: "May 25, 2024",
  },
  {
    id: "#ORD-8317",
    customer: "David Wilson",
    amount: "$76.00",
    status: "Pending",
    date: "May 25, 2024",
  },
];

const topProducts = [
  {
    name: "Wireless Headphones",
    sold: 156,
    revenue: "$9,353.44",
  },
  {
    name: "Smart Watch Series 8",
    sold: 132,
    revenue: "$11,878.68",
  },
  {
    name: "Running Shoes",
    sold: 98,
    revenue: "$4,899.02",
  },
  {
    name: "Coffee Maker",
    sold: 76,
    revenue: "$3,799.24",
  },
  {
    name: "LED Desk Lamp",
    sold: 64,
    revenue: "$1,215.36",
  },
];

const activities = [
  {
    title: "New order #ORD-8321 has been placed",
    time: "2 min ago",
    icon: ShoppingCart,
  },
  {
    title: "Order #ORD-8320 status changed to Processing",
    time: "15 min ago",
    icon: Package,
  },
  {
    title: 'Product "Wireless Headphones" stock updated',
    time: "1 hour ago",
    icon: Box,
  },
  {
    title: 'Low stock alert for "Coffee Maker"',
    time: "2 hours ago",
    icon: Bell,
  },
  {
    title: "New customer John Smith has registered",
    time: "3 hours ago",
    icon: Users,
  },
];

const quickActions = [
  {
    title: "AI Description Generator",
    description: "Generate product descriptions using AI.",
    button: "Go to Tool",
    icon: Sparkles,
  },
  {
    title: "AI Product Recommendations",
    description: "View AI recommended products for your customers.",
    button: "View Recommendations",
    icon: Sparkles,
  },
  {
    title: "Inventory Notifications",
    description: "Manage stock alerts and inventory updates.",
    button: "Manage Alerts",
    icon: Bell,
  },
  {
    title: "Coupons & Discounts",
    description: "Create and manage coupons and promotions.",
    button: "Manage Coupons",
    icon: Tag,
  },
  {
    title: "Reports & Analytics",
    description: "View detailed reports and store analytics.",
    button: "View Reports",
    icon: BarChart3,
  },
];

/* ============================================================
   HELPER
============================================================ */

const getStatusClasses = (status: string) => {
  switch (status) {
    case "Paid":
      return "bg-[#E8F7EE] text-[#15803D]";

    case "Processing":
      return "bg-[#EAF2FF] text-[#2563EB]";

    case "Shipped":
      return "bg-[#E6F7F5] text-[#0F766E]";

    case "Delivered":
      return "bg-[#EAF8E6] text-[#65A30D]";

    case "Pending":
      return "bg-[#FFF4E5] text-[#EA580C]";

    default:
      return "bg-[#F1F5F9] text-[#64748B]";
  }
};

/* ============================================================
   ADMIN DASHBOARD
============================================================ */

const AdminDashboard = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-[#F8FAFC]">
        <p className="font-['Poppins'] text-[14px] text-[#64748B]">
          Loading dashboard...
        </p>
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ======================================================
            DASHBOARD HEADER - START
        ======================================================= */}

        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <h1 className="font-['Poppins'] text-2xl font-bold text-[#1E293B]">
              Dashboard
            </h1>

            <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
              Welcome back! Heres what happening with your store today.
            </p>
          </div>

          <button
            type="button"
            className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-4 font-['Poppins'] text-[14px] font-medium text-[#475569] shadow-sm"
          >
            <CalendarDays size={16} />

            May 20, 2024 – May 26, 2024

            <ChevronDown size={15} />
          </button>

        </div>

        {/* ======================================================
            DASHBOARD HEADER - END
        ======================================================= */}


        {/* ======================================================
            STATISTICS CARDS - START
        ======================================================= */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-xl border border-[#E8EEEE] bg-white p-4 shadow-sm"
              >

                <div className="flex items-start justify-between">

                  <div>
                    <p className="font-['Poppins'] text-[14px] font-medium text-[#64748B]">
                      {stat.title}
                    </p>

                    <h2 className="mt-2 font-['Poppins'] text-xl font-bold text-[#1E293B]">
                      {stat.value}
                    </h2>
                  </div>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      stat.type === "danger"
                        ? "bg-[#FFF0F0] text-[#FF6B6B]"
                        : "bg-[#E8F5F3] text-[#0F766E]"
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                </div>

                <div className="mt-3 flex items-center gap-1">
                  <ArrowUpRight
                    size={14}
                    className="text-[#16A34A]"
                  />

                  <span className="font-['Poppins'] text-[14px] font-medium text-[#16A34A]">
                    {stat.change}
                  </span>

                  <span className="font-['Poppins'] text-[14px] text-[#94A3B8]">
                    {stat.subtitle}
                  </span>
                </div>

                {/* Mini chart */}
                <div className="mt-4 flex h-8 items-end gap-1">
                  {[25, 40, 30, 50, 38, 60, 48, 70, 55].map(
                    (height, index) => (
                      <div
                        key={index}
                        className={`w-full rounded-t-sm ${
                          stat.type === "danger"
                            ? "bg-[#FF6B6B]/30"
                            : "bg-[#0F766E]/25"
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}
                </div>

              </div>
            );
          })}

        </div>

        {/* ======================================================
            STATISTICS CARDS - END
        ======================================================= */}


        {/* ======================================================
            SALES + ORDER STATUS + LOW STOCK - START
        ======================================================= */}

        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.5fr_0.9fr_0.9fr]">

          {/* Sales Overview */}
          <div className="rounded-xl border border-[#E8EEEE] bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <h2 className="font-['Poppins'] text-[16px] font-semibold text-[#1E293B]">
                Sales Overview
              </h2>

              <button
                type="button"
                className="flex items-center gap-2 rounded-md border border-[#E2E8F0] px-3 py-2 font-['Poppins'] text-[14px] text-[#475569]"
              >
                This Week
                <ChevronDown size={14} />
              </button>

            </div>

            <div className="mt-4 flex items-center gap-5">
              <span className="flex items-center gap-2 font-['Poppins'] text-[14px] text-[#64748B]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0F766E]" />
                This Week
              </span>

              <span className="flex items-center gap-2 font-['Poppins'] text-[14px] text-[#64748B]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#CBD5E1]" />
                Last Week
              </span>
            </div>

            {/* Chart */}
            <div className="mt-5 h-56 rounded-lg bg-[#FCFEFE] p-3">

              <div className="flex h-full items-end gap-3">

                {[35, 52, 48, 58, 68, 88, 62].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex h-full flex-1 items-end"
                    >
                      <div
                        className="w-full rounded-t-lg bg-[#0F766E]/20"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  )
                )}

              </div>

              <div className="mt-3 flex justify-between font-['Poppins'] text-[14px] text-[#94A3B8]">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>

            </div>

          </div>


          {/* Order Status */}
          <div className="rounded-xl border border-[#E8EEEE] bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <h2 className="font-['Poppins'] text-[16px] font-semibold text-[#1E293B]">
                Order Status
              </h2>

              <button
                type="button"
                className="font-['Poppins'] text-[14px] font-medium text-[#0F766E]"
              >
                View All
              </button>

            </div>

            <div className="mt-4 space-y-3">

              {orderStatuses.map((status) => (
                <div
                  key={status.name}
                  className="flex items-center justify-between"
                >

                  <div className="flex items-center gap-2">

                    <span
                      className={`h-2.5 w-2.5 rounded-full ${status.color}`}
                    />

                    <span className="font-['Poppins'] text-[14px] text-[#475569]">
                      {status.name}
                    </span>

                  </div>

                  <div className="flex items-center gap-4">

                    <span className="font-['Poppins'] text-[14px] font-medium text-[#334155]">
                      {status.count}
                    </span>

                    <span className="w-10 text-right font-['Poppins'] text-[14px] text-[#94A3B8]">
                      {status.percentage}
                    </span>

                  </div>

                </div>
              ))}

            </div>

          </div>


          {/* Low Stock */}
          <div className="rounded-xl border border-[#E8EEEE] bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <h2 className="font-['Poppins'] text-[16px] font-semibold text-[#1E293B]">
                Low Stock Alerts
              </h2>

              <button
                type="button"
                className="font-['Poppins'] text-[14px] font-medium text-[#0F766E]"
              >
                View All
              </button>

            </div>

            <div className="mt-4 space-y-3">

              {lowStockProducts.map((product) => (
                <div
                  key={product.name}
                  className="flex items-center gap-3 border-b border-[#F1F5F9] pb-3 last:border-0"
                >

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F8FAFC]">
                    <Package
                      size={18}
                      className="text-[#64748B]"
                    />
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="truncate font-['Poppins'] text-[14px] font-medium text-[#334155]">
                      {product.name}
                    </p>

                    <div className="mt-1 flex items-center gap-2">

                      <span className="font-['Poppins'] text-[14px] text-[#64748B]">
                        Stock: {product.stock}
                      </span>

                      <div className="h-1.5 flex-1 rounded-full bg-[#E2E8F0]">
                        <div
                          className="h-full rounded-full bg-[#FF6B6B]"
                          style={{
                            width: `${Math.min(
                              product.stock * 12,
                              100
                            )}%`,
                          }}
                        />
                      </div>

                    </div>

                  </div>

                </div>
              ))}

            </div>

            <button
              type="button"
              className="mt-4 w-full rounded-lg border border-[#0F766E] py-2.5 font-['Poppins'] text-[14px] font-medium text-[#0F766E] transition-colors hover:bg-[#E8F5F3]"
            >
              View All Products
            </button>

          </div>

        </div>

        {/* ======================================================
            SALES + ORDER STATUS + LOW STOCK - END
        ======================================================= */}


        {/* ======================================================
            TABLES + ACTIVITIES - START
        ======================================================= */}

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1fr_1.1fr]">

          {/* Recent Orders */}
          <div className="overflow-hidden rounded-xl border border-[#E8EEEE] bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-[#E8EEEE] p-5">

              <h2 className="font-['Poppins'] text-[16px] font-semibold text-[#1E293B]">
                Recent Orders
              </h2>

              <button
                type="button"
                className="font-['Poppins'] text-[14px] font-medium text-[#0F766E]"
              >
                View All
              </button>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[600px]">

                <thead>
                  <tr className="border-b border-[#E8EEEE]">

                    {[
                      "Order ID",
                      "Customer",
                      "Amount",
                      "Status",
                      "Date",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-4 py-3 text-left font-['Poppins'] text-[14px] font-medium text-[#64748B]"
                      >
                        {heading}
                      </th>
                    ))}

                  </tr>
                </thead>

                <tbody>

                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-[#F1F5F9] last:border-0"
                    >

                      <td className="px-4 py-3 font-['Poppins'] text-[14px] font-medium text-[#0F766E]">
                        {order.id}
                      </td>

                      <td className="px-4 py-3 font-['Poppins'] text-[14px] text-[#475569]">
                        {order.customer}
                      </td>

                      <td className="px-4 py-3 font-['Poppins'] text-[14px] font-medium text-[#334155]">
                        {order.amount}
                      </td>

                      <td className="px-4 py-3">

                        <span
                          className={`rounded-full px-2.5 py-1 font-['Poppins'] text-[14px] font-medium ${getStatusClasses(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>

                      </td>

                      <td className="px-4 py-3 font-['Poppins'] text-[14px] text-[#64748B]">
                        {order.date}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>


          {/* Top Selling Products */}
          <div className="rounded-xl border border-[#E8EEEE] bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <h2 className="font-['Poppins'] text-[16px] font-semibold text-[#1E293B]">
                Top Selling Products
              </h2>

              <button
                type="button"
                className="font-['Poppins'] text-[14px] font-medium text-[#0F766E]"
              >
                View All
              </button>

            </div>

            <div className="mt-4 space-y-4">

              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center gap-3"
                >

                  <span className="w-5 font-['Poppins'] text-[14px] font-semibold text-[#94A3B8]">
                    {index + 1}
                  </span>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F8FAFC]">
                    <Package
                      size={19}
                      className="text-[#64748B]"
                    />
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="truncate font-['Poppins'] text-[14px] font-medium text-[#334155]">
                      {product.name}
                    </p>

                    <p className="mt-1 font-['Poppins'] text-[14px] text-[#94A3B8]">
                      {product.sold} sold
                    </p>

                  </div>

                  <span className="font-['Poppins'] text-[14px] font-medium text-[#334155]">
                    {product.revenue}
                  </span>

                </div>
              ))}

            </div>

          </div>


          {/* Recent Activities */}
          <div className="rounded-xl border border-[#E8EEEE] bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <h2 className="font-['Poppins'] text-[16px] font-semibold text-[#1E293B]">
                Recent Activities
              </h2>

            </div>

            <div className="mt-4 space-y-4">

              {activities.map((activity, index) => {
                const Icon = activity.icon;

                return (
                  <div
                    key={activity.title}
                    className="flex gap-3"
                  >

                    <div className="relative">

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F5F3] text-[#0F766E]">
                        <Icon size={16} />
                      </div>

                      {index !== activities.length - 1 && (
                        <span className="absolute left-1/2 top-9 h-5 w-px -translate-x-1/2 bg-[#E2E8F0]" />
                      )}

                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="font-['Poppins'] text-[14px] leading-5 text-[#475569]">
                        {activity.title}
                      </p>

                      <p className="mt-1 font-['Poppins'] text-[14px] text-[#94A3B8]">
                        {activity.time}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </div>

        {/* ======================================================
            TABLES + ACTIVITIES - END
        ======================================================= */}


        {/* ======================================================
            QUICK ACTIONS - START
        ======================================================= */}

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <div
                key={action.title}
                className="rounded-xl border border-[#E8EEEE] bg-white p-5 shadow-sm"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F5F3] text-[#0F766E]">
                  <Icon size={19} />
                </div>

                <h3 className="mt-4 font-['Poppins'] text-[16px] font-semibold text-[#1E293B]">
                  {action.title}
                </h3>

                <p className="mt-2 font-['Poppins'] text-[14px] leading-5 text-[#64748B]">
                  {action.description}
                </p>

                <button
                  type="button"
                  className="mt-4 flex items-center gap-2 font-['Poppins'] text-[14px] font-semibold text-[#0F766E]"
                >
                  {action.button}
                  <ArrowUpRight size={15} />
                </button>

              </div>
            );
          })}

        </div>

        {/* ======================================================
            QUICK ACTIONS - END
        ======================================================= */}

      </div>
    </div>
  );
};

export default AdminDashboard;