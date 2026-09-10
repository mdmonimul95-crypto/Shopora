import React from "react";
import Link from "next/link";
import {
  RefreshCcw,
  Package,
  CheckCircle2,
  XCircle,
  Clock3,
  CreditCard,
  Mail,
  HelpCircle,
} from "lucide-react";

const ReturnsRefunds = () => {
  return (
    <main className="min-h-screen bg-[#F8FAFA] px-4 py-8 sm:px-6 md:py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F5F3]">
            <RefreshCcw
              size={26}
              className="text-[#0F766E]"
            />
          </div>

          <h1 className="mt-4 font-['Poppins'] text-2xl font-bold text-[#1E293B] sm:text-3xl">
            Returns & Refunds
          </h1>

          <p className="mx-auto mt-2 max-w-2xl font-['Poppins'] text-[15px] leading-6 text-[#64748B]">
            Learn about Shopora s return, replacement, and refund
            process.
          </p>

          <p className="mt-2 font-['Poppins'] text-[14px] text-[#94A3B8]">
            Last updated: August 30, 2024
          </p>
        </div>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div className="rounded-xl border border-[#E5EEEE] bg-white p-5 shadow-sm sm:p-8">

          {/* =================================================
              1. OVERVIEW
          ================================================== */}

          <section>
            <h2 className="flex items-center gap-2 font-['Poppins'] text-lg font-bold text-[#1E293B]">
              <RefreshCcw
                size={20}
                className="text-[#0F766E]"
              />
              1. Return Policy Overview
            </h2>

            <p className="mt-3 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
              Shopora aims to provide a smooth and reliable shopping
              experience. If you receive a damaged, defective, incorrect,
              or otherwise eligible product, you may be able to request
              a return or refund according to the applicable seller and
              product policy.
            </p>
          </section>

          {/* =================================================
              2. ELIGIBILITY
          ================================================== */}

          <section className="mt-8">
            <h2 className="flex items-center gap-2 font-['Poppins'] text-lg font-bold text-[#1E293B]">
              <CheckCircle2
                size={20}
                className="text-[#0F766E]"
              />
              2. Return Eligibility
            </h2>

            <p className="mt-3 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
              A product may be eligible for return when it meets the
              applicable return conditions.
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-5 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
              <li>
                The product is damaged or defective when received.
              </li>

              <li>
                The wrong product was delivered.
              </li>

              <li>
                The product does not match the applicable product
                description.
              </li>

              <li>
                The return request is submitted within the applicable
                return period.
              </li>

              <li>
                The product is returned in an acceptable condition.
              </li>
            </ul>
          </section>

          {/* =================================================
              3. NON RETURNABLE
          ================================================== */}

          <section className="mt-8">
            <h2 className="flex items-center gap-2 font-['Poppins'] text-lg font-bold text-[#1E293B]">
              <XCircle
                size={20}
                className="text-[#FF6B6B]"
              />
              3. Non-Returnable Items
            </h2>

            <p className="mt-3 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
              Certain products may not be eligible for return because
              of their nature, condition, or seller-specific policies.
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-5 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
              <li>
                Products marked as non-returnable.
              </li>

              <li>
                Products damaged through customer misuse.
              </li>

              <li>
                Products that have been modified or altered after
                delivery.
              </li>

              <li>
                Products returned without required accessories,
                packaging, or components where applicable.
              </li>
            </ul>
          </section>

          {/* =================================================
              4. RETURN PROCESS
          ================================================== */}

          <section className="mt-8">
            <h2 className="flex items-center gap-2 font-['Poppins'] text-lg font-bold text-[#1E293B]">
              <Package
                size={20}
                className="text-[#0F766E]"
              />
              4. How to Request a Return
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">

              <div className="rounded-lg border border-[#E5EEEE] bg-[#F8FAFA] p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F5F3]">
                  <span className="font-['Poppins'] text-[15px] font-bold text-[#0F766E]">
                    1
                  </span>
                </div>

                <h3 className="mt-3 font-['Poppins'] text-[15px] font-semibold text-[#1E293B]">
                  Contact Us
                </h3>

                <p className="mt-1 font-['Poppins'] text-[14px] leading-6 text-[#64748B]">
                  Contact Shopora support and provide your order
                  information.
                </p>
              </div>

              <div className="rounded-lg border border-[#E5EEEE] bg-[#F8FAFA] p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F5F3]">
                  <span className="font-['Poppins'] text-[15px] font-bold text-[#0F766E]">
                    2
                  </span>
                </div>

                <h3 className="mt-3 font-['Poppins'] text-[15px] font-semibold text-[#1E293B]">
                  Request Review
                </h3>

                <p className="mt-1 font-['Poppins'] text-[14px] leading-6 text-[#64748B]">
                  Our team or the applicable seller will review your
                  return request.
                </p>
              </div>

              <div className="rounded-lg border border-[#E5EEEE] bg-[#F8FAFA] p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F5F3]">
                  <span className="font-['Poppins'] text-[15px] font-bold text-[#0F766E]">
                    3
                  </span>
                </div>

                <h3 className="mt-3 font-['Poppins'] text-[15px] font-semibold text-[#1E293B]">
                  Return Product
                </h3>

                <p className="mt-1 font-['Poppins'] text-[14px] leading-6 text-[#64748B]">
                  If approved, follow the provided instructions to
                  return the product.
                </p>
              </div>

            </div>
          </section>

          {/* =================================================
              5. REFUND PROCESS
          ================================================== */}

          <section className="mt-8">
            <h2 className="flex items-center gap-2 font-['Poppins'] text-lg font-bold text-[#1E293B]">
              <CreditCard
                size={20}
                className="text-[#0F766E]"
              />
              5. Refund Process
            </h2>

            <p className="mt-3 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
              Once an approved return has been received and reviewed,
              the applicable refund will be processed according to
              the payment method and seller refund policy.
            </p>

            <div className="mt-4 rounded-lg border border-[#D8EEEA] bg-[#F0F9F7] p-4">
              <div className="flex gap-3">
                <Clock3
                  size={20}
                  className="mt-0.5 shrink-0 text-[#0F766E]"
                />

                <div>
                  <p className="font-['Poppins'] text-[15px] font-semibold text-[#0F766E]">
                    Refund Timing
                  </p>

                  <p className="mt-1 font-['Poppins'] text-[14px] leading-6 text-[#64748B]">
                    The time required for a refund to appear in your
                    account may vary depending on the payment provider
                    or financial institution.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              6. SHIPPING COST
          ================================================== */}

          <section className="mt-8">
            <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
              6. Return Shipping
            </h2>

            <p className="mt-3 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
              Return shipping responsibility may depend on the reason
              for the return and the applicable seller policy. Customers
              should follow the return instructions provided after their
              request has been approved.
            </p>
          </section>

          {/* =================================================
              7. SELLER POLICY
          ================================================== */}

          <section className="mt-8">
            <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
              7. Seller-Specific Policies
            </h2>

            <p className="mt-3 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
              Because Shopora is a multi-vendor marketplace, return and
              refund conditions may vary between sellers and products.
              Customers should review the return information provided
              for the specific product before purchasing.
            </p>
          </section>

          {/* =================================================
              8. CONTACT
          ================================================== */}

          <section className="mt-8">
            <h2 className="flex items-center gap-2 font-['Poppins'] text-lg font-bold text-[#1E293B]">
              <HelpCircle
                size={20}
                className="text-[#0F766E]"
              />
              8. Need Help?
            </h2>

            <p className="mt-3 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
              If you have questions about a return or refund, please
              contact the Shopora support team with your order details.
            </p>

            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#0F766E] px-5 py-3 font-['Poppins'] text-[15px] font-semibold text-white transition hover:bg-[#0B625B]"
            >
              <Mail size={17} />
              Contact Shopora
            </Link>
          </section>

          {/* =================================================
              TRUST MESSAGE
          ================================================== */}

          <div className="mt-8 flex gap-3 rounded-lg border border-[#D8EEEA] bg-[#F0F9F7] p-4">
            <ShieldCheckIcon />

            <div>
              <p className="font-['Poppins'] text-[15px] font-semibold text-[#0F766E]">
                Your Satisfaction Matters
              </p>

              <p className="mt-1 font-['Poppins'] text-[14px] leading-6 text-[#64748B]">
                We aim to make the return and refund process as clear
                and convenient as possible.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

const ShieldCheckIcon = () => {
  return (
    <div className="mt-0.5 shrink-0">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
        <CheckCircle2
          size={21}
          className="text-[#0F766E]"
        />
      </div>
    </div>
  );
};

export default ReturnsRefunds;