"use client";

import React from "react";
import {
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Menu,
  Truck,
  X,
} from "lucide-react";

interface HeaderNavigationProps {
  categoryOpen: boolean;
  mobileMenuOpen: boolean;
  onCategoryToggle: () => void;
  onMobileMenuClose: () => void;
  onMobileCategoryClose: () => void;
}

const categories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty & Personal Care",
  "Sports & Outdoors",
  "Baby & Toys",
];

const navLinks = [
  "Home",
  "Shop",
  "Deals",
  "New Arrivals",
  "Brands",
  "About Us",
];

const HeaderNavigation = ({
  categoryOpen,
  mobileMenuOpen,
  onCategoryToggle,
  onMobileMenuClose,
  onMobileCategoryClose,
}: HeaderNavigationProps) => {
  return (
    <>
      {/* =====================================================
          DESKTOP NAVIGATION
      ====================================================== */}
      <div className="hidden border-b border-[#E8EEEE] lg:block">

        <div className="mx-auto flex h-12 max-w-7xl items-center px-4">

          {/* Categories */}
          <div className="relative h-full w-43.75 shrink-0">

            <button
              type="button"
              onClick={onCategoryToggle}
              className="flex h-full w-full items-center gap-2 font-['Poppins'] text-[16px] font-semibold text-[#1E293B] transition-colors hover:text-[#0F766E]"
            >
              <Menu
                size={18}
                strokeWidth={1.8}
              />

              Categories

              <ChevronDown
                size={13}
                className={`ml-0.5 transition-transform duration-300 ${
                  categoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Category Dropdown */}
            {categoryOpen && (
              <div className="absolute left-0 top-[calc(100%+1px)] z-50 w-64 overflow-hidden rounded-xl border border-[#E8EEEE] bg-white p-2 shadow-[0_10px_35px_rgba(15,118,110,0.12)]">

                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={onMobileCategoryClose}
                    className="group flex w-full items-center justify-between rounded-lg px-4 py-3 text-left font-['Poppins'] text-[11px] font-medium text-[#475569] transition-colors duration-200 hover:bg-[#E8F5F3] hover:text-[#0F766E]"
                  >
                    <span>
                      {category}
                    </span>

                    <ChevronRight
                      size={14}
                      className="text-[#94A3B8] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#0F766E]"
                    />
                  </button>
                ))}

              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex h-full items-center gap-8">

            {navLinks.map((link, index) => (
              <button
                key={link}
                type="button"
                className={`relative h-full font-['Poppins'] text-[16px] font-medium transition-colors duration-300 ${
                  index === 0
                    ? "text-[#0F766E]"
                    : "text-[#475569] hover:text-[#0F766E]"
                }`}
              >
                {link}

                {index === 0 && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#0F766E]" />
                )}
              </button>
            ))}

          </nav>
        </div>
      </div>

      {/* =====================================================
          MOBILE QUICK NAVIGATION
      ====================================================== */}
      <div className="flex items-center justify-between overflow-x-auto border-b border-[#E8EEEE] px-4 py-2.5 lg:hidden">

        {["Home", "Shop", "Deals", "New Arrivals", "Brands"].map(
          (link, index) => (
            <button
              key={link}
              type="button"
              className={`whitespace-nowrap px-2 font-['Poppins'] text-[9px] font-medium ${
                index === 0
                  ? "text-[#0F766E]"
                  : "text-[#64748B]"
              }`}
            >
              {link}
            </button>
          )
        )}

      </div>

      {/* =====================================================
          MOBILE SIDE MENU
      ====================================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-60 lg:hidden">

          {/* Overlay */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={onMobileMenuClose}
            className="absolute inset-0 bg-[#1E293B]/40"
          />

          {/* Drawer */}
          <aside className="relative h-full w-70 overflow-y-auto bg-white shadow-xl">

            {/* Drawer Header */}
            <div className="flex h-16 items-center justify-between border-b border-[#E8EEEE] px-5">

              <div className="flex items-center gap-2">

                <div className="flex h-9 w-8 items-end justify-center rounded-md bg-[#0F766E]">

                  <span className="mb-0.5 font-['Poppins'] text-xl font-bold text-[#FF6B6B]">
                    S
                  </span>

                </div>

                <span className="font-['Poppins'] text-base font-bold text-[#1E293B]">
                  Shopora
                </span>

              </div>

              <button
                type="button"
                aria-label="Close menu"
                onClick={onMobileMenuClose}
                className="text-[#64748B]"
              >
                <X size={21} />
              </button>

            </div>

            {/* Drawer Content */}
            <div className="px-5 py-5">

              {/* Categories */}
              <div className="mb-4">

                <button
                  type="button"
                  onClick={onCategoryToggle}
                  className="flex w-full items-center justify-between rounded-lg bg-[#E8F5F3] px-4 py-3 font-['Poppins'] text-xs font-semibold text-[#0F766E]"
                >
                  <span className="flex items-center gap-3">
                    <Menu size={17} />
                    All Categories
                  </span>

                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-300 ${
                      categoryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Mobile Category List */}
                {categoryOpen && (
                  <div className="mt-2 space-y-1 rounded-lg border border-[#E8EEEE] bg-[#FAFCFC] p-2">

                    {categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => {
                          onMobileCategoryClose();
                          onMobileMenuClose();
                        }}
                        className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left font-['Poppins'] text-[10px] font-medium text-[#475569] transition-colors hover:bg-white hover:text-[#0F766E]"
                      >
                        <span>
                          {category}
                        </span>

                        <ChevronRight
                          size={13}
                          className="text-[#94A3B8]"
                        />
                      </button>
                    ))}

                  </div>
                )}
              </div>

              {/* Main Links */}
              <nav className="space-y-1">

                {navLinks.map((link, index) => (
                  <button
                    key={link}
                    type="button"
                    onClick={onMobileMenuClose}
                    className={`flex w-full items-center rounded-lg px-4 py-3 text-left font-['Poppins'] text-xs font-medium transition-colors ${
                      index === 0
                        ? "bg-[#F6FAF9] text-[#0F766E]"
                        : "text-[#475569] hover:bg-[#F6FAF9] hover:text-[#0F766E]"
                    }`}
                  >
                    {link}
                  </button>
                ))}

              </nav>

              {/* Divider */}
              <div className="my-5 border-t border-[#E8EEEE]" />

              {/* Extra Links */}
              <div className="space-y-1">

                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-['Poppins'] text-xs font-medium text-[#475569] transition-colors hover:bg-[#F6FAF9] hover:text-[#0F766E]"
                >
                  <Truck size={16} />
                  Track Order
                </button>

                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-['Poppins'] text-xs font-medium text-[#475569] transition-colors hover:bg-[#F6FAF9] hover:text-[#0F766E]"
                >
                  <CircleHelp size={16} />
                  Help & Support
                </button>

              </div>

            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default HeaderNavigation;