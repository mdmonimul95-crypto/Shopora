import { Mail } from "lucide-react";
import React from "react";

const Newsletter = () => {
  return (
    <section className="bg-white px-4 py-15 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-5 rounded-2xl bg-[#0F766E] px-6 py-7 sm:flex-row sm:justify-between sm:px-10 sm:py-8 lg:px-10">

          {/* Left Content */}
          <div className="flex items-center gap-4">
            
            {/* Icon */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/70 text-white sm:h-14 sm:w-14">
              <Mail
                size={28}
                strokeWidth={1.5}
              />
            </div>

            {/* Text */}
            <div>
              <h2 className="font-['Poppins'] text-base font-semibold text-white sm:text-lg">
                Stay in the loop
              </h2>

              <p className="mt-1 max-w-md font-['Poppins'] text-[9px] leading-4 text-white/80 sm:text-[10px] sm:leading-5 md:text-xs">
                Subscribe to get updates on new arrivals, exclusive deals and
                more.
              </p>
            </div>
          </div>

          {/* Subscribe Form */}
          <form className="flex w-full max-w-97.5 overflow-hidden rounded-lg bg-white sm:w-97.5">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              className="min-w-0 flex-1 bg-white px-4 py-3 font-['Poppins'] text-[10px] text-[#1E293B] outline-none placeholder:text-[#94A3B8] sm:text-xs"
            />

            <button
              type="submit"
              className="shrink-0 bg-[#FF6B6B] px-5 py-3 font-['Poppins'] text-[10px] font-medium text-white transition-colors duration-300 hover:bg-[#F05454] sm:px-7 sm:text-xs"
            >
              Subscribe
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;