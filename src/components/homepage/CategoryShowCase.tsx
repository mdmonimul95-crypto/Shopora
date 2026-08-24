import React from "react";

import Image from "next/image";
import { Category } from "@/type/homePage";

const categories: Category[] = [
  {
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  },
  {
    name: "Home & Living",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c",
  },
  {
    name: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
  },
  {
    name: "Sports & Outdoors",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
  },
  {
    name: "Baby & Toys",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1",
  },
];

const categoryItems: Record<string, string> = {
  Electronics: "1200+ items",
  Fashion: "2500+ items",
  "Home & Living": "1800+ items",
  "Beauty & Personal Care": "900+ items",
  "Sports & Outdoors": "1100+ items",
  "Baby & Toys": "1600+ items",
};

const CategoryShowCase = () => {
  return (
    <section className="bg-white px-4 py-10 md:py-15 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-['Poppins'] text-lg font-semibold tracking-tight text-[#1E293B] sm:text-xl">
            Shop by Categories
          </h2>

          <button
            type="button"
            className="group flex items-center gap-1.5 font-['Poppins'] text-xs font-medium text-[#0F766E] transition-colors duration-300 hover:text-[#FF6B6B] sm:text-sm"
          >
            View All Categories

            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group cursor-pointer overflow-hidden rounded-xl border border-[#E8EEEE] bg-white shadow-[0_2px_12px_rgba(15,118,110,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#CFE7E4] hover:shadow-[0_8px_25px_rgba(15,118,110,0.10)]"
            >
              {/* Image */}
              <div className="flex h-32 items-center justify-center overflow-hidden bg-[#F6FAF9] px-4 py-3 sm:h-36">
                <Image
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                  height={512}
                  width={512}
                />
              </div>
             

              {/* Content */}
              <div className="px-3 pb-4 pt-3 text-center">
                <h3 className="truncate font-['Poppins'] text-xs font-semibold text-[#1E293B] md:text-lg">
                  {category.name}
                </h3>

                <p className="mt-1 font-['Poppins'] text-[10px] text-[#94A3B8] sm:text-[11px]">
                  {categoryItems[category.name]}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategoryShowCase;