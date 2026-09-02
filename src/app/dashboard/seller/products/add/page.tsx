"use client";

import React, { useEffect, useState } from "react";
import {
  Check,
  ChevronDown,
  ImagePlus,
  Link as LinkIcon,
  Save,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import { createProduct } from "@/lib/actions/products";
import { generateProductDescription } from "@/lib/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

/* =========================================================
   TYPES
========================================================= */

interface ProductImage {
  id: number;
  url: string;
}

interface Category {
  id: string;
  name: string;
  description?: string | null;
  status?: string;
}

interface Brand {
  id: string;
  name: string;
}

type GenerateType = "short" | "long" | null;

/* =========================================================
   INITIAL IMAGE DATA
========================================================= */

const initialImages: ProductImage[] = [];

/* =========================================================
   ADD NEW PRODUCT
========================================================= */

const AddNewProduct = () => {
  const router = useRouter();

  /* =======================================================
     FORM STATE
  ======================================================== */

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    brand: "",
    shortDescription: "",
    regularPrice: "",
    salePrice: "",
    stockQuantity: "",
    lowStockAlert: "",
    stockStatus: "IN_STOCK",
    description: "",
  });

  /* =======================================================
     OTHER STATES
  ======================================================== */

  const [images, setImages] =
    useState<ProductImage[]>(initialImages);

  const [productStatus, setProductStatus] =
    useState("published");

  const [productType, setProductType] =
    useState("physical");

  const [stockStatus, setStockStatus] =
    useState("in-stock");

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [categoryLoading, setCategoryLoading] =
    useState(false);

  const [brands, setBrands] =
    useState<Brand[]>([]);

  const [brandLoading, setBrandLoading] =
    useState(false);

  const [generatingType, setGeneratingType] =
    useState<GenerateType>(null);

  const [saving, setSaving] =
    useState(false);

  /* =======================================================
     FETCH CATEGORIES + BRANDS (in parallel)
  ======================================================== */

  useEffect(() => {
    const API_URL =
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5000";

    const fetchCategories = async () => {
      try {
        setCategoryLoading(true);

        const response = await fetch(
          `${API_URL}/api/v1/categories`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to fetch categories"
          );
        }

        if (result.success) {
          setCategories(result.data || []);
        }
      } catch (error) {
        console.error(
          "FAILED TO FETCH CATEGORIES:",
          error
        );

        toast.error(
          "Failed to load categories."
        );
      } finally {
        setCategoryLoading(false);
      }
    };

    const fetchBrands = async () => {
      try {
        setBrandLoading(true);

        const response = await fetch(
          `${API_URL}/api/v1/brands`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to fetch brands"
          );
        }

        if (result.success) {
          setBrands(result.data || []);
        }
      } catch (error) {
        console.error(
          "FAILED TO FETCH BRANDS:",
          error
        );

        toast.error(
          "Failed to load brands."
        );
      } finally {
        setBrandLoading(false);
      }
    };

    // Run both requests concurrently instead of one after another,
    // since neither depends on the other's result.
    Promise.all([
      fetchCategories(),
      fetchBrands(),
    ]);
  }, []);

  /* =======================================================
     HANDLE IMAGE UPLOAD
  ======================================================== */

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (!files) return;

    const selectedFiles = Array.from(files).slice(
      0,
      8 - images.length
    );

    if (selectedFiles.length === 0) {
      toast.error(
        "You can upload up to 8 images."
      );
      return;
    }

    try {
      const uploadedImages: ProductImage[] = [];

      for (const file of selectedFiles) {
        if (file.size > 5 * 1024 * 1024) {
          toast.error(
            `${file.name} is larger than 5MB.`
          );

          continue;
        }

        const uploadData = new FormData();

        uploadData.append(
          "key",
          process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API ||
            ""
        );

        uploadData.append(
          "image",
          file
        );

        const response = await fetch(
          "https://api.imgbb.com/1/upload",
          {
            method: "POST",
            body: uploadData,
          }
        );

        const data = await response.json();

        if (!data.success) {
          throw new Error(
            `Failed to upload ${file.name}`
          );
        }

        uploadedImages.push({
          id:
            Date.now() +
            Math.random(),

          url: data.data.url,
        });
      }

      setImages((prev) => [
        ...prev,
        ...uploadedImages,
      ]);
    } catch (error) {
      console.error(
        "IMAGE UPLOAD ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Image upload failed"
      );
    } finally {
      event.target.value = "";
    }
  };

  /* =======================================================
     REMOVE IMAGE
  ======================================================== */

  const removeImage = (id: number) => {
    setImages((prev) =>
      prev.filter(
        (image) => image.id !== id
      )
    );
  };

  /* =======================================================
     HANDLE FORM CHANGE
  ======================================================== */

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =======================================================
     AI DESCRIPTION GENERATOR
  ======================================================== */

  const handleGenerateDescription = async (
    type: "short" | "long"
  ) => {
    if (!formData.name.trim()) {
      toast.error(
        "Please enter the product name first."
      );

      return;
    }

    if (!formData.category.trim()) {
      toast.error(
        "Please select a category first."
      );

      return;
    }

    try {
      setGeneratingType(type);

      const result =
        await generateProductDescription({
          productName:
            formData.name.trim(),

          category:
            formData.category.trim(),

          shortDescription:
            formData.shortDescription.trim(),
        });

      if (
        !result ||
        !result.shortDescription ||
        !result.description
      ) {
        throw new Error(
          "AI returned an invalid response."
        );
      }

      if (type === "short") {
        setFormData((prev) => ({
          ...prev,

          shortDescription:
            result.shortDescription
              .slice(0, 160),
        }));

        toast.success(
          "Short description generated!"
        );
      }

      if (type === "long") {
        setFormData((prev) => ({
          ...prev,

          description:
            result.description
              .slice(0, 5000),
        }));

        toast.success(
          "Detailed description generated!"
        );
      }
    } catch (error) {
      console.error(
        "AI DESCRIPTION ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to generate description"
      );
    } finally {
      setGeneratingType(null);
    }
  };

  /* =======================================================
     FORM SUBMIT
  ======================================================== */

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      toast.error(
        "Product name is required."
      );

      return;
    }

    if (!formData.category.trim()) {
      toast.error(
        "Category is required."
      );

      return;
    }

    if (!formData.regularPrice) {
      toast.error(
        "Regular price is required."
      );

      return;
    }

    if (!formData.stockQuantity) {
      toast.error(
        "Stock quantity is required."
      );

      return;
    }

    try {
      setSaving(true);

      const productData = {
        ...formData,

        regularPrice:
          Number(
            formData.regularPrice
          ),

        salePrice:
          formData.salePrice
            ? Number(
                formData.salePrice
              )
            : 0,

        stockQuantity:
          Number(
            formData.stockQuantity
          ),

        lowStockAlert:
          formData.lowStockAlert
            ? Number(
                formData.lowStockAlert
              )
            : 10,

        productStatus,

        productType,

        stockStatus,

        images:
          images.map(
            (image) => image.url
          ),
      };

      await createProduct(
        productData
      );

      toast.success(
        "Product added successfully!"
      );

      setTimeout(() => {
        router.push(
          "/dashboard/seller/products"
        );
      }, 1500);
    } catch (error) {
      console.error(
        "FAILED TO CREATE PRODUCT:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to add product"
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     RETURN
  ======================================================== */

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />

      <section className="min-h-screen bg-[#F8FAFA] px-4 py-5 font-['Poppins'] sm:px-6 lg:px-8">

        <div className="mx-auto max-w-362.5">

          {/* =================================================
              PAGE HEADER
          ================================================== */}

          <div className="mb-5">

            <div className="mb-3 flex items-center gap-2 text-[14px] text-[#94A3B8]">

              <span>
                Home
              </span>

              <span>
                /
              </span>

              <span>
                Products
              </span>

              <span>
                /
              </span>

              <span className="text-[#64748B]">
                Add New Product
              </span>

            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <h1 className="text-[26px] font-bold text-[#1E293B] sm:text-[28px]">
                  Add New Product
                </h1>

                <p className="mt-1 text-[14px] text-[#64748B]">
                  Create and publish a new product to your store.
                </p>

              </div>

              <div className="flex items-center gap-3">

                <button
                  type="button"
                  onClick={() => {
                    setProductStatus(
                      "draft"
                    );

                    toast.info(
                      "Product will be saved as draft."
                    );
                  }}
                  className="flex items-center gap-2 rounded-lg border border-[#D9E5E4] bg-white px-4 py-2.5 text-[14px] font-medium text-[#475569] transition-all hover:border-[#0F766E] hover:text-[#0F766E]"
                >
                  <Save size={16} />

                  Save as Draft
                </button>

                <button
                  type="submit"
                  form="product-form"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-lg bg-[#0F766E] px-4 py-2.5 text-[14px] font-semibold text-white transition-all hover:bg-[#0B625B] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Check size={16} />

                  {saving
                    ? "Publishing..."
                    : "Publish Product"}
                </button>

              </div>

            </div>

          </div>


          {/* =================================================
              MAIN FORM
          ================================================== */}

          <form
            id="product-form"
            onSubmit={handleSubmit}
          >

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">

              {/* =================================================
                  LEFT CONTENT
              ================================================== */}

              <div className="space-y-5">

                {/* =================================================
                    BASIC INFORMATION
                ================================================== */}

                <div className="rounded-xl border border-[#E5EEEE] bg-white p-5 shadow-[0_2px_10px_rgba(15,118,110,0.03)]">

                  <div className="mb-5 flex items-center gap-3">

                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F766E] text-[14px] font-semibold text-white">
                      1
                    </div>

                    <h2 className="text-[17px] font-semibold text-[#1E293B]">
                      Basic Information
                    </h2>

                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    {/* Product Name */}

                    <div>

                      <label className="mb-2 block text-[14px] font-medium text-[#334155]">

                        Product Name

                        <span className="text-[#FF6B6B]">
                          {" "}*
                        </span>

                      </label>

                      <input
                        type="text"
                        name="name"
                        value={
                          formData.name
                        }
                        onChange={
                          handleChange
                        }
                        required
                        placeholder="Enter product name"
                        className="w-full rounded-lg border border-[#DDE5E5] bg-white px-3 py-3 text-[14px] text-[#1E293B] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                      />

                    </div>


                    {/* SKU */}

                    <div>

                      <label className="mb-2 block text-[14px] font-medium text-[#334155]">

                        SKU
                        {" "}
                        <span className="font-normal text-[#94A3B8]">
                          (Stock Keeping Unit)
                        </span>

                      </label>

                      <input
                        type="text"
                        name="sku"
                        value={
                          formData.sku
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Enter SKU (e.g. SKU-1001)"
                        className="w-full rounded-lg border border-[#DDE5E5] bg-white px-3 py-3 text-[14px] text-[#1E293B] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                      />

                    </div>


                    {/* Category */}

                    <div>

                      <label className="mb-2 block text-[14px] font-medium text-[#334155]">

                        Category

                        <span className="text-[#FF6B6B]">
                          {" "}*
                        </span>

                      </label>

                      <div className="relative">

                        <select
                          name="category"
                          value={
                            formData.category
                          }
                          onChange={
                            handleChange
                          }
                          required
                          disabled={
                            categoryLoading
                          }
                          className="w-full appearance-none rounded-lg border border-[#DDE5E5] bg-white px-3 py-3 pr-10 text-[14px] text-[#1E293B] outline-none transition-all focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 disabled:cursor-not-allowed disabled:bg-[#F8FAFA]"
                        >

                          <option value="">
                            {categoryLoading
                              ? "Loading categories..."
                              : "Select category"}
                          </option>

                          {categories.map(
                            (category) => (
                              <option
                                key={
                                  category.id
                                }
                                value={
                                  category.name
                                }
                              >
                                {
                                  category.name
                                }
                              </option>
                            )
                          )}

                        </select>

                        <ChevronDown
                          size={17}
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                        />

                      </div>

                    </div>


                    {/* Brand */}

                    <div>

                      <label className="mb-2 block text-[14px] font-medium text-[#334155]">
                        Brand
                      </label>

                      <div className="relative">

                        <select
                          name="brand"
                          value={
                            formData.brand
                          }
                          onChange={
                            handleChange
                          }
                          disabled={
                            brandLoading
                          }
                          className="w-full appearance-none rounded-lg border border-[#DDE5E5] bg-white px-3 py-3 pr-10 text-[14px] text-[#1E293B] outline-none transition-all focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 disabled:cursor-not-allowed disabled:bg-[#F8FAFA]"
                        >

                          <option value="">
                            {brandLoading
                              ? "Loading brands..."
                              : "Select brand"}
                          </option>

                          {brands.map(
                            (brand) => (
                              <option
                                key={
                                  brand.id
                                }
                                value={
                                  brand.name
                                }
                              >
                                {
                                  brand.name
                                }
                              </option>
                            )
                          )}

                        </select>

                        <ChevronDown
                          size={17}
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                        />

                      </div>

                    </div>


                    {/* =================================================
                        SHORT DESCRIPTION
                    ================================================== */}

                    <div className="md:col-span-2">

                      <div className="mb-2 flex items-center justify-between gap-3">

                        <label className="text-[14px] font-medium text-[#334155]">

                          Short Description

                          <span className="text-[#FF6B6B]">
                            {" "}*
                          </span>

                        </label>

                        <span className="text-[12px] text-[#94A3B8]">
                          {
                            formData
                              .shortDescription
                              .length
                          }
                          /160
                        </span>

                      </div>


                      <div className="relative">

                        <textarea
                          name="shortDescription"
                          value={
                            formData.shortDescription
                          }
                          onChange={
                            handleChange
                          }
                          rows={4}
                          maxLength={160}
                          required
                          placeholder="Enter a short description about the product..."
                          className="w-full resize-none rounded-lg border border-[#DDE5E5] bg-white px-3 py-3 pr-3 text-[14px] leading-6 text-[#1E293B] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                        />

                      </div>


                      {/* SHORT AI BUTTON */}

                      <div className="mt-3 flex justify-end">

                        <button
                          type="button"
                          onClick={() =>
                            handleGenerateDescription(
                              "short"
                            )
                          }
                          disabled={
                            generatingType !== null ||
                            !formData.name.trim() ||
                            !formData.category.trim()
                          }
                          className="flex items-center gap-2 rounded-lg border border-[#0F766E] bg-[#F2FAF8] px-4 py-2 text-[13px] font-semibold text-[#0F766E] transition-all hover:bg-[#E6F5F2] disabled:cursor-not-allowed disabled:opacity-50"
                        >

                          <Sparkles
                            size={15}
                            className={
                              generatingType ===
                              "short"
                                ? "animate-spin"
                                : ""
                            }
                          />

                          {generatingType ===
                          "short"
                            ? "Generating Short Description..."
                            : "Generate Short Description"}

                        </button>

                      </div>

                    </div>

                  </div>

                </div>


                {/* =================================================
                    PRODUCT MEDIA
                ================================================== */}

                <div className="rounded-xl border border-[#E5EEEE] bg-white p-5 shadow-[0_2px_10px_rgba(15,118,110,0.03)]">

                  <div className="mb-5 flex items-center gap-3">

                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F766E] text-[14px] font-semibold text-white">
                      2
                    </div>

                    <div>

                      <h2 className="text-[17px] font-semibold text-[#1E293B]">
                        Product Media
                      </h2>

                      <p className="text-[14px] text-[#94A3B8]">
                        Upload high-quality images of your product.
                      </p>

                    </div>

                  </div>


                  <div className="mb-3 flex items-center justify-between">

                    <div>

                      <p className="text-[14px] font-medium text-[#334155]">

                        Product Images

                        <span className="text-[#FF6B6B]">
                          {" "}*
                        </span>

                      </p>

                      <p className="text-[12px] text-[#94A3B8]">
                        PNG, JPG, WEBP up to 5MB each
                      </p>

                    </div>

                    <span className="text-[12px] text-[#94A3B8]">
                      {images.length}/8
                    </span>

                  </div>


                  <label className="group flex min-h-45 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#C9DCDC] bg-[#FAFCFC] px-5 text-center transition-all hover:border-[#0F766E] hover:bg-[#F6FAF9]">

                    <input
                      type="file"
                      multiple
                      accept="image/png,image/jpeg,image/webp"
                      onChange={
                        handleImageUpload
                      }
                      disabled={
                        images.length >= 8
                      }
                      className="hidden"
                    />

                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F5F3] text-[#0F766E] transition-transform group-hover:scale-105">

                      <Upload size={23} />

                    </div>

                    <p className="text-[14px] font-medium text-[#334155]">
                      Drag & drop images here
                    </p>

                    <p className="mt-1 text-[12px] text-[#94A3B8]">
                      or click to browse
                    </p>

                    <p className="mt-2 text-[11px] text-[#94A3B8]">
                      PNG, JPG, WEBP up to 5MB each
                    </p>

                  </label>


                  {images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">

                      {images.map(
                        (image) => (
                          <div
                            key={
                              image.id
                            }
                            className="group relative aspect-square overflow-hidden rounded-lg border border-[#E5EEEE] bg-[#F8FAFA]"
                          >

                            <Image
                              src={
                                image.url
                              }
                              alt="Product preview"
                              width={512}
                              height={512}
                              className="h-full w-full object-cover"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                removeImage(
                                  image.id
                                )
                              }
                              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[#FF6B6B] opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                            >
                              <X
                                size={
                                  15
                                }
                              />
                            </button>

                          </div>
                        )
                      )}

                    </div>
                  )}

                </div>


                {/* =================================================
                    PRICING & STOCK
                ================================================== */}

                <div className="rounded-xl border border-[#E5EEEE] bg-white p-5 shadow-[0_2px_10px_rgba(15,118,110,0.03)]">

                  <div className="mb-5 flex items-center gap-3">

                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F766E] text-[14px] font-semibold text-white">
                      3
                    </div>

                    <h2 className="text-[17px] font-semibold text-[#1E293B]">
                      Pricing & Stock
                    </h2>

                  </div>


                  <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                    {/* Regular Price */}

                    <div>

                      <label className="mb-2 block text-[14px] font-medium text-[#334155]">

                        Regular Price (USD)

                        <span className="text-[#FF6B6B]">
                          {" "}*
                        </span>

                      </label>

                      <input
                        type="number"
                        name="regularPrice"
                        value={
                          formData.regularPrice
                        }
                        onChange={
                          handleChange
                        }
                        min="0"
                        step="0.01"
                        required
                        placeholder="0.00"
                        className="w-full rounded-lg border border-[#DDE5E5] bg-white px-3 py-3 text-[14px] text-[#1E293B] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                      />

                    </div>


                    {/* Sale Price */}

                    <div>

                      <label className="mb-2 block text-[14px] font-medium text-[#334155]">
                        Sale Price (USD)
                      </label>

                      <input
                        type="number"
                        name="salePrice"
                        value={
                          formData.salePrice
                        }
                        onChange={
                          handleChange
                        }
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        className="w-full rounded-lg border border-[#DDE5E5] bg-white px-3 py-3 text-[14px] text-[#1E293B] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                      />

                    </div>


                    {/* Stock Quantity */}

                    <div>

                      <label className="mb-2 block text-[14px] font-medium text-[#334155]">

                        Stock Quantity

                        <span className="text-[#FF6B6B]">
                          {" "}*
                        </span>

                      </label>

                      <input
                        type="number"
                        name="stockQuantity"
                        value={
                          formData.stockQuantity
                        }
                        onChange={
                          handleChange
                        }
                        min="0"
                        required
                        placeholder="0"
                        className="w-full rounded-lg border border-[#DDE5E5] bg-white px-3 py-3 text-[14px] text-[#1E293B] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                      />

                    </div>


                    {/* Low Stock */}

                    <div>

                      <label className="mb-2 block text-[14px] font-medium text-[#334155]">
                        Low Stock Alert
                      </label>

                      <input
                        type="number"
                        name="lowStockAlert"
                        value={
                          formData.lowStockAlert
                        }
                        onChange={
                          handleChange
                        }
                        min="0"
                        placeholder="10"
                        className="w-full rounded-lg border border-[#DDE5E5] bg-white px-3 py-3 text-[14px] text-[#1E293B] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                      />

                    </div>


                    {/* Stock Status */}

                    <div>

                      <label className="mb-2 block text-[14px] font-medium text-[#334155]">
                        Stock Status
                      </label>

                      <div className="relative">

                        <select
                          name="stockStatus"
                          value={
                            stockStatus
                          }
                          onChange={(e) => {
                            setStockStatus(
                              e.target.value
                            );

                            setFormData(
                              (prev) => ({
                                ...prev,
                                stockStatus:
                                  e.target.value ===
                                  "in-stock"
                                    ? "IN_STOCK"
                                    : e.target
                                        .value ===
                                      "low-stock"
                                    ? "LOW_STOCK"
                                    : "OUT_OF_STOCK",
                              })
                            );
                          }}
                          className="w-full appearance-none rounded-lg border border-[#DDE5E5] bg-white px-3 py-3 pr-10 text-[14px] text-[#1E293B] outline-none transition-all focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                        >

                          <option value="in-stock">
                            In Stock
                          </option>

                          <option value="low-stock">
                            Low Stock
                          </option>

                          <option value="out-of-stock">
                            Out of Stock
                          </option>

                        </select>

                        <ChevronDown
                          size={17}
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                        />

                      </div>

                    </div>

                  </div>

                </div>


                {/* =================================================
                    PRODUCT DETAILS
                ================================================== */}

                <div className="rounded-xl border border-[#E5EEEE] bg-white p-5 shadow-[0_2px_10px_rgba(15,118,110,0.03)]">

                  <div className="mb-5 flex items-center gap-3">

                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F766E] text-[14px] font-semibold text-white">
                      4
                    </div>

                    <h2 className="text-[17px] font-semibold text-[#1E293B]">
                      Product Details
                    </h2>

                  </div>


                  {/* Description Header */}

                  <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <label className="text-[14px] font-medium text-[#334155]">

                      Description

                      <span className="text-[#FF6B6B]">
                        {" "}*
                      </span>

                    </label>

                    <span className="text-[12px] text-[#94A3B8]">
                      {
                        formData
                          .description
                          .length
                      }
                      /5000
                    </span>

                  </div>


                  {/* Simple Toolbar */}

                  <div className="flex items-center gap-1 rounded-t-lg border border-[#DDE5E5] bg-[#F8FAFA] p-2">

                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-md text-[13px] font-semibold text-[#475569] hover:bg-white"
                    >
                      B
                    </button>

                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-md text-[13px] italic text-[#475569] hover:bg-white"
                    >
                      I
                    </button>

                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-md text-[13px] underline text-[#475569] hover:bg-white"
                    >
                      U
                    </button>

                    <div className="mx-1 h-5 w-px bg-[#DDE5E5]" />

                    <button
                      type="button"
                      className="flex h-8 items-center justify-center rounded-md px-2 text-[13px] text-[#475569] hover:bg-white"
                    >
                      • List
                    </button>

                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-md text-[#475569] hover:bg-white"
                    >
                      <LinkIcon
                        size={16}
                      />
                    </button>

                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-md text-[#475569] hover:bg-white"
                    >
                      <ImagePlus
                        size={16}
                      />
                    </button>

                  </div>


                  <textarea
                    name="description"
                    value={
                      formData.description
                    }
                    onChange={
                      handleChange
                    }
                    rows={12}
                    maxLength={5000}
                    required
                    placeholder="Write detailed description about the product..."
                    className="w-full resize-none rounded-b-lg border border-t-0 border-[#DDE5E5] bg-white px-4 py-4 text-[14px] leading-6 text-[#0F172A] outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                  />


                  {/* LONG AI BUTTON */}

                  <div className="mt-3 flex justify-end">

                    <button
                      type="button"
                      onClick={() =>
                        handleGenerateDescription(
                          "long"
                        )
                      }
                      disabled={
                        generatingType !== null ||
                        !formData.name.trim() ||
                        !formData.category.trim()
                      }
                      className="flex items-center gap-2 rounded-lg bg-[#0F766E] px-4 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-[#0B625B] disabled:cursor-not-allowed disabled:opacity-50"
                    >

                      <Sparkles
                        size={16}
                        className={
                          generatingType ===
                          "long"
                            ? "animate-spin"
                            : ""
                        }
                      />

                      {generatingType ===
                      "long"
                        ? "Generating Detailed Description..."
                        : "Generate Detailed Description"}

                    </button>

                  </div>

                </div>

              </div>


              {/* =================================================
                  RIGHT SIDEBAR
              ================================================== */}

              <aside className="space-y-5">

                {/* Product Status */}

                <div className="rounded-xl border border-[#E5EEEE] bg-white p-5">

                  <h3 className="mb-4 text-[16px] font-semibold text-[#1E293B]">
                    Product Status
                  </h3>

                  <div className="space-y-4">

                    {/* Draft */}

                    <label className="flex cursor-pointer items-start gap-3">

                      <input
                        type="radio"
                        name="productStatus"
                        value="draft"
                        checked={
                          productStatus ===
                          "draft"
                        }
                        onChange={(e) =>
                          setProductStatus(
                            e.target.value
                          )
                        }
                        className="mt-1 accent-[#0F766E]"
                      />

                      <div>

                        <p className="text-[14px] font-medium text-[#334155]">
                          Draft
                        </p>

                        <p className="mt-0.5 text-[12px] leading-5 text-[#94A3B8]">
                          Save as draft and continue later
                        </p>

                      </div>

                    </label>


                    {/* Pending */}

                    <label className="flex cursor-pointer items-start gap-3">

                      <input
                        type="radio"
                        name="productStatus"
                        value="pending"
                        checked={
                          productStatus ===
                          "pending"
                        }
                        onChange={(e) =>
                          setProductStatus(
                            e.target.value
                          )
                        }
                        className="mt-1 accent-[#0F766E]"
                      />

                      <div>

                        <p className="text-[14px] font-medium text-[#334155]">
                          Pending Review
                        </p>

                        <p className="mt-0.5 text-[12px] leading-5 text-[#94A3B8]">
                          Submit for admin review
                        </p>

                      </div>

                    </label>


                    {/* Published */}

                    <label className="flex cursor-pointer items-start gap-3">

                      <input
                        type="radio"
                        name="productStatus"
                        value="published"
                        checked={
                          productStatus ===
                          "published"
                        }
                        onChange={(e) =>
                          setProductStatus(
                            e.target.value
                          )
                        }
                        className="mt-1 accent-[#0F766E]"
                      />

                      <div>

                        <p className="text-[14px] font-medium text-[#334155]">
                          Published
                        </p>

                        <p className="mt-0.5 text-[12px] leading-5 text-[#94A3B8]">
                          Make product live
                        </p>

                      </div>

                    </label>

                  </div>

                </div>


                {/* Product Type */}

                <div className="rounded-xl border border-[#E5EEEE] bg-white p-5">

                  <h3 className="mb-4 text-[16px] font-semibold text-[#1E293B]">
                    Product Type
                  </h3>

                  <div className="space-y-4">

                    <label className="flex cursor-pointer items-start gap-3">

                      <input
                        type="radio"
                        name="productType"
                        value="physical"
                        checked={
                          productType ===
                          "physical"
                        }
                        onChange={(e) =>
                          setProductType(
                            e.target.value
                          )
                        }
                        className="mt-1 accent-[#0F766E]"
                      />

                      <div>

                        <p className="text-[14px] font-medium text-[#334155]">
                          Physical Product
                        </p>

                        <p className="mt-0.5 text-[12px] leading-5 text-[#94A3B8]">
                          Shipped to customer
                        </p>

                      </div>

                    </label>


                    <label className="flex cursor-pointer items-start gap-3">

                      <input
                        type="radio"
                        name="productType"
                        value="digital"
                        checked={
                          productType ===
                          "digital"
                        }
                        onChange={(e) =>
                          setProductType(
                            e.target.value
                          )
                        }
                        className="mt-1 accent-[#0F766E]"
                      />

                      <div>

                        <p className="text-[14px] font-medium text-[#334155]">
                          Digital Product
                        </p>

                        <p className="mt-0.5 text-[12px] leading-5 text-[#94A3B8]">
                          Downloadable or virtual
                        </p>

                      </div>

                    </label>

                  </div>

                </div>


                {/* Product Summary */}

                <div className="rounded-xl border border-[#E5EEEE] bg-white p-5">

                  <h3 className="mb-4 text-[16px] font-semibold text-[#1E293B]">
                    Product Summary
                  </h3>

                  <div className="space-y-4">

                    <div className="flex items-center justify-between gap-4">

                      <span className="text-[13px] text-[#64748B]">
                        Category
                      </span>

                      <span className="text-right text-[13px] font-medium text-[#334155]">
                        {formData.category ||
                          "Not selected"}
                      </span>

                    </div>


                    <div className="flex items-center justify-between gap-4">

                      <span className="text-[13px] text-[#64748B]">
                        Brand
                      </span>

                      <span className="text-right text-[13px] font-medium text-[#334155]">
                        {formData.brand ||
                          "Not selected"}
                      </span>

                    </div>


                    <div className="flex items-center justify-between gap-4">

                      <span className="text-[13px] text-[#64748B]">
                        Price
                      </span>

                      <span className="text-[13px] font-medium text-[#334155]">
                        $
                        {formData.salePrice ||
                          formData.regularPrice ||
                          "0.00"}
                      </span>

                    </div>


                    <div className="flex items-center justify-between gap-4">

                      <span className="text-[13px] text-[#64748B]">
                        Stock
                      </span>

                      <span className="text-[13px] font-medium text-[#334155]">
                        {formData.stockQuantity ||
                          "0"}
                      </span>

                    </div>


                    <div className="flex items-center justify-between gap-4">

                      <span className="text-[13px] text-[#64748B]">
                        Status
                      </span>

                      <span className="rounded-md bg-[#E8F5F3] px-2.5 py-1 text-[12px] font-medium capitalize text-[#0F766E]">
                        {stockStatus.replace(
                          "-",
                          " "
                        )}
                      </span>

                    </div>

                  </div>

                </div>


                {/* Tips */}

                <div className="rounded-xl border border-[#DDEDEB] bg-[#F4FBF9] p-5">

                  <div className="mb-4 flex items-center gap-2">

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F5F3]">

                      <Sparkles
                        size={17}
                        className="text-[#0F766E]"
                      />

                    </div>

                    <h3 className="text-[16px] font-semibold text-[#1E293B]">
                      Tips for better sales
                    </h3>

                  </div>

                  <ul className="space-y-3">

                    {[
                      "Use high-quality images",
                      "Write clear and detailed descriptions",
                      "Set competitive pricing",
                      "Choose the right category",
                      "Keep stock information updated",
                    ].map(
                      (tip) => (
                        <li
                          key={tip}
                          className="flex items-start gap-2"
                        >

                          <Check
                            size={16}
                            className="mt-0.5 shrink-0 text-[#0F766E]"
                          />

                          <span className="text-[13px] leading-5 text-[#64748B]">
                            {tip}
                          </span>

                        </li>
                      )
                    )}

                  </ul>

                  <button
                    type="button"
                    className="mt-4 text-[13px] font-medium text-[#0F766E] hover:underline"
                  >
                    Learn more →
                  </button>

                </div>

              </aside>

            </div>

          </form>

        </div>

      </section>
    </>
  );
};

export default AddNewProduct;