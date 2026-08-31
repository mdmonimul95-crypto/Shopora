"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  Percent,
  Tag,
} from "lucide-react";

type DiscountType = "fixed-cart" | "percentage" | "fixed-product";

const AddNewCoupon = () => {
  const [discountType, setDiscountType] =
    useState<DiscountType>("fixed-cart");

  const [couponCode, setCouponCode] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const discountOptions = [
    {
      id: "fixed-cart" as DiscountType,
      title: "Fixed Cart Discount",
      description: "Get a fixed amount off on cart total",
      icon: CreditCard,
    },
    {
      id: "percentage" as DiscountType,
      title: "Percentage Discount",
      description: "Get a percentage off on cart total",
      icon: Percent,
    },
    {
      id: "fixed-product" as DiscountType,
      title: "Fixed Product Discount",
      description: "Get a fixed amount off on specific products",
      icon: Tag,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const couponData = {
      couponCode,
      description,
      discountType,
      amount,
      expiryDate,
    };

    console.log("Coupon Data:", couponData);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-7">
      {/* ================= HEADER ================= */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight text-[#14213D]">
            Add New Coupon
          </h1>

          {/* Breadcrumb */}
          <div className="mt-1.5 flex items-center gap-2 text-[14px] text-[#64748B]">
            <Link
              href="/dashboard/seller"
              className="transition-colors hover:text-[#0F766E]"
            >
              Home
            </Link>

            <span>›</span>

            <Link
              href="/dashboard/seller/products/coupons"
              className="transition-colors hover:text-[#0F766E]"
            >
              Coupons
            </Link>

            <span>›</span>

            <span className="text-[#334155]">Add New Coupon</span>
          </div>
        </div>

        <Link
          href="/dashboard/seller/coupons"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#D9E2EC] bg-white px-5 text-[14px] font-semibold text-[#14213D] shadow-sm transition-all hover:border-[#0F766E] hover:text-[#0F766E]"
        >
          <ArrowLeft size={16} />
          Back to Coupons
        </Link>
      </div>

      {/* ================= FORM CARD ================= */}
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-[#E5EAF0] bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:p-6"
      >
        {/* ================= COUPON CODE ================= */}
        <div>
          <label
            htmlFor="couponCode"
            className="mb-2 block text-[14px] font-semibold text-[#1E293B]"
          >
            Coupon Code <span className="text-red-500">*</span>
          </label>

          <input
            id="couponCode"
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Enter coupon code (e.g. SAVE10)"
            required
            className="h-11 w-full rounded-lg border border-[#D8E0E8] bg-white px-3 text-[14px] text-[#1E293B] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
          />

          <p className="mt-1.5 text-[13px] text-[#64748B]">
            Customers will use this code at checkout.
          </p>
        </div>

        {/* ================= DESCRIPTION ================= */}
        <div className="mt-5">
          <label
            htmlFor="description"
            className="mb-2 block text-[14px] font-semibold text-[#1E293B]"
          >
            Description{" "}
            <span className="font-normal text-[#64748B]">(Optional)</span>
          </label>

          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter coupon description..."
            rows={3}
            className="w-full resize-none rounded-lg border border-[#D8E0E8] bg-white px-3 py-3 text-[14px] text-[#1E293B] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
          />

          <p className="mt-1.5 text-[13px] text-[#64748B]">
            This description will not be shown to customers.
          </p>
        </div>

        {/* ================= DISCOUNT TYPE ================= */}
        <div className="mt-5">
          <label className="mb-2 block text-[14px] font-semibold text-[#1E293B]">
            Discount Type <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {discountOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = discountType === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setDiscountType(option.id)}
                  className={`flex min-h-23 items-start gap-3 rounded-lg border p-4 text-left transition-all ${
                    isSelected
                      ? "border-[#0F766E] bg-[#F5FFFD] shadow-sm"
                      : "border-[#D8E0E8] bg-white hover:border-[#9FBAB7]"
                  }`}
                >
                  {/* Radio */}
                  <div
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      isSelected
                        ? "border-[#0F766E]"
                        : "border-[#B7C4D2]"
                    }`}
                  >
                    {isSelected && (
                      <div className="h-2.5 w-2.5 rounded-full bg-[#0F766E]" />
                    )}
                  </div>

                  {/* Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F6F3] text-[#0F766E]">
                    <Icon size={20} />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#1E293B]">
                      {option.title}
                    </h3>

                    <p className="mt-1 text-[13px] leading-5 text-[#64748B]">
                      {option.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= AMOUNT + EXPIRY ================= */}
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Coupon Amount */}
          <div>
            <label
              htmlFor="amount"
              className="mb-2 block text-[14px] font-semibold text-[#1E293B]"
            >
              Coupon Amount <span className="text-red-500">*</span>
            </label>

            <div className="flex h-11 overflow-hidden rounded-lg border border-[#D8E0E8] bg-white focus-within:border-[#0F766E] focus-within:ring-2 focus-within:ring-[#0F766E]/10">
              <div className="flex w-10 items-center justify-center border-r border-[#D8E0E8] bg-[#F8FAFC] text-[14px] font-semibold text-[#475569]">
                $
              </div>

              <input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
                className="min-w-0 flex-1 px-3 text-[14px] text-[#1E293B] outline-none placeholder:text-[#94A3B8]"
              />
            </div>

            <p className="mt-1.5 text-[13px] text-[#64748B]">
              Enter discount amount.
            </p>
          </div>

          {/* Expiry Date */}
          <div>
            <label
              htmlFor="expiryDate"
              className="mb-2 block text-[14px] font-semibold text-[#1E293B]"
            >
              Coupon Expiry Date <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <CalendarDays
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
              />

              <input
                id="expiryDate"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
                className="h-11 w-full rounded-lg border border-[#D8E0E8] bg-white pl-10 pr-3 text-[14px] text-[#1E293B] outline-none transition-all focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
              />
            </div>

            <p className="mt-1.5 text-[13px] text-[#64748B]">
              Select the date when this coupon will expire.
            </p>
          </div>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#EEF2F6] pt-5 sm:flex-row sm:justify-end">
          <Link
            href="/dashboard/seller/products/coupons"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-[#D5DEE8] bg-white px-6 text-[14px] font-semibold text-[#334155] transition-all hover:border-[#0F766E] hover:text-[#0F766E]"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-6 text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-[#0B625B] hover:shadow-md"
          >
            Create Coupon
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewCoupon;