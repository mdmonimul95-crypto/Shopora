"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProduct } from "@/type/dashboard/Seller";
import { toast } from "react-toastify";
import { UpdateProduct } from "@/lib/core/updateProduct";




const EditProduct = () => {
  const params = useParams();
  const router = useRouter();

  const productId = params.id as string;

  const [product, setProduct] = useState<getProduct | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    shortDescription: "",
    category: "",
    brand: "",
    regularPrice: "",
    salePrice: "",
    stockQuantity: "",
    lowStockAlert: "",
    stockStatus: "in-stock",
    description: "",
    images: "",
    status: "published",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        const response = await fetch(
          `${API_URL}/api/v1/products/${productId}`,
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
            result.message || "Failed to fetch product"
          );
        }

        const data: getProduct = result.data;

        setProduct(data);

        setFormData({
          name: data.name || "",
          sku: data.sku || "",
          shortDescription: data.shortDescription || "",
          category: data.category || "",
          brand: data.brand || "",
          regularPrice: String(data.regularPrice ?? ""),
          salePrice: String(data.salePrice ?? ""),
          stockQuantity: String(data.stockQuantity ?? ""),
          lowStockAlert: String(data.lowStockAlert ?? ""),
          stockStatus: data.stockStatus || "in-stock",
          description: data.description || "",
          images: data.images?.join("\n") || "",
          status: data.status || "published",
        });
      } catch (err) {
        console.error("GET PRODUCT ERROR:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch product"
        );
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const payload = {
        name: formData.name,
        sku: formData.sku,
        shortDescription: formData.shortDescription,
        category: formData.category,
        brand: formData.brand,

        regularPrice: Number(formData.regularPrice),
        salePrice: Number(formData.salePrice),

        stockQuantity: Number(formData.stockQuantity),
        lowStockAlert: Number(formData.lowStockAlert),

        stockStatus: formData.stockStatus,

        description: formData.description,

        images: formData.images
          .split("\n")
          .map((url) => url.trim())
          .filter(Boolean),

        status: formData.status,
      };

      await UpdateProduct(productId, payload);

      toast.success("Product updated successfully!");

    //   alert("Product updated successfully!");

      router.push("/dashboard/seller/products");
    } catch (err) {
      console.error("UPDATE PRODUCT ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update product"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-125 items-center justify-center font-['Poppins']">
        <p className="text-[16px] text-[#64748B]">
          Loading product...
        </p>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="flex min-h-125 flex-col items-center justify-center gap-4 font-['Poppins']">
        <p className="text-[18px] font-medium text-[#EF4444]">
          {error}
        </p>

        <Link
          href="/dashboard/seller/products"
          className="rounded-lg bg-[#0F766E] px-5 py-3 text-[15px] font-medium text-white"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-6 font-['Poppins'] sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Link
            href="/dashboard/seller/products"
            className="mb-2 inline-block text-[14px] text-[#64748B] hover:text-[#0F766E]"
          >
            ← Back to All Products
          </Link>

          <h1 className="text-[28px] font-semibold text-[#0F172A]">
            Edit Product
          </h1>

          <p className="mt-1 text-[15px] text-[#64748B]">
            Update your product information
          </p>
        </div>

        <Link
          href="/dashboard/seller/products"
          className="rounded-lg border border-[#DDE5E5] bg-white px-5 py-3 text-[15px] font-medium text-[#475569] transition-colors hover:bg-[#F6FAF9]"
        >
          Cancel
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 rounded-lg border border-[#FFD0D0] bg-[#FFF5F5] px-4 py-3 text-[15px] text-[#EF4444]">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic Information */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
              <h2 className="mb-5 text-[20px] font-semibold text-[#0F172A]">
                Basic Information
              </h2>

              <div className="space-y-5">
                {/* Product Name */}
                <div>
                  <label className="mb-2 block text-[15px] font-medium text-[#334155]">
                    Product Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#DDE5E5] bg-white px-4 py-3 text-[15px] text-[#0F172A] outline-none transition-colors focus:border-[#0F766E]"
                  />
                </div>

                {/* SKU */}
                <div>
                  <label className="mb-2 block text-[15px] font-medium text-[#334155]">
                    SKU
                  </label>

                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#DDE5E5] bg-white px-4 py-3 text-[15px] text-[#0F172A] outline-none transition-colors focus:border-[#0F766E]"
                  />
                </div>

                {/* Short Description */}
                <div>
                  <label className="mb-2 block text-[15px] font-medium text-[#334155]">
                    Short Description
                  </label>

                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    rows={3}
                    className="w-full resize-none rounded-lg border border-[#DDE5E5] bg-white px-4 py-3 text-[15px] text-[#0F172A] outline-none transition-colors focus:border-[#0F766E]"
                  />
                </div>

                {/* Long Description */}
                <div>
                  <label className="mb-2 block text-[15px] font-medium text-[#334155]">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={7}
                    className="w-full resize-none rounded-lg border border-[#DDE5E5] bg-white px-4 py-3 text-[15px] text-[#0F172A] outline-none transition-colors focus:border-[#0F766E]"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
              <h2 className="mb-5 text-[20px] font-semibold text-[#0F172A]">
                Pricing
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Regular Price */}
                <div>
                  <label className="mb-2 block text-[15px] font-medium text-[#334155]">
                    Regular Price
                  </label>

                  <input
                    type="number"
                    name="regularPrice"
                    value={formData.regularPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                    className="w-full rounded-lg border border-[#DDE5E5] bg-white px-4 py-3 text-[15px] text-[#0F172A] outline-none transition-colors focus:border-[#0F766E]"
                  />
                </div>

                {/* Sale Price */}
                <div>
                  <label className="mb-2 block text-[15px] font-medium text-[#334155]">
                    Sale Price
                  </label>

                  <input
                    type="number"
                    name="salePrice"
                    value={formData.salePrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                    className="w-full rounded-lg border border-[#DDE5E5] bg-white px-4 py-3 text-[15px] text-[#0F172A] outline-none transition-colors focus:border-[#0F766E]"
                  />
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
              <h2 className="mb-5 text-[20px] font-semibold text-[#0F172A]">
                Inventory
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {/* Stock Quantity */}
                <div>
                  <label className="mb-2 block text-[15px] font-medium text-[#334155]">
                    Stock Quantity
                  </label>

                  <input
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    min="0"
                    required
                    className="w-full rounded-lg border border-[#DDE5E5] bg-white px-4 py-3 text-[15px] text-[#0F172A] outline-none transition-colors focus:border-[#0F766E]"
                  />
                </div>

                {/* Low Stock Alert */}
                <div>
                  <label className="mb-2 block text-[15px] font-medium text-[#334155]">
                    Low Stock Alert
                  </label>

                  <input
                    type="number"
                    name="lowStockAlert"
                    value={formData.lowStockAlert}
                    onChange={handleChange}
                    min="0"
                    required
                    className="w-full rounded-lg border border-[#DDE5E5] bg-white px-4 py-3 text-[15px] text-[#0F172A] outline-none transition-colors focus:border-[#0F766E]"
                  />
                </div>

                {/* Stock Status */}
                <div>
                  <label className="mb-2 block text-[15px] font-medium text-[#334155]">
                    Stock Status
                  </label>

                  <select
                    name="stockStatus"
                    value={formData.stockStatus}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#DDE5E5] bg-white px-4 py-3 text-[15px] text-[#0F172A] outline-none transition-colors focus:border-[#0F766E]"
                  >
                    <option value="in-stock">In Stock</option>
                    <option value="out-of-stock">
                      Out of Stock
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
              <h2 className="mb-2 text-[20px] font-semibold text-[#0F172A]">
                Product Images
              </h2>

              <p className="mb-4 text-[14px] text-[#64748B]">
                Add one image URL per line.
              </p>

              <textarea
                name="images"
                value={formData.images}
                onChange={handleChange}
                rows={5}
                placeholder="https://example.com/product-image.jpg"
                className="w-full resize-none rounded-lg border border-[#DDE5E5] bg-white px-4 py-3 text-[15px] text-[#0F172A] outline-none transition-colors focus:border-[#0F766E]"
              />

              {/* Current Image Preview */}
              {formData.images.split("\n")[0]?.trim() && (
                <div className="mt-5">
                  <p className="mb-2 text-[14px] font-medium text-[#475569]">
                    Current Image
                  </p>

                  <Image
                    src={formData.images.split("\n")[0].trim()}
                    alt={formData.name}
                    className="h-32 w-32 rounded-lg border border-[#DDE5E5] object-cover"
                    height={512}
                    width={512}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Category */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
              <h2 className="mb-5 text-[20px] font-semibold text-[#0F172A]">
                Product Details
              </h2>

              <div className="space-y-5">
                {/* Category */}
                <div>
                  <label className="mb-2 block text-[15px] font-medium text-[#334155]">
                    Category
                  </label>

                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#DDE5E5] bg-white px-4 py-3 text-[15px] text-[#0F172A] outline-none transition-colors focus:border-[#0F766E]"
                  />
                </div>

                {/* Brand */}
                <div>
                  <label className="mb-2 block text-[15px] font-medium text-[#334155]">
                    Brand
                  </label>

                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#DDE5E5] bg-white px-4 py-3 text-[15px] text-[#0F172A] outline-none transition-colors focus:border-[#0F766E]"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="mb-2 block text-[15px] font-medium text-[#334155]">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#DDE5E5] bg-white px-4 py-3 text-[15px] text-[#0F172A] outline-none transition-colors focus:border-[#0F766E]"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Summary */}
            {product && (
              <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                <h2 className="mb-5 text-[20px] font-semibold text-[#0F172A]">
                  Product Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[14px] text-[#64748B]">
                      Product ID
                    </span>

                    <span className="max-w-45 break-all text-right text-[13px] font-medium text-[#334155]">
                      {product.id}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[14px] text-[#64748B]">
                      Created At
                    </span>

                    <span className="text-right text-[13px] font-medium text-[#334155]">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[14px] text-[#64748B]">
                      Updated At
                    </span>

                    <span className="text-right text-[13px] font-medium text-[#334155]">
                      {new Date(product.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Save */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-lg bg-[#0F766E] px-5 py-3 text-[16px] font-semibold text-white transition-colors hover:bg-[#0B625B] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Updating Product..." : "Update Product"}
              </button>

              <Link
                href="/dashboard/seller/products"
                className="mt-3 block w-full rounded-lg border border-[#DDE5E5] bg-white px-5 py-3 text-center text-[15px] font-medium text-[#475569] transition-colors hover:bg-[#F6FAF9]"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;