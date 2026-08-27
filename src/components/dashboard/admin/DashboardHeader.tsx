import { ChevronDown, Clock3 } from 'lucide-react'
import React from 'react'

const DashboardHeader = () => {
  return (
    <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="font-['Poppins'] text-2xl font-bold text-[#1E293B]">
              Dashboard
            </h1>

            <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
              Welcome back! Here&apos;s what&apos;s happening with your store today.
            </p>
          </div>

          <button
            type="button"
            className="flex w-fit items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-4 py-2.5 font-['Poppins'] text-[13px] font-medium text-[#475569] shadow-sm transition-colors hover:border-[#0F766E] hover:text-[#0F766E]"
          >
            <Clock3 size={14} />

            May 20, 2024 — May 26, 2024

            <ChevronDown size={14} />
          </button>

        </div>

  )
}

export default DashboardHeader