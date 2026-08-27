import { ChevronRight, CircleUserRound, LockKeyhole, MapPin, ShoppingCart, Star, WalletCards } from 'lucide-react'
import Image from 'next/image';
import React from 'react'

const recommendedProducts = [
  {
    id: 1,
    name: "Noise Cancelling Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
    rating: "4.6",
    reviews: "128",
    price: "$59.99",
  },
  {
    id: 2,
    name: "Smart Watch Series 8",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=80",
    rating: "4.7",
    reviews: "96",
    price: "$89.99",
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=500&q=80",
    rating: "4.5",
    reviews: "88",
    price: "$39.99",
  },
  {
    id: 4,
    name: "Travel Backpack",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80",
    rating: "4.4",
    reviews: "64",
    price: "$41.99",
  },
  {
    id: 5,
    name: "Coffee Maker",
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=500&q=80",
    rating: "4.6",
    reviews: "71",
    price: "$49.99",
  },
];

const RecommendedAndAccountSummery = () => {
  return (
       <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.3fr_1fr]">

        {/* Recommended Products */}
        <div className="overflow-hidden rounded-xl border border-[#E8EEEE] bg-white">

          <div className="flex items-center justify-between px-5 py-4">

            <h2 className="font-['Poppins'] text-[16px] font-semibold text-[#0F172A]">
              Recommended for You
            </h2>

            <button
              type="button"
              className="flex items-center gap-1 font-['Poppins'] text-[14px] font-medium text-[#0F766E]"
            >
              View All
              <ChevronRight size={16} />
            </button>

          </div>


          <div className="grid grid-cols-2 gap-3 px-4 pb-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">

            {recommendedProducts.map((product) => (

              <div
                key={product.id}
                className="group rounded-lg border border-[#E8EEEE] bg-white p-3 transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >

                {/* Product Image */}
                <div className="flex h-32 items-center justify-center overflow-hidden rounded-md bg-[#F8FAFC]">

                  <Image
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain mix-blend-multiply transition duration-300 group-hover:scale-105"
                    height={512}
                    width={512}
                  />

                </div>


                {/* Product Name */}
                <h3 className="mt-3 min-h-10.5 font-['Poppins'] text-[14px] font-medium leading-5 text-[#334155]">
                  {product.name}
                </h3>


                {/* Rating */}
                <div className="mt-2 flex items-center gap-1">

                  <Star
                    size={14}
                    fill="#F59E0B"
                    className="text-[#F59E0B]"
                  />

                  <span className="font-['Poppins'] text-[14px] text-[#64748B]">
                    {product.rating} ({product.reviews})
                  </span>

                </div>


                {/* Price */}
                <p className="mt-2 font-['Poppins'] text-[16px] font-bold text-[#1E293B]">
                  {product.price}
                </p>


                {/* Add Cart */}
                <button
                  type="button"
                  className="mt-3 flex w-full items-center justify-center gap-1 rounded-md border border-[#0F766E] px-2 py-2 font-['Poppins'] text-[14px] font-semibold text-[#0F766E] transition hover:bg-[#0F766E] hover:text-white"
                >
                  <ShoppingCart size={15} />
                  Add to Cart
                </button>

              </div>

            ))}

          </div>

        </div>


        {/* Account Summary */}
        <div className="rounded-xl border border-[#E8EEEE] bg-white">

          <div className="flex items-center justify-between px-5 py-4">

            <h2 className="font-['Poppins'] text-[16px] font-semibold text-[#0F172A]">
              Account Summary
            </h2>

          </div>


          <div className="px-4 pb-4">

            {/* Personal Information */}
            <div className="flex items-center gap-3 border-b border-[#E8EEEE] py-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F5F3]">
                <CircleUserRound
                  size={20}
                  className="text-[#0F766E]"
                />
              </div>

              <div className="min-w-0 flex-1">

                <h3 className="font-['Poppins'] text-[14px] font-semibold text-[#334155]">
                  Personal Information
                </h3>

                <p className="mt-0.5 font-['Poppins'] text-[14px] text-[#64748B]">
                  Manage your name, email, and phone
                </p>

              </div>

              <button
                type="button"
                className="font-['Poppins'] text-[14px] font-semibold text-[#0F766E]"
              >
                Edit
              </button>

            </div>


            {/* Shipping Addresses */}
            <div className="flex items-center gap-3 border-b border-[#E8EEEE] py-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F5F3]">
                <MapPin
                  size={20}
                  className="text-[#0F766E]"
                />
              </div>

              <div className="min-w-0 flex-1">

                <h3 className="font-['Poppins'] text-[14px] font-semibold text-[#334155]">
                  Shipping Addresses
                </h3>

                <p className="mt-0.5 font-['Poppins'] text-[14px] text-[#64748B]">
                  Manage your saved addresses
                </p>

              </div>

              <button
                type="button"
                className="font-['Poppins'] text-[14px] font-semibold text-[#0F766E]"
              >
                Manage
              </button>

            </div>


            {/* Payment Methods */}
            <div className="flex items-center gap-3 border-b border-[#E8EEEE] py-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F5F3]">
                <WalletCards
                  size={20}
                  className="text-[#0F766E]"
                />
              </div>

              <div className="min-w-0 flex-1">

                <h3 className="font-['Poppins'] text-[14px] font-semibold text-[#334155]">
                  Payment Methods
                </h3>

                <p className="mt-0.5 font-['Poppins'] text-[14px] text-[#64748B]">
                  Manage your saved payment methods
                </p>

              </div>

              <button
                type="button"
                className="font-['Poppins'] text-[14px] font-semibold text-[#0F766E]"
              >
                Manage
              </button>

            </div>


            {/* Password & Security */}
            <div className="flex items-center gap-3 py-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F5F3]">
                <LockKeyhole
                  size={20}
                  className="text-[#0F766E]"
                />
              </div>

              <div className="min-w-0 flex-1">

                <h3 className="font-['Poppins'] text-[14px] font-semibold text-[#334155]">
                  Password &amp; Security
                </h3>

                <p className="mt-0.5 font-['Poppins'] text-[14px] text-[#64748B]">
                  Update your password and security
                </p>

              </div>

              <button
                type="button"
                className="font-['Poppins'] text-[14px] font-semibold text-[#0F766E]"
              >
                Manage
              </button>

            </div>

          </div>

        </div>

      </section>

  )
}

export default RecommendedAndAccountSummery