"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Clock3,
  Heart,
  PackageSearch,
  ShoppingCart,
  Sparkles,
  Star,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  sku?: string;
  category?: string;
  brand?: string;
  shortDescription?: string;
  regularPrice: number | string;
  salePrice?: number | string | null;
  images?: string[];
  rating?: number;
  createdAt?: string;
}

interface ProductsResponse {
  success: boolean;
  data: Product[];
  message?: string;
}

const NewArrivalsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const getNewArrivals = async () => {
      try {
        setLoading(true);
        setError("");

        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        if (!API_URL) {
          throw new Error("NEXT_PUBLIC_API_URL is not configured");
        }

        const response = await fetch(
          `${API_URL}/api/v1/products`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );

        const result: ProductsResponse =
          await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Failed to load new arrivals"
          );
        }

        setProducts(result.data || []);
      } catch (error) {
        console.error("New arrivals error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load new arrivals"
        );
      } finally {
        setLoading(false);
      }
    };

    getNewArrivals();
  }, []);

  /*
   * Newest products first.
   *
   * We use createdAt when it is available.
   * The first 12 products are displayed.
   */
  const newArrivals = useMemo(() => {
    return [...products]
      .sort((a, b) => {
        if (!a.createdAt || !b.createdAt) {
          return 0;
        }

        return (
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        );
      })
      .slice(0, 12);
  }, [products]);

  const toggleWishlist = (id: string) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="overflow-hidden border-b border-[#E8EEEE] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_360px]">
            {/* Left */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F5F3] px-4 py-2">
                <Sparkles
                  size={15}
                  className="text-[#0F766E]"
                />

                <span className="font-['Poppins'] text-xs font-semibold uppercase tracking-wider text-[#0F766E]">
                  Freshly Added
                </span>
              </div>

              {/* Heading */}
              <h1 className="mt-5 max-w-3xl font-['Poppins'] text-4xl font-bold leading-tight text-[#1E293B] sm:text-5xl lg:text-6xl">
                Meet Our
                <span className="text-[#0F766E]">
                  {" "}New Arrivals
                </span>
              </h1>

              <p className="mt-5 max-w-2xl font-['Poppins'] text-sm leading-7 text-[#64748B] sm:text-base">
                Fresh products have landed at Shopora. Be the
                first to discover the latest additions to our
                collection.
              </p>

              {/* CTA */}
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0F766E] px-5 py-3 font-['Poppins'] text-sm font-semibold text-white transition hover:bg-[#0B625B]"
                >
                  Explore Shop
                  <ArrowRight size={17} />
                </Link>

                <div className="inline-flex items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-5 py-3">
                  <Clock3
                    size={17}
                    className="text-[#FF6B6B]"
                  />

                  <span className="font-['Poppins'] text-sm font-medium text-[#475569]">
                    Updated regularly
                  </span>
                </div>
              </div>
            </div>

            {/* Right visual */}
            <div className="relative hidden h-64 overflow-hidden rounded-2xl bg-[#E8F5F3] lg:block">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#0F766E]/10" />

              <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-[#FF6B6B]/10" />

              <div className="relative flex h-full flex-col items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <Sparkles
                    size={38}
                    className="text-[#0F766E]"
                  />
                </div>

                <p className="mt-4 font-['Poppins'] text-lg font-semibold text-[#1E293B]">
                  Just Arrived
                </p>

                <p className="mt-1 font-['Poppins'] text-xs text-[#64748B]">
                  Discover something new
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCTS
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Header */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles
                size={18}
                className="text-[#FF6B6B]"
              />

              <p className="font-['Poppins'] text-sm font-semibold uppercase tracking-wider text-[#FF6B6B]">
                Fresh Picks
              </p>
            </div>

            <h2 className="mt-2 font-['Poppins'] text-2xl font-bold text-[#1E293B] sm:text-3xl">
              Latest Products
            </h2>

            <p className="mt-2 font-['Poppins'] text-sm text-[#64748B]">
              The newest products added to Shopora.
            </p>
          </div>

          {!loading && !error && (
            <span className="hidden font-['Poppins'] text-sm text-[#64748B] sm:block">
              {newArrivals.length} new products
            </span>
          )}
        </div>

        {/* =================================================
            LOADING
        ================================================== */}
        {loading && (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-[#E8EEEE] bg-white"
              >
                <div className="h-64 animate-pulse bg-[#EEF2F2]" />

                <div className="space-y-3 p-4">
                  <div className="h-3 w-1/3 animate-pulse rounded bg-[#EEF2F2]" />

                  <div className="h-5 w-4/5 animate-pulse rounded bg-[#EEF2F2]" />

                  <div className="h-3 w-full animate-pulse rounded bg-[#EEF2F2]" />

                  <div className="h-6 w-1/3 animate-pulse rounded bg-[#EEF2F2]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =================================================
            ERROR
        ================================================== */}
        {!loading && error && (
          <div className="mt-8 rounded-xl border border-[#FECACA] bg-white px-6 py-16 text-center">
            <PackageSearch
              size={42}
              className="mx-auto text-[#FF6B6B]"
            />

            <h2 className="mt-4 font-['Poppins'] text-xl font-semibold text-[#1E293B]">
              Unable to load new arrivals
            </h2>

            <p className="mt-2 font-['Poppins'] text-sm text-[#64748B]">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-lg bg-[#0F766E] px-5 py-2.5 font-['Poppins'] text-sm font-medium text-white transition hover:bg-[#0B625B]"
            >
              Try Again
            </button>
          </div>
        )}

        {/* =================================================
            EMPTY
        ================================================== */}
        {!loading && !error && newArrivals.length === 0 && (
          <div className="mt-8 rounded-xl border border-[#E8EEEE] bg-white px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F5F3]">
              <PackageSearch
                size={30}
                className="text-[#0F766E]"
              />
            </div>

            <h2 className="mt-5 font-['Poppins'] text-xl font-semibold text-[#1E293B]">
              No products available
            </h2>

            <p className="mx-auto mt-2 max-w-md font-['Poppins'] text-sm leading-6 text-[#64748B]">
              New products will appear here when they are
              added to Shopora.
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0F766E] px-5 py-3 font-['Poppins'] text-sm font-medium text-white transition hover:bg-[#0B625B]"
            >
              Browse Shop
              <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* =================================================
            PRODUCT GRID
        ================================================== */}
        {!loading &&
          !error &&
          newArrivals.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {newArrivals.map((product) => {
                const regularPrice = Number(
                  product.regularPrice
                );

                const salePrice =
                  product.salePrice !== null &&
                  product.salePrice !== undefined
                    ? Number(product.salePrice)
                    : null;

                const currentPrice =
                  salePrice !== null &&
                  salePrice < regularPrice
                    ? salePrice
                    : regularPrice;

                const hasSale =
                  salePrice !== null &&
                  salePrice < regularPrice;

                const discount = hasSale
                  ? Math.round(
                      ((regularPrice - salePrice) /
                        regularPrice) *
                        100
                    )
                  : 0;

                const isWishlisted =
                  wishlist.includes(product.id);

                return (
                  <article
                    key={product.id}
                    className="group overflow-hidden rounded-xl border border-[#E8EEEE] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#D3E7E4] hover:shadow-[0_14px_35px_rgba(15,118,110,0.10)]"
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden bg-[#F6FAF9]">
                      <Link
                        href={`/products/${product.id}`}
                        className="block h-full w-full"
                      >
                        {product.images?.[0] ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <PackageSearch
                              size={42}
                              className="text-[#CBD5E1]"
                            />
                          </div>
                        )}
                      </Link>

                      {/* New Badge */}
                      <div className="absolute left-3 top-3 flex items-center gap-1 rounded-md bg-[#0F766E] px-2.5 py-1.5 font-['Poppins'] text-[11px] font-bold text-white shadow-sm">
                        <Sparkles
                          size={12}
                          fill="currentColor"
                        />
                        NEW
                      </div>

                      {/* Sale Badge */}
                      {hasSale && (
                        <span className="absolute left-3 top-12 rounded-md bg-[#FF6B6B] px-2.5 py-1 font-['Poppins'] text-[10px] font-bold text-white">
                          {discount}% OFF
                        </span>
                      )}

                      {/* Wishlist */}
                      <button
                        type="button"
                        onClick={() =>
                          toggleWishlist(product.id)
                        }
                        aria-label="Add to wishlist"
                        className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition ${
                          isWishlisted
                            ? "text-[#FF6B6B]"
                            : "text-[#64748B] hover:text-[#FF6B6B]"
                        }`}
                      >
                        <Heart
                          size={18}
                          strokeWidth={1.7}
                          fill={
                            isWishlisted
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Category / Brand */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-['Poppins'] text-[10px] font-semibold uppercase tracking-wider text-[#0F766E]">
                          {product.category ||
                            "New Arrival"}
                        </span>

                        {product.brand && (
                          <span className="max-w-24 truncate font-['Poppins'] text-[10px] text-[#94A3B8]">
                            {product.brand}
                          </span>
                        )}
                      </div>

                      {/* Name */}
                      <Link
                        href={`/products/${product.id}`}
                      >
                        <h3 className="mt-2 line-clamp-2 min-h-12 font-['Poppins'] text-base font-semibold leading-6 text-[#1E293B] transition-colors hover:text-[#0F766E]">
                          {product.name}
                        </h3>
                      </Link>

                      {/* Description */}
                      {product.shortDescription && (
                        <p className="mt-2 line-clamp-2 font-['Poppins'] text-xs leading-5 text-[#94A3B8]">
                          {product.shortDescription}
                        </p>
                      )}

                      {/* Rating */}
                      <div className="mt-3 flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5">
                          {Array.from({
                            length: 5,
                          }).map((_, index) => (
                            <Star
                              key={index}
                              size={13}
                              fill={
                                index <
                                Math.round(
                                  product.rating || 0
                                )
                                  ? "currentColor"
                                  : "none"
                              }
                              className="text-[#F59E0B]"
                            />
                          ))}
                        </div>

                        <span className="font-['Poppins'] text-[11px] text-[#94A3B8]">
                          {product.rating
                            ? product.rating.toFixed(1)
                            : "New"}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="mt-4 flex items-end justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-['Poppins'] text-xl font-bold text-[#0F766E]">
                              ${currentPrice.toFixed(2)}
                            </span>

                            {hasSale && (
                              <span className="font-['Poppins'] text-xs text-[#94A3B8] line-through">
                                ${regularPrice.toFixed(2)}
                              </span>
                            )}
                          </div>

                          {hasSale && (
                            <p className="mt-1 font-['Poppins'] text-[10px] font-medium text-[#FF6B6B]">
                              Save $
                              {(
                                regularPrice -
                                currentPrice
                              ).toFixed(2)}
                            </p>
                          )}
                        </div>

                        {/* Cart */}
                        <button
                          type="button"
                          aria-label="Add to cart"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F5F3] text-[#0F766E] transition-colors hover:bg-[#0F766E] hover:text-white"
                        >
                          <ShoppingCart size={17} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      {!loading &&
        !error &&
        newArrivals.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl bg-[#0F766E] px-6 py-10 sm:px-10">
              <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
                <div>
                  <div className="flex items-center justify-center gap-2 sm:justify-start">
                    <Sparkles
                      size={17}
                      className="text-[#FF8B8B]"
                    />

                    <span className="font-['Poppins'] text-xs font-semibold uppercase tracking-wider text-white/80">
                      Keep exploring
                    </span>
                  </div>

                  <h2 className="mt-2 font-['Poppins'] text-2xl font-bold text-white">
                    Theres more waiting for you.
                  </h2>

                  <p className="mt-2 font-['Poppins'] text-sm text-white/70">
                    Explore the complete Shopora collection.
                  </p>
                </div>

                <Link
                  href="/shop"
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-6 py-3 font-['Poppins'] text-sm font-semibold text-[#0F766E] transition hover:bg-[#F8FAFC]"
                >
                  View All Products
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </section>
        )}
    </main>
  );
};

export default NewArrivalsPage;