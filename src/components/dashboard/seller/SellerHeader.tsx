'use client'
import { useSession } from '@/app/lib/auth-client'
import { CalendarDays, ChevronDown } from 'lucide-react'
import React from 'react'



const SellerHeader = () => {
    const {data:session} = useSession()
const username = session?.user?.name;
  return (
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

          <div>
            <h1 className="font-['Poppins'] text-2xl font-bold text-[#1E293B] sm:text-3xl">
              Welcome back, {username}! 👋
            </h1>

            <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
              Here&apos;s what&apos;s happening with your store today.
            </p>
          </div>

          <button
            type="button"
            className="flex h-11 items-center gap-2 self-start rounded-lg border border-[#E2E8F0] bg-white px-4 font-['Poppins'] text-[14px] font-medium text-[#475569] shadow-sm transition-colors hover:border-[#0F766E] hover:text-[#0F766E]"
          >
            <CalendarDays size={17} />

            May 20, 2024 - May 26, 2024

            <ChevronDown size={16} />
          </button>

        </div>
  )
}

export default SellerHeader