"use client";

import React, { Suspense } from "react";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { verifyStripePayment } from "@/lib/stripe";


const PaymentSuccessContent = () => {
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = React.useState(true);
  const [verified, setVerified] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setError("Payment session is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await verifyStripePayment(
          sessionId
        );

        if (response.success) {
          setVerified(true);
        } else {
          setError(
            response.message ||
              "Unable to verify your payment."
          );
        }
      } catch (error) {
        console.error(
          "PAYMENT VERIFICATION ERROR:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Unable to verify your payment."
        );
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  /* =====================================================
     LOADING
  ====================================================== */

  if (loading) {
    return (
      <main className="flex min-h-[calc(100vh-160px)] items-center justify-center bg-[#F8FAFA] px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-[#E5EEEE] bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F5F3]">
            <Loader2
              size={30}
              className="animate-spin text-[#0F766E]"
            />
          </div>

          <h1 className="mt-5 font-['Poppins'] text-2xl font-bold text-[#172033]">
            Verifying Payment
          </h1>

          <p className="mt-2 font-['Poppins'] text-[16px] leading-6 text-[#64748B]">
            Please wait while we verify your Stripe payment.
          </p>

        </div>
      </main>
    );
  }

  /* =====================================================
     PAYMENT FAILED
  ====================================================== */

  if (!verified) {
    return (
      <main className="flex min-h-[calc(100vh-160px)] items-center justify-center bg-[#F8FAFA] px-4 py-12">

        <div className="w-full max-w-md rounded-2xl border border-[#E5EEEE] bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF1F1]">
            <XCircle
              size={32}
              className="text-[#FF6B6B]"
            />
          </div>

          <h1 className="mt-5 font-['Poppins'] text-2xl font-bold text-[#172033]">
            Payment Verification Failed
          </h1>

          <p className="mt-2 font-['Poppins'] text-[16px] leading-6 text-[#64748B]">
            {error || "Unable to verify your payment."}
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#0F766E] px-6 py-3 font-['Poppins'] text-[15px] font-semibold text-white transition hover:bg-[#0B625B]"
          >
            Back to Home
          </Link>

        </div>

      </main>
    );
  }

  /* =====================================================
     PAYMENT SUCCESS
  ====================================================== */

  return (
    <main className="flex min-h-[calc(100vh-160px)] items-center justify-center bg-[#F8FAFA] px-4 py-12">

      <div className="w-full max-w-md rounded-2xl border border-[#E5EEEE] bg-white p-8 text-center shadow-sm">

        {/* Success Icon */}

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E8F5F3]">

          <CheckCircle2
            size={42}
            strokeWidth={1.8}
            className="text-[#0F766E]"
          />

        </div>

        {/* Title */}

        <h1 className="mt-6 font-['Poppins'] text-3xl font-bold text-[#172033]">
          Payment Successful!
        </h1>

        {/* Description */}

        <p className="mt-3 font-['Poppins'] text-[16px] leading-7 text-[#64748B]">
          Your payment has been successfully verified.
          Your order has been placed successfully.
        </p>

        {/* Session ID */}

        {sessionId && (
          <div className="mt-5 rounded-lg bg-[#F8FAFA] px-4 py-3 text-left">

            <p className="font-['Poppins'] text-[14px] font-medium text-[#64748B]">
              Payment Reference
            </p>

            <p className="mt-1 break-all font-['Poppins'] text-[14px] text-[#172033]">
              {sessionId}
            </p>

          </div>
        )}

        {/* Buttons */}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">

          <Link
            href="/dashboard/customer/my-order"
            className="flex-1 rounded-lg bg-[#0F766E] px-5 py-3 font-['Poppins'] text-[15px] font-semibold text-white transition hover:bg-[#0B625B]"
          >
            View My Orders
          </Link>

          <Link
            href="/shop"
            className="flex-1 rounded-lg border border-[#DDE5E5] bg-white px-5 py-3 font-['Poppins'] text-[15px] font-semibold text-[#0F766E] transition hover:bg-[#F0F9F7]"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </main>
  );
};

/* =========================================================
   PAGE
========================================================= */

const SuccessPage = () => {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[calc(100vh-160px)] items-center justify-center bg-[#F8FAFA] px-4 py-12">

          <div className="text-center">

            <Loader2
              size={32}
              className="mx-auto animate-spin text-[#0F766E]"
            />

            <p className="mt-3 font-['Poppins'] text-[16px] text-[#64748B]">
              Loading payment information...
            </p>

          </div>

        </main>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default SuccessPage;