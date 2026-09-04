"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight, Package, Search } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { getSellerOrders } from "@/lib/api/sellerOrders";

/* =========================================================
   TYPES
========================================================= */

type OrderStatus =
  | "PLACED"
  | "PAID"
  | "PROCESSING"
  | "PACKED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string | null;
  quantity: number;
  price: number;
  total: number;
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
   STATUS LABELS / STYLES
========================================================= */

const statusOptions: Array<OrderStatus | "All"> = [
  "All",
  "PLACED",
  "PAID",
  "PROCESSING",
  "PACKED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
];

const statusLabel: Record<OrderStatus, string> = {
  PLACED: "Placed",
  PAID: "Paid",
  PROCESSING: "Processing",
  PACKED: "Packed",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  REFUNDED: "Refunded",
};

const getStatusClass = (status: OrderStatus) => {
  if (status === "DELIVERED") {
    return "bg-[#EAF7E7] text-[#4D9A38]";
  }

  if (
    status === "PLACED" ||
    status === "PAID" ||
    status === "PROCESSING"
  ) {
    return "bg-[#EAF3FF] text-[#2563EB]";
  }

  if (status === "CANCELLED" || status === "REFUNDED") {
    return "bg-[#F1F2F4] text-[#64748B]";
  }

  return "bg-[#FFF3E8] text-[#F97316]";
};

/* =========================================================
   SELLER ORDERS PAGE
========================================================= */

const OrdersPage = () => {
  /* =========================================================
     SESSION
  ========================================================= */

  const { data: session } = useSession();

  const sellerId = session?.user?.id;

  /* =========================================================
     STATES
  ========================================================= */

  const [orders, setOrders] = useState<Order[]>([]);

  const [statusFilter, setStatusFilter] =
    useState<OrderStatus | "All">("All");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* =========================================================
     FETCH SELLER ORDERS
  ========================================================= */

  useEffect(() => {
    const fetchSellerOrders = async () => {
      if (!sellerId) {
        console.log("Seller ID not available");
        return;
      }

      try {
        setLoading(true);
        setError("");

        // console.log("Fetching seller orders...");
        // console.log("Seller ID:", sellerId);

        const response = await getSellerOrders(sellerId);

        console.log("Seller Orders API Response:", response);
        // console.log("Seller Orders Data:", response.data);

        setOrders(response.data);
      } catch (error) {
        console.error("Seller Orders Fetch Error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load seller orders"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSellerOrders();
  }, [sellerId]);

  /* =========================================================
     FILTER ORDERS
  ========================================================= */

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "All" ||
      order.status === statusFilter;

    const matchesSearch =
      search.trim() === "" ||
      order.orderNumber
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      order.items.some((item) =>
        item.productName
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    return matchesStatus && matchesSearch;
  });

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <p className="font-['Poppins'] text-[14px] text-[#64748B]">
          Loading orders...
        </p>
      </main>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
        <div className="text-center">
          <p className="font-['Poppins'] text-[14px] text-red-500">
            {error}
          </p>
        </div>
      </main>
    );
  }

  /* =========================================================
     UI
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-3 py-4 sm:px-5 md:px-6 lg:px-7 xl:px-8">

      {/* Header */}

      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="font-['Poppins'] text-[20px] font-semibold text-[#0F172A]">
            Seller Orders
          </h1>

          <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
            Manage and track orders for your products.
          </p>
        </div>

        {/* Search */}

        <div className="flex items-center gap-2 rounded-lg border border-[#E8EEEE] bg-white px-3 py-2 sm:w-72">

          <Search
            size={16}
            className="shrink-0 text-[#94A3B8]"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
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
                : "border border-[#E8EEEE] bg-white text-[#475569] hover:bg-[#F6FAF9] hover:text-[#0F766E]"
            }`}
          >
            {status === "All"
              ? "All"
              : statusLabel[status]}
          </button>

        ))}

      </div>

      {/* Orders List */}

      <div className="overflow-hidden rounded-xl border border-[#E8EEEE] bg-white">

        {filteredOrders.length === 0 ? (

          <div className="flex flex-col items-center justify-center gap-3 py-16">

            <Package
              size={32}
              className="text-[#94A3B8]"
            />

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

                      <Package
                        size={20}
                        className="text-[#94A3B8]"
                      />

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

                      {new Date(
                        order.createdAt
                      ).toLocaleDateString("en-US", {
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

                  <ChevronRight
                    size={18}
                    className="text-[#475569]"
                  />

                </div>

              );
            })}

          </div>

        )}

      </div>

    </main>
  );
};

export default OrdersPage;