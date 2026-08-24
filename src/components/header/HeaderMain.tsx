"use client";

import React from "react";
import {
  Heart,
  Search,
  ShoppingCart,
  UserRound,
} from "lucide-react";

interface HeaderMainProps {
  onMenuOpen: () => void;
  categoryOpen: boolean;
  onCategoryToggle: () => void;
}

const HeaderMain = ({
  onMenuOpen,
  categoryOpen,
  onCategoryToggle,
}: HeaderMainProps) => {
  return (
    <>
      {/* =====================================================
          DESKTOP MAIN HEADER
      ====================================================== */}
      <div className="hidden lg:block">
        <div className="mx-auto flex max-w-7xl items-center gap-7 px-4 py-5">

          {/* Logo */}
          <div className="flex w-43.75 shrink-0 items-center gap-2.5">

            <div className="relative flex h-12 w-10 items-end justify-center rounded-lg bg-[#0F766E] shadow-sm">

              {/* Bag Handle */}
              <div className="absolute -top-2 left-1/2 h-5 w-5 -translate-x-1/2 rounded-t-full border-[3px] border-b-0 border-[#0F766E]" />

              <span className="mb-1 font-['Poppins'] text-3xl font-bold leading-none text-[#FF6B6B]">
                S
              </span>
            </div>

            <div>
              <h1 className="font-['Poppins'] text-xl font-bold leading-5 text-[#1E293B]">
                Shopora
              </h1>

              <p className="mt-0.5 font-['Poppins'] text-[7px] text-[#94A3B8]">
                Smart Shopping, Made Simple
              </p>
            </div>

          </div>

          {/* Search */}
          <div className="flex h-11 flex-1 overflow-hidden rounded-lg border border-[#E2E8F0] bg-white">

            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="min-w-0 flex-1 bg-transparent px-4 font-['Poppins'] text-[10px] text-[#1E293B] outline-none placeholder:text-[#94A3B8]"
            />

            {/* All Categories */}
            <button
              type="button"
              onClick={onCategoryToggle}
              className="hidden items-center gap-1 border-l border-[#E8EEEE] px-4 font-['Poppins'] text-[14px] font-medium text-[#475569] transition-colors hover:text-[#0F766E] xl:flex"
            >
              All Categories

              <span
                className={`transition-transform duration-300 ${
                  categoryOpen ? "rotate-180" : ""
                }`}
              >
                ↓
              </span>
            </button>

            {/* Search */}
            <button
              type="button"
              aria-label="Search"
              className="flex w-11 items-center justify-center bg-[#0F766E] text-white transition-colors duration-300 hover:bg-[#0B625B]"
            >
              <Search
                size={18}
                strokeWidth={1.8}
              />
            </button>

          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-5">

            {/* Wishlist */}
            <button
              type="button"
              className="group flex flex-col items-center gap-1"
            >
              <Heart
                size={22}
                strokeWidth={1.6}
                className="text-[#475569] transition-colors group-hover:text-[#0F766E]"
              />

              <span className="font-['Poppins'] text-[14px] font-medium text-[#475569]">
                Wishlist
              </span>
            </button>

            {/* Cart */}
            <button
              type="button"
              className="group relative flex flex-col items-center gap-1"
            >
              <div className="relative">
                <ShoppingCart
                  size={22}
                  strokeWidth={1.6}
                  className="text-[#475569] transition-colors group-hover:text-[#0F766E]"
                />

                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF6B6B] font-['Poppins'] text-[7px] font-semibold text-white">
                  3
                </span>
              </div>

              <span className="font-['Poppins'] text-[14px] font-medium text-[#475569]">
                Cart
              </span>
            </button>

            {/* Account */}
            <button
              type="button"
              className="group flex flex-col items-center gap-1"
            >
              <UserRound
                size={22}
                strokeWidth={1.6}
                className="text-[#475569] transition-colors group-hover:text-[#0F766E]"
              />

              <span className="font-['Poppins'] text-[14px] font-medium text-[#475569]">
                Account
              </span>
            </button>

          </div>
        </div>
      </div>

      {/* =====================================================
          MOBILE MAIN HEADER
      ====================================================== */}
      <div className="lg:hidden">

        <div className="flex h-15.5 items-center justify-between border-b border-[#E8EEEE] px-4">

          {/* Left */}
          <div className="flex items-center gap-3">

            {/* Menu */}
            <button
              type="button"
              aria-label="Open menu"
              onClick={onMenuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#475569] transition-colors hover:bg-[#F6FAF9] hover:text-[#0F766E]"
            >
              <span className="text-xl leading-none">
                ☰
              </span>
            </button>

            {/* Logo */}
            <div className="flex items-center gap-2">

              <div className="relative flex h-9 w-8 items-end justify-center rounded-md bg-[#0F766E]">

                <div className="absolute -top-1.5 left-1/2 h-3.5 w-4 -translate-x-1/2 rounded-t-full border-2 border-b-0 border-[#0F766E]" />

                <span className="mb-0.5 font-['Poppins'] text-xl font-bold leading-none text-[#FF6B6B]">
                  S
                </span>

              </div>

              <div>
                <h1 className="font-['Poppins'] text-base font-bold leading-4 text-[#1E293B]">
                  Shopora
                </h1>

                <p className="font-['Poppins'] text-[5px] text-[#94A3B8]">
                  Smart Shopping, Made Simple
                </p>
              </div>

            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">

            {/* Wishlist */}
            <button
              type="button"
              aria-label="Wishlist"
              className="text-[#475569]"
            >
              <Heart
                size={20}
                strokeWidth={1.7}
              />
            </button>

            {/* Cart */}
            <button
              type="button"
              aria-label="Cart"
              className="relative text-[#475569]"
            >
              <ShoppingCart
                size={20}
                strokeWidth={1.7}
              />

              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF6B6B] font-['Poppins'] text-[7px] font-semibold text-white">
                3
              </span>
            </button>

            {/* Account */}
            <button
              type="button"
              aria-label="Account"
              className="text-[#475569]"
            >
              <UserRound
                size={20}
                strokeWidth={1.7}
              />
            </button>

          </div>
        </div>

        {/* Mobile Search */}
        <div className="border-b border-[#E8EEEE] px-4 py-3">

          <div className="flex h-10 overflow-hidden rounded-lg border border-[#E2E8F0]">

            <input
              type="text"
              placeholder="Search products, brands and more..."
              className="min-w-0 flex-1 bg-transparent px-3 font-['Poppins'] text-[10px] text-[#1E293B] outline-none placeholder:text-[#94A3B8]"
            />

            <button
              type="button"
              aria-label="Search"
              className="flex w-10 items-center justify-center bg-[#0F766E] text-white"
            >
              <Search size={17} />
            </button>

          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderMain;