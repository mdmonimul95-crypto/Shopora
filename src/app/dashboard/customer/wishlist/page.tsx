"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingCart, Trash2, Search } from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

interface WishlistItem {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
}

/* =========================================================
   STATIC MOCK DATA
   Replace with a real API call once a Wishlist model/endpoint
   exists on the server (follow the products.ts pattern).
========================================================= */

const initialWishlist: WishlistItem[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80",
    category: "Electronics",
    price: 59.99,
    originalPrice: 79.99,
    inStock: true,
  },
  {
    id: "2",
    name: "Running Shoes",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=300&q=80",
    category: "Footwear",
    price: 89.99,
    inStock: true,
  },
  {
    id: "3",
    name: "Ceramic Mug Set",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=300&q=80",
    category: "Home & Kitchen",
    price: 18.99,
    originalPrice: 24.99,
    inStock: true,
  },
  {
    id: "4",
    name: "Leather Wallet",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80",
    category: "Accessories",
    price: 49.99,
    inStock: false,
  },
  {
    id: "5",
    name: "Smart Watch",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80",
    category: "Electronics",
    price: 129.99,
    originalPrice: 159.99,
    inStock: true,
  },
];

/* =========================================================
   WISHLIST PAGE (STATIC)
========================================================= */

const WishlistPage = () => {
  const [items, setItems] = useState<WishlistItem[]>(initialWishlist);
  const [search, setSearch] = useState("");

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredItems = items.filter(
    (item) =>
      search.trim() === "" ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-3 py-4 sm:px-5 md:px-6 lg:px-7 xl:px-8">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-['Poppins'] text-[20px] font-semibold text-[#0F172A]">
            Wishlist
          </h1>
          <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
            {items.length} {items.length === 1 ? "item" : "items"} saved for
            later.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 rounded-lg border border-[#E8EEEE] bg-white px-3 py-2 sm:w-72">
          <Search size={16} className="shrink-0 text-[#94A3B8]" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search your wishlist"
            className="w-full font-['Poppins'] text-[14px] text-[#334155] outline-none placeholder:text-[#94A3B8]"
          />
        </div>
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-[#E8EEEE] bg-white py-20">
          <Heart size={32} className="text-[#94A3B8]" />
          <p className="font-['Poppins'] text-[14px] text-[#64748B]">
            {items.length === 0
              ? "Your wishlist is empty."
              : "No items match your search."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl border border-[#E8EEEE] bg-white transition-shadow hover:shadow-sm"
            >
              {/* Remove Button */}
              <button
                type="button"
                onClick={() => handleRemove(item.id)}
                aria-label={`Remove ${item.name} from wishlist`}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#94A3B8] shadow-sm transition hover:bg-[#FFF5F5] hover:text-[#FF6B6B]"
              >
                <Trash2 size={16} />
              </button>

              {/* Image */}
              <div className="flex h-40 items-center justify-center overflow-hidden bg-[#F8FAFC]">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                  height={512}
                  width={512}
                />
              </div>

              {/* Details */}
              <div className="p-4">
                <p className="font-['Poppins'] text-[14px] text-[#64748B]">
                  {item.category}
                </p>

                <h3 className="mt-1 truncate font-['Poppins'] text-[14px] font-semibold text-[#0F172A]">
                  {item.name}
                </h3>

                <div className="mt-2 flex items-center gap-2">
                  <span className="font-['Poppins'] text-[16px] font-semibold text-[#0F766E]">
                    ${item.price.toFixed(2)}
                  </span>

                  {item.originalPrice && (
                    <span className="font-['Poppins'] text-[14px] text-[#94A3B8] line-through">
                      ${item.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {!item.inStock && (
                  <span className="mt-2 inline-flex w-fit rounded-md bg-[#F1F2F4] px-2 py-1 font-['Poppins'] text-[14px] font-medium text-[#64748B]">
                    Out of Stock
                  </span>
                )}

                <button
                  type="button"
                  disabled={!item.inStock}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0F766E] px-3 py-2 font-['Poppins'] text-[14px] font-medium text-white transition hover:bg-[#0D5F58] disabled:cursor-not-allowed disabled:bg-[#CBD5E1]"
                >
                  <ShoppingCart size={16} />
                  {item.inStock ? "Add to Cart" : "Unavailable"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default WishlistPage;