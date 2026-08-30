"use client";

import React, { useState } from "react";
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

/* =========================================================
   PRODUCT IMAGE DATA
========================================================= */

const initialImages: ProductImage[] = [];

/* =========================================================
   ADD NEW PRODUCT
========================================================= */

const AddNewProduct = () => {
  const router = useRouter();

  /* =======================================================
     STATE
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

  const [images, setImages] = useState<ProductImage[]>(initialImages);

  const [productStatus, setProductStatus] = useState("published");

  const [productType, setProductType] = useState("physical");

  const [stockStatus, setStockStatus] = useState("in-stock");

  // const [isDigital, setIsDigital] =
  //   useState(false);

  /* =======================================================
     IMAGE UPLOAD
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

  try {
    const uploadedImages: ProductImage[] = [];

    for (const file of selectedFiles) {
      const formData = new FormData();

      formData.append(
        "key",
        process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API!
      );

      formData.append("image", file);

      const response = await fetch(
        "https://api.imgbb.com/1/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error("Image upload failed");
      }

      uploadedImages.push({
        id: Date.now() + Math.random(),
        url: data.data.url,
      });
    }

    setImages((prev) => [
      ...prev,
      ...uploadedImages,
    ]);
  } catch (error) {
    // console.error("Image upload error:", error);
  }
};

  /* =======================================================
     REMOVE IMAGE
  ======================================================== */

  const removeImage = (id: number) => {
    setImages((prev) =>
      prev.filter((image) => image.id !== id)
    );
  };

const handleChange = (  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = event.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
    
  }));
};


  /* =======================================================
     FORM SUBMIT
  ======================================================== */

 const handleSubmit = async (
  event: React.FormEvent
) => {
  event.preventDefault();

  const productData = {
    ...formData,
    productStatus,
    productType,
    stockStatus,
    images: images.map((image) => image.url),
  };

  try {
    const result = await createProduct(productData);

    // console.log("Product created:", result);

    toast.success("Product added successfully!");

  
    setTimeout(() => {
    router.push("/dashboard/seller/products");
    }, 1500);

  } catch (error) {
    // console.error("Failed to create product:", error);

    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to add product"
    );
  }
};

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

<section className="min-h-screen bg-[#F8FAFA] px-4 py-5 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-362.5">

        {/* =================================================
            PAGE HEADER - START
        ================================================== */}

        <div className="mb-5">

          {/* Breadcrumb */}
          <div className="mb-3 flex items-center gap-2 font-['Poppins'] text-[14px] text-[#94A3B8]">

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

          {/* Header */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h1 className="font-['Poppins'] text-[26px] font-bold text-[#1E293B] sm:text-[28px]">
                Add New Product
              </h1>

              <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
                Create and publish a new product to your store.
              </p>
            </div>

            {/* Header Buttons */}
            <div className="flex items-center gap-3">

              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-[#D9E5E4] bg-white px-4 py-2.5 font-['Poppins'] text-[14px] font-medium text-[#475569] transition-all hover:border-[#0F766E] hover:text-[#0F766E]"
              >
                <Save size={16} />
                Save as Draft
              </button>

              <button
                type="submit"
                form="product-form"
                className="flex items-center gap-2 rounded-lg bg-[#0F766E] px-4 py-2.5 font-['Poppins'] text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-[#0B625B]"
              >
                <Check size={16} />
                Publish Product
              </button>

            </div>

          </div>

        </div>

        {/* =================================================
            PAGE HEADER - END
        ================================================== */}


        <form
          id="product-form"
          onSubmit={handleSubmit}
        >

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">

            {/* =================================================
                LEFT CONTENT - START
            ================================================== */}

            <div className="space-y-5">


              {/* =================================================
                  BASIC INFORMATION - START
              ================================================== */}

              <div className="rounded-xl border border-[#E5EEEE] bg-white p-5 shadow-[0_2px_10px_rgba(15,118,110,0.03)]">

                {/* Section Header */}
                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F766E] font-['Poppins'] text-[14px] font-semibold text-white">
                    1
                  </div>

                  <h2 className="font-['Poppins'] text-[17px] font-semibold text-[#1E293B]">
                    Basic Information
                  </h2>

                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  {/* Product Name */}
                  <div className="md:col-span-1">

                    <label className="mb-2 block font-['Poppins'] text-[14px] font-medium text-[#334155]">
                      Product Name
                      <span className="text-[#FF6B6B]">
                        {" "}*
                      </span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter product name"
                      className="h-11 w-full rounded-lg border border-[#DCE7E7] bg-white px-3 font-['Poppins'] text-[14px] text-[#1E293B] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                    />

                  </div>

                  {/* SKU */}
                  <div>

                    <label className="mb-2 block font-['Poppins'] text-[14px] font-medium text-[#334155]">
                      SKU
                      <span className="ml-1 text-[14px] font-normal text-[#94A3B8]">
                        (Stock Keeping Unit)
                      </span>
                    </label>

                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleChange}
                      placeholder="Enter SKU (e.g. SKU-1001)"
                      className="h-11 w-full rounded-lg border border-[#DCE7E7] bg-white px-3 font-['Poppins'] text-[14px] text-[#1E293B] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                    />

                  </div>

                  {/* Category */}
                  <div>

                    <label className="mb-2 block font-['Poppins'] text-[14px] font-medium text-[#334155]">
                      Category
                      <span className="text-[#FF6B6B]">
                        {" "}*
                      </span>
                    </label>

                    <div className="relative">

                      <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      
                        className="h-11 w-full appearance-none rounded-lg border border-[#DCE7E7] bg-white px-3 pr-10 font-['Poppins'] text-[14px] text-[#64748B] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                      >
                        <option value="" disabled>
                          Select category
                        </option>
                        <option>
                          Electronics
                        </option>
                        <option>
                          Fashion
                        </option>
                        <option>
                          Home & Living
                        </option>
                        <option>
                          Beauty & Personal Care
                        </option>
                        <option>
                          Sports & Outdoors
                        </option>
                        <option>
                          Baby & Toys
                        </option>
                      </select>

                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                      />

                    </div>

                  </div>

                  {/* Brand */}
                  <div>

                    <label className="mb-2 block font-['Poppins'] text-[14px] font-medium text-[#334155]">
                      Brand
                    </label>

                    <div className="relative">

                      <select
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}                       
                        className="h-11 w-full appearance-none rounded-lg border border-[#DCE7E7] bg-white px-3 pr-10 font-['Poppins'] text-[14px] text-[#64748B] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                      >
                        <option value="" disabled>
                          Select brand
                        </option>
                        <option>
                          Apple
                        </option>
                        <option>
                          Samsung
                        </option>
                        <option>
                          Sony
                        </option>
                        <option>
                          Nike
                        </option>
                        <option>
                          Adidas
                        </option>
                      </select>

                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                      />

                    </div>

                  </div>

                  {/* Short Description */}
                  <div className="md:col-span-2">

                    <div className="flex items-center justify-between">

                      <label className="mb-2 block font-['Poppins'] text-[14px] font-medium text-[#334155]">
                        Short Description
                      </label>

                      <span className="font-['Poppins'] text-[14px] text-[#94A3B8]">
                        0/160
                      </span>

                    </div>

                    <textarea
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleChange}
                      rows={4}
                      maxLength={160}
                      placeholder="Enter a short description about the product..."
                      className="w-full resize-none rounded-lg border border-[#DCE7E7] bg-white px-3 py-3 font-['Poppins'] text-[14px] text-[#1E293B] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                    />

                  </div>

                </div>

              </div>          


              {/* =================================================
                  PRODUCT MEDIA - START
              ================================================== */}

              <div className="rounded-xl border border-[#E5EEEE] bg-white p-5 shadow-[0_2px_10px_rgba(15,118,110,0.03)]">

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F766E] font-['Poppins'] text-[14px] font-semibold text-white">
                    2
                  </div>

                  <div>
                    <h2 className="font-['Poppins'] text-[17px] font-semibold text-[#1E293B]">
                      Product Media
                    </h2>

                    <p className="font-['Poppins'] text-[14px] text-[#94A3B8]">
                      Upload high-quality images of your product.
                    </p>
                  </div>

                </div>

                {/* Upload Area */}
                <label className="group flex min-h-45 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#C9DCDC] bg-[#FAFCFC] px-5 text-center transition-all hover:border-[#0F766E] hover:bg-[#F6FAF9]">

                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F5F3] text-[#0F766E] transition-transform group-hover:scale-105">
                    <Upload size={23} />
                  </div>

                  <p className="font-['Poppins'] text-[14px] font-medium text-[#334155]">
                    Drag & drop images here
                  </p>

                  <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
                    or click to browse
                  </p>

                  <p className="mt-2 font-['Poppins'] text-[14px] text-[#94A3B8]">
                    PNG, JPG, WEBP up to 5MB each
                  </p>

                </label>

                {/* Image Preview */}
                {images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">

                    {images.map((image) => (
                      <div
                        key={image.id}
                        className="group relative aspect-square overflow-hidden rounded-lg border border-[#E5EEEE] bg-[#F8FAFA]"
                      >

                        <Image
                          src={image.url}
                          alt="Product preview"
                          className="h-full w-full object-cover"
                          height={512}
                          width={512}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeImage(image.id)
                          }
                          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[#FF6B6B] opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                        >
                          <X size={15} />
                        </button>

                      </div>
                    ))}

                  </div>
                )}

              </div>

       


              {/* =================================================
                  PRICING & STOCK - START
              ================================================== */}

              <div className="rounded-xl border border-[#E5EEEE] bg-white p-5 shadow-[0_2px_10px_rgba(15,118,110,0.03)]">

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F766E] font-['Poppins'] text-[14px] font-semibold text-white">
                    3
                  </div>

                  <h2 className="font-['Poppins'] text-[17px] font-semibold text-[#1E293B]">
                    Pricing & Stock
                  </h2>

                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                  {/* Regular Price */}
                  <div>

                    <label className="mb-2 block font-['Poppins'] text-[14px] font-medium text-[#334155]">
                      Regular Price (USD)
                      <span className="text-[#FF6B6B]">
                        {" "}*
                      </span>
                    </label>

                    <input
                      type="number"
                      name="regularPrice"
                      value={formData.regularPrice}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="h-11 w-full rounded-lg border border-[#DCE7E7] px-3 font-['Poppins'] text-[14px] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                    />

                  </div>

                  {/* Sale Price */}
                  <div>

                    <label className="mb-2 block font-['Poppins'] text-[14px] font-medium text-[#334155]">
                      Sale Price (USD)
                    </label>

                    <input

                      type="number"
                      name="salePrice"
                      value={formData.salePrice}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="h-11 w-full rounded-lg border border-[#DCE7E7] px-3 font-['Poppins'] text-[14px] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                    />

                  </div>

                  {/* Cost Price */}
                  {/* <div>

                    <label className="mb-2 block font-['Poppins'] text-[14px] font-medium text-[#334155]">
                      Cost Price (USD)
                    </label>

                    <input
                      type="number"
                      placeholder="0.00"
                      className="h-11 w-full rounded-lg border border-[#DCE7E7] px-3 font-['Poppins'] text-[14px] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                    />

                  </div> */}

                  {/* Stock Quantity */}
                  <div>

                    <label className="mb-2 block font-['Poppins'] text-[14px] font-medium text-[#334155]">
                      Stock Quantity
                      <span className="text-[#FF6B6B]">
                        {" "}*
                      </span>
                    </label>

                    <input
                      type="number"
                      name="stockQuantity"
                      value={formData.stockQuantity}
                      onChange={handleChange}
                      placeholder="0"
                      className="h-11 w-full rounded-lg border border-[#DCE7E7] px-3 font-['Poppins'] text-[14px] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                    />

                  </div>

                  {/* Low Stock */}
                  <div>

                    <label className="mb-2 block font-['Poppins'] text-[14px] font-medium text-[#334155]">
                      Low Stock Alert
                    </label>

                    <input

                      type="number"
                      name="lowStockAlert"
                      value={formData.lowStockAlert}
                      onChange={handleChange}
                      placeholder="5"
                      className="h-11 w-full rounded-lg border border-[#DCE7E7] px-3 font-['Poppins'] text-[14px] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                    />

                  </div>

                  {/* Stock Status */}
                  <div>

                    <label className="mb-2 block font-['Poppins'] text-[14px] font-medium text-[#334155]">
                      Stock Status
                    </label>

                    <div className="relative">

                      <select
                        value={stockStatus}
                        onChange={(event) =>
                          setStockStatus(
                            event.target.value
                          )
                        }
                        className="h-11 w-full appearance-none rounded-lg border border-[#DCE7E7] bg-white px-3 pr-10 font-['Poppins'] text-[14px] text-[#334155] outline-none focus:border-[#0F766E]"
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
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                      />

                    </div>

                  </div>

                </div>

                {/* Digital Product */}
                {/* <div className="mt-5 flex items-start gap-3">

                  <button
                    type="button"
                    onClick={() =>
                      setIsDigital(!isDigital)
                    }
                    className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors ${
                      isDigital
                        ? "bg-[#0F766E]"
                        : "bg-[#CBD5E1]"
                    }`}
                  >

                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                        isDigital
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />

                  </button>

                  <div>

                    <p className="font-['Poppins'] text-[14px] font-medium text-[#334155]">
                      This is a digital product
                    </p>

                    <p className="font-['Poppins'] text-[14px] text-[#94A3B8]">
                      Enable this if the product is downloadable.
                    </p>

                  </div>

                </div> */}

              </div>


              {/* =================================================
                  PRODUCT DETAILS - START
              ================================================== */}

              <div className="rounded-xl border border-[#E5EEEE] bg-white p-5 shadow-[0_2px_10px_rgba(15,118,110,0.03)]">

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F766E] font-['Poppins'] text-[14px] font-semibold text-white">
                    4
                  </div>

                  <h2 className="font-['Poppins'] text-[17px] font-semibold text-[#1E293B]">
                    Product Details
                  </h2>

                </div>

                <label className="mb-2 block font-['Poppins'] text-[14px] font-medium text-[#334155]">
                  Description
                  <span className="text-[#FF6B6B]">
                    {" "}*
                  </span>
                </label>

                {/* Editor Toolbar */}
                <div className="overflow-hidden rounded-lg border border-[#DCE7E7]">

                  <div className="flex flex-wrap items-center gap-1 border-b border-[#E5EEEE] bg-[#FAFCFC] p-2">

                    {[
                      "B",
                      "I",
                      "U",
                      "H",
                    ].map((item) => (
                      <button
                        key={item}
                        type="button"
                        className="flex h-8 min-w-8 items-center justify-center rounded px-2 font-['Poppins'] text-[14px] font-medium text-[#475569] hover:bg-white hover:text-[#0F766E]"
                      >
                        {item}
                      </button>
                    ))}

                    <span className="mx-1 h-5 w-px bg-[#DCE7E7]" />

                    <button
                      type="button"
                      className="flex h-8 items-center justify-center rounded px-2 font-['Poppins'] text-[14px] text-[#475569]"
                    >
                      • List
                    </button>

                    <button
                      type="button"
                      className="flex h-8 items-center justify-center rounded px-2 font-['Poppins'] text-[14px] text-[#475569]"
                    >
                      ≡
                    </button>

                    <button
                      type="button"
                      className="flex h-8 items-center justify-center rounded px-2 font-['Poppins'] text-[14px] text-[#475569]"
                    >
                      <LinkIcon size={15} />
                    </button>

                    <button
                      type="button"
                      className="flex h-8 items-center justify-center rounded px-2 font-['Poppins'] text-[14px] text-[#475569]"
                    >
                      <ImagePlus size={15} />
                    </button>

                  </div>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={8}
                    placeholder="Write detailed description about the product..."
                    className="w-full resize-none px-3 py-3 font-['Poppins'] text-[14px] text-[#1E293B] outline-none placeholder:text-[#94A3B8]"
                  />

                </div>

                <div className="mt-1 flex justify-end">
                  <span className="font-['Poppins'] text-[14px] text-[#94A3B8]">
                    0/5000
                  </span>
                </div>

              </div>


            </div>
      

            {/* =================================================
                RIGHT SIDEBAR - START
            ================================================== */}

            <aside className="space-y-5">


              {/* =================================================
                  PRODUCT STATUS - START
              ================================================== */}

              <div className="rounded-xl border border-[#E5EEEE] bg-white p-5">

                <h3 className="mb-4 font-['Poppins'] text-[16px] font-semibold text-[#1E293B]">
                  Product Status
                </h3>

                <div className="space-y-4">

                  {/* Draft */}
                  <label className="flex cursor-pointer items-start gap-3">

                    <input
                      type="radio"
                      name="status"
                      value="draft"
                      checked={
                        productStatus === "draft"
                      }
                      onChange={(event) =>
                        setProductStatus(
                          event.target.value
                        )
                      }
                      className="mt-1 accent-[#0F766E]"
                    />

                    <div>
                      <p className="font-['Poppins'] text-[14px] font-medium text-[#334155]">
                        Draft
                      </p>

                      <p className="font-['Poppins'] text-[14px] text-[#94A3B8]">
                        Save as draft and continue later.
                      </p>
                    </div>

                  </label>

                  {/* Pending */}
                  <label className="flex cursor-pointer items-start gap-3">

                    <input
                      type="radio"
                      name="status"
                      value="pending"
                      checked={
                        productStatus === "pending"
                      }
                      onChange={(event) =>
                        setProductStatus(
                          event.target.value
                        )
                      }
                      className="mt-1 accent-[#0F766E]"
                    />

                    <div>
                      <p className="font-['Poppins'] text-[14px] font-medium text-[#334155]">
                        Pending Review
                      </p>

                      <p className="font-['Poppins'] text-[14px] text-[#94A3B8]">
                        Submit for admin review.
                      </p>
                    </div>

                  </label>

                  {/* Published */}
                  <label className="flex cursor-pointer items-start gap-3">

                    <input
                      type="radio"
                      name="status"
                      value="published"
                      checked={
                        productStatus === "published"
                      }
                      onChange={(event) =>
                        setProductStatus(
                          event.target.value
                        )
                      }
                      className="mt-1 accent-[#0F766E]"
                    />

                    <div>
                      <p className="font-['Poppins'] text-[14px] font-medium text-[#334155]">
                        Published
                      </p>

                      <p className="font-['Poppins'] text-[14px] text-[#94A3B8]">
                        Make product visible immediately.
                      </p>
                    </div>

                  </label>

                </div>

              </div>

    


              {/* =================================================
                  PRODUCT TYPE - START
              ================================================== */}

              {/* <div className="rounded-xl border border-[#E5EEEE] bg-white p-5">

                <h3 className="mb-4 font-['Poppins'] text-[16px] font-semibold text-[#1E293B]">
                  Product Type
                </h3>

                <div className="space-y-4">

                
                  <label className="flex cursor-pointer items-start gap-3">

                    <input
                      type="radio"
                      name="productType"
                      value="physical"
                      checked={
                        productType === "physical"
                      }
                      onChange={(event) =>
                        setProductType(
                          event.target.value
                        )
                      }
                      className="mt-1 accent-[#0F766E]"
                    />

                    <div>

                      <p className="font-['Poppins'] text-[14px] font-medium text-[#334155]">
                        Physical Product
                      </p>

                      <p className="font-['Poppins'] text-[14px] text-[#94A3B8]">
                        Shipped to customers.
                      </p>

                    </div>

                  </label>

              
                  <label className="flex cursor-pointer items-start gap-3">

                    <input
                      type="radio"
                      name="productType"
                      value="digital"
                      checked={
                        productType === "digital"
                      }
                      onChange={(event) =>
                        setProductType(
                          event.target.value
                        )
                      }
                      className="mt-1 accent-[#0F766E]"
                    />

                    <div>

                      <p className="font-['Poppins'] text-[14px] font-medium text-[#334155]">
                        Digital Product
                      </p>

                      <p className="font-['Poppins'] text-[14px] text-[#94A3B8]">
                        Downloadable or digital.
                      </p>

                    </div>

                  </label>

                </div>

              </div> */}

        


              {/* =================================================
                  PRODUCT SUMMARY - START
              ================================================== */}

              <div className="rounded-xl border border-[#E5EEEE] bg-white p-5">

                <h3 className="mb-4 font-['Poppins'] text-[16px] font-semibold text-[#1E293B]">
                  Product Summary
                </h3>

                <div className="space-y-4">

                  <div>
                    <p className="font-['Poppins'] text-[14px] font-medium text-[#475569]">
                      Category
                    </p>

                    <p className="mt-1 font-['Poppins'] text-[14px] text-[#94A3B8]">
                      Not selected
                    </p>
                  </div>

                  <div>
                    <p className="font-['Poppins'] text-[14px] font-medium text-[#475569]">
                      Price
                    </p>

                    <p className="mt-1 font-['Poppins'] text-[14px] text-[#94A3B8]">
                      $0.00
                    </p>
                  </div>

                  <div>
                    <p className="font-['Poppins'] text-[14px] font-medium text-[#475569]">
                      Stock
                    </p>

                    <p className="mt-1 font-['Poppins'] text-[14px] text-[#94A3B8]">
                      0
                    </p>
                  </div>

                  <div>
                    <p className="font-['Poppins'] text-[14px] font-medium text-[#475569]">
                      Status
                    </p>

                    <span className="mt-1 inline-flex rounded-md bg-[#E8F5F3] px-2 py-1 font-['Poppins'] text-[14px] font-medium text-[#0F766E]">
                      In Stock
                    </span>
                  </div>

                </div>

              </div>

          


              {/* =================================================
                  SELLER TIPS - START
              ================================================== */}

              <div className="rounded-xl border border-[#E5EEEE] bg-[#F6FAF9] p-5">

                <div className="mb-4 flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F5F3]">
                    <Sparkles
                      size={17}
                      className="text-[#0F766E]"
                    />
                  </div>

                  <h3 className="font-['Poppins'] text-[16px] font-semibold text-[#1E293B]">
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
                  ].map((tip) => (
                    <li
                      key={tip}
                      className="flex items-start gap-2"
                    >
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-[#0F766E]"
                      />

                      <span className="font-['Poppins'] text-[14px] leading-5 text-[#64748B]">
                        {tip}
                      </span>
                    </li>
                  ))}

                </ul>

                <button
                  type="button"
                  className="mt-4 font-['Poppins'] text-[14px] font-medium text-[#0F766E] hover:underline"
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