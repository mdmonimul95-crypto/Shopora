import React from "react";
import {
  ChevronDown,
  Truck,
} from "lucide-react";

const HeaderTopBar = () => {
  return (
    <div className="hidden border-b border-[#E8EEEE] bg-[#F6FAF9] lg:block">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4">

        {/* Left */}
        <div className="flex items-center gap-2">
          <Truck
            size={13}
            strokeWidth={1.8}
            className="text-[#0F766E]"
          />

          <span className="font-['Poppins'] text-[14px] font-medium text-[#475569]">
            Free shipping on orders over $50
          </span>
        </div>

        {/* Center */}
        <p className="font-['Poppins'] text-[14px] font-medium text-[#475569]">
          Smart Shopping, Made Simple
        </p>

        {/* Right */}
        <div className="flex items-center gap-5">

          <button
            type="button"
            className="font-['Poppins'] text-[14px] font-medium text-[#475569] transition-colors hover:text-[#0F766E]"
          >
            Track Order
          </button>

          <button
            type="button"
            className="font-['Poppins'] text-[10px] font-medium text-[#475569] transition-colors hover:text-[#0F766E]"
          >
            Help
          </button>

          <button
            type="button"
            className="flex items-center gap-1 font-['Poppins'] text-[10px] font-medium text-[#475569] transition-colors hover:text-[#0F766E]"
          >
            English

            <ChevronDown size={11} />
          </button>

        </div>
      </div>
    </div>
  );
};

export default HeaderTopBar;