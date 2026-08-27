import { ArrowUpRight, BarChart3, Package, Sparkles, Tag } from 'lucide-react'
import React from 'react'

const QuickAction = () => {
  return (
     <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

          {/* AI Description */}

          <div className="rounded-xl border border-[#E8EEEE] bg-white p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F5F3] text-[#0F766E]">
                <Sparkles size={17} />
              </div>

              <h3 className="font-['Poppins'] text-[12px] font-semibold text-[#1E293B]">
                AI Description Generator
              </h3>

            </div>

            <p className="mt-2 font-['Poppins'] text-[9px] leading-4 text-[#64748B]">
              Generate product descriptions using AI.
            </p>

            <button className="mt-2 flex items-center gap-1 font-['Poppins'] text-[9px] font-medium text-[#0F766E]">
              Go to Tool
              <ArrowUpRight size={11} />
            </button>

          </div>


          {/* AI Recommendations */}

          <div className="rounded-xl border border-[#E8EEEE] bg-white p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F1EBFF] text-[#7C3AED]">
                <Sparkles size={17} />
              </div>

              <h3 className="font-['Poppins'] text-[12px] font-semibold text-[#1E293B]">
                AI Product Recommendations
              </h3>

            </div>

            <p className="mt-2 font-['Poppins'] text-[9px] leading-4 text-[#64748B]">
              View AI recommended products for your customers.
            </p>

            <button className="mt-2 flex items-center gap-1 font-['Poppins'] text-[9px] font-medium text-[#0F766E]">
              View Recommendations
              <ArrowUpRight size={11} />
            </button>

          </div>


          {/* Inventory */}

          <div className="rounded-xl border border-[#E8EEEE] bg-white p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F5F3] text-[#0F766E]">
                <Package size={17} />
              </div>

              <h3 className="font-['Poppins'] text-[12px] font-semibold text-[#1E293B]">
                Inventory Notifications
              </h3>

            </div>

            <p className="mt-2 font-['Poppins'] text-[9px] leading-4 text-[#64748B]">
              Manage stock alerts and inventory updates.
            </p>

            <button className="mt-2 flex items-center gap-1 font-['Poppins'] text-[9px] font-medium text-[#0F766E]">
              Manage Alerts
              <ArrowUpRight size={11} />
            </button>

          </div>


          {/* Coupons */}

          <div className="rounded-xl border border-[#E8EEEE] bg-white p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF4E5] text-[#F59E0B]">
                <Tag size={17} />
              </div>

              <h3 className="font-['Poppins'] text-[12px] font-semibold text-[#1E293B]">
                Coupons & Discounts
              </h3>

            </div>

            <p className="mt-2 font-['Poppins'] text-[9px] leading-4 text-[#64748B]">
              Create and manage coupons and promotions.
            </p>

            <button className="mt-2 flex items-center gap-1 font-['Poppins'] text-[9px] font-medium text-[#0F766E]">
              Manage Coupons
              <ArrowUpRight size={11} />
            </button>

          </div>


          {/* Reports */}

          <div className="rounded-xl border border-[#E8EEEE] bg-white p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF2FF] text-[#2563EB]">
                <BarChart3 size={17} />
              </div>

              <h3 className="font-['Poppins'] text-[12px] font-semibold text-[#1E293B]">
                Reports & Analytics
              </h3>

            </div>

            <p className="mt-2 font-['Poppins'] text-[9px] leading-4 text-[#64748B]">
              View detailed reports and store analytics.
            </p>

            <button className="mt-2 flex items-center gap-1 font-['Poppins'] text-[9px] font-medium text-[#0F766E]">
              View Reports
              <ArrowUpRight size={11} />
            </button>

          </div>

        </div>
  )
}

export default QuickAction