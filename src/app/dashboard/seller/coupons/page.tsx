"use client";

import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Pencil,
  Plus,
  Search,
  ShoppingBag,
  Tag,
  Ticket,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Coupon , CouponStatus , CouponType} from "@/type/dashboard/Seller";



const couponData: Coupon[] = [
  {
    id: 1,
    code: "SAVE10",
    description: "Save 10% on all orders",
    type: "Percentage",
    discount: 10,
    discountText: "10%",
    usage: 253,
    usageLimit: 500,
    minimumOrder: 50,
    startDate: "May 20, 2024",
    endDate: "May 30, 2024",
    status: "Active",
    color: "green",
  },
  {
    id: 2,
    code: "WELCOME20",
    description: "20% off for new customers",
    type: "Percentage",
    discount: 20,
    discountText: "20%",
    usage: 87,
    usageLimit: 200,
    minimumOrder: 0,
    startDate: "May 15, 2024",
    endDate: "Jun 15, 2024",
    status: "Active",
    color: "red",
  },
  {
    id: 3,
    code: "FREESHIP",
    description: "Free shipping on orders over $100",
    type: "Free Shipping",
    discount: 100,
    discountText: "100%",
    usage: 156,
    usageLimit: 300,
    minimumOrder: 100,
    startDate: "May 10, 2024",
    endDate: "Jun 10, 2024",
    status: "Active",
    color: "yellow",
  },
  {
    id: 4,
    code: "SUMMER15",
    description: "Summer special 15% discount",
    type: "Percentage",
    discount: 15,
    discountText: "15%",
    usage: 312,
    usageLimit: 800,
    minimumOrder: 75,
    startDate: "May 01, 2024",
    endDate: "Jul 01, 2024",
    status: "Active",
    color: "green",
  },
  {
    id: 5,
    code: "CLEARANCE50",
    description: "Clearance sale 50% off",
    type: "Percentage",
    discount: 50,
    discountText: "50%",
    usage: 45,
    usageLimit: 100,
    minimumOrder: 50,
    startDate: "Apr 20, 2024",
    endDate: "May 20, 2024",
    status: "Expired",
    color: "gray",
  },
  {
    id: 6,
    code: "EID25",
    description: "Eid special 25% off",
    type: "Percentage",
    discount: 25,
    discountText: "25%",
    usage: 139,
    usageLimit: 250,
    minimumOrder: 30,
    startDate: "Apr 05, 2024",
    endDate: "Apr 20, 2024",
    status: "Inactive",
    color: "blue",
  },
];

const statusStyles: Record<CouponStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Expired: "bg-slate-50 text-slate-600 border-slate-200",
  Inactive: "bg-orange-50 text-orange-600 border-orange-200",
};

const typeStyles: Record<CouponType, string> = {
  Percentage: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Fixed Amount": "bg-purple-50 text-purple-700 border-purple-200",
  "Free Shipping": "bg-blue-50 text-blue-700 border-blue-200",
};

const couponColors: Record<string, string> = {
  green: "border-emerald-300 bg-emerald-50 text-emerald-700",
  red: "border-red-300 bg-red-50 text-red-600",
  yellow: "border-amber-300 bg-amber-50 text-amber-600",
  gray: "border-slate-300 bg-slate-50 text-slate-600",
  blue: "border-blue-300 bg-blue-50 text-blue-600",
};

const Coupons = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCoupons = useMemo(() => {
    return couponData.filter((coupon) => {
      const searchMatch =
        coupon.code.toLowerCase().includes(search.toLowerCase()) ||
        coupon.description.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All Status" || coupon.status === statusFilter;

      const typeMatch =
        typeFilter === "All Types" || coupon.type === typeFilter;

      return searchMatch && statusMatch && typeMatch;
    });
  }, [search, statusFilter, typeFilter]);

  const totalCoupons = 24;
  const activeCoupons = 18;
  const totalUsage = 1284;
  const totalDiscount = 2845.5;

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-5 font-sans text-[#172554] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        {/* ================= HEADER ================= */}
        <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#172554] md:text-3xl">
              Coupons
            </h1>

            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <span>Home</span>
              <ChevronRight size={15} />
              <span>Coupons</span>
              <ChevronRight size={15} />
              <span className="font-medium text-[#172554]">All Coupons</span>
            </div>
          </div>

          <Link href={"/dashboard/seller/coupons/add-coupon"}> 
          <button
            type="button"
            className="flex w-fit items-center gap-2 rounded-lg bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0B625B] hover:shadow-md"
          >
            <Plus size={18} />
            Create New Coupon
          </button>
          </Link>
        </div>

        {/* ================= STATISTICS ================= */}
        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Total Coupons */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                <Tag className="h-6 w-6 text-[#0F766E]" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-600">
                  Total Coupons
                </p>

                <h3 className="mt-1 text-2xl font-bold text-[#172554]">
                  {totalCoupons}
                </h3>

                <p className="mt-0.5 text-sm text-slate-500">
                  All time coupons
                </p>
              </div>
            </div>
          </div>

          {/* Active Coupons */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50">
                <Ticket className="h-6 w-6 text-blue-500" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-600">
                  Active Coupons
                </p>

                <h3 className="mt-1 text-2xl font-bold text-[#172554]">
                  {activeCoupons}
                </h3>

                <p className="mt-0.5 text-sm text-slate-500">
                  Currently active
                </p>
              </div>
            </div>
          </div>

          {/* Total Usage */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-50">
                <ShoppingBag className="h-6 w-6 text-purple-500" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-600">
                  Total Usage
                </p>

                <h3 className="mt-1 text-2xl font-bold text-[#172554]">
                  {totalUsage.toLocaleString()}
                </h3>

                <p className="mt-0.5 text-sm text-slate-500">
                  Total times used
                </p>
              </div>
            </div>
          </div>

          {/* Total Discount */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50">
                <Users className="h-6 w-6 text-orange-500" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-600">
                  Total Discount
                </p>

                <h3 className="mt-1 text-2xl font-bold text-[#172554]">
                  ${totalDiscount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </h3>

                <p className="mt-0.5 text-sm text-slate-500">
                  Discount given
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FILTER AREA ================= */}
        <div className="rounded-t-xl border border-slate-200 bg-white p-4">
          <div className="flex flex-col gap-3 xl:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search coupons by code or name..."
                className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
              />
            </div>

            {/* Status */}
            <div className="relative w-full xl:w-40">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-600 outline-none focus:border-[#0F766E]"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Expired</option>
                <option>Inactive</option>
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>

            {/* Type */}
            <div className="relative w-full xl:w-40">
              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-600 outline-none focus:border-[#0F766E]"
              >
                <option>All Types</option>
                <option>Percentage</option>
                <option>Fixed Amount</option>
                <option>Free Shipping</option>
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>

            {/* Time */}
            <div className="relative w-full xl:w-36">
              <CalendarDays
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-9 text-sm font-medium text-slate-600 outline-none focus:border-[#0F766E]"
              >
                <option>All Time</option>
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Year</option>
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>

            {/* Filter Button */}
            <button
              type="button"
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:border-[#0F766E] hover:text-[#0F766E]"
            >
              <Filter size={17} />
              Filters
            </button>
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="overflow-x-auto rounded-b-xl border-x border-b border-slate-200 bg-white">
          <table className="w-full min-w-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70">
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                  Coupon
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                  Type
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                  Discount
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                  Usage
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                  Minimum Order
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                  Validity
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                  Status
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCoupons.map((coupon) => {
                const usagePercentage = Math.min(
                  (coupon.usage / coupon.usageLimit) * 100,
                  100
                );

                return (
                  <tr
                    key={coupon.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50/60"
                  >
                    {/* Coupon */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`relative flex h-9 min-w-22 items-center justify-center rounded-md border border-dashed px-3 text-sm font-bold ${couponColors[coupon.color]}`}
                        >
                          <span>{coupon.code}</span>
                        </div>

                        <p className="max-w-42.5 text-sm font-medium leading-5 text-slate-600">
                          {coupon.description}
                        </p>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-md border px-3 py-1.5 text-sm font-medium ${typeStyles[coupon.type]}`}
                      >
                        {coupon.type}
                      </span>
                    </td>

                    {/* Discount */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-base font-bold text-[#172554]">
                          {coupon.discountText}
                        </p>

                        <p className="text-sm font-medium text-slate-500">
                          OFF
                        </p>
                      </div>
                    </td>

                    {/* Usage */}
                    <td className="px-5 py-4">
                      <div className="min-w-26.25">
                        <div className="mb-1.5 flex items-center gap-1 text-sm">
                          <span className="font-semibold text-slate-700">
                            {coupon.usage}
                          </span>

                          <span className="text-slate-400">
                            / {coupon.usageLimit}
                          </span>
                        </div>

                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-[#0F766E]"
                            style={{
                              width: `${usagePercentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Minimum Order */}
                    <td className="px-5 py-4">
                      <span className="text-sm font-medium text-slate-700">
                        ${coupon.minimumOrder.toFixed(2)}
                      </span>
                    </td>

                    {/* Validity */}
                    <td className="px-5 py-4">
                      <div className="whitespace-nowrap text-sm leading-6 text-slate-600">
                        <p>{coupon.startDate}</p>
                        <p>{coupon.endDate}</p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-md border px-3 py-1.5 text-sm font-medium ${statusStyles[coupon.status]}`}
                      >
                        {coupon.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          title="View coupon"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-[#0F766E] hover:bg-emerald-50 hover:text-[#0F766E]"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          title="Edit coupon"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-[#0F766E] hover:bg-emerald-50 hover:text-[#0F766E]"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          title="Delete coupon"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* ================= EMPTY STATE ================= */}
          {filteredCoupons.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <Search size={24} className="text-slate-400" />
              </div>

              <h3 className="text-lg font-semibold text-[#172554]">
                No coupons found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filter options.
              </p>
            </div>
          )}

          {/* ================= FOOTER ================= */}
          <div className="flex flex-col justify-between gap-4 px-5 py-4 sm:flex-row sm:items-center">
            <p className="text-sm font-medium text-slate-600">
              Showing 1 to {filteredCoupons.length} of {totalCoupons} coupons
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentPage === 1}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-[#0F766E] hover:text-[#0F766E] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold ${
                  currentPage === 1
                    ? "bg-[#0F766E] text-white"
                    : "border border-slate-200 text-slate-600 hover:border-[#0F766E]"
                }`}
              >
                1
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(2)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold ${
                  currentPage === 2
                    ? "bg-[#0F766E] text-white"
                    : "border border-slate-200 text-slate-600 hover:border-[#0F766E]"
                }`}
              >
                2
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(3)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold ${
                  currentPage === 3
                    ? "bg-[#0F766E] text-white"
                    : "border border-slate-200 text-slate-600 hover:border-[#0F766E]"
                }`}
              >
                3
              </button>

              <span className="px-1 text-sm font-medium text-slate-400">
                ...
              </span>

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:border-[#0F766E] hover:text-[#0F766E]"
              >
                8
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-[#0F766E] hover:text-[#0F766E]"
              >
                <ChevronRight size={18} />
              </button>

              <div className="relative ml-2">
                <select className="h-9 appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-8 text-sm font-medium text-slate-600 outline-none focus:border-[#0F766E]">
                  <option>10 / page</option>
                  <option>20 / page</option>
                  <option>50 / page</option>
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupons;