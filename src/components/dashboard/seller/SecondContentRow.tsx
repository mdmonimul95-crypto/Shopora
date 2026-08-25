import { Order } from '@/type/dashboard/Seller';
import { Clock3, Eye, MessageCircle, Star } from 'lucide-react'
import React from 'react'
  const orders: Order[] = [
  {
    id: "#ORD-8321",
    customer: "Sarah Johnson",
    amount: "$59.99",
    status: "Delivered",
    date: "May 26, 2024",
  },
  {
    id: "#ORD-8320",
    customer: "Michael Brown",
    amount: "$89.99",
    status: "Shipped",
    date: "May 26, 2024",
  },
  {
    id: "#ORD-8319",
    customer: "Emily Davis",
    amount: "$129.49",
    status: "Processing",
    date: "May 25, 2024",
  },
  {
    id: "#ORD-8318",
    customer: "David Wilson",
    amount: "$45.90",
    status: "Pending",
    date: "May 25, 2024",
  },
  {
    id: "#ORD-8317",
    customer: "Jessica Lee",
    amount: "$76.00",
    status: "Delivered",
    date: "May 24, 2024",
  },
];


const StatusBadge = ({
  status,
}: {
  status: Order["status"];
}) => {
  const styles = {
    Delivered: "bg-[#E8F7E8] text-[#65A30D]",
    Shipped: "bg-[#F2ECFF] text-[#7C3AED]",
    Processing: "bg-[#EAF3FF] text-[#2563EB]",
    Pending: "bg-[#FFF2E8] text-[#EA580C]",
  };


  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 font-['Poppins'] text-[14px] font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const SecondContentRow = () => {
  return (
    <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">

          {/* ==================================================
              RECENT ORDERS
          ================================================== */}

          <div className="overflow-hidden rounded-xl border border-[#E8EEEE] bg-white lg:col-span-5">

            <div className="flex items-center justify-between border-b border-[#E8EEEE] px-5 py-4">

              <h2 className="font-['Poppins'] text-[17px] font-semibold text-[#1E293B]">
                Recent Orders
              </h2>

              <button
                type="button"
                className="font-['Poppins'] text-[14px] font-semibold text-[#0F766E]"
              >
                View All
              </button>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-162.5">

                <thead>
                  <tr className="border-b border-[#E8EEEE]">

                    <th className="px-5 py-3 text-left font-['Poppins'] text-[14px] font-semibold text-[#64748B]">
                      Order ID
                    </th>

                    <th className="px-3 py-3 text-left font-['Poppins'] text-[14px] font-semibold text-[#64748B]">
                      Customer
                    </th>

                    <th className="px-3 py-3 text-left font-['Poppins'] text-[14px] font-semibold text-[#64748B]">
                      Amount
                    </th>

                    <th className="px-3 py-3 text-left font-['Poppins'] text-[14px] font-semibold text-[#64748B]">
                      Status
                    </th>

                    <th className="px-5 py-3 text-left font-['Poppins'] text-[14px] font-semibold text-[#64748B]">
                      Date
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-[#F1F5F9] last:border-0"
                    >

                      <td className="px-5 py-4 font-['Poppins'] text-[14px] font-semibold text-[#0F766E]">
                        {order.id}
                      </td>

                      <td className="px-3 py-4 font-['Poppins'] text-[14px] text-[#475569]">
                        {order.customer}
                      </td>

                      <td className="px-3 py-4 font-['Poppins'] text-[14px] font-semibold text-[#334155]">
                        {order.amount}
                      </td>

                      <td className="px-3 py-4">
                        <StatusBadge status={order.status} />
                      </td>

                      <td className="px-5 py-4 font-['Poppins'] text-[14px] text-[#64748B]">
                        {order.date}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>


          {/* ==================================================
              EARNINGS SUMMARY
          ================================================== */}

          <div className="rounded-xl border border-[#E8EEEE] bg-white p-5 lg:col-span-3">

            <div className="flex items-center justify-between">

              <h2 className="font-['Poppins'] text-[17px] font-semibold text-[#1E293B]">
                Earnings Summary
              </h2>

              <button
                type="button"
                className="font-['Poppins'] text-[14px] font-semibold text-[#0F766E]"
              >
                View Payouts
              </button>

            </div>

            <div className="mt-6">

              <p className="font-['Poppins'] text-[14px] text-[#64748B]">
                Available Balance
              </p>

              <div className="mt-1 flex items-center gap-2">

                <h3 className="font-['Poppins'] text-2xl font-bold text-[#1E293B]">
                  $1,234.50
                </h3>

                <Eye
                  size={16}
                  className="text-[#94A3B8]"
                />

              </div>

              <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
                Withdrawn this month: $2,850.00
              </p>

              <button
                type="button"
                className="mt-5 w-full rounded-lg bg-[#0F766E] py-3 font-['Poppins'] text-[14px] font-semibold text-white transition-colors hover:bg-[#0B625B]"
              >
                Withdraw Earnings
              </button>

            </div>

            <div className="mt-5 grid grid-cols-3 border-t border-[#E8EEEE] pt-5">

              <div>
                <p className="font-['Poppins'] text-[14px] text-[#64748B]">
                  This Month
                </p>

                <p className="mt-1 font-['Poppins'] text-[16px] font-bold text-[#1E293B]">
                  $3,980.50
                </p>
              </div>

              <div>
                <p className="font-['Poppins'] text-[14px] text-[#64748B]">
                  Last Month
                </p>

                <p className="mt-1 font-['Poppins'] text-[16px] font-bold text-[#1E293B]">
                  $4,125.30
                </p>
              </div>

              <div>
                <p className="font-['Poppins'] text-[14px] text-[#64748B]">
                  Total Earnings
                </p>

                <p className="mt-1 font-['Poppins'] text-[16px] font-bold text-[#1E293B]">
                  $18,765.80
                </p>
              </div>

            </div>

          </div>


          {/* ==================================================
              STORE PERFORMANCE
          ================================================== */}

          <div className="rounded-xl border border-[#E8EEEE] bg-white p-5 lg:col-span-4">

            <div className="flex items-center justify-between">

              <h2 className="font-['Poppins'] text-[17px] font-semibold text-[#1E293B]">
                Store Performance
              </h2>

              <button
                type="button"
                className="font-['Poppins'] text-[14px] font-semibold text-[#0F766E]"
              >
                View Analytics
              </button>

            </div>

            <div className="mt-4">

              {/* Positive Reviews */}
              <div className="flex items-center gap-4 border-b border-[#E8EEEE] py-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F7E8] text-[#65A30D]">
                  <Star size={22} />
                </div>

                <div className="flex-1">

                  <p className="font-['Poppins'] text-[14px] font-semibold text-[#334155]">
                    Positive Reviews
                  </p>

                  <p className="font-['Poppins'] text-[14px] text-[#64748B]">
                    Based on 98 reviews
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-['Poppins'] text-xl font-bold text-[#1E293B]">
                    4.7
                  </p>

                  <p className="text-[16px] text-[#F59E0B]">
                    ★★★★★
                  </p>

                </div>

              </div>


              {/* Response Rate */}
              <div className="flex items-center gap-4 border-b border-[#E8EEEE] py-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF3FF] text-[#3B82F6]">
                  <MessageCircle size={22} />
                </div>

                <div className="flex-1">

                  <p className="font-['Poppins'] text-[14px] font-semibold text-[#334155]">
                    Response Rate
                  </p>

                  <p className="font-['Poppins'] text-[14px] text-[#64748B]">
                    To customer inquiries
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-['Poppins'] text-xl font-bold text-[#1E293B]">
                    98%
                  </p>

                  <p className="font-['Poppins'] text-[14px] font-semibold text-[#0F766E]">
                    Excellent
                  </p>

                </div>

              </div>


              {/* Shipping Time */}
              <div className="flex items-center gap-4 py-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF2E8] text-[#F97316]">
                  <Clock3 size={22} />
                </div>

                <div className="flex-1">

                  <p className="font-['Poppins'] text-[14px] font-semibold text-[#334155]">
                    Shipping Time
                  </p>

                  <p className="font-['Poppins'] text-[14px] text-[#64748B]">
                    Average delivery time
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-['Poppins'] text-xl font-bold text-[#1E293B]">
                    1.8 Days
                  </p>

                  <p className="font-['Poppins'] text-[14px] font-semibold text-[#0F766E]">
                    Very Good
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
  )
}

export default SecondContentRow