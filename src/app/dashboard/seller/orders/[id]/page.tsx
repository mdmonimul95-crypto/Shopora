"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Edit3,
  FileText,
  Mail,
  MapPin,
  Package,
  Phone,
  Printer,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  User,
} from "lucide-react";

/* =========================================================
   STATIC DATA
   Later these will come from API
========================================================= */

const order = {
  orderNumber: "ORD-8320",
  createdAt: "May 24, 2024 at 10:32 AM",

  customer: {
    name: "Sarah Ahmed",
    email: "sarah.ahmed@example.com",
    phone: "+880 1712-345678",
    customerId: "CUS-1024",
  },

  shipping: {
    address: "House 12, Road 5, Dhanmondi",
    city: "Dhaka, 1205",
    country: "Bangladesh",
    phone: "+880 1712-345678",
  },

  billing: {
    address: "House 12, Road 5, Dhanmondi",
    city: "Dhaka, 1205",
    country: "Bangladesh",
    phone: "+880 1712-345678",
  },

  paymentMethod: "SSLCommerz (Online)",
  paymentStatus: "Paid",
  orderType: "Standard Delivery",

  items: [
    {
      id: "1",
      name: "Wireless Headphones",
      variant: "Black, Standard Size",
      sku: "SP-1001",
      price: 59.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "2",
      name: "Smart Watch Series 8",
      variant: "Black, 44mm",
      sku: "SP-1002",
      price: 89.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=80",
    },
  ],

  shippingFee: 10,
  discount: 15,
  coupon: "SAVE10",
};

/* =========================================================
   STATUS
========================================================= */

type OrderStatus =
  | "Pending"
  | "Processing"
  | "Packed"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Refunded";

const statusOptions: OrderStatus[] = [
  "Pending",
  "Processing",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Refunded",
];

const getStatusClass = (status: OrderStatus) => {
  switch (status) {
    case "Pending":
      return "bg-[#FFF3E8] text-[#F97316]";

    case "Processing":
      return "bg-[#EAF3FF] text-[#2563EB]";

    case "Packed":
      return "bg-[#F3EEFF] text-[#7C3AED]";

    case "Shipped":
      return "bg-[#E8F7F5] text-[#0F766E]";

    case "Delivered":
      return "bg-[#EAF7E7] text-[#4D9A38]";

    case "Cancelled":
      return "bg-[#F1F2F4] text-[#64748B]";

    case "Refunded":
      return "bg-[#FFF0F0] text-[#DC2626]";

    default:
      return "bg-[#F1F2F4] text-[#64748B]";
  }
};

/* =========================================================
   PAGE
========================================================= */

const EditOrderPage = () => {
  const [status, setStatus] =
    useState<OrderStatus>("Processing");

  const [isStatusOpen, setIsStatusOpen] =
    useState(false);

  const [notes, setNotes] = useState("");

  const [quantities, setQuantities] = useState<
    Record<string, number>
  >({
    "1": 1,
    "2": 1,
  });

  /* =========================================================
     QUANTITY
  ========================================================= */

  const increaseQuantity = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQuantity = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));
  };

  /* =========================================================
     TOTAL
  ========================================================= */

  const subtotal = order.items.reduce(
    (sum, item) =>
      sum + item.price * (quantities[item.id] || 1),
    0
  );

  const grandTotal =
    subtotal +
    order.shippingFee -
    order.discount;

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-3 py-4 font-['Poppins'] sm:px-5 md:px-6 lg:px-7 xl:px-8">

      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h1 className="text-[22px] font-semibold text-[#0F172A]">
              Edit Order
            </h1>

            <div className="mt-1 flex flex-wrap items-center gap-2 text-[14px] text-[#64748B]">

              <Link
                href="/"
                className="transition hover:text-[#0F766E]"
              >
                Home
              </Link>

              <ChevronRight size={14} />

              <Link
                href="/dashboard/seller/orders"
                className="transition hover:text-[#0F766E]"
              >
                Orders
              </Link>

              <ChevronRight size={14} />

              <span>
                Order #{order.orderNumber}
              </span>

              <ChevronRight size={14} />

              <span className="text-[#334155]">
                Edit
              </span>

            </div>

          </div>

          <Link
            href="/dashboard/seller/orders"
            className="flex w-fit items-center gap-2 rounded-lg border border-[#DDE5E5] bg-white px-4 py-2.5 text-[14px] font-medium text-[#334155] transition hover:border-[#0F766E] hover:text-[#0F766E]"
          >
            <ArrowLeft size={16} />
            Back to Orders
          </Link>

        </div>

        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_300px]">

          {/* ===================================================
              LEFT CONTENT
          =================================================== */}

          <div className="space-y-4">

            {/* =================================================
                ORDER HEADER
            ================================================= */}

            <section className="overflow-hidden rounded-xl border border-[#E5EEEE] bg-white">

              <div className="border-b border-[#E5EEEE] px-4 py-3.5">

                <div className="flex flex-wrap items-center gap-2">

                  <h2 className="text-[17px] font-semibold text-[#1E293B]">
                    Order #{order.orderNumber}
                  </h2>

                  <span
                    className={`rounded-md px-2.5 py-1 text-[12px] font-medium ${getStatusClass(
                      status
                    )}`}
                  >
                    {status}
                  </span>

                </div>

                <p className="mt-1 text-[13px] text-[#64748B]">
                  Placed on {order.createdAt}
                </p>

              </div>

              {/* Order Meta */}

              <div className="grid grid-cols-1 divide-y divide-[#E5EEEE] sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">

                <div className="flex items-center gap-3 px-4 py-3">

                  <User
                    size={18}
                    className="text-[#0F766E]"
                  />

                  <div>
                    <p className="text-[12px] text-[#64748B]">
                      Customer
                    </p>

                    <p className="mt-0.5 text-[13px] font-medium text-[#334155]">
                      {order.customer.name}
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3 px-4 py-3">

                  <CreditCard
                    size={18}
                    className="text-[#0F766E]"
                  />

                  <div>
                    <p className="text-[12px] text-[#64748B]">
                      Payment Method
                    </p>

                    <p className="mt-0.5 text-[13px] font-medium text-[#334155]">
                      {order.paymentMethod}
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3 px-4 py-3">

                  <ShieldCheck
                    size={18}
                    className="text-[#0F766E]"
                  />

                  <div>
                    <p className="text-[12px] text-[#64748B]">
                      Payment Status
                    </p>

                    <span className="mt-0.5 inline-flex rounded-md bg-[#EAF7E7] px-2 py-1 text-[12px] font-medium text-[#4D9A38]">
                      {order.paymentStatus}
                    </span>
                  </div>

                </div>

                <div className="flex items-center gap-3 px-4 py-3">

                  <Package
                    size={18}
                    className="text-[#0F766E]"
                  />

                  <div>
                    <p className="text-[12px] text-[#64748B]">
                      Order Type
                    </p>

                    <p className="mt-0.5 text-[13px] font-medium text-[#334155]">
                      {order.orderType}
                    </p>
                  </div>

                </div>

              </div>

            </section>

            {/* =================================================
                CUSTOMER + SHIPPING
            ================================================= */}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              {/* Customer Information */}

              <section className="overflow-hidden rounded-xl border border-[#E5EEEE] bg-white">

                <div className="flex items-center justify-between border-b border-[#E5EEEE] px-4 py-3">

                  <div className="flex items-center gap-2">

                    <User
                      size={18}
                      className="text-[#0F766E]"
                    />

                    <h3 className="text-[14px] font-semibold text-[#1E293B]">
                      Customer Information
                    </h3>

                  </div>

                  <button
                    type="button"
                    className="text-[13px] font-medium text-[#0F766E] hover:underline"
                  >
                    Edit
                  </button>

                </div>

                <div className="space-y-3 px-4 py-4">

                  <InfoRow
                    label="Name"
                    value={order.customer.name}
                  />

                  <InfoRow
                    label="Email"
                    value={order.customer.email}
                  />

                  <InfoRow
                    label="Phone"
                    value={order.customer.phone}
                  />

                  <InfoRow
                    label="Customer ID"
                    value={order.customer.customerId}
                  />

                  <button
                    type="button"
                    className="mt-1 rounded-md border border-[#0F766E] px-3 py-2 text-[13px] font-medium text-[#0F766E] transition hover:bg-[#F1FAF8]"
                  >
                    View Customer Profile
                  </button>

                </div>

              </section>

              {/* Shipping Information */}

              <section className="overflow-hidden rounded-xl border border-[#E5EEEE] bg-white">

                <div className="flex items-center justify-between border-b border-[#E5EEEE] px-4 py-3">

                  <div className="flex items-center gap-2">

                    <Truck
                      size={18}
                      className="text-[#0F766E]"
                    />

                    <h3 className="text-[14px] font-semibold text-[#1E293B]">
                      Shipping Information
                    </h3>

                  </div>

                  <button
                    type="button"
                    className="text-[13px] font-medium text-[#0F766E] hover:underline"
                  >
                    Edit
                  </button>

                </div>

                <div className="space-y-3 px-4 py-4">

                  <InfoRow
                    label="Address"
                    value={`${order.shipping.address}, ${order.shipping.city}, ${order.shipping.country}`}
                  />

                  <InfoRow
                    label="Phone"
                    value={order.shipping.phone}
                  />

                </div>

              </section>

              {/* Billing Information */}

              <section className="overflow-hidden rounded-xl border border-[#E5EEEE] bg-white">

                <div className="flex items-center justify-between border-b border-[#E5EEEE] px-4 py-3">

                  <div className="flex items-center gap-2">

                    <FileText
                      size={18}
                      className="text-[#0F766E]"
                    />

                    <h3 className="text-[14px] font-semibold text-[#1E293B]">
                      Billing Information
                    </h3>

                  </div>

                  <button
                    type="button"
                    className="text-[13px] font-medium text-[#0F766E] hover:underline"
                  >
                    Edit
                  </button>

                </div>

                <div className="space-y-3 px-4 py-4">

                  <InfoRow
                    label="Address"
                    value={`${order.billing.address}, ${order.billing.city}, ${order.billing.country}`}
                  />

                  <InfoRow
                    label="Phone"
                    value={order.billing.phone}
                  />

                </div>

              </section>

            </div>

            {/* =================================================
                ORDER ITEMS
            ================================================= */}

            <section className="overflow-hidden rounded-xl border border-[#E5EEEE] bg-white">

              <div className="flex items-center gap-2 border-b border-[#E5EEEE] px-4 py-3">

                <ShoppingBag
                  size={18}
                  className="text-[#0F766E]"
                />

                <h3 className="text-[14px] font-semibold text-[#1E293B]">
                  Order Items
                </h3>

              </div>

              {/* Table Header */}

              <div className="hidden grid-cols-[2fr_100px_100px_100px_100px] border-b border-[#E5EEEE] bg-[#FAFCFC] px-4 py-2.5 text-[12px] font-medium text-[#64748B] md:grid">

                <span>Product</span>
                <span>SKU</span>
                <span>Price</span>
                <span>Quantity</span>
                <span className="text-right">Total</span>

              </div>

              {/* Items */}

              {order.items.map((item) => {

                const itemQuantity =
                  quantities[item.id] || 1;

                const itemTotal =
                  item.price * itemQuantity;

                return (

                  <div
                    key={item.id}
                    className="grid grid-cols-1 gap-3 border-b border-[#EEF2F2] px-4 py-4 last:border-b-0 md:grid-cols-[2fr_100px_100px_100px_100px] md:items-center"
                  >

                    {/* Product */}

                    <div className="flex items-center gap-3">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#E5EEEE] bg-white">

                        <Image
                          src={item.image}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="h-full w-full object-contain p-1"
                        />

                      </div>

                      <div className="min-w-0">

                        <p className="truncate text-[13px] font-semibold text-[#1E293B]">
                          {item.name}
                        </p>

                        <p className="mt-0.5 text-[12px] text-[#64748B]">
                          {item.variant}
                        </p>

                      </div>

                    </div>

                    {/* SKU */}

                    <div>

                      <span className="text-[13px] text-[#64748B] md:hidden">
                        SKU:{" "}
                      </span>

                      <span className="text-[13px] text-[#475569]">
                        {item.sku}
                      </span>

                    </div>

                    {/* Price */}

                    <div>

                      <span className="text-[13px] text-[#64748B] md:hidden">
                        Price:{" "}
                      </span>

                      <span className="text-[13px] font-medium text-[#334155]">
                        ${item.price.toFixed(2)}
                      </span>

                    </div>

                    {/* Quantity */}

                    <div className="flex items-center gap-2">

                      <span className="text-[13px] text-[#64748B] md:hidden">
                        Quantity:
                      </span>

                      <div className="flex items-center rounded-md border border-[#DDE5E5]">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          className="flex h-8 w-8 items-center justify-center text-[16px] text-[#475569] transition hover:bg-[#F6FAF9]"
                        >
                          −
                        </button>

                        <span className="flex h-8 w-8 items-center justify-center border-x border-[#DDE5E5] text-[13px] font-medium text-[#334155]">
                          {itemQuantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          className="flex h-8 w-8 items-center justify-center text-[16px] text-[#475569] transition hover:bg-[#F6FAF9]"
                        >
                          +
                        </button>

                      </div>

                    </div>

                    {/* Total */}

                    <div className="text-left md:text-right">

                      <span className="text-[13px] text-[#64748B] md:hidden">
                        Total:{" "}
                      </span>

                      <span className="text-[13px] font-semibold text-[#334155]">
                        ${itemTotal.toFixed(2)}
                      </span>

                    </div>

                  </div>

                );
              })}

              {/* Order Summary */}

              <div className="flex justify-end border-t border-[#E5EEEE] px-4 py-4">

                <div className="w-full space-y-2 sm:w-72">

                  <SummaryRow
                    label="Subtotal"
                    value={`$${subtotal.toFixed(2)}`}
                  />

                  <SummaryRow
                    label="Shipping Fee"
                    value={`$${order.shippingFee.toFixed(2)}`}
                  />

                  <SummaryRow
                    label={`Discount (${order.coupon})`}
                    value={`-$${order.discount.toFixed(2)}`}
                    valueClass="text-[#0F766E]"
                  />

                  <div className="mt-2 flex items-center justify-between rounded-md bg-[#E8F7F5] px-3 py-2.5">

                    <span className="text-[14px] font-semibold text-[#0F766E]">
                      Grand Total
                    </span>

                    <span className="text-[16px] font-bold text-[#0F766E]">
                      ${grandTotal.toFixed(2)}
                    </span>

                  </div>

                </div>

              </div>

            </section>

          </div>

          {/* ===================================================
              RIGHT SIDEBAR
          =================================================== */}

          <aside className="space-y-4">

            {/* Update Status */}

            <section className="rounded-xl border border-[#E5EEEE] bg-white p-4">

              <div className="mb-4 flex items-center gap-2">

                <RefreshCw
                  size={18}
                  className="text-[#0F766E]"
                />

                <h3 className="text-[14px] font-semibold text-[#1E293B]">
                  Update Order Status
                </h3>

              </div>

              <label className="mb-1.5 block text-[13px] font-medium text-[#334155]">
                Order Status<span className="text-red-500">*</span>
              </label>

              {/* Custom Dropdown */}

              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setIsStatusOpen((prev) => !prev)
                  }
                  className="flex w-full items-center justify-between rounded-md border border-[#0F766E] bg-white px-3 py-2.5 text-left text-[13px] font-medium text-[#334155]"
                >
                  {status}

                  <ChevronDown
                    size={16}
                    className={`text-[#0F766E] transition ${
                      isStatusOpen ? "rotate-180" : ""
                    }`}
                  />

                </button>

                {isStatusOpen && (

                  <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-md border border-[#DDE5E5] bg-white shadow-lg">

                    {statusOptions.map((option) => (

                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setStatus(option);
                          setIsStatusOpen(false);
                        }}
                        className={`flex w-full items-center justify-between px-3 py-2 text-left text-[13px] transition hover:bg-[#F1FAF8] ${
                          status === option
                            ? "bg-[#E8F7F5] font-medium text-[#0F766E]"
                            : "text-[#334155]"
                        }`}
                      >
                        {option}

                        {status === option && (
                          <Check
                            size={15}
                            className="text-[#0F766E]"
                          />
                        )}

                      </button>

                    ))}

                  </div>

                )}

              </div>

              {/* Notes */}

              <label className="mb-1.5 mt-4 block text-[13px] font-medium text-[#334155]">
                Order Notes
                <span className="font-normal text-[#94A3B8]">
                  {" "}
                  (Optional)
                </span>
              </label>

              <textarea
                value={notes}
                onChange={(event) =>
                  setNotes(event.target.value)
                }
                rows={3}
                placeholder="Add a note about this order..."
                className="w-full resize-none rounded-md border border-[#DDE5E5] px-3 py-2.5 text-[13px] text-[#334155] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
              />

              <button
                type="button"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-[#0F766E] px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#0B625B]"
              >
                <Check size={16} />
                Update Order
              </button>

            </section>

            {/* Quick Actions */}

            <section className="rounded-xl border border-[#E5EEEE] bg-white p-4">

              <div className="mb-4 flex items-center gap-2">

                <Edit3
                  size={18}
                  className="text-[#0F766E]"
                />

                <h3 className="text-[14px] font-semibold text-[#1E293B]">
                  Quick Actions
                </h3>

              </div>

              <div className="space-y-2">

                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-md border border-[#DDE5E5] px-3 py-2.5 text-left text-[13px] font-medium text-[#334155] transition hover:border-[#0F766E] hover:text-[#0F766E]"
                >
                  <Printer size={16} />
                  Print Invoice
                </button>

                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-md border border-[#DDE5E5] px-3 py-2.5 text-left text-[13px] font-medium text-[#334155] transition hover:border-[#0F766E] hover:text-[#0F766E]"
                >
                  <Mail size={16} />
                  Send Email to Customer
                </button>

                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-md border border-[#FCA5A5] bg-[#FFF8F8] px-3 py-2.5 text-left text-[13px] font-medium text-[#DC2626] transition hover:bg-[#FFF1F1]"
                >
                  <Trash2 size={16} />
                  Cancel Order
                </button>

              </div>

            </section>

          </aside>

        </div>

      </div>
    </main>
  );
};

/* =========================================================
   SMALL COMPONENTS
========================================================= */

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="grid grid-cols-[70px_1fr] gap-3">

      <span className="text-[12px] text-[#64748B]">
        {label}
      </span>

      <span className="text-[13px] font-medium leading-5 text-[#475569]">
        {value}
      </span>

    </div>
  );
};

const SummaryRow = ({
  label,
  value,
  valueClass = "text-[#334155]",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) => {
  return (
    <div className="flex items-center justify-between">

      <span className="text-[13px] text-[#64748B]">
        {label}
      </span>

      <span className={`text-[13px] font-medium ${valueClass}`}>
        {value}
      </span>

    </div>
  );
};

export default EditOrderPage;