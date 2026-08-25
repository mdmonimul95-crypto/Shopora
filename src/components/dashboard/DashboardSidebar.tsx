"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  Ticket,
  MapPin,
  CreditCard,
  Settings,
  Bell,
  Star,
  Sparkles,
  Headphones,
  LogOut,
  X,
  Sidebar,
} from "lucide-react";

const navContent = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Orders",
    href: "/dashboard/orders",
    icon: ShoppingBag,
  },
  {
    label: "Wishlist",
    href: "/dashboard/wishlist",
    icon: Heart,
  },
  {
    label: "Coupons",
    href: "/dashboard/coupons",
    icon: Ticket,
  },
  {
    label: "Addresses",
    href: "/dashboard/addresses",
    icon: MapPin,
  },
  {
    label: "Payment Methods",
    href: "/dashboard/payment-methods",
    icon: CreditCard,
  },
  {
    label: "Account Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    label: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
    badge: 2,
  },
  {
    label: "Reviews",
    href: "/dashboard/reviews",
    icon: Star,
  },
  {
    label: "AI Recommendations",
    href: "/dashboard/ai-recommendations",
    icon: Sparkles,
  },
  {
    label: "Help & Support",
    href: "/dashboard/support",
    icon: Headphones,
  },
];

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* =====================================================
          MOBILE MENU BAR
      ====================================================== */}
      <div className="w-full border-b border-[#E8EEEE] bg-white lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="
            flex w-full items-center gap-3
            px-4 py-3
            font-['Poppins']
            text-sm
            font-medium
            text-[#475569]
            transition-all
            duration-200
            hover:bg-[#F6FAF9]
            hover:text-[#0F766E]
          "
        >
          <Sidebar
            size={18}
            strokeWidth={1.8}
            className="text-[#475569]"
          />

          <span>Menu</span>
        </button>
      </div>

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}
      {isOpen && (
        <div
          className="
            fixed inset-0 z-40
            bg-black/30
            lg:hidden
          "
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          h-screen w-72
          border-r border-[#E8EEEE]
          bg-white

          transition-transform
          duration-300
          ease-in-out

          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          lg:sticky
          lg:top-0
          lg:z-auto
          lg:h-screen
          lg:w-60
          lg:translate-x-0
        `}
      >
        {/* =====================================================
            MOBILE CLOSE
        ====================================================== */}
        <div className="flex items-center justify-end border-b border-[#E8EEEE] px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="
              flex h-9 w-9 items-center justify-center
              rounded-lg
              text-[#64748B]
              transition-all
              duration-200
              hover:bg-[#FFF5F5]
              hover:text-[#FF6B6B]
            "
          >
            <X size={20} strokeWidth={1.8} />
          </button>
        </div>

        {/* =====================================================
            USER PROFILE
        ====================================================== */}
        <div className="border-b border-[#E8EEEE] px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#0F766E] bg-[#E8F5F3]">
              <div className="flex h-full w-full items-center justify-center bg-[#DDF2EE] font-['Poppins'] text-sm font-semibold text-[#0F766E]">
                JS
              </div>
            </div>

            <div className="min-w-0">
              <h3 className="truncate font-['Poppins'] text-sm font-semibold text-[#1E293B]">
                John Smith
              </h3>

              <p className="truncate font-['Poppins'] text-[9px] text-[#94A3B8]">
                john.smith@email.com
              </p>

              <span className="mt-1 inline-flex items-center rounded-full bg-[#E8F5F3] px-2 py-0.5 font-['Poppins'] text-[7px] font-medium text-[#0F766E]">
                ✓ Verified Customer
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================
            NAVIGATION
        ====================================================== */}
        <nav className="px-3 py-4 lg:h-[calc(100vh-145px)] lg:overflow-y-auto">
          <div className="space-y-1">
            {navContent.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    group flex items-center gap-3
                    rounded-lg px-3 py-2.5
                    font-['Poppins']
                    text-[14px]
                    font-medium
                    transition-all
                    duration-200

                    ${
                      item.label === "Dashboard"
                        ? "bg-[#E8F5F3] text-[#0F766E]"
                        : "text-[#475569] hover:bg-[#F6FAF9] hover:text-[#0F766E]"
                    }
                  `}
                >
                  <Icon
                    size={17}
                    strokeWidth={1.7}
                    className={`
                      shrink-0 transition-colors
                      ${
                        item.label === "Dashboard"
                          ? "text-[#0F766E]"
                          : "text-[#64748B] group-hover:text-[#0F766E]"
                      }
                    `}
                  />

                  <span className="flex-1">
                    {item.label}
                  </span>

                  {item.badge && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FF6B6B] px-1.5 font-['Poppins'] text-[9px] font-semibold text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* =====================================================
            LOGOUT
        ====================================================== */}
        <div className="border-t border-[#E8EEEE] px-3 py-4">
          <button
            type="button"
            className="
              group flex w-full items-center gap-3
              rounded-lg px-3 py-2.5
              font-['Poppins']
              text-[14px]
              font-medium
              text-[#475569]
              transition-all
              duration-200
              hover:bg-[#FFF5F5]
              hover:text-[#FF6B6B]
            "
          >
            <LogOut
              size={17}
              strokeWidth={1.7}
              className="transition-colors group-hover:text-[#FF6B6B]"
            />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;