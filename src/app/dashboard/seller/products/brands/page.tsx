"use client";

import React, { useEffect, useMemo, useState } from "react";
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
  X,
} from "lucide-react";
import Image from "next/image";
import { Brand } from "@/type/dashboard/Seller";

const Brands = () => {
  const [brandsData, setBrandsData] = useState<Brand[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= ADD BRAND MODAL STATE =================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    logo: "",
  });

  // ================= FETCH BRANDS =================

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/brands`);

        const result = await response.json();

        if (result.success) {
          setBrandsData(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch brands:", error);
        setError("Failed to load brands");
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  // ================= FILTER =================

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
  }, [brandsData, search, statusFilter, categoryFilter]);

  // ================= UPLOAD LOGO (imgbb) =================

  const handleLogoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setFormError("Logo image must be under 5MB.");
      return;
    }

    try {
      setIsUploadingLogo(true);
      setFormError("");

      const uploadData = new FormData();
      uploadData.append("key", process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API || "");
      uploadData.append("image", file);

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error("Failed to upload logo");
      }

      setForm((prev) => ({ ...prev, logo: data.data.url }));
    } catch (error) {
      console.error("LOGO UPLOAD ERROR:", error);
      setFormError("Failed to upload logo. Please try again.");
    } finally {
      setIsUploadingLogo(false);
      // Allow re-selecting the same file if the user wants to replace it.
      event.target.value = "";
    }
  };

  // ================= ADD BRAND =================

  const handleAddBrand = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setFormError("Brand name is required.");
      return;
    }

    try {
      setIsSaving(true);
      setFormError("");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/brands`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          description: form.description.trim() || undefined,
          logo: form.logo.trim() || undefined,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to create brand");
      }

      // New brand starts with 0 products — matches the flat shape
      // returned by getBrands().
      setBrandsData((prev) => [
        {
          id: result.data.id,
          name: result.data.name,
          description: result.data.description,
          logo: result.data.logo,
          status: result.data.status,
          createdAt: result.data.createdAt,
          products: 0,
        },
        ...prev,
      ]);

      setForm({ name: "", description: "", logo: "" });
      setIsModalOpen(false);
    } catch (error: unknown) {
      console.error("Create brand error:", error);
      const message =
        error instanceof Error ? error.message : "Failed to create brand";
      setFormError(message);
    } finally {
      setIsSaving(false);
    }
  };

  // ================= DELETE =================

  const handleDelete = async (brand: Brand) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${brand.name}?`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/brands/${brand.id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to delete brand");
      }

      setBrandsData((prev) => prev.filter((item) => item.id !== brand.id));
    } catch (error) {
      console.error("Delete brand error:", error);
      alert("Failed to delete brand");
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
          onClick={() => setIsModalOpen(true)}
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
              {/* LOADING */}
              {loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-[12px] text-[#64748B]"
                  >
                    Loading brands...
                  </td>
                </tr>
              )}

              {/* ERROR */}
              {!loading && error && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-[12px] text-red-500"
                  >
                    {error}
                  </td>
                </tr>
              )}

              {!loading &&
                !error &&
                filteredBrands.map((brand) => (
                  <tr
                    key={brand.id}
                    className="border-b border-[#EEF0F3] transition hover:bg-[#FCFDFD]"
                  >
                    {/* Brand */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-4">
                        <div className="flex h-9 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#E2E8F0] bg-white p-2">
                          {brand.logo ? (
                            <Image
                              src={brand.logo}
                              alt={`${brand.name} logo`}
                              className="max-h-full max-w-full object-contain"
                              height={512}
                              width={512}
                            />
                          ) : (
                            <span className="text-[10px] font-semibold text-[#94A3B8]">
                              {brand.name.slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </div>

                        <span className="text-[12px] font-semibold text-[#172554]">
                          {brand.name}
                        </span>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="max-w-55 px-4 py-3">
                      <p className="line-clamp-2 text-[11px] leading-5 text-[#475569]">
                        {brand.description || "No description"}
                      </p>
                    </td>

                    {/* Products */}
                    <td className="px-4 py-3 text-center text-[11px] font-medium text-[#334155]">
                      {brand.products}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-sm border px-2 py-1 text-[10px] font-medium ${brand.status === "Active"
                            ? "border-[#B7E4D8] bg-[#ECFDF5] text-[#047857]"
                            : "border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]"
                          }`}
                      >
                        {brand.status}
                      </span>
                    </td>

                    {/* Created */}
                    <td className="px-4 py-3 text-[11px] text-[#475569]">
                      {new Date(brand.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        {/* View */}
                        {/* <button
                          type="button"
                          title="View brand"
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#DDE3EA] text-[#475569] transition hover:border-[#0F766E] hover:bg-[#F0FDFA] hover:text-[#0F766E]"
                        >
                          <Eye size={14} />
                        </button> */}

                        {/* Edit */}
                        {/* <button
                          type="button"
                          title="Edit brand"
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#DDE3EA] text-[#475569] transition hover:border-[#0F766E] hover:bg-[#F0FDFA] hover:text-[#0F766E]"
                        >
                          <Pencil size={14} />
                        </button> */}

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

              {!loading && !error && filteredBrands.length === 0 && (
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
          {loading && (
            <div className="px-4 py-12 text-center text-[12px] text-[#64748B]">
              Loading brands...
            </div>
          )}

          {!loading && error && (
            <div className="px-4 py-12 text-center text-[12px] text-red-500">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            filteredBrands.map((brand) => (
              <div
                key={brand.id}
                className="border-b border-[#EEF0F3] p-4 last:border-b-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-12 shrink-0 items-center justify-center rounded-md border border-[#E2E8F0] p-2">
                      {brand.logo ? (
                        <Image
                          src={brand.logo}
                          alt={`${brand.name} logo`}
                          className="max-h-full max-w-full object-contain"
                          height={512}
                          width={512}
                        />
                      ) : (
                        <span className="text-[10px] font-semibold text-[#94A3B8]">
                          {brand.name.slice(0, 2).toUpperCase()}
                        </span>
                      )}
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
                    className={`rounded-sm border px-2 py-1 text-[10px] font-medium ${brand.status === "Active"
                        ? "border-[#B7E4D8] bg-[#ECFDF5] text-[#047857]"
                        : "border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]"
                      }`}
                  >
                    {brand.status}
                  </span>
                </div>

                <p className="mt-3 text-[11px] leading-5 text-[#475569]">
                  {brand.description || "No description"}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] text-[#64748B]">
                    Created{" "}
                    {new Date(brand.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
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

          {!loading && !error && filteredBrands.length === 0 && (
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

      {/* ================= ADD BRAND MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[16px] font-semibold text-[#172554]">
                Add New Brand
              </h2>

              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setFormError("");
                }}
                className="flex h-8 w-8 items-center justify-center rounded-md text-[#64748B] transition hover:bg-[#F1F5F9]"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddBrand} className="space-y-4">
              <div>
                <label className="mb-1 block text-[12px] font-medium text-[#334155]">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g. Puma"
                  className="h-10 w-full rounded-md border border-[#DDE3EA] px-3 text-[12px] text-[#1E293B] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                />
              </div>

              <div>
                <label className="mb-1 block text-[12px] font-medium text-[#334155]">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Short description of the brand"
                  rows={3}
                  className="w-full resize-none rounded-md border border-[#DDE3EA] px-3 py-2 text-[12px] text-[#1E293B] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                />
              </div>

              <div>
                <label className="mb-1 block text-[12px] font-medium text-[#334155]">
                  Brand Logo (optional)
                </label>

                {form.logo ? (
                  <div className="flex items-center gap-3 rounded-md border border-[#DDE3EA] p-2">
                    <div className="flex h-14 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#E2E8F0] bg-white p-1.5">
                      <Image
                        src={form.logo}
                        alt="Logo preview"
                        className="max-h-full max-w-full object-contain"
                        height={512}
                        width={512}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, logo: "" }))
                      }
                      className="text-[12px] font-medium text-[#EF4444] hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="brand-logo-upload"
                    className={`flex h-24 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed border-[#DDE3EA] text-[12px] text-[#64748B] transition hover:border-[#0F766E] hover:text-[#0F766E] ${isUploadingLogo ? "pointer-events-none opacity-60" : ""
                      }`}
                  >
                    {isUploadingLogo ? "Uploading..." : "Click to upload logo"}
                    <span className="text-[10px] text-[#94A3B8]">
                      PNG, JPG up to 5MB
                    </span>

                    <input
                      id="brand-logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      disabled={isUploadingLogo}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {formError && (
                <p className="text-[12px] text-red-500">{formError}</p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormError("");
                  }}
                  className="rounded-md border border-[#DDE3EA] px-4 py-2 text-[12px] font-medium text-[#334155] transition hover:bg-[#F8FAFC]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving || isUploadingLogo}
                  className="rounded-md bg-[#0F766E] px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-[#0B625B] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? "Saving..." : "Add Brand"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Brands;