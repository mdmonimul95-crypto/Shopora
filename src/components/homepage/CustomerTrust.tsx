import {
  Headphones,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import React from "react";
import { Testimonial, TrustStat } from "@/type/homePage";

const testimonial: Testimonial = {
  id: "testimonial-1",
  quote:
    "Shopora made online shopping so easy and enjoyable. The AI recommendations are spot on!",
  author: "Sarah Johnson",
  rating: 5,
};

const trustStats: TrustStat[] = [
  {
    id: "happy-customers",
    icon: UsersRound,
    value: "50K+",
    label: "Happy Customers",
  },
  {
    id: "satisfaction-rate",
    icon: ShieldCheck,
    value: "99.5%",
    label: "Satisfaction Rate",
  },
  {
    id: "customer-support",
    icon: Headphones,
    value: "24/7",
    label: "Customer Support",
  },
];

const CustomerTrust = () => {
  return (
    <section className="bg-white px-4 py-15 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Main Card */}
        <div className="relative overflow-hidden rounded-2xl bg-[#E8F5F3] px-6 py-7 sm:px-10 sm:py-8 lg:px-16">

          {/* Decorative Quote */}
          <span className="absolute left-4 top-1 font-serif text-7xl leading-none text-[#C9E9E5] sm:left-8">
            “
          </span>

          <span className="absolute -bottom-2 left-[42%] font-serif text-7xl leading-none text-[#C9E9E5]">
            ”
          </span>

          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.1fr_1.4fr]">

            {/* Testimonial */}
            <div className="border-b border-[#CFE7E4] pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-12">

              <h2 className="font-['Poppins'] text-lg font-semibold tracking-tight text-[#1E293B] sm:text-xl">
                What Our Customers Say
              </h2>

              <p className="mt-7 max-w-md font-['Poppins'] text-xs font-medium leading-5 text-[#334155] sm:text-sm sm:leading-6">
                {testimonial.quote}
              </p>

              <div className="mt-4 flex items-center gap-4">
                <span className="font-['Poppins'] text-xs font-semibold text-[#1E293B]">
                  — {testimonial.author}
                </span>

                {/* Rating */}
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: testimonial.rating }).map(
                    (_, index) => (
                      <span
                        key={index}
                        className="text-sm leading-none text-[#FFB020]"
                      >
                        ★
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Trust Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6">

              {trustStats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.id}
                    className="flex flex-col items-center text-center"
                  >
                    {/* Icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white sm:h-14 sm:w-14">
                      <Icon
                        size={25}
                        strokeWidth={1.7}
                        className="text-[#0F766E]"
                      />
                    </div>

                    {/* Value */}
                    <h3 className="mt-3 font-['Poppins'] text-lg font-bold text-[#1E293B] sm:text-xl md:text-2xl">
                      {stat.value}
                    </h3>

                    {/* Label */}
                    <p className="mt-0.5 font-['Poppins'] text-[9px] text-[#64748B] sm:text-[10px] md:text-xs">
                      {stat.label}
                    </p>
                  </div>
                );
              })}

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerTrust;