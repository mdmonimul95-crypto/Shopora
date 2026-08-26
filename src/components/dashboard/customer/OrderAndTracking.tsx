import { Bot, ChevronRight } from 'lucide-react'
import Image from 'next/image';
import React from 'react'


const recentOrders = [
  {
    id: "#ORD-8321",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80",
    date: "May 26, 2024",
    price: "$59.99",
    items: "1 Item",
    status: "Delivered",
  },
  {
    id: "#ORD-8320",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=200&q=80",
    date: "May 24, 2024",
    price: "$89.99",
    items: "2 Items",
    status: "Processing",
  },
  {
    id: "#ORD-8317",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=200&q=80",
    date: "May 20, 2024",
    price: "$18.99",
    items: "1 Item",
    status: "Delivered",
  },
  {
    id: "#ORD-8315",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80",
    date: "May 18, 2024",
    price: "$49.99",
    items: "1 Item",
    status: "Cancelled",
  },
];


const getStatusClass = (status: string) => {
  if (status === "Delivered") {
    return "bg-[#EAF7E7] text-[#4D9A38]";
  }

  if (status === "Processing") {
    return "bg-[#EAF3FF] text-[#2563EB]";
  }

  if (status === "Cancelled") {
    return "bg-[#F1F2F4] text-[#64748B]";
  }

  return "bg-[#FFF3E8] text-[#F97316]";
};


const OrderAndTracking = () => {
  return (
     <section className="mb-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.05fr_1fr]">

        {/* Recent Orders */}
        <div className="overflow-hidden rounded-xl border border-[#E8EEEE] bg-white">

          <div className="flex items-center justify-between border-b border-[#E8EEEE] px-5 py-4">

            <h2 className="font-['Poppins'] text-[16px] font-semibold text-[#0F172A]">
              Recent Orders
            </h2>

            <button
              type="button"
              className="font-['Poppins'] text-[14px] font-medium text-[#0F766E] hover:underline"
            >
              View All Orders
            </button>

          </div>

          <div className="px-4 pb-3">

            {recentOrders.map((order) => (

              <div
                key={order.id}
                className="grid grid-cols-[56px_1fr_auto_20px] items-center gap-3 border-b border-[#EEF2F2] py-3 last:border-b-0 sm:grid-cols-[62px_1fr_100px_80px_20px]"
              >

                {/* Product Image */}
                <div className="flex h-12 w-14 items-center justify-center overflow-hidden rounded-lg border border-[#E8EEEE] bg-white">

                  <Image
                    src={order.image}
                    alt={order.id}
                    className="h-full w-full object-contain"
                    height={512}
                    width={512}
                  />

                </div>

                {/* Order Info */}
                <div className="min-w-0">

                  <p className="truncate font-['Poppins'] text-[14px] font-semibold text-[#0F766E]">
                    Order {order.id}
                  </p>

                  <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
                    {order.date}
                  </p>

                </div>

                {/* Price */}
                <div className="hidden sm:block">

                  <p className="font-['Poppins'] text-[14px] font-semibold text-[#1E293B]">
                    {order.price}
                  </p>

                  <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
                    {order.items}
                  </p>

                </div>

                {/* Status */}
                <span
                  className={`hidden w-fit rounded-md px-3 py-1.5 font-['Poppins'] text-[14px] font-medium sm:inline-flex ${getStatusClass(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>

                <ChevronRight
                  size={18}
                  className="text-[#475569]"
                />

              </div>

            ))}

          </div>

        </div>


        {/* Right Column */}
        <div className="flex flex-col gap-5">

          {/* Order Tracking */}
          <div className="rounded-xl border border-[#E8EEEE] bg-white p-5">

            <div className="flex items-center justify-between">

              <h2 className="font-['Poppins'] text-[16px] font-semibold text-[#0F172A]">
                Order Tracking
              </h2>

              <button
                type="button"
                className="font-['Poppins'] text-[14px] font-medium text-[#0F766E] hover:underline"
              >
                View All
              </button>

            </div>

            <div className="mt-5 flex items-center justify-between">

              <div>

                <p className="font-['Poppins'] text-[14px] font-semibold text-[#334155]">
                  Order <span className="text-[#0F766E]">#ORD-8320</span>
                </p>

                <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
                  Placed on May 24, 2024
                </p>

              </div>

              <span className="rounded-md bg-[#EAF3FF] px-3 py-1.5 font-['Poppins'] text-[14px] font-medium text-[#2563EB]">
                Processing
              </span>

            </div>


            {/* Tracking Timeline */}
            <div className="mt-7">

              <div className="relative flex items-start justify-between">

                <div className="absolute left-[8%] right-[8%] top-4 h-0.5 bg-[#0F766E]" />

                {/* Step 1 */}
                <div className="relative z-10 flex flex-col items-center">

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F766E] font-['Poppins'] text-[14px] font-semibold text-white">
                    1
                  </div>

                  <p className="mt-2 text-center font-['Poppins'] text-[14px] font-semibold text-[#0F766E]">
                    Order
                    <br />
                    Placed
                  </p>

                  <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
                    May 24
                  </p>

                </div>


                {/* Step 2 */}
                <div className="relative z-10 flex flex-col items-center">

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F766E] font-['Poppins'] text-[14px] font-semibold text-white">
                    2
                  </div>

                  <p className="mt-2 text-center font-['Poppins'] text-[14px] font-semibold text-[#0F766E]">
                    Processing
                  </p>

                  <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
                    May 25
                  </p>

                </div>


                {/* Step 3 */}
                <div className="relative z-10 flex flex-col items-center">

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#CBD5E1] font-['Poppins'] text-[14px] font-semibold text-white">
                    3
                  </div>

                  <p className="mt-2 text-center font-['Poppins'] text-[14px] font-medium text-[#64748B]">
                    Shipped
                  </p>

                  <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
                    -
                  </p>

                </div>


                {/* Step 4 */}
                <div className="relative z-10 flex flex-col items-center">

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#CBD5E1] font-['Poppins'] text-[14px] font-semibold text-white">
                    4
                  </div>

                  <p className="mt-2 text-center font-['Poppins'] text-[14px] font-medium text-[#64748B]">
                    Delivered
                  </p>

                  <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
                    -
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* AI Assistant */}
          <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-[#E8EEEE] bg-white p-5 sm:flex-row">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5F3]">
                <Bot
                  size={24}
                  className="text-[#0F766E]"
                />
              </div>

              <div>

                <h3 className="font-['Poppins'] text-[14px] font-semibold text-[#1E293B]">
                  Shopora AI Assistant
                </h3>

                <p className="mt-1 max-w-md font-['Poppins'] text-[14px] leading-5 text-[#64748B]">
                  Get personalized product recommendations,
                  <br className="hidden sm:block" />
                  track orders, and more.
                </p>

              </div>

            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#0F766E] px-5 py-3 font-['Poppins'] text-[14px] font-semibold text-[#0F766E] transition hover:bg-[#0F766E] hover:text-white sm:w-auto"
            >
              <Bot size={18} />
              Chat Now
            </button>

          </div>

        </div>

      </section>
  )
}

export default OrderAndTracking