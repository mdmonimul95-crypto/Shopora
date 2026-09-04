"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Trash2,
  Headphones,
  Shirt,
  Sofa,
  ShoppingBag,
  Dumbbell,
  BookOpen,
   X,
} from "lucide-react";
import { type Category } from "@/type/dashboard/Seller";
import Image from "next/image";
import { toast } from "react-toastify";




const Category =  () => {
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isSaving, setIsSaving] = useState(false);
 const [formError, setFormError] = useState("");
 const [isUploadingImage, setIsUploadingImage] = useState(false);
 const [form, setForm] = useState({ name: "", description: "", image: "",});

  

  // ================= FETCH CATEGORIES =================

useEffect(() => {
  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`
      );

      const result = await response.json();

      if (result.success) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchCategories();
}, []);

  // ================= FILTER =================

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchesSearch =
        category.name.toLowerCase().includes(search.toLowerCase()) ||
        (category.description || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "All Status" ||
        category.status.toUpperCase() === status.toUpperCase();

      return matchesSearch && matchesStatus;
    });
  }, [categories, search, status]);

  // ================= ICON =================

  const getCategoryIcon = (name: string) => {
    const lowerName = name.toLowerCase();

    if (lowerName.includes("electronic")) {
      return {
        Icon: Headphones,
        bg: "bg-teal-50",
        color: "text-teal-600",
      };
    }

    if (lowerName.includes("fashion")) {
      return {
        Icon: Shirt,
        bg: "bg-orange-50",
        color: "text-orange-600",
      };
    }

    if (lowerName.includes("home")) {
      return {
        Icon: Sofa,
        bg: "bg-purple-50",
        color: "text-purple-600",
      };
    }

    if (lowerName.includes("beauty")) {
      return {
        Icon: ShoppingBag,
        bg: "bg-yellow-50",
        color: "text-yellow-600",
      };
    }

    if (lowerName.includes("sport")) {
      return {
        Icon: Dumbbell,
        bg: "bg-blue-50",
        color: "text-blue-600",
      };
    }

    return {
      Icon: BookOpen,
      bg: "bg-red-50",
      color: "text-red-500",
    };
  };


  // ================= CATEGORY IMAGE UPLOAD =================

const handleCategoryImageUpload = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0];

  if (!file) return;

  // 5MB validation
  if (file.size > 5 * 1024 * 1024) {
    setFormError("Category image must be under 5MB.");
    event.target.value = "";
    return;
  }

  try {
    setIsUploadingImage(true);
    setFormError("");

    const uploadData = new FormData();

    uploadData.append(
      "key",
      process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API || ""
    );

    uploadData.append("image", file);

    const response = await fetch(
      "https://api.imgbb.com/1/upload",
      {
        method: "POST",
        body: uploadData,
      }
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error("Failed to upload category image");
    }

    // Save uploaded image URL
    setForm((prev) => ({
      ...prev,
      image: data.data.url,
    }));

  } catch (error) {
    console.error(
      "CATEGORY IMAGE UPLOAD ERROR:",
      error
    );

    setFormError(
      "Failed to upload category image. Please try again."
    );

  } finally {
    setIsUploadingImage(false);

    // Same image আবার select করতে পারবে
    event.target.value = "";
  }
};

  // ================= ADD CATEGORY =================

const handleAddCategory = async (
  event: React.FormEvent
) => {
  event.preventDefault();

  if (!form.name.trim()) {
    setFormError("Category name is required.");
    return;
  }

  try {
    setIsSaving(true);
    setFormError("");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          description:
            form.description.trim() || undefined,
            image: form.image.trim() || undefined,
        }),
      }
    );

    const result = await response.json();

    if (!result.success) {
      throw new Error(
        result.message || "Failed to create category"
      );
    }

    // Immediately update UI
    setCategories((prev) => [
      {
        ...result.data,
        _count: {
          products: 0,
        },
      },
      ...prev,
    ]);

    // Reset form
    setForm({
      name: "",
      description: "",
      image: "",
    });

    // Close modal
    setIsModalOpen(false);

    toast.success("Category added successfully.");

  } catch (error: unknown) {
    console.error(
      "Create category error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Failed to create category";

    setFormError(message);

  } finally {
    setIsSaving(false);
  }
};

  // ================= EDIT =================

  const handleEdit = (category: Category) => {
    console.log("Edit category:", category);
  };

  // ================= DELETE =================

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }


      setCategories((prev) =>
        prev.filter((category) => category.id !== id)
      );

      toast.success("Category deleted successfully.")

    } catch (error) {
      console.error("Delete category error:", error);
      alert("Failed to delete category");
    }
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
            onClick={() => {
              setIsModalOpen(true);
              setFormError("");

              setForm({
                name: "",
                description: "",
                image: "",
              });
            }}
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

            <div className="hidden flex-1 lg:block" />

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

              <tbody>
                {/* LOADING */}

                {loading && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-sm text-gray-500"
                    >
                      Loading categories...
                    </td>
                  </tr>
                )}

                {/* ERROR */}

                {!loading && error && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-sm text-red-500"
                    >
                      {error}
                    </td>
                  </tr>
                )}

                {/* DATA */}

                {!loading &&
                  !error &&
                  filteredCategories.length > 0 &&
                  filteredCategories.map((category) => {
                    const { Icon, bg, color } = getCategoryIcon(category.name);

                    return (
                      <tr
                        key={category.id}
                        className="border-b border-gray-100 transition hover:bg-gray-50/70"
                      >
                        {/* Category */}

                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bg}`}
                            >
                              {category.image ? (
                                <Image
                                  src={category.image}
                                  alt={category.name}
                                  width={40}
                                  height={40}
                                  className="h-full w-full  object-cover"
                                />
                              ) : (
                                <Icon
                                  size={19}
                                  strokeWidth={1.8}
                                  className={color}
                                />
                              )}
                            </div>

                            <span className="text-sm font-semibold text-[#172033]">
                              {category.name}
                            </span>
                          </div>
                        </td>

                        {/* Description */}

                        <td className="px-5 py-3.5">
                          <p className="max-w-87.5 truncate text-sm text-gray-500">
                            {category.description || "No description"}
                          </p>
                        </td>

                        {/* PRODUCTS COUNT */}

                        <td className="px-5 py-3.5 text-center">
                          <span className="text-sm font-medium text-[#26334A]">
                            {category._count.products}
                          </span>
                        </td>

                        {/* STATUS */}

                        <td className="px-5 py-3.5">
                          {category.status.toUpperCase() === "ACTIVE" ? (
                            <span className="inline-flex items-center rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-md border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-500">
                              Inactive
                            </span>
                          )}
                        </td>

                        {/* CREATED AT */}

                        <td className="px-5 py-3.5">
                          <span className="text-sm text-gray-500">
                            {new Date(category.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </td>

                        {/* ACTIONS */}

                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-center gap-2">
                            {/* EDIT */}

                            {/* <button
                              type="button"
                              onClick={() => handleEdit(category)}
                              aria-label={`Edit ${category.name}`}
                              className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-600 transition hover:border-[#0F766E] hover:bg-teal-50 hover:text-[#0F766E]"
                            >
                              <Pencil size={15} />
                            </button> */}

                            {/* DELETE */}

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
                  })}

                {/* NO DATA */}

                {!loading && !error && filteredCategories.length === 0 && (
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

          {/* ================= FOOTER ================= */}

          <div className="flex flex-col gap-4 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
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
              <button
                type="button"
                disabled
                className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-300"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-md bg-[#0F766E] text-sm font-medium text-white"
              >
                1
              </button>

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition hover:bg-gray-50"
              >
                <ChevronRight size={16} />
              </button>

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
      {/* ================= ADD CATEGORY MODAL ================= */}

{isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-lg">

      {/* HEADER */}

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[18px] font-semibold text-[#172033]">
          Add New Category
        </h2>

        <button
          type="button"
          onClick={() => {
            setIsModalOpen(false);
            
            setFormError("");
          }}
          className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100"
        >
          <X size={17} />
        </button>
      </div>

      {/* FORM */}

      <form
        onSubmit={handleAddCategory}
        className="space-y-4"
      >

        {/* CATEGORY NAME */}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#334155]">
            Category Name
          </label>

          <input
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            placeholder="e.g. Electronics"
            className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
          />
        </div>

        {/* DESCRIPTION */}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#334155]">
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
            placeholder="Short description of the category"
            rows={4}
            className="w-full resize-none rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
          />
        </div>

        {/* CATEGORY IMAGE */}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#334155]">
            Category Image (optional)
          </label>

          {form.image ? (
            <div className="flex items-center gap-3 rounded-md border border-[#DDE3EA] p-2">

              {/* IMAGE PREVIEW */}

              <div className="flex h-14 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#E2E8F0] bg-white p-1.5">
                <Image
                  src={form.image}
                  alt="Category preview"
                  width={512}
                  height={512}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[#334155]">
                  Image uploaded
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      image: "",
                    }))
                  }
                  className="w-fit text-sm font-medium text-[#EF4444] hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <label
              htmlFor="category-image-upload"
              className={`flex h-24 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed border-[#DDE3EA] text-sm text-[#64748B] transition hover:border-[#0F766E] hover:text-[#0F766E] ${
                isUploadingImage
                  ? "pointer-events-none opacity-60"
                  : ""
              }`}
            >
              {isUploadingImage
                ? "Uploading..."
                : "Click to upload category image"}

              <span className="text-xs text-[#94A3B8]">
                PNG, JPG up to 5MB
              </span>

              <input
                id="category-image-upload"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleCategoryImageUpload}
                disabled={isUploadingImage}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* ERROR */}

        {formError && (
          <p className="text-sm text-red-500">
            {formError}
          </p>
        )}

        {/* BUTTONS */}

        <div className="flex justify-end gap-2 pt-2">

          <button
            type="button"
            onClick={() => {
              setIsModalOpen(false);          
              setFormError("");

              setForm({
                name: "",
                description: "",
                image: "",
              });
            }}
            className="rounded-md border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSaving || isUploadingImage}
            className="rounded-md bg-[#0F766E] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B625B] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Add Category"}
          </button>

        </div>

      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default Category;