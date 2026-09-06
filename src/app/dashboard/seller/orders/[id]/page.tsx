"use client";

import React, { useEffect, useState } from "react";
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
  Package,
  Printer,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  User,
} from "lucide-react";
import { useParams } from "next/navigation";
import { getSellerOrderId, updateSellerOrderStatus, type SellerOrder} from "@/lib/api/sellerOrders";



/* =========================================================
   STATUS
========================================================= */

type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "PACKED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

const statusOptions: OrderStatus[] = [
  "PENDING",
  "PROCESSING",
  "PACKED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
];

const getStatusClass = (status: OrderStatus) => {
  switch (status) {
    case "PENDING":
      return "bg-[#FFF3E8] text-[#F97316]";

    case "PROCESSING":
      return "bg-[#EAF3FF] text-[#2563EB]";

    case "PACKED":
      return "bg-[#F3EEFF] text-[#7C3AED]";

    case "SHIPPED":
      return "bg-[#E8F7F5] text-[#0F766E]";

    case "DELIVERED":
      return "bg-[#EAF7E7] text-[#4D9A38]";

    case "CANCELLED":
      return "bg-[#F1F2F4] text-[#64748B]";

    case "REFUNDED":
      return "bg-[#FFF0F0] text-[#DC2626]";

    default:
      return "bg-[#F1F2F4] text-[#64748B]";
  }
};

/* =========================================================
   PAGE
========================================================= */

const EditOrderPage = () => {

  const [orderData, setOrderData] = useState<SellerOrder | null>(null);
  const params = useParams();
  const id = params.id as string;
  // console.log("STEP 4 - Order ID from URL:", id);

const [status, setStatus] =
  useState<OrderStatus>("PENDING");

useEffect(() => {
  const fetchOrder = async () => {
    try {
      const response = await getSellerOrderId(id);

      // console.log("STEP 4.3 - API Response:", response);

      setOrderData(response?.data);

      setStatus(response.data.orderStatus as OrderStatus);
      

    } catch (error) {
      console.error("Failed to fetch order:", error);
    }
  };

  if (id) {
    fetchOrder();
  }
}, [id]);

  const [isStatusOpen, setIsStatusOpen] =
    useState(false);

  const [notes, setNotes] = useState("");

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");

  const [quantities, setQuantities] = useState<
    Record<string, number>
  >({
    "1": 1,
    "2": 1,
  });


const handleUpdateOrder = async () => {
  if(!orderData?.id) return ;

  try{
    setIsUpdating(true);
    setUpdateError("");
    setUpdateSuccess("");

    const response = await updateSellerOrderStatus(orderData?.id, status);

     // Local UI state-ও update করে দাও
    setOrderData((prev) =>
      prev ? { ...prev, orderStatus: status } : prev
    );


    // console.log("Order status updated:", response);
      setUpdateSuccess("Order status updated successfully.");

  }catch(error) {
     console.error("Failed to update order status:", error);

    setUpdateError("Failed to update order status.");
  }finally{
    setIsUpdating(false);
  }
}


  return (
    <main className="min-h-screen bg-[#F8FAFC] px-3 py-4 font-['Poppins'] sm:px-5 md:px-6 lg:px-7 xl:px-8">
      <div className="">
        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[22px] font-semibold text-[#0F172A]">
              Edit Order
            </h1>

            <div className="mt-1 flex flex-wrap items-center gap-2 text-[14px] text-[#64748B]">
              <Link href="/" className="transition hover:text-[#0F766E]">
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

              <span>Order #{orderData?.orderNumber}</span>
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
                    Order #{orderData?.orderNumber}
                  </h2>

                  <span
                    className={`rounded-md px-2.5 py-1 text-[12px] font-medium ${getStatusClass(
                      status,
                    )}`}
                  >
                    {orderData?.orderStatus}
                  </span>
                </div>

                <p className="mt-1 text-[13px] text-[#64748B]">
                  Placed on{" "}
                  {orderData?.createdAt
                    ? new Date(orderData.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : ""}
                </p>
              </div>

              {/* Order Meta */}

              <div className="grid grid-cols-1 divide-y divide-[#E5EEEE] sm:grid-cols-2 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
                <div className="flex items-center gap-3 px-4 py-3">
                  <User size={18} className="text-[#0F766E]" />

                  <div>
                    <p className="text-[12px] text-[#64748B]">Customer</p>

                    <p className="mt-0.5 text-[13px] font-medium text-[#334155]">
                      {orderData?.shippingName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-3">
                  <CreditCard size={18} className="text-[#0F766E]" />

                  <div>
                    <p className="text-[12px] text-[#64748B]">Payment Method</p>

                    <p className="mt-0.5 text-[13px] font-medium text-[#334155]">
                      {orderData?.paymentMethod}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-3">
                  <ShieldCheck size={18} className="text-[#0F766E]" />

                  <div>
                    <p className="text-[12px] text-[#64748B]">Payment Status</p>

                    <span className="mt-0.5 inline-flex rounded-md bg-[#EAF7E7] px-2 py-1 text-[12px] font-medium text-[#4D9A38]">
                      {orderData?.paymentStatus}
                    </span>
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
                    <User size={18} className="text-[#0F766E]" />

                    <h3 className="text-[14px] font-semibold text-[#1E293B]">
                      Customer Information
                    </h3>
                  </div>

                  {/* <button
                    type="button"
                    className="text-[13px] font-medium text-[#0F766E] hover:underline"
                  >
                    Edit
                  </button> */}
                </div>

                <div className="space-y-3 px-4 py-4">
                  <InfoRow label="Name" value={orderData?.shippingName ?? ""} />

                  {/* <InfoRow label="Email" value={orderData?.shippingPhone ?? ""} /> */}

                  <InfoRow
                    label="Phone"
                    value={orderData?.shippingPhone ?? ""}
                  />

                  <InfoRow
                    label="Customer ID"
                    value={orderData?.customerId ?? ""}
                  />

                  {/* <button
                    type="button"
                    className="mt-1 rounded-md border border-[#0F766E] px-3 py-2 text-[13px] font-medium text-[#0F766E] transition hover:bg-[#F1FAF8]"
                  >
                    View Customer Profile
                  </button> */}
                </div>
              </section>

              {/* Shipping Information */}

              <section className="overflow-hidden rounded-xl border border-[#E5EEEE] bg-white">
                <div className="flex items-center justify-between border-b border-[#E5EEEE] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Truck size={18} className="text-[#0F766E]" />

                    <h3 className="text-[14px] font-semibold text-[#1E293B]">
                      Shipping Information
                    </h3>
                  </div>

                  {/* <button
                    type="button"
                    className="text-[13px] font-medium text-[#0F766E] hover:underline"
                  >
                    Edit
                  </button> */}
                </div>

                <div className="space-y-3 px-4 py-4">
                  <InfoRow
                    label="Address"
                    value={`${orderData?.shippingAddress}, ${orderData?.shippingCity}`}
                  />

                  <InfoRow
                    label="Phone"
                    value={orderData?.shippingPhone ?? ""}
                  />
                  <InfoRow
                    label="Zip Code"
                    value={orderData?.shippingPostalCode ?? ""}
                  />
                  <InfoRow
                    label="Country"
                    value={orderData?.shippingCountry ?? ""}
                  />
                </div>
              </section>
            </div>

            {/* =================================================
                ORDER ITEMS
            ================================================= */}

            <section className="overflow-hidden rounded-xl border border-[#E5EEEE] bg-white">
              <div className="flex items-center gap-2 border-b border-[#E5EEEE] px-4 py-3">
                <ShoppingBag size={18} className="text-[#0F766E]" />

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

              {orderData?.items?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 gap-3 border-b border-[#EEF2F2] px-4 py-4 last:border-b-0 md:grid-cols-[2fr_100px_100px_100px_100px] md:items-center"
                  >
                    {/* Product */}

                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#E5EEEE] bg-white">
                        <Image
                          src={item?.product?.images[0] || ""}
                          alt={item?.productName}
                          width={48}
                          height={48}
                          className="h-full w-full object-contain p-1"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-semibold text-[#1E293B]">
                          {item.productName}
                        </p>
                      </div>
                    </div>

                    {/* SKU */}

                    <div>
                      <span className="text-[13px] text-[#64748B] md:hidden">
                        SKU:{" "}
                      </span>

                      <span className="text-[13px] text-[#475569]">
                        {item?.product?.sku}
                      </span>
                    </div>

                    {/* Price */}

                    <div>
                      <span className="text-[13px] text-[#64748B] md:hidden">
                        Price:{" "}
                      </span>

                      <span className="text-[13px] font-medium text-[#334155]">
                        ${item?.price?.toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity */}

                    <div className="flex items-center gap-2">
                      <span className="text-[13px] text-[#64748B] md:hidden">
                        Quantity:
                      </span>

                      <div className="flex items-center rounded-md border border-[#DDE5E5]">
                        <span className="flex h-8 w-8 items-center justify-center border-x border-[#DDE5E5] text-[13px] font-medium text-[#334155]">
                          {item?.quantity}
                        </span>
                      </div>
                    </div>

                    {/* Total */}

                    <div className="text-left md:text-right">
                      <span className="text-[13px] text-[#64748B] md:hidden">
                        Total:{" "}
                      </span>

                      <span className="text-[13px] font-semibold text-[#334155]">
                        ${item?.total?.toFixed(2)}
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
                    value={orderData?.subtotal ?? ""}
                  />

                  <SummaryRow
                    label="Shipping Fee"
                    value={orderData?.shippingFee ?? ""}
                  />

                  <SummaryRow
                    label={`Discount `}
                    value={orderData?.discount ?? ""}
                    valueClass="text-[#0F766E]"
                  />

                  <div className="mt-2 flex items-center justify-between rounded-md bg-[#E8F7F5] px-3 py-2.5">
                    <span className="text-[14px] font-semibold text-[#0F766E]">
                      Grand Total
                    </span>

                    <span className="text-[16px] font-bold text-[#0F766E]">
                      ${orderData?.total}
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
                <RefreshCw size={18} className="text-[#0F766E]" />

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
                  onClick={() => setIsStatusOpen((prev) => !prev)}
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
                          <Check size={15} className="text-[#0F766E]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
          

              <button
                type="button"
                onClick={handleUpdateOrder}
                disabled={isUpdating}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-[#0F766E] px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#0B625B] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Check size={16} />
                {isUpdating ? "Updating..." : "Update Order"}
              </button>
            </section>

            {/* Quick Actions */}

            <section className="rounded-xl border border-[#E5EEEE] bg-white p-4">
              <div className="mb-4 flex items-center gap-2">
                <Edit3 size={18} className="text-[#0F766E]" />

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