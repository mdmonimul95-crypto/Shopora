"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { apiGet } from "@/lib/core/server";

type VerifyResponse = {
  success: boolean;
  message: string;
  data?: {
    paymentStatus: string;
    sessionId: string;
  };
};

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setError("Payment session is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await apiGet<VerifyResponse>(
          `/api/v1/stripe/verify-session?session_id=${encodeURIComponent(
            sessionId
          )}`
        );

        if (
          response.success &&
          response.data?.paymentStatus === "paid"
        ) {
          setVerified(true);
        } else {
          setError("Payment could not be verified.");
        }
      } catch (error) {
        console.error("VERIFY STRIPE PAYMENT ERROR:", error);

        setError("Unable to verify your payment.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAFA] px-4 font-['Poppins']">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-[#0F766E]" />

          <h1 className="text-xl font-semibold text-[#1E293B]">
            Verifying your payment...
          </h1>

          <p className="mt-2 text-sm text-[#64748B]">
            Please wait a moment.
          </p>
        </div>
      </main>
    );
  }

  if (error || !verified) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAFA] px-4 font-['Poppins']">
        <div className="w-full max-w-md rounded-2xl border border-[#E5EEEE] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <span className="text-2xl text-red-500">!</span>
          </div>

          <h1 className="text-2xl font-semibold text-[#1E293B]">
            Payment Verification Failed
          </h1>

          <p className="mt-3 text-sm text-[#64748B]">
            {error || "We could not verify your payment."}
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-lg bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0B625B]"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFA] px-4 font-['Poppins']">
      <div className="w-full max-w-md rounded-2xl border border-[#E5EEEE] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>

        <h1 className="text-2xl font-semibold text-[#1E293B]">
          Payment Successful!
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#64748B]">
          Your payment has been successfully processed.
          Your order is being confirmed.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/dashboard/customer/my-order"
            className="rounded-lg bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0B625B]"
          >
            View My Orders
          </Link>

          <Link
            href="/shop"
            className="rounded-lg border border-[#DDE5E5] px-5 py-3 text-sm font-semibold text-[#1E293B] transition hover:bg-[#F8FAFA]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}