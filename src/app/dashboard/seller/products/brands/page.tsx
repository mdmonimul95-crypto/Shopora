"use client";

import React, { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { Brand } from "@/type/dashboard/Seller";



const brandsData: Brand[] = [
  {
    id: 1,
    name: "Apple",
    description: "Innovative technology and consumer electronics.",
    products: 18,
    status: "Active",
    createdAt: "May 26, 2024",
    logo: "https://cdn.simpleicons.org/apple/000000",
  },
  {
    id: 2,
    name: "Samsung",
    description: "Smartphones, tablets, home appliances and more.",
    products: 24,
    status: "Active",
    createdAt: "May 25, 2024",
    logo: "https://cdn.simpleicons.org/samsung/1428A0",
  },
  {
    id: 3,
    name: "Nike",
    description: "Sportswear, shoes and athletic accessories.",
    products: 32,
    status: "Active",
    createdAt: "May 24, 2024",
    logo: "https://cdn.simpleicons.org/nike/000000",
  },
  {
    id: 4,
    name: "Adidas",
    description: "Performance footwear, apparel and accessories.",
    products: 27,
    status: "Active",
    createdAt: "May 22, 2024",
    logo: "https://cdn.simpleicons.org/adidas/000000",
  },
  {
    id: 5,
    name: "Sony",
    description: "Electronics, gaming, entertainment and more.",
    products: 15,
    status: "Active",
    createdAt: "May 20, 2024",
    logo: "https://cdn.simpleicons.org/sony/000000",
  },
  {
    id: 6,
    name: "Philips",
    description: "Health, personal care and home appliances.",
    products: 12,
    status: "Inactive",
    createdAt: "May 18, 2024",
    logo: "https://cdn.simpleicons.org/philips/0066A1",
  },
];

const Brands = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const filteredBrands = useMemo(() => {
    return brandsData.filter((brand) => {
      const matchesSearch = brand.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All Status" || brand.status === statusFilter;

      // Dummy category filter for now.
      const matchesCategory =
        categoryFilter === "All Categories" || true;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [search, statusFilter, categoryFilter]);

  const handleDelete = (brand: Brand) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${brand.name}?`
    );

    if (confirmed) {
      console.log("Delete brand:", brand.id);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-5 sm:px-6 lg:px-8">
      {/* ================= HEADER ================= */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight text-[#172554]">
            Brands
          </h1>

          <div className="mt-1 flex items-center gap-2 text-[11px] text-[#64748B]">
            <span>Home</span>
            <ChevronRight size={12} />
            <span>Products</span>
            <ChevronRight size={12} />
            <span className="text-[#334155]">Brands</span>
          </div>
        </div>

        <button
          type="button"
          className="flex h-10 items-center justify-center gap-2 rounded-md bg-[#0F766E] px-4 text-[12px] font-semibold text-white transition-all duration-200 hover:bg-[#0B625B] hover:shadow-md"
        >
          <Plus size={15} strokeWidth={2.5} />
          Add New Brand
        </button>
      </div>

      {/* ================= MAIN CARD ================= */}
      <div className="overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
        {/* ================= FILTER BAR ================= */}
        <div className="border-b border-[#EEF0F3] p-3 sm:p-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.4fr_0.75fr_0.75fr_auto]">
            {/* Search */}
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search brands by name..."
                className="h-10 w-full rounded-md border border-[#DDE3EA] bg-white pl-9 pr-3 text-[12px] text-[#1E293B] outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 w-full appearance-none rounded-md border border-[#DDE3EA] bg-white px-3 pr-9 text-[12px] text-[#475569] outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#475569]"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-10 w-full appearance-none rounded-md border border-[#DDE3EA] bg-white px-3 pr-9 text-[12px] text-[#475569] outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
              >
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Sports</option>
                <option>Home & Living</option>
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#475569]"
              />
            </div>

            {/* Filter Button */}
            <button
              type="button"
              className="flex h-10 items-center justify-center gap-2 rounded-md border border-[#DDE3EA] bg-white px-4 text-[12px] font-medium text-[#334155] transition hover:border-[#0F766E] hover:text-[#0F766E]"
            >
              <Filter size={14} />
              Filters
            </button>
          </div>
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#EEF0F3] bg-[#FCFDFE]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#1E293B]">
                  Brand
                </th>

                <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#1E293B]">
                  Description
                </th>

                <th className="px-4 py-3 text-center text-[11px] font-semibold text-[#1E293B]">
                  Products
                </th>

                <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#1E293B]">
                  Status
                </th>

                <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#1E293B]">
                  Created At
                </th>

                <th className="px-4 py-3 text-center text-[11px] font-semibold text-[#1E293B]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredBrands.map((brand) => (
                <tr
                  key={brand.id}
                  className="border-b border-[#EEF0F3] transition hover:bg-[#FCFDFD]"
                >
                  {/* Brand */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#E2E8F0] bg-white p-2">
                        <Image
                          src={brand.logo}
                          alt={`${brand.name} logo`}
                          className="max-h-full max-w-full object-contain"
                          height={512}
                          width={512}
                        />
                      </div>

                      <span className="text-[12px] font-semibold text-[#172554]">
                        {brand.name}
                      </span>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="max-w-55 px-4 py-3">
                    <p className="line-clamp-2 text-[11px] leading-5 text-[#475569]">
                      {brand.description}
                    </p>
                  </td>

                  {/* Products */}
                  <td className="px-4 py-3 text-center text-[11px] font-medium text-[#334155]">
                    {brand.products}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-sm border px-2 py-1 text-[10px] font-medium ${
                        brand.status === "Active"
                          ? "border-[#B7E4D8] bg-[#ECFDF5] text-[#047857]"
                          : "border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]"
                      }`}
                    >
                      {brand.status}
                    </span>
                  </td>

                  {/* Created */}
                  <td className="px-4 py-3 text-[11px] text-[#475569]">
                    {brand.createdAt}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      {/* View */}
                      <button
                        type="button"
                        title="View brand"
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-[#DDE3EA] text-[#475569] transition hover:border-[#0F766E] hover:bg-[#F0FDFA] hover:text-[#0F766E]"
                      >
                        <Eye size={14} />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        title="Edit brand"
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-[#DDE3EA] text-[#475569] transition hover:border-[#0F766E] hover:bg-[#F0FDFA] hover:text-[#0F766E]"
                      >
                        <Pencil size={14} />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        title="Delete brand"
                        onClick={() => handleDelete(brand)}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-[#FECACA] text-[#EF4444] transition hover:bg-[#FEF2F2]"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredBrands.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-[12px] text-[#64748B]"
                  >
                    No brands found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE CARDS ================= */}
        <div className="block md:hidden">
          {filteredBrands.map((brand) => (
            <div
              key={brand.id}
              className="border-b border-[#EEF0F3] p-4 last:border-b-0"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-12 shrink-0 items-center justify-center rounded-md border border-[#E2E8F0] p-2">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="max-h-full max-w-full object-contain"
                      height={512}
                      width={512}
                    />
                  </div>

                  <div>
                    <h3 className="text-[12px] font-semibold text-[#172554]">
                      {brand.name}
                    </h3>

                    <p className="mt-1 text-[10px] text-[#64748B]">
                      {brand.products} products
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-sm border px-2 py-1 text-[10px] font-medium ${
                    brand.status === "Active"
                      ? "border-[#B7E4D8] bg-[#ECFDF5] text-[#047857]"
                      : "border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]"
                  }`}
                >
                  {brand.status}
                </span>
              </div>

              <p className="mt-3 text-[11px] leading-5 text-[#475569]">
                {brand.description}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] text-[#64748B]">
                  Created {brand.createdAt}
                </span>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-[#DDE3EA] text-[#475569]"
                  >
                    <Eye size={14} />
                  </button>

                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-[#DDE3EA] text-[#475569]"
                  >
                    <Pencil size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(brand)}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-[#FECACA] text-[#EF4444]"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredBrands.length === 0 && (
            <div className="px-4 py-12 text-center text-[12px] text-[#64748B]">
              No brands found.
            </div>
          )}
        </div>

        {/* ================= FOOTER / PAGINATION ================= */}
        <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] text-[#64748B]">
            Showing 1 to {filteredBrands.length} of {filteredBrands.length}{" "}
            brands
          </p>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            {/* Pagination */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-[#DDE3EA] text-[#64748B] transition hover:border-[#0F766E] hover:text-[#0F766E]"
              >
                <ChevronLeft size={14} />
              </button>

              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0F766E] text-[11px] font-semibold text-white"
              >
                1
              </button>

              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-[#DDE3EA] text-[#64748B] transition hover:border-[#0F766E] hover:text-[#0F766E]"
              >
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Per Page */}
            <div className="relative">
              <select
                defaultValue="10"
                className="h-8 appearance-none rounded-md border border-[#DDE3EA] bg-white px-3 pr-7 text-[10px] text-[#475569] outline-none"
              >
                <option value="10">10 / page</option>
                <option value="20">20 / page</option>
                <option value="50">50 / page</option>
              </select>

              <ChevronDown
                size={12}
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#64748B]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;