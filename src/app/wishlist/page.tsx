
"use client";

import Image from "next/image";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";

type WishlistProduct = {
  id: string;
  name: string;
  image: string;
  regularPrice: number;
  salePrice?: number;
  inStock: boolean;
};

const wishlistProducts: WishlistProduct[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    image: "https://placehold.co/600x600/png?text=iPhone+15+Pro+Max",
    regularPrice: 129999,
    salePrice: 119999,
    inStock: true,
  },
  {
    id: "2",
    name: "Sony WH-1000XM5",
    image: "https://placehold.co/600x600/png?text=Sony+Headphones",
    regularPrice: 39999,
    salePrice: 34999,
    inStock: true,
  },
  {
    id: "3",
    name: "Apple Watch Series 9",
    image: "https://placehold.co/600x600/png?text=Apple+Watch",
    regularPrice: 49999,
    salePrice: 44999,
    inStock: true,
  },
  {
    id: "4",
    name: "MacBook Air M3",
    image: "https://placehold.co/600x600/png?text=MacBook+Air+M3",
    regularPrice: 149999,
    inStock: false,
  },
];

const WishlistPage = () => {
  const removeFromWishlist = (id: string) => {
    console.log("Remove wishlist item:", id);
  };

  const addToCart = (product: WishlistProduct) => {
    console.log("Add to cart:", product);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-gray-900">
                  Home
                </Link>

                <span>/</span>

                <span className="text-gray-900">Wishlist</span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                My Wishlist
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Products you saved for later
              </p>
            </div>

            <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-red-50 sm:flex">
              <Heart className="h-6 w-6 fill-red-500 text-red-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Wishlist */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {wishlistProducts.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl bg-white px-6 text-center shadow-sm">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <Heart className="h-9 w-9 text-gray-400" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Your wishlist is empty
            </h2>

            <p className="mt-2 max-w-md text-sm text-gray-500">
              You haven t added any products to your wishlist yet.
              Start exploring and save products you love.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Explore Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* Wishlist top bar */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">
                  {wishlistProducts.length}
                </span>{" "}
                {wishlistProducts.length === 1 ? "item" : "items"}
              </p>

              <button className="text-sm font-medium text-gray-500 transition hover:text-red-500">
                Clear Wishlist
              </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wishlistProducts.map((product) => {
                const hasDiscount =
                  product.salePrice !== undefined &&
                  product.salePrice < product.regularPrice;

                return (
                  <article
                    key={product.id}
                    className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />

                      {/* Discount */}
                      {hasDiscount && (
                        <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                          Sale
                        </span>
                      )}

                      {/* Remove */}
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        aria-label={`Remove ${product.name} from wishlist`}
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 text-gray-600 transition hover:text-red-500" />
                      </button>

                      {/* Out of stock */}
                      {!product.inStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h2 className="line-clamp-2 min-h-[48px] text-base font-semibold text-gray-900">
                        {product.name}
                      </h2>

                      {/* Price */}
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">
                          ৳
                          {(
                            product.salePrice ?? product.regularPrice
                          ).toLocaleString()}
                        </span>

                        {hasDiscount && (
                          <span className="text-sm text-gray-400 line-through">
                            ৳{product.regularPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Add to Cart */}
                      <button
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                      >
                        <ShoppingCart className="h-4 w-4" />

                        {product.inStock
                          ? "Add to Cart"
                          : "Out of Stock"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default WishlistPage;

