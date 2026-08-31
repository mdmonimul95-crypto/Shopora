'use client'
import React, { useMemo, useState } from "react";
import {
  Plus,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Pencil,
  Trash2,
  Headphones,
  Shirt,
  Sofa,
  ShoppingBag,
  Dumbbell,
  BookOpen,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Devices and gadgets for everyday use",
    products: 28,
    status: "Active",
    createdAt: "May 26, 2024",
    icon: Headphones,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    id: 2,
    name: "Fashion",
    description: "Clothing, shoes and fashion accessories",
    products: 35,
    status: "Active",
    createdAt: "May 25, 2024",
    icon: Shirt,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    id: 3,
    name: "Home & Living",
    description: "Home decor, kitchen and living essentials",
    products: 22,
    status: "Active",
    createdAt: "May 24, 2024",
    icon: Sofa,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    id: 4,
    name: "Beauty & Personal Care",
    description: "Skincare, makeup and personal care",
    products: 18,
    status: "Active",
    createdAt: "May 22, 2024",
    icon: ShoppingBag,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    id: 5,
    name: "Sports & Outdoors",
    description: "Sports gear and outdoor equipment",
    products: 15,
    status: "Active",
    createdAt: "May 20, 2024",
    icon: Dumbbell,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: 6,
    name: "Books & Stationery",
    description: "Books, magazines and stationery items",
    products: 12,
    status: "Inactive",
    createdAt: "May 18, 2024",
    icon: BookOpen,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
];

const Category = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchesSearch =
        category.name.toLowerCase().includes(search.toLowerCase()) ||
        category.description.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All Status" || category.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const handleEdit = (category: (typeof categories)[number]) => {
    console.log("Edit category:", category);
  };

  const handleDelete = (id: number) => {
    console.log("Delete category:", id);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-350">

        {/* ================= HEADER ================= */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#172033] sm:text-3xl">
              Categories
            </h1>

            {/* Breadcrumb */}
            <div className="mt-1.5 flex items-center gap-2 text-xs text-gray-500">
              <span>Home</span>
              <span>›</span>
              <span>Products</span>
              <span>›</span>
              <span className="text-gray-700">Categories</span>
            </div>
          </div>

          <button
            type="button"
            className="flex w-fit items-center gap-2 rounded-lg bg-[#0F766E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0B625B]"
          >
            <Plus size={18} strokeWidth={2.2} />
            Add New Category
          </button>
        </div>

        {/* ================= MAIN CARD ================= */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          {/* ================= FILTER BAR ================= */}
          <div className="flex flex-col gap-3 border-b border-gray-100 p-4 lg:flex-row lg:items-center">

            {/* Search */}
            <div className="relative w-full lg:max-w-95">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories..."
                className="h-10 w-full rounded-md border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
              />
            </div>

            {/* Status */}
            <div className="relative w-full sm:w-36.25">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-10 w-full cursor-pointer appearance-none rounded-md border border-gray-200 bg-white px-3 pr-9 text-sm text-gray-600 outline-none focus:border-[#0F766E]"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>

            {/* Spacer */}
            <div className="hidden flex-1 lg:block" />

            {/* Filters */}
            <button
              type="button"
              className="flex h-10 w-fit items-center gap-2 rounded-md border border-gray-200 px-4 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>
          </div>

          {/* ================= TABLE ================= */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-225 border-collapse">

              {/* Table Header */}
              <thead>
                <tr className="border-b border-gray-100 bg-[#FCFDFE]">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-[#26334A]">
                    Category
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-[#26334A]">
                    Description
                  </th>

                  <th className="px-5 py-3.5 text-center text-xs font-semibold text-[#26334A]">
                    Products
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-[#26334A]">
                    Status
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-[#26334A]">
                    Created At
                  </th>

                  <th className="px-5 py-3.5 text-center text-xs font-semibold text-[#26334A]">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => {
                    const Icon = category.icon;

                    return (
                      <tr
                        key={category.id}
                        className="border-b border-gray-100 transition hover:bg-gray-50/70"
                      >
                        {/* Category */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${category.iconBg}`}
                            >
                              <Icon
                                size={19}
                                strokeWidth={1.8}
                                className={category.iconColor}
                              />
                            </div>

                            <span className="text-sm font-semibold text-[#172033]">
                              {category.name}
                            </span>
                          </div>
                        </td>

                        {/* Description */}
                        <td className="px-5 py-3.5">
                          <p className="max-w-87.5 truncate text-sm text-gray-500">
                            {category.description}
                          </p>
                        </td>

                        {/* Products */}
                        <td className="px-5 py-3.5 text-center">
                          <span className="text-sm font-medium text-[#26334A]">
                            {category.products}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-3.5">
                          {category.status === "Active" ? (
                            <span className="inline-flex items-center rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-md border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-500">
                              Inactive
                            </span>
                          )}
                        </td>

                        {/* Created At */}
                        <td className="px-5 py-3.5">
                          <span className="text-sm text-gray-500">
                            {category.createdAt}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-center gap-2">

                            {/* Edit */}
                            <button
                              type="button"
                              onClick={() => handleEdit(category)}
                              aria-label={`Edit ${category.name}`}
                              className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-600 transition hover:border-[#0F766E] hover:bg-teal-50 hover:text-[#0F766E]"
                            >
                              <Pencil size={15} />
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => handleDelete(category.id)}
                              aria-label={`Delete ${category.name}`}
                              className="flex h-9 w-9 items-center justify-center rounded-md border border-red-100 text-red-500 transition hover:bg-red-50"
                            >
                              <Trash2 size={15} />
                            </button>

                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-sm text-gray-500"
                    >
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ================= FOOTER / PAGINATION ================= */}
          <div className="flex flex-col gap-4 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

            {/* Result Count */}
            <p className="text-xs text-gray-500">
              Showing{" "}
              <span className="font-medium text-gray-700">
                {filteredCategories.length === 0
                  ? 0
                  : `1 to ${filteredCategories.length}`}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-700">
                {filteredCategories.length}
              </span>{" "}
              categories
            </p>

            <div className="flex items-center gap-3">

              {/* Previous */}
              <button
                type="button"
                disabled
                className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-300"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Current Page */}
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-md bg-[#0F766E] text-sm font-medium text-white"
              >
                1
              </button>

              {/* Next */}
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition hover:bg-gray-50"
              >
                <ChevronRight size={16} />
              </button>

              {/* Per Page */}
              <button
                type="button"
                className="flex h-9 items-center gap-2 rounded-md border border-gray-200 px-3 text-xs text-gray-600"
              >
                10 / page
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;