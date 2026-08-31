"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight, Package, Search } from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type OrderStatus = "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

interface OrderItem {
  productName: string;
  productImage: string | null;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  total: number;
  createdAt: string;
  items: OrderItem[];
}

/* =========================================================
   STATIC MOCK DATA
   Replace with a real API call (see getOrders.ts) once ready.
========================================================= */

const orders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-8321",
    status: "DELIVERED",
    total: 59.99,
    createdAt: "2024-05-26",
    items: [
      {
        productName: "Wireless Headphones",
        productImage:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80",
        quantity: 1,
        price: 59.99,
      },
    ],
  },
  {
    id: "2",
    orderNumber: "ORD-8320",
    status: "PROCESSING",
    total: 89.99,
    createdAt: "2024-05-24",
    items: [
      {
        productName: "Running Shoes",
        productImage:
          "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=200&q=80",
        quantity: 1,
        price: 69.99,
      },
      {
        productName: "Ankle Socks",
        productImage: null,
        quantity: 2,
        price: 10.0,
      },
    ],
  },
  {
    id: "3",
    orderNumber: "ORD-8317",
    status: "DELIVERED",
    total: 18.99,
    createdAt: "2024-05-20",
    items: [
      {
        productName: "Ceramic Mug Set",
        productImage:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=200&q=80",
        quantity: 1,
        price: 18.99,
      },
    ],
  },
  {
    id: "4",
    orderNumber: "ORD-8315",
    status: "CANCELLED",
    total: 49.99,
    createdAt: "2024-05-18",
    items: [
      {
        productName: "Leather Wallet",
        productImage:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80",
        quantity: 1,
        price: 49.99,
      },
    ],
  },
  {
    id: "5",
    orderNumber: "ORD-8310",
    status: "SHIPPED",
    total: 129.99,
    createdAt: "2024-05-10",
    items: [
      {
        productName: "Smart Watch",
        productImage:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=80",
        quantity: 1,
        price: 129.99,
      },
    ],
  },
];

/* =========================================================
   STATUS LABELS / STYLES
========================================================= */

const statusOptions: Array<OrderStatus | "All"> = [
  "All",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

const statusLabel: Record<OrderStatus, string> = {
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

const getStatusClass = (status: OrderStatus) => {
  if (status === "DELIVERED") {
    return "bg-[#EAF7E7] text-[#4D9A38]";
  }

  if (status === "PROCESSING") {
    return "bg-[#EAF3FF] text-[#2563EB]";
  }

  if (status === "CANCELLED") {
    return "bg-[#F1F2F4] text-[#64748B]";
  }

  return "bg-[#FFF3E8] text-[#F97316]";
};

/* =========================================================
   MY ORDERS PAGE (STATIC)
========================================================= */

const MyOrdersPage = () => {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">(
    "All"
  );
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    const matchesSearch =
      search.trim() === "" ||
      order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      order.items.some((item) =>
        item.productName.toLowerCase().includes(search.toLowerCase())
      );

    return matchesStatus && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-3 py-4 sm:px-5 md:px-6 lg:px-7 xl:px-8">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-['Poppins'] text-[20px] font-semibold text-[#0F172A]">
            My Orders
          </h1>
          <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
            Track, manage, and review everything you&apos;ve ordered.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 rounded-lg border border-[#E8EEEE] bg-white px-3 py-2 sm:w-72">
          <Search size={16} className="shrink-0 text-[#94A3B8]" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by order ID or product"
            className="w-full font-['Poppins'] text-[14px] text-[#334155] outline-none placeholder:text-[#94A3B8]"
          />
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="mb-5 flex flex-wrap gap-2">
        {statusOptions.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setStatusFilter(status)}
            className={`rounded-full px-4 py-2 font-['Poppins'] text-[14px] font-medium transition-colors ${
              statusFilter === status
                ? "bg-[#0F766E] text-white"
                : "bg-white text-[#475569] border border-[#E8EEEE] hover:bg-[#F6FAF9] hover:text-[#0F766E]"
            }`}
          >
            {status === "All" ? "All" : statusLabel[status]}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="overflow-hidden rounded-xl border border-[#E8EEEE] bg-white">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <Package size={32} className="text-[#94A3B8]" />
            <p className="font-['Poppins'] text-[14px] text-[#64748B]">
              No orders found.
            </p>
          </div>
        ) : (
          <div className="px-4 pb-3 pt-1">
            {filteredOrders.map((order) => {
              const firstItem = order.items[0];
              const itemsLabel =
                order.items.length === 1
                  ? "1 Item"
                  : `${order.items.length} Items`;

              return (
                <div
                  key={order.id}
                  className="grid grid-cols-[56px_1fr_auto_20px] items-center gap-3 border-b border-[#EEF2F2] py-4 last:border-b-0 sm:grid-cols-[62px_1fr_120px_100px_20px]"
                >
                  {/* Product Image */}
                  <div className="flex h-12 w-14 items-center justify-center overflow-hidden rounded-lg border border-[#E8EEEE] bg-white">
                    {firstItem?.productImage ? (
                      <Image
                        src={firstItem.productImage}
                        alt={firstItem.productName}
                        className="h-full w-full object-cover"
                        height={512}
                        width={512}
                      />
                    ) : (
                      <Package size={20} className="text-[#94A3B8]" />
                    )}
                  </div>

                  {/* Order Info */}
                  <div className="min-w-0">
                    <p className="truncate font-['Poppins'] text-[14px] font-semibold text-[#0F766E]">
                      Order #{order.orderNumber}
                    </p>
                    <p className="mt-1 truncate font-['Poppins'] text-[14px] text-[#334155]">
                      {firstItem?.productName}
                      {order.items.length > 1 &&
                        ` + ${order.items.length - 1} more`}
                    </p>
                    <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="hidden sm:block">
                    <p className="font-['Poppins'] text-[14px] font-semibold text-[#1E293B]">
                      ${order.total.toFixed(2)}
                    </p>
                    <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
                      {itemsLabel}
                    </p>
                  </div>

                  {/* Status */}
                  <span
                    className={`hidden w-fit rounded-md px-3 py-1.5 font-['Poppins'] text-[14px] font-medium sm:inline-flex ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {statusLabel[order.status]}
                  </span>

                  <ChevronRight size={18} className="text-[#475569]" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyOrdersPage;