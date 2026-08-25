import { Bell, Package, RefreshCcw, ShoppingCart, UserPlus } from 'lucide-react';
import React from 'react'
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
    revenue: "$9,854.44",
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
    text: "New order #ORD-8321 has been placed",
    time: "2 min ago",
    icon: ShoppingCart,
    className: "bg-[#E8F5F3] text-[#0F766E]",
  },
  {
    text: "Order #ORD-8320 status changed to Processing",
    time: "15 min ago",
    icon: Package,
    className: "bg-[#EAF2FF] text-[#2563EB]",
  },
  {
    text: 'Product "Wireless Headphones" stock updated',
    time: "1 hour ago",
    icon: RefreshCcw,
    className: "bg-[#F1EBFF] text-[#7C3AED]",
  },
  {
    text: 'Low stock alert for "Coffee Maker"',
    time: "2 hours ago",
    icon: Bell,
    className: "bg-[#FFF0F0] text-[#EF4444]",
  },
  {
    text: "New customer John Smith has registered",
    time: "3 hours ago",
    icon: UserPlus,
    className: "bg-[#E8F5F3] text-[#0F766E]",
  },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case "Paid":
      return "bg-[#E8F5F3] text-[#0F766E]";

    case "Processing":
      return "bg-[#EAF2FF] text-[#2563EB]";

    case "Shipped":
      return "bg-[#E8F5F3] text-[#0F766E]";

    case "Delivered":
      return "bg-[#EEF8E8] text-[#65A30D]";

    case "Pending":
      return "bg-[#FFF4E5] text-[#F59E0B]";

    default:
      return "bg-[#F1F5F9] text-[#64748B]";
  }
};

const RecentOrderAndTopProductAndActivities = () => {
  return (
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-12">

          {/* =================================================
              RECENT ORDERS
          ================================================= */}

          <div className="overflow-hidden rounded-xl border border-[#E8EEEE] bg-white xl:col-span-5">

            <div className="flex items-center justify-between border-b border-[#E8EEEE] px-4 py-3">

              <h2 className="font-['Poppins'] text-[15px] font-semibold text-[#1E293B]">
                Recent Orders
              </h2>

              <button className="font-['Poppins'] text-[11px] font-medium text-[#0F766E]">
                View All
              </button>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-150">

                <thead>
                  <tr className="border-b border-[#F1F5F9]">

                    <th className="px-4 py-2 text-left font-['Poppins'] text-[9px] font-medium text-[#64748B]">
                      Order ID
                    </th>

                    <th className="px-2 py-2 text-left font-['Poppins'] text-[9px] font-medium text-[#64748B]">
                      Customer
                    </th>

                    <th className="px-2 py-2 text-left font-['Poppins'] text-[9px] font-medium text-[#64748B]">
                      Amount
                    </th>

                    <th className="px-2 py-2 text-left font-['Poppins'] text-[9px] font-medium text-[#64748B]">
                      Status
                    </th>

                    <th className="px-4 py-2 text-left font-['Poppins'] text-[9px] font-medium text-[#64748B]">
                      Date
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-[#F8FAFC] last:border-0"
                    >

                      <td className="px-4 py-2.5 font-['Poppins'] text-[10px] font-medium text-[#0F766E]">
                        {order.id}
                      </td>

                      <td className="px-2 py-2.5 font-['Poppins'] text-[10px] text-[#475569]">
                        {order.customer}
                      </td>

                      <td className="px-2 py-2.5 font-['Poppins'] text-[10px] text-[#475569]">
                        {order.amount}
                      </td>

                      <td className="px-2 py-2.5">

                        <span
                          className={`rounded-full px-2 py-1 font-['Poppins'] text-[8px] font-medium ${getStatusClass(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>

                      </td>

                      <td className="px-4 py-2.5 font-['Poppins'] text-[9px] text-[#64748B]">
                        {order.date}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>


          {/* =================================================
              TOP SELLING PRODUCTS
          ================================================= */}

          <div className="rounded-xl border border-[#E8EEEE] bg-white p-4 xl:col-span-3">

            <div className="flex items-center justify-between">

              <h2 className="font-['Poppins'] text-[15px] font-semibold text-[#1E293B]">
                Top Selling Products
              </h2>

              <button className="font-['Poppins'] text-[11px] font-medium text-[#0F766E]">
                View All
              </button>

            </div>

            <div className="mt-3 space-y-3">

              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center gap-2"
                >

                  <span className="w-4 font-['Poppins'] text-[9px] font-medium text-[#94A3B8]">
                    {index + 1}.
                  </span>

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#F8FAFC]">
                    <Package size={13} className="text-[#475569]" />
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="truncate font-['Poppins'] text-[9px] font-medium text-[#334155]">
                      {product.name}
                    </p>

                    <div className="flex justify-between">

                      <span className="font-['Poppins'] text-[8px] text-[#94A3B8]">
                        {product.sold} sold
                      </span>

                      <span className="font-['Poppins'] text-[8px] font-medium text-[#475569]">
                        {product.revenue}
                      </span>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>


          {/* =================================================
              RECENT ACTIVITIES
          ================================================= */}

          <div className="rounded-xl border border-[#E8EEEE] bg-white p-4 xl:col-span-4">

            <div className="flex items-center justify-between">

              <h2 className="font-['Poppins'] text-[15px] font-semibold text-[#1E293B]">
                Recent Activities
              </h2>

            </div>

            <div className="mt-3 space-y-3">

              {activities.map((activity) => {
                const Icon = activity.icon;

                return (
                  <div
                    key={activity.text}
                    className="flex items-start gap-3"
                  >

                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${activity.className}`}
                    >
                      <Icon size={13} />
                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="font-['Poppins'] text-[10px] leading-4 text-[#475569]">
                        {activity.text}
                      </p>

                      <p className="font-['Poppins'] text-[8px] text-[#94A3B8]">
                        {activity.time}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </div>
  )
}

export default RecentOrderAndTopProductAndActivities