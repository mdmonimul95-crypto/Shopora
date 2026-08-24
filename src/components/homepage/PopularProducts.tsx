
import Image from "next/image";
import React from "react";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import { Product } from "@/type/homePage";

const products: Product[] = [
  {
    id: "popular-1",
    name: "Bluetooth Earbuds",
    category: "Audio",
    brand: "SoundMax",
    price: 39.99,
    rating: 4.6,
    reviews: 120,
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "popular-2",
    name: "Men's Casual Shirt",
    category: "100% Cotton",
    brand: "UrbanWear",
    price: 22.99,
    rating: 4.3,
    reviews: 92,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "popular-3",
    name: "LED Desk Lamp",
    category: "Eye Protection",
    brand: "LumiHome",
    price: 18.99,
    rating: 4.5,
    reviews: 76,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "popular-4",
    name: "Coffee Maker",
    category: "1.5L Capacity",
    brand: "BrewPro",
    price: 49.99,
    rating: 4.4,
    reviews: 107,
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "popular-5",
    name: "Indoor Plant",
    category: "Air Purifying",
    brand: "GreenLeaf",
    price: 15.99,
    rating: 4.7,
    reviews: 84,
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=80",
  },
];

const PopularProducts = () => {
  return (
    <section className="bg-white px-4 py-15 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-['Poppins'] text-lg font-semibold tracking-tight text-[#1E293B] md:text-2xl">
            Popular Products
          </h2>

          <button
            type="button"
            className="group flex items-center gap-1.5 font-['Poppins'] text-xs font-medium text-[#0F766E] transition-colors duration-300 hover:text-[#FF6B6B] sm:text-sm"
          >
            View All Products

            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        {/* Product Slider */}
        <div className="relative">

          {/* Left Arrow */}
          <button
            type="button"
            aria-label="Previous products"
            className="absolute -left-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#E8EEEE] bg-white text-[#64748B] shadow-sm transition-all duration-300 hover:border-[#0F766E] hover:text-[#0F766E] sm:-left-4"
          >
            <ChevronLeft size={17} />
          </button>

          {/* Products */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

            {products.map((product) => (
              <div
                key={product.id}
                className="group relative overflow-hidden rounded-xl border border-[#E8EEEE] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#CFE7E4] hover:shadow-[0_8px_25px_rgba(15,118,110,0.10)]"
              >

                {/* Wishlist */}
                <button
                  type="button"
                  aria-label={`Add ${product.name} to wishlist`}
                  className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#94A3B8] transition-all duration-300 hover:text-[#FF6B6B]"
                >
                  <Heart
                    size={14}
                    strokeWidth={1.8}
                  />
                </button>

                {/* Image */}
                <div className="relative flex h-32 items-center justify-center overflow-hidden bg-[#F6FAF9] px-4 py-3 sm:h-36">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={220}
                    height={220}
                    className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Product Information */}
                <div className="px-3 pb-3 pt-2.5">

                  {/* Product Name */}
                  <h3 className="truncate font-['Poppins']  font-semibold text-[#1E293B] md:text-[16px] text-[14px]">
                    {product.name}
                  </h3>

                  {/* Category / Short Info */}
                  <p className="mt-0.5 truncate font-['Poppins'] text-[12px] text-[#94A3B8] sm:text-[9px]">
                    {product.category}
                  </p>

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
                  <div className="mt-1">
                    <span className="font-['Poppins'] text-xs font-bold text-[#1E293B]">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Add To Cart */}
                  <button
                    type="button"
                    className="mt-2.5 w-full rounded-md bg-[#0F766E] py-1.5 font-['Poppins'] text-[12px] md:text-[16px] font-medium text-white transition-all duration-300 hover:bg-[#0B625B]"
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
            aria-label="Next products"
            className="absolute -right-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#E8EEEE] bg-white text-[#64748B] shadow-sm transition-all duration-300 hover:border-[#0F766E] hover:text-[#0F766E] sm:-right-4"
          >
            <ChevronRight size={17} />
          </button>

        </div>
      </div>
    </section>
  );
};

export default PopularProducts;