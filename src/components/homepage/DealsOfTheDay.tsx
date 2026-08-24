import React from "react";
import { ChevronLeft, ChevronRight, Clock, Star } from "lucide-react";
import Image from "next/image";
import { Product } from "@/type/homePage";

const deals: Product[] = [
  {
    id: "deal-1",
    name: "Wireless Headphones",
    category: "Electronics",
    brand: "SoundMax",
    price: 59.99,
    oldPrice: 79.99,
    rating: 4.6,
    reviews: 120,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
    discount: "-25%",
    badge: "Noise Cancellation",
  },
  {
    id: "deal-2",
    name: "Smart Watch Series 8",
    category: "Electronics",
    brand: "TechPro",
    price: 89.99,
    oldPrice: 119.99,
    rating: 4.7,
    reviews: 95,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=80",
    discount: "-20%",
    badge: "GPS, 45mm",
  },
  {
    id: "deal-3",
    name: "Running Shoes",
    category: "Sports & Outdoors",
    brand: "SportFlex",
    price: 49.99,
    oldPrice: 59.99,
    rating: 4.5,
    reviews: 84,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
    discount: "-16%",
    badge: "Lightweight & Comfort",
  },
  {
    id: "deal-4",
    name: "Travel Backpack",
    category: "Fashion",
    brand: "TravelPro",
    price: 41.99,
    oldPrice: 59.99,
    rating: 4.4,
    reviews: 64,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80",
    discount: "-30%",
    badge: "Water Resistant",
  },
  {
    id: "deal-5",
    name: "Luxury Perfume",
    category: "Beauty & Personal Care",
    brand: "Aroma",
    price: 32.99,
    oldPrice: 39.99,
    rating: 4.6,
    reviews: 88,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=500&q=80",
    discount: "-18%",
    badge: "For Men",
  },
];

const DealsOfTheDay = () => {
  return (
    <section className="bg-white px-4 py-15 md:py-15 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-['Poppins'] text-base font-semibold text-[#1E293B] sm:text-lg">
              Deals of the Day
            </h2>

            {/* Countdown */}
            <div className="flex items-center gap-1.5">
              <Clock
                size={12}
                strokeWidth={2.5}
                className="text-[#FF6B6B]"
              />

              <span className="font-['Poppins'] text-[10px] font-medium text-[#FF6B6B] sm:text-[11px]">
                Ends in 08 : 45 : 32
              </span>
            </div>
          </div>

          {/* View All */}
          <button
            type="button"
            className="group flex items-center gap-1 font-['Poppins'] text-[10px] font-medium text-[#0F766E] transition-colors duration-300 hover:text-[#FF6B6B] sm:text-xs"
          >
            View All Deals

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        {/* Products Wrapper */}
        <div className="relative">

          {/* Left Arrow */}
          <button
            type="button"
            aria-label="Previous deals"
            className="absolute -left-3 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#64748B] shadow-sm transition-all duration-300 hover:border-[#0F766E] hover:text-[#0F766E] sm:-left-4"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Products */}
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {deals.map((product) => (
              <div
                key={product.id}
                className="group relative overflow-hidden rounded-xl border border-[#E8EEEE] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#CFE7E4] hover:shadow-[0_8px_25px_rgba(15,118,110,0.10)]"
              >

                {/* Discount */}
                {product.discount && (
                  <span className="absolute left-2 top-2 z-10 rounded bg-[#FF6B6B] px-1.5 py-0.5 font-['Poppins'] text-[8px] font-semibold text-white">
                    {product.discount}
                  </span>
                )}

                {/* Product Image */}
                <div className="flex h-32 items-center justify-center bg-[#F6FAF9] px-4 py-3 sm:h-36">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                    height={512}
                    width={512}
                  />
                </div>
               

                {/* Product Info */}
                <div className="px-3 pb-3 pt-2.5">

                  {/* Name */}
                  <h3 className="truncate font-['Poppins']  font-medium text-[#1E293B] md:text-[16px] text-[14px]">
                    {product.name}
                  </h3>

                  {/* Badge / Short Description */}
                  {product.badge && (
                    <p className="mt-0.5 truncate font-['Poppins'] text-[12px] text-[#94A3B8]">
                      {product.badge}
                    </p>
                  )}

                  {/* Rating */}
                  <div className="mt-1 flex items-center gap-1">
                    <Star
                      size={16}
                      fill="currentColor"
                      className="text-[#FFB020]"
                    />

                    <span className="font-['Poppins'] text-[16px] font-medium text-[#64748B]">
                      {product.rating}
                    </span>

                    <span className="font-['Poppins'] text-[16px] text-[#94A3B8]">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="font-['Poppins']  text-[16px] md:text-[18px] font-bold text-[#FF6B6B]">
                      ${product.price.toFixed(2)}
                    </span>

                    {product.oldPrice && (
                      <span className="font-['Poppins'] text-[12px] md:text-[18px] text-[#94A3B8] line-through">
                        ${product.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Add To Cart */}
                  <button
                    type="button"
                    className="mt-2.5 w-full rounded-md bg-[#FF6B6B] py-1.5 font-['Poppins'] text-[12px] md:text-[16px] font-medium text-white transition-all duration-300 hover:bg-[#f05454]"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            aria-label="Next deals"
            className="absolute -right-3 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#64748B] shadow-sm transition-all duration-300 hover:border-[#0F766E] hover:text-[#0F766E] sm:-right-4"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Bottom Indicator */}
        <div className="mt-4 flex justify-center gap-1.5">
          <span className="h-1.5 w-6 rounded-full bg-[#0F766E]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#CBD5E1]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#CBD5E1]" />
        </div>
      </div>
    </section>
  );
};

export default DealsOfTheDay;