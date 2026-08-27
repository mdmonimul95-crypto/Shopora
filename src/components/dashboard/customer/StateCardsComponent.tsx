import { ArrowUpRight, Heart, ShoppingBag, Star, Tag, Truck } from 'lucide-react'
import React from 'react'

const StateCardsComponent = () => {
  return (
     <section className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

        {/* Total Orders */}
        <div className="rounded-xl border border-[#E8EEEE] bg-white p-5 shadow-[0_3px_15px_rgba(15,118,110,0.04)]">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5F3]">
              <ShoppingBag
                size={22}
                className="text-[#0F766E]"
              />
            </div>

            <div>
              <p className="font-['Poppins'] text-[14px] text-[#64748B]">
                Total Orders
              </p>

              <h3 className="mt-1 font-['Poppins'] text-[24px] font-bold text-[#0F172A]">
                12
              </h3>
            </div>

          </div>

          <p className="mt-3 flex items-center gap-1 font-['Poppins'] text-[14px] font-medium text-[#0F766E]">
            <ArrowUpRight size={15} />
            2 from last month
          </p>

        </div>


        {/* Active Orders */}
        <div className="rounded-xl border border-[#E8EEEE] bg-white p-5 shadow-[0_3px_15px_rgba(15,118,110,0.04)]">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFF1E5]">
              <Truck
                size={22}
                className="text-[#F97316]"
              />
            </div>

            <div>
              <p className="font-['Poppins'] text-[14px] text-[#64748B]">
                Active Orders
              </p>

              <h3 className="mt-1 font-['Poppins'] text-[24px] font-bold text-[#0F172A]">
                2
              </h3>
            </div>

          </div>

          <p className="mt-3 font-['Poppins'] text-[14px] font-medium text-[#F97316]">
            View current orders
          </p>

        </div>


        {/* Wishlist */}
        <div className="rounded-xl border border-[#E8EEEE] bg-white p-5 shadow-[0_3px_15px_rgba(15,118,110,0.04)]">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFECEF]">
              <Heart
                size={22}
                className="text-[#FF6B6B]"
              />
            </div>

            <div>
              <p className="font-['Poppins'] text-[14px] text-[#64748B]">
                Wishlist Items
              </p>

              <h3 className="mt-1 font-['Poppins'] text-[24px] font-bold text-[#0F172A]">
                8
              </h3>
            </div>

          </div>

          <p className="mt-3 font-['Poppins'] text-[14px] font-medium text-[#FF6B6B]">
            Items you love
          </p>

        </div>


        {/* Coupons */}
        <div className="rounded-xl border border-[#E8EEEE] bg-white p-5 shadow-[0_3px_15px_rgba(15,118,110,0.04)]">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F1EBFF]">
              <Tag
                size={22}
                className="text-[#8B5CF6]"
              />
            </div>

            <div>
              <p className="font-['Poppins'] text-[14px] text-[#64748B]">
                Coupons Available
              </p>

              <h3 className="mt-1 font-['Poppins'] text-[24px] font-bold text-[#0F172A]">
                3
              </h3>
            </div>

          </div>

          <p className="mt-3 font-['Poppins'] text-[14px] font-medium text-[#8B5CF6]">
            Save more on shopping
          </p>

        </div>


        {/* Loyalty Points */}
        <div className="rounded-xl border border-[#E8EEEE] bg-white p-5 shadow-[0_3px_15px_rgba(15,118,110,0.04)]">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EDF8E8]">
              <Star
                size={22}
                className="text-[#65A844]"
              />
            </div>

            <div>
              <p className="font-['Poppins'] text-[14px] text-[#64748B]">
                Loyalty Points
              </p>

              <h3 className="mt-1 font-['Poppins'] text-[24px] font-bold text-[#0F172A]">
                560
              </h3>
            </div>

          </div>

          <p className="mt-3 font-['Poppins'] text-[14px] font-medium text-[#65A844]">
            Next reward: 940 pts
          </p>

        </div>

      </section>
  )
}

export default StateCardsComponent