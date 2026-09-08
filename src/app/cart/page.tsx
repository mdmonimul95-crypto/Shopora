
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Tag,
} from "lucide-react";
import { useState } from "react";

type CartProduct = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  inStock: boolean;
};

const initialCart: CartProduct[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    image: "https://placehold.co/600x600/png?text=iPhone+15+Pro+Max",
    price: 119999,
    quantity: 1,
    inStock: true,
  },
  {
    id: "2",
    name: "Sony WH-1000XM5",
    image: "https://placehold.co/600x600/png?text=Sony+Headphones",
    price: 34999,
    quantity: 2,
    inStock: true,
  },
  {
    id: "3",
    name: "Apple Watch Series 9",
    image: "https://placehold.co/600x600/png?text=Apple+Watch",
    price: 44999,
    quantity: 1,
    inStock: true,
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartProduct[]>(initialCart);
  const [coupon, setCoupon] = useState("");

  const updateQuantity = (id: string, amount: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + amount),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 && subtotal < 5000 ? 120 : 0;

  const discount = 0;

  const total = subtotal + shipping - discount;

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

                <span className="text-gray-900">Cart</span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Shopping Cart
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Review your items before checkout
              </p>
            </div>

            <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-gray-100 sm:flex">
              <ShoppingBag className="h-6 w-6 text-gray-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Cart */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="flex min-h-[450px] flex-col items-center justify-center rounded-2xl bg-white px-6 text-center shadow-sm">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <ShoppingBag className="h-9 w-9 text-gray-400" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Your cart is empty
            </h2>

            <p className="mt-2 max-w-md text-sm text-gray-500">
              You haven t added any products to your cart yet. Start shopping
              and add your favorite products.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
            {/* Cart Items */}
            <div>
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">
                    {cartItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>{" "}
                  items in your cart
                </p>

                <button
                  onClick={clearCart}
                  className="text-sm font-medium text-gray-500 transition hover:text-red-500"
                >
                  Clear Cart
                </button>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <Link
                        href={`/products/${item.id}`}
                        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-32 sm:w-32"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <Link
                              href={`/products/${item.id}`}
                              className="line-clamp-2 text-base font-semibold text-gray-900 transition hover:text-gray-600 sm:text-lg"
                            >
                              {item.name}
                            </Link>

                            <p className="mt-1 text-xs text-gray-500">
                              In Stock
                            </p>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                          </button>
                        </div>

                        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                          {/* Quantity */}
                          <div className="flex items-center rounded-lg border border-gray-200">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              disabled={item.quantity <= 1}
                              className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Minus className="h-4 w-4" />
                            </button>

                            <span className="flex h-9 min-w-9 items-center justify-center border-x border-gray-200 text-sm font-medium">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-50"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-base font-bold text-gray-900 sm:text-lg">
                              ৳{(item.price * item.quantity).toLocaleString()}
                            </p>

                            <p className="text-xs text-gray-400">
                              ৳{item.price.toLocaleString()} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <Link
                href="/products"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition hover:text-black"
              >
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-bold text-gray-900">
                Order Summary
              </h2>

              {/* Coupon */}
              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Have a coupon?
                </label>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Coupon code"
                      className="h-11 w-full rounded-lg border border-gray-200 pl-9 pr-3 text-sm outline-none transition focus:border-gray-400"
                    />
                  </div>

                  <button className="rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                    Apply
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="mt-6 space-y-4 border-t border-gray-100 pt-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>

                  <span className="font-medium text-gray-900">
                    ৳{subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>

                  <span className="font-medium text-gray-900">
                    {shipping === 0
                      ? "Free"
                      : `৳${shipping.toLocaleString()}`}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Discount</span>

                    <span className="font-medium text-green-600">
                      -৳{discount.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-5">
                <span className="text-base font-semibold text-gray-900">
                  Total
                </span>

                <span className="text-xl font-bold text-gray-900">
                  ৳{total.toLocaleString()}
                </span>
              </div>

              {/* Checkout */}
              <button
                disabled={cartItems.length === 0}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="mt-4 text-center text-xs text-gray-400">
                Secure checkout • Fast delivery
              </p>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
};

export default CartPage;
