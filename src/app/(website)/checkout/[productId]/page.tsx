"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  MapPin,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { createOrder } from "@/lib/api/checkout";
import { useSession } from "@/lib/auth-client";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

type CustomerInfo = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export default function CheckoutPage() {

  const [currentStep, setCurrentStep] = useState(1);

   const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();


  const customerId = session?.user?.id;
  const productId = params?.productId as string;



  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      postalCode: "",
      country: "Bangladesh",
    });

  const [deliveryMethod, setDeliveryMethod] =
    useState("standard");

const [isPlacingOrder, setIsPlacingOrder] = useState(false);

const [orderError, setOrderError] = useState("");


  const handleChange = (
    field: keyof CustomerInfo,
    value: string
  ) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContinue = () => {
    if (
      !customerInfo.fullName.trim() ||
      !customerInfo.email.trim() ||
      !customerInfo.phone.trim() ||
      !customerInfo.address.trim() ||
      !customerInfo.city.trim() ||
      !customerInfo.state.trim() ||
      !customerInfo.postalCode.trim()
    ) {
      alert("Please complete all required fields.");
      return;
    }

    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };


  const handlePlaceOrder = async () => {
  try {
    setIsPlacingOrder(true);
    setOrderError("");

    if (!customerId) {
      setOrderError("Please login to place an order.");
      return;
    }

    if (!productId) {
      setOrderError("Product information is missing.");
      return;
    }

    const result = await createOrder({
      customerId: customerId,

      items: [
        {
          productId: productId,
          quantity: 1,
        },
      ],

      shippingName: customerInfo.fullName,
      shippingPhone: customerInfo.phone,
      shippingAddress: customerInfo.address,
      shippingCity: customerInfo.city,
      shippingPostalCode: customerInfo.postalCode,
      shippingCountry: customerInfo.country,

      paymentMethod: "COD",

      shippingFee:
        deliveryMethod === "express" ? 4.99 : 0,

      discount: 0,

      notes: undefined,
    });

    toast.success("Order has been placed!");

    setTimeout(() => {
      router.push("/orders");
    }, 1000);

  } catch (error) {
    console.error("PLACE ORDER ERROR:", error);

    setOrderError(
      error instanceof Error
        ? error.message
        : "Failed to place order"
    );
  } finally {
    setIsPlacingOrder(false);
  }
};

  return (
    <main className="min-h-screen bg-[#F8FAFA] px-4 py-8 font-['Poppins'] text-[#1E293B]">
      <div className="mx-auto max-w-7xl">
        {/* ================= HEADER ================= */}

        <div className="mb-7">
          <h1 className="text-2xl font-semibold text-[#172033]">Checkout</h1>
        </div>

        {/* ================= STEP INDICATOR ================= */}

        <div className="mb-8 flex items-center justify-center">
          <div className="flex items-center">
            {/* Step 1 */}

            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                  currentStep >= 1
                    ? "bg-[#0F766E] text-white"
                    : "bg-[#E5EEEE] text-[#64748B]"
                }`}
              >
                {currentStep > 1 ? <Check size={17} /> : "1"}
              </div>

              <span className="mt-2 text-sm font-medium text-[#0F766E]">
                Shipping & Delivery
              </span>
            </div>

            {/* Line */}

            <div
              className={`mx-3 h-px w-28 ${
                currentStep > 1 ? "bg-[#0F766E]" : "bg-[#CBD5E1]"
              }`}
            />

            {/* Step 2 */}

            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                  currentStep === 2
                    ? "bg-[#0F766E] text-white"
                    : "bg-[#E5EEEE] text-[#64748B]"
                }`}
              >
                2
              </div>

              <span
                className={`mt-2 text-sm font-medium ${
                  currentStep === 2 ? "text-[#0F766E]" : "text-[#64748B]"
                }`}
              >
                Review & Payment
              </span>
            </div>
          </div>
        </div>

        {/* ================= CONTENT ================= */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          {/* ================= LEFT ================= */}

          <div>
            {currentStep === 1 ? (
              <div className="space-y-4">
                {/* Shipping Information */}

                <section className="rounded-lg border border-[#E5EEEE] bg-white p-5">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F6F4] text-[#0F766E]">
                      <MapPin size={18} />
                    </div>

                    <div>
                      <h2 className="text-[16px] font-semibold text-[#172033]">
                        Shipping Information
                      </h2>

                      <p className="text-sm text-[#64748B]">
                        Enter your shipping address
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* Full Name */}

                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        Full Name <span className="text-[#FF6B6B]">*</span>
                      </label>

                      <input
                        type="text"
                        value={customerInfo.fullName}
                        onChange={(e) =>
                          handleChange("fullName", e.target.value)
                        }
                        placeholder="Enter your full name"
                        className="h-10 w-full rounded-md border border-[#DDE5E5] px-3 text-sm outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                      />
                    </div>

                    {/* Email */}

                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        Email Address <span className="text-[#FF6B6B]">*</span>
                      </label>

                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="Enter your email"
                        className="h-10 w-full rounded-md border border-[#DDE5E5] px-3 text-sm outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                      />
                    </div>

                    {/* Phone */}

                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        Phone Number <span className="text-[#FF6B6B]">*</span>
                      </label>

                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                        className="h-10 w-full rounded-md border border-[#DDE5E5] px-3 text-sm outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                      />
                    </div>

                    {/* Address */}

                    <div className="md:col-span-2">
                      <label className="mb-1.5 block text-sm font-medium">
                        Address <span className="text-[#FF6B6B]">*</span>
                      </label>

                      <input
                        type="text"
                        value={customerInfo.address}
                        onChange={(e) =>
                          handleChange("address", e.target.value)
                        }
                        placeholder="House number, Street name"
                        className="h-10 w-full rounded-md border border-[#DDE5E5] px-3 text-sm outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                      />
                    </div>

                    {/* Apartment */}

                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        Apartment, Suite, etc.
                      </label>

                      <input
                        type="text"
                        value={customerInfo.apartment}
                        onChange={(e) =>
                          handleChange("apartment", e.target.value)
                        }
                        placeholder="Apartment, suite, unit, building, etc."
                        className="h-10 w-full rounded-md border border-[#DDE5E5] px-3 text-sm outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                      />
                    </div>

                    {/* City */}

                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        City <span className="text-[#FF6B6B]">*</span>
                      </label>

                      <input
                        type="text"
                        value={customerInfo.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        placeholder="Enter your city"
                        className="h-10 w-full rounded-md border border-[#DDE5E5] px-3 text-sm outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                      />
                    </div>

                    {/* State */}

                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        State / Division{" "}
                        <span className="text-[#FF6B6B]">*</span>
                      </label>

                      <select
                        value={customerInfo.state}
                        onChange={(e) => handleChange("state", e.target.value)}
                        className="h-10 w-full rounded-md border border-[#DDE5E5] bg-white px-3 text-sm outline-none focus:border-[#0F766E]"
                      >
                        <option value="">Select your state</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chattogram">Chattogram</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Rajshahi">Rajshahi</option>
                        <option value="Barishal">Barishal</option>
                        <option value="Sylhet">Sylhet</option>
                        <option value="Rangpur">Rangpur</option>
                        <option value="Mymensingh">Mymensingh</option>
                      </select>
                    </div>

                    {/* Postal Code */}

                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        Postal Code <span className="text-[#FF6B6B]">*</span>
                      </label>

                      <input
                        type="text"
                        value={customerInfo.postalCode}
                        onChange={(e) =>
                          handleChange("postalCode", e.target.value)
                        }
                        placeholder="Enter postal code"
                        className="h-10 w-full rounded-md border border-[#DDE5E5] px-3 text-sm outline-none focus:border-[#0F766E]"
                      />
                    </div>

                    {/* Country */}

                    <div className="md:col-span-3">
                      <label className="mb-1.5 block text-sm font-medium">
                        Country
                      </label>

                      <select
                        value={customerInfo.country}
                        onChange={(e) =>
                          handleChange("country", e.target.value)
                        }
                        className="h-10 w-full rounded-md border border-[#DDE5E5] bg-white px-3 text-sm outline-none focus:border-[#0F766E]"
                      >
                        <option value="Bangladesh">Bangladesh</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* Delivery Method */}

                <section className="rounded-lg border border-[#E5EEEE] bg-white p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F6F4] text-[#0F766E]">
                      <Truck size={18} />
                    </div>

                    <div>
                      <h2 className="text-[16px] font-semibold">
                        Delivery Method
                      </h2>

                      <p className="text-sm text-[#64748B]">
                        Select your preferred delivery option
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {/* Standard */}

                    <button
                      type="button"
                      onClick={() => setDeliveryMethod("standard")}
                      className={`flex w-full items-center justify-between rounded-md border px-3 py-3 text-left transition ${
                        deliveryMethod === "standard"
                          ? "border-[#0F766E] bg-[#F4FBFA]"
                          : "border-[#DDE5E5]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                            deliveryMethod === "standard"
                              ? "border-[#0F766E]"
                              : "border-[#CBD5E1]"
                          }`}
                        >
                          {deliveryMethod === "standard" && (
                            <div className="h-2.5 w-2.5 rounded-full bg-[#0F766E]" />
                          )}
                        </div>

                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F6F4] text-[#0F766E]">
                          <Truck size={16} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold">
                            Standard Delivery
                          </p>

                          <p className="text-xs text-[#64748B]">
                            3-5 business days
                          </p>
                        </div>
                      </div>

                      <span className="text-sm font-semibold text-[#0F766E]">
                        Free
                      </span>
                    </button>

                    {/* Express */}

                    <button
                      type="button"
                      onClick={() => setDeliveryMethod("express")}
                      className={`flex w-full items-center justify-between rounded-md border px-3 py-3 text-left transition ${
                        deliveryMethod === "express"
                          ? "border-[#0F766E] bg-[#F4FBFA]"
                          : "border-[#DDE5E5]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                            deliveryMethod === "express"
                              ? "border-[#0F766E]"
                              : "border-[#CBD5E1]"
                          }`}
                        >
                          {deliveryMethod === "express" && (
                            <div className="h-2.5 w-2.5 rounded-full bg-[#0F766E]" />
                          )}
                        </div>

                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF1F1] text-[#FF6B6B]">
                          <Truck size={16} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold">
                            Express Delivery
                          </p>

                          <p className="text-xs text-[#64748B]">
                            1-2 business days
                          </p>
                        </div>
                      </div>

                      <span className="text-sm font-semibold text-[#334155]">
                        $4.99
                      </span>
                    </button>
                  </div>
                </section>

                {/* Continue */}

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleContinue}
                    className="flex items-center gap-2 rounded-md bg-[#0F766E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0B625B]"
                  >
                    Continue to Review
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ) : (
              /* ================= STEP 2 ================= */

              <section className="rounded-lg border border-[#E5EEEE] bg-white p-5">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-[#172033]">
                    Review & Payment
                  </h2>

                  <p className="mt-1 text-sm text-[#64748B]">
                    Review your order details before placing the order.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="rounded-md border border-[#E5EEEE] p-4">
                    <h3 className="mb-2 text-sm font-semibold">
                      Shipping Address
                    </h3>

                    <p className="text-sm text-[#64748B]">
                      {customerInfo.fullName}
                    </p>

                    <p className="text-sm text-[#64748B]">
                      {customerInfo.address}
                    </p>

                    <p className="text-sm text-[#64748B]">
                      {customerInfo.city}, {customerInfo.state}{" "}
                      {customerInfo.postalCode}
                    </p>

                    <p className="text-sm text-[#64748B]">
                      {customerInfo.phone}
                    </p>
                  </div>

                  <div className="rounded-md border border-[#E5EEEE] p-4">
                    <h3 className="mb-3 text-sm font-semibold">
                      Payment Method
                    </h3>

                    <div className="rounded-md border border-[#0F766E] bg-[#F4FBFA] p-4">
                      <p className="text-sm font-semibold text-[#0F766E]">
                        Cash on Delivery
                      </p>

                      <p className="mt-1 text-sm text-[#64748B]">
                        Pay when your order arrives.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-md bg-[#F4FBFA] p-4">
                    <ShieldCheck size={19} className="text-[#0F766E]" />

                    <p className="text-sm text-[#64748B]">
                      Your payment information is secure.
                    </p>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-2 rounded-md border border-[#DDE5E5] px-5 py-2.5 text-sm font-medium text-[#475569] hover:bg-[#F8FAFA]"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      disabled={isPlacingOrder}
                      className="rounded-md bg-[#FF6B6B] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#F45B5B] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isPlacingOrder ? "Placing Order..." : "Place Order"}
                    </button>
                  </div>

                  {orderError && (
                    <div className="flex items-center gap-2 rounded-md border border-red-100 bg-red-50 px-3 py-2.5">
                      <p className="text-sm text-red-500">{orderError}</p>

                      <Link
                        href="/auth/login"
                        className="text-sm font-semibold text-[#0F766E] transition hover:text-[#0B625B] hover:underline"
                      >
                        Login Here
                      </Link>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* ================= ORDER SUMMARY ================= */}

          <aside className="h-fit rounded-lg border border-[#E5EEEE] bg-white p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[16px] font-semibold">Order Summary</h2>

              <span className="text-sm text-[#64748B]">1 Item</span>
            </div>

            {/* Temporary product */}

            <div className="flex gap-3 border-b border-[#E5EEEE] pb-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md border border-[#E5EEEE] bg-[#F8FAFA]">
                <span className="text-xs text-[#94A3B8]">Image</span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#172033]">
                  Selected Product
                </p>

                <p className="mt-1 text-xs text-[#64748B]">Quantity: 1</p>
              </div>

              <span className="text-sm font-semibold">$80.00</span>
            </div>

            <div className="space-y-3 pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Subtotal</span>

                <span className="font-medium">$80.00</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#64748B]">Shipping</span>

                <span className="font-medium text-[#0F766E]">Free</span>
              </div>

              <div className="border-t border-[#E5EEEE] pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>

                  <span className="text-lg font-semibold text-[#0F766E]">
                    $80.00
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-2 rounded-md bg-[#F4FBFA] p-3">
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-[#0F766E]"
              />

              <p className="text-xs leading-5 text-[#64748B]">
                Secure checkout. Your information is protected.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}