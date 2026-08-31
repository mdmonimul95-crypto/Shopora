"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Package,
  Tag,
  Building2,
  Boxes,
  CalendarDays,
  Image as ImageIcon,
} from "lucide-react";

import { getProductById } from "@/lib/api/getProductById";
import { getProduct } from "@/type/dashboard/Seller";

const ProductDetails = () => {
  const params = useParams();

  const productId = params.id as string;

  const [product, setProduct] = useState<getProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(productId);
        console.log(data);

        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);

        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    console.log(product);

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="flex min-h-125 items-center justify-center font-['Poppins']">
        <p className="text-[16px] text-[#64748B]">
          Loading product details...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center gap-4 font-['Poppins']">
        <p className="text-[16px] text-red-500">
          {error || "Product not found"}
        </p>

        <Link
          href="/dashboard/seller/products"
          className="rounded-lg bg-[#0F766E] px-4 py-2 text-[16px] font-medium text-white"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const discount =
    product.regularPrice > product.salePrice
      ? Math.round(
          ((product.regularPrice - product.salePrice) /
            product.regularPrice) *
            100,
        )
      : 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-6 font-['Poppins'] sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-5">
        <Link
          href="/dashboard/seller/products"
          className="mb-2 inline-flex items-center gap-1 text-[16px] text-[#64748B] transition-colors hover:text-[#0F766E]"
        >
          <ArrowLeft size={14} />
          Back to All Products
        </Link>

        <h1 className="text-[26px] font-semibold text-[#0F172A]">
          Product Details
        </h1>
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
        {/* Left */}
        <div className="space-y-5">
          {/* Product Overview */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[580px_minmax(0,2fr)]">
              {/* Product Image */}
              <div>
                <div className="relative flex h-70 w-full items-center justify-center overflow-hidden rounded-xl bg-[#F8FAFC]">
                  {product.images?.[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-contain p-5"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-[#94A3B8]">
                      <ImageIcon size={36} />
                      <span className="text-[16px]">
                        No Image Available
                      </span>
                    </div>
                  )}

                  <span
                    className={`absolute left-3 top-3 rounded-md px-2 py-1 text-[16px] font-medium ${
                      product.status.toLowerCase() === "published"
                        ? "bg-[#ECFDF5] text-[#047857]"
                        : "bg-[#F1F5F9] text-[#64748B]"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>

                {/* Image thumbnails */}
                {product.images && product.images.length > 1 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto">
                    {product.images.map((image, index) => (
                      <div
                        key={`${image}-${index}`}
                        className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-[#DDE5E5] bg-white"
                      >
                        <Image
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Basic Info */}
              <div className="flex flex-col">
                <div className="mb-2">
                  <h2 className="text-[24px] font-semibold text-[#0F172A]">
                    {product.name}
                  </h2>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[16px] text-[#64748B]">
                    <span>
                      SKU:{" "}
                      <span className=" text-[18px]font-medium text-[#334155]">
                        {product.sku}
                      </span>
                    </span>

                    <span>
                      Brand:{" "}
                      <span className=" text-[18px] font-medium text-[#334155]">
                        {product.brand}
                      </span>
                    </span>

                    <span>
                      Category:{" "}
                      <span className="text-[18px] font-medium text-[#334155]">
                        {product.category}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-[27px] font-semibold text-[#0F766E]">
                    ${product.salePrice.toFixed(2)}
                  </span>

                  {product.regularPrice > product.salePrice && (
                    <>
                      <span className="text-[16px] text-[#94A3B8] line-through">
                        ${product.regularPrice.toFixed(2)}
                      </span>

                      <span className="rounded-md bg-[#FEF2F2] px-2 py-1 text-[16px] font-medium text-[#EF4444]">
                        {discount}% OFF
                      </span>
                    </>
                  )}
                </div>

                {/* Short Description */}
                <div className="mt-5">
                  <h3 className="mb-2 text-[18px] font-semibold text-[#334155]">
                    Short Description
                  </h3>

                  <p className="text-[16px] leading-6 text-[#64748B]">
                    {product.shortDescription}
                  </p>
                </div>

                {/* Stock */}
                <div className="mt-5 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 rounded-lg bg-[#F0FDFA] px-3 py-2">
                    <Boxes size={15} className="text-[#0F766E]" />

                    <span className="text-[18px] text-[#475569]">
                      Stock:
                    </span>

                    <span className="text-[18px] font-semibold text-[#0F766E]">
                      {product.stockQuantity}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 rounded-lg bg-[#F8FAFC] px-3 py-2">
                    <Package size={15} className="text-[#64748B]" />

                    <span className="text-[18px] text-[#475569]">
                      Status:
                    </span>

                    <span className="text-[18px] font-semibold capitalize text-[#334155]">
                      {product.stockStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white">
            <div className="border-b border-[#E2E8F0] px-5 py-4">
              <h3 className="text-[18px] font-semibold text-[#0F172A]">
                Product Information
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-x-10 gap-y-4 p-5 sm:grid-cols-2">
              <div>
                <p className="text-[18px] text-[#94A3B8]">
                  Product Name
                </p>

                <p className="mt-1 text-[16px] font-medium text-[#334155]">
                  {product.name}
                </p>
              </div>

              <div>
                <p className="text-[18px] text-[#94A3B8]">
                  SKU
                </p>

                <p className="mt-1 text-[16px] font-medium text-[#334155]">
                  {product.sku}
                </p>
              </div>

              <div>
                <p className="text-[18px] text-[#94A3B8]">
                  Category
                </p>

                <p className="mt-1 text-[16px] font-medium text-[#334155]">
                  {product.category}
                </p>
              </div>

              <div>
                <p className="text-[18px] text-[#94A3B8]">
                  Brand
                </p>

                <p className="mt-1 text-[16px] font-medium text-[#334155]">
                  {product.brand}
                </p>
              </div>

              <div>
                <p className="text-[18px] text-[#94A3B8]">
                  Regular Price
                </p>

                <p className="mt-1 text-[16px] font-medium text-[#334155]">
                  ${product.regularPrice.toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-[18px] text-[#94A3B8]">
                  Sale Price
                </p>

                <p className="mt-1 text-[16px] font-medium text-[#0F766E]">
                  ${product.salePrice.toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-[18px] text-[#94A3B8]">
                  Stock Quantity
                </p>

                <p className="mt-1 text-[16px] font-medium text-[#334155]">
                  {product.stockQuantity}
                </p>
              </div>

              <div>
                <p className="text-[18px] text-[#94A3B8]">
                  Low Stock Alert
                </p>

                <p className="mt-1 text-[16px] font-medium text-[#334155]">
                  {product.lowStockAlert}
                </p>
              </div>

              <div>
                <p className="text-[18px] text-[#94A3B8]">
                  Stock Status
                </p>

                <p className="mt-1 text-[16px] font-medium capitalize text-[#334155]">
                  {product.stockStatus}
                </p>
              </div>

              <div>
                <p className="text-[18px] text-[#94A3B8]">
                  Status
                </p>

                <p className="mt-1 text-[16px] font-medium capitalize text-[#334155]">
                  {product.status}
                </p>
              </div>

              <div>
                <p className="text-[18px] text-[#94A3B8]">
                  Created At
                </p>

                <p className="mt-1 text-[16px] font-medium text-[#334155]">
                  {new Date(product.createdAt).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-[18px] text-[#94A3B8]">
                  Updated At
                </p>

                <p className="mt-1 text-[16px] font-medium text-[#334155]">
                  {new Date(product.updatedAt).toLocaleString()}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-[18px] text-[#94A3B8]">
                  Short Description
                </p>

                <p className="mt-1 text-[16px] leading-6 text-[#334155]">
                  {product.shortDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Long Description */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white">
            <div className="border-b border-[#E2E8F0] px-5 py-4">
              <h3 className="text-[18px] font-semibold text-[#0F172A]">
                Description
              </h3>
            </div>

            <div className="p-5">
              <p className="whitespace-pre-line text-[16px] leading-7 text-[#64748B]">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-5">
          {/* Product Summary */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
            <h3 className="mb-4 text-[18px] font-semibold text-[#0F172A]">
              Product Summary
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[18px] text-[#64748B]">
                  Price
                </span>

                <span className="text-[16px] font-medium text-[#334155]">
                  ${product.salePrice.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-[18px] text-[#64748B]">
                  Stock
                </span>

                <span className="text-[16px] font-medium text-[#334155]">
                  {product.stockQuantity}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-[18px] text-[#64748B]">
                  SKU
                </span>

                <span className="text-[16px] font-medium text-[#334155]">
                  {product.sku}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-[18px] text-[#64748B]">
                  Category
                </span>

                <span className="text-right text-[16px] font-medium text-[#334155]">
                  {product.category}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-[18px] text-[#64748B]">
                  Brand
                </span>

                <span className="text-right text-[16px] font-medium text-[#334155]">
                  {product.brand}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-[18px] text-[#64748B]">
                  Status
                </span>

                <span className="rounded-md bg-[#ECFDF5] px-2 py-1 text-[16px] font-medium capitalize text-[#047857]">
                  {product.status}
                </span>
              </div>

              <div className="border-t border-[#E2E8F0] pt-4">
                <div className="flex items-start gap-2">
                  <CalendarDays
                    size={14}
                    className="mt-0.5 shrink-0 text-[#64748B]"
                  />

                  <div>
                    <p className="text-[16px] text-[#94A3B8]">
                      Created At
                    </p>

                    <p className="mt-1 text-[18px] leading-5 text-[#334155]">
                      {new Date(product.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CalendarDays
                  size={14}
                  className="mt-0.5 shrink-0 text-[#64748B]"
                />

                <div>
                  <p className="text-[16px] text-[#94A3B8]">
                    Updated At
                  </p>

                  <p className="mt-1 text-[18px] leading-5 text-[#334155]">
                    {new Date(product.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory & Stock */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
            <h3 className="mb-4 text-[18px] font-semibold text-[#0F172A]">
              Inventory & Stock
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[18px] text-[#64748B]">
                  Stock Quantity
                </span>

                <span className="text-[16px] font-semibold text-[#0F766E]">
                  {product.stockQuantity}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[18px] text-[#64748B]">
                  Low Stock Alert
                </span>

                <span className="text-[16px] font-semibold text-[#334155]">
                  {product.stockQuantity}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[18px] text-[#64748B]">
                  Stock Status
                </span>

                <span className="rounded-md bg-[#ECFDF5] px-2 py-1 text-[16px] font-medium capitalize text-[#047857]">
                  {product.stockStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Basic Metadata */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
            <h3 className="mb-4 text-[18px] font-semibold text-[#0F172A]">
              Product Metadata
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Tag
                  size={16}
                  className="mt-0.5 shrink-0 text-[#0F766E]"
                />

                <div>
                  <p className="text-[16px] text-[#94A3B8]">
                    SKU
                  </p>

                  <p className="mt-1 text-[16px] font-medium text-[#334155]">
                    {product.sku}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Package
                  size={16}
                  className="mt-0.5 shrink-0 text-[#0F766E]"
                />

                <div>
                  <p className="text-[16px] text-[#94A3B8]">
                    Category
                  </p>

                  <p className="mt-1 text-[16px] font-medium text-[#334155]">
                    {product.category}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building2
                  size={16}
                  className="mt-0.5 shrink-0 text-[#0F766E]"
                />

                <div>
                  <p className="text-[16px] text-[#94A3B8]">
                    Brand
                  </p>

                  <p className="mt-1 text-[16px] font-medium text-[#334155]">
                    {product.brand}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;