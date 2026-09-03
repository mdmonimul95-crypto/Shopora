"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock3,
  Heart,
  ShoppingCart,
  Star,
  Tag,
  Zap,
  ArrowRight,
  PackageSearch,
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
}

interface ProductsResponse {
  success: boolean;
  data: Product[];
  message?: string;
}

const DealsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const getDeals = async () => {
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
            result.message || "Failed to load deals"
          );
        }

        setProducts(result.data || []);
      } catch (error) {
        console.error("Deals error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load deals"
        );
      } finally {
        setLoading(false);
      }
    };

    getDeals();
  }, []);

  /*
   * Only products that actually have a sale price
   * and where salePrice < regularPrice are treated as deals.
   */
  const deals = useMemo(() => {
    return products
      .filter((product) => {
        const regularPrice = Number(product.regularPrice);
        const salePrice = Number(product.salePrice);

        return (
          product.salePrice !== null &&
          product.salePrice !== undefined &&
          !Number.isNaN(regularPrice) &&
          !Number.isNaN(salePrice) &&
          salePrice < regularPrice
        );
      })
      .sort((a, b) => {
        const aRegular = Number(a.regularPrice);
        const aSale = Number(a.salePrice);

        const bRegular = Number(b.regularPrice);
        const bSale = Number(b.salePrice);

        const aDiscount =
          ((aRegular - aSale) / aRegular) * 100;

        const bDiscount =
          ((bRegular - bSale) / bRegular) * 100;

        return bDiscount - aDiscount;
      });
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
          DEALS HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#0F766E]">
        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5" />

        <div className="absolute -bottom-32 right-24 h-80 w-80 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
              <Zap
                size={16}
                fill="currentColor"
                className="text-[#FF6B6B]"
              />

              <span className="font-['Poppins'] text-xs font-semibold uppercase tracking-wider text-white">
                Limited Time Offers
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-5 font-['Poppins'] text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Deals You
              <span className="text-[#FF8B8B]">
                {" "}Dont Want{" "}
              </span>
              to Miss
            </h1>

            <p className="mt-5 max-w-2xl font-['Poppins'] text-sm leading-7 text-white/75 sm:text-base">
              Grab amazing products at incredible prices.
              Shop todays best deals before theyre gone.
            </p>

            {/* Countdown style */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-3">
                <Clock3
                  size={18}
                  className="text-[#0F766E]"
                />

                <span className="font-['Poppins'] text-sm font-semibold text-[#1E293B]">
                  Deals are live now
                </span>
              </div>

              <Link
                href="/shop"
                className="flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 font-['Poppins'] text-sm font-medium text-white transition hover:bg-white/10"
              >
                Shop All Products
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DEALS CONTENT
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2">
              <Tag
                size={19}
                className="text-[#FF6B6B]"
              />

              <p className="font-['Poppins'] text-sm font-semibold uppercase tracking-wider text-[#FF6B6B]">
                Special Offers
              </p>
            </div>

            <h2 className="mt-2 font-['Poppins'] text-2xl font-bold text-[#1E293B] sm:text-3xl">
              Todays Best Deals
            </h2>

            <p className="mt-2 font-['Poppins'] text-sm text-[#64748B]">
              Save more on products you love.
            </p>
          </div>

          {!loading && !error && (
            <p className="font-['Poppins'] text-sm text-[#64748B]">
              <span className="font-semibold text-[#1E293B]">
                {deals.length}
              </span>{" "}
              deals available
            </p>
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

                  <div className="h-4 w-1/2 animate-pulse rounded bg-[#EEF2F2]" />

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
              Unable to load deals
            </h2>

            <p className="mt-2 font-['Poppins'] text-sm text-[#64748B]">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-lg bg-[#0F766E] px-5 py-2.5 font-['Poppins'] text-sm font-medium text-white hover:bg-[#0B625B]"
            >
              Try Again
            </button>
          </div>
        )}

        {/* =================================================
            NO DEALS
        ================================================== */}
        {!loading && !error && deals.length === 0 && (
          <div className="mt-8 rounded-xl border border-[#E8EEEE] bg-white px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F5F3]">
              <Tag
                size={30}
                className="text-[#0F766E]"
              />
            </div>

            <h2 className="mt-5 font-['Poppins'] text-xl font-semibold text-[#1E293B]">
              No deals available right now
            </h2>

            <p className="mx-auto mt-2 max-w-md font-['Poppins'] text-sm leading-6 text-[#64748B]">
              There are currently no products with an active
              discount. Check back soon for new offers.
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
            DEAL PRODUCTS
        ================================================== */}
        {!loading && !error && deals.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {deals.map((product) => {
              const regularPrice = Number(
                product.regularPrice
              );

              const salePrice = Number(
                product.salePrice
              );

              const discount = Math.round(
                ((regularPrice - salePrice) /
                  regularPrice) *
                  100
              );

              const isWishlisted =
                wishlist.includes(product.id);

              return (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-xl border border-[#E8EEEE] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#D3E7E4] hover:shadow-[0_14px_35px_rgba(15,118,110,0.10)]"
                >
                  {/* Product Image */}
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

                    {/* Discount Badge */}
                    <div className="absolute left-3 top-3 flex items-center gap-1 rounded-md bg-[#FF6B6B] px-2.5 py-1.5 font-['Poppins'] text-[11px] font-bold text-white shadow-sm">
                      <Zap
                        size={12}
                        fill="currentColor"
                      />
                      {discount}% OFF
                    </div>

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

                  {/* Product Content */}
                  <div className="p-4">
                    {/* Category */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-['Poppins'] text-[10px] font-semibold uppercase tracking-wider text-[#0F766E]">
                        {product.category || "Special Deal"}
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
                            ${salePrice.toFixed(2)}
                          </span>

                          <span className="font-['Poppins'] text-xs text-[#94A3B8] line-through">
                            ${regularPrice.toFixed(2)}
                          </span>
                        </div>

                        <p className="mt-1 font-['Poppins'] text-[10px] font-medium text-[#FF6B6B]">
                          You save $
                          {(regularPrice - salePrice).toFixed(
                            2
                          )}
                        </p>
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
          BOTTOM CTA
      ====================================================== */}
      {!loading && deals.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-[#E8F5F3] px-6 py-10 sm:px-10">
            <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
              <div>
                <h2 className="font-['Poppins'] text-2xl font-bold text-[#1E293B]">
                  Looking for more?
                </h2>

                <p className="mt-2 font-['Poppins'] text-sm text-[#64748B]">
                  Explore our complete collection of products.
                </p>
              </div>

              <Link
                href="/shop"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#0F766E] px-6 py-3 font-['Poppins'] text-sm font-semibold text-white transition hover:bg-[#0B625B]"
              >
                Explore Shop
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default DealsPage;