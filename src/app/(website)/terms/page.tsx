"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  ShoppingBag,
  UserRound,
  Package,
  CreditCard,
  Truck,
  RefreshCcw,
  Scale,
  Ban,
  Shield,
  RefreshCw,
  Mail,
} from "lucide-react";

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    icon: ShieldCheck,
  },
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    icon: FileText,
  },
  {
    id: "use-of-platform",
    title: "Use of Our Platform",
    icon: ShoppingBag,
  },
  {
    id: "user-accounts",
    title: "User Accounts",
    icon: UserRound,
  },
  {
    id: "products-orders",
    title: "Products & Orders",
    icon: Package,
  },
  {
    id: "payments",
    title: "Payments",
    icon: CreditCard,
  },
  {
    id: "shipping",
    title: "Shipping & Delivery",
    icon: Truck,
  },
  {
    id: "returns",
    title: "Returns & Refunds",
    icon: RefreshCcw,
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    icon: Scale,
  },
  {
    id: "prohibited",
    title: "Prohibited Activities",
    icon: Ban,
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: Shield,
  },
  {
    id: "changes",
    title: "Changes to Terms",
    icon: RefreshCw,
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: Mail,
  },
];

const Terms = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const handleSectionClick = (id: string) => {
    setActiveSection(id);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFA] px-4 py-8 sm:px-6 md:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

        <div className="mb-6">
          <p className="font-['Poppins'] text-[14px] font-medium text-[#0F766E]">
            Legal Information
          </p>

          <h1 className="mt-1 font-['Poppins'] text-2xl font-bold text-[#1E293B] sm:text-3xl">
            Terms & Conditions
          </h1>

          <p className="mt-2 max-w-2xl font-['Poppins'] text-[15px] leading-6 text-[#64748B]">
            Please read these Terms & Conditions carefully before using
            Shopora and placing an order through our platform.
          </p>
        </div>

        {/* =====================================================
            MAIN LAYOUT
        ====================================================== */}

        <div className="grid items-start gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">

          {/* =================================================
              DESKTOP SIDEBAR
          ================================================== */}

          <aside
            className="
              hidden
              h-fit
              self-start
              rounded-lg
              border
              border-[#E5EEEE]
              bg-white
              p-3
              shadow-sm
              lg:sticky
              lg:top-52.5
              lg:z-10
              lg:block
            "
          >
            <p className="mb-3 px-2 font-['Poppins'] text-[14px] font-semibold text-[#1E293B]">
              On This Page
            </p>

            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => handleSectionClick(section.id)}
                    className={`
                      flex
                      w-full
                      items-center
                      gap-2
                      rounded-md
                      px-2
                      py-2
                      text-left
                      font-['Poppins']
                      text-[14px]
                      transition
                      ${
                        isActive
                          ? "border-l-2 border-[#0F766E] bg-[#E8F5F3] font-medium text-[#0F766E]"
                          : "border-l-2 border-transparent text-[#64748B] hover:bg-[#F8FAFA] hover:text-[#0F766E]"
                      }
                    `}
                  >
                    <Icon size={15} />

                    <span>{section.title}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* =================================================
              MOBILE NAVIGATION
          ================================================== */}

          <div className="rounded-lg border border-[#E5EEEE] bg-white p-4 shadow-sm lg:hidden">
            <p className="mb-3 font-['Poppins'] text-[14px] font-semibold text-[#1E293B]">
              On This Page
            </p>

            <div className="flex flex-wrap gap-2">
              {sections.map((section) => {
                const isActive = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => handleSectionClick(section.id)}
                    className={`
                      rounded-md
                      border
                      px-3
                      py-2
                      font-['Poppins']
                      text-[14px]
                      transition
                      ${
                        isActive
                          ? "border-[#0F766E] bg-[#E8F5F3] text-[#0F766E]"
                          : "border-[#E5EEEE] bg-white text-[#64748B] hover:border-[#0F766E] hover:text-[#0F766E]"
                      }
                    `}
                  >
                    {section.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* =================================================
              TERMS CONTENT
          ================================================== */}

          <article
            className="
              min-w-0
              rounded-lg
              border
              border-[#E5EEEE]
              bg-white
              px-5
              py-6
              shadow-sm
              sm:px-8
              sm:py-8
            "
          >

            {/* Last Updated */}

            <p className="font-['Poppins'] text-[14px] font-medium text-[#64748B]">
              Last updated: August 30, 2024
            </p>

            {/* =================================================
                1. INTRODUCTION
            ================================================== */}

            <section
              id="introduction"
              className="scroll-mt-57.5 pt-5"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                1. Introduction
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                Welcome to Shopora. By accessing or using our website,
                mobile application, or services, you agree to be bound by
                these Terms & Conditions. If you do not agree with any part
                of these terms, please do not use our platform.
              </p>
            </section>

            {/* =================================================
                2. ACCEPTANCE
            ================================================== */}

            <section
              id="acceptance"
              className="scroll-mt-57.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                2. Acceptance of Terms
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                By creating an account, placing an order, or using any part
                of Shopora, you confirm that you have read, understood, and
                agree to these Terms & Conditions.
              </p>
            </section>

            {/* =================================================
                3. USE OF PLATFORM
            ================================================== */}

            <section
              id="use-of-platform"
              className="scroll-mt-57.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                3. Use of Our Platform
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                Shopora provides an online marketplace that connects buyers
                and sellers. You agree to use our platform only for lawful
                purposes and in accordance with these terms.
              </p>

              <ul className="mt-2 list-disc space-y-1.5 pl-5 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                <li>
                  You must provide accurate and complete information.
                </li>

                <li>
                  You must not use the platform for fraudulent activities.
                </li>

                <li>
                  You must not attempt to interfere with or disrupt our
                  services.
                </li>
              </ul>
            </section>

            {/* =================================================
                4. USER ACCOUNTS
            ================================================== */}

            <section
              id="user-accounts"
              className="scroll-mt-57.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                4. User Accounts
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                When you create an account on Shopora, you are responsible
                for maintaining the security of your account credentials.
              </p>

              <ul className="mt-2 list-disc space-y-1.5 pl-5 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                <li>
                  You must provide accurate account information.
                </li>

                <li>
                  You are responsible for keeping your password secure.
                </li>

                <li>
                  You must not share your account credentials with others.
                </li>

                <li>
                  You are responsible for activities performed through your
                  account.
                </li>
              </ul>
            </section>

            {/* =================================================
                5. PRODUCTS & ORDERS
            ================================================== */}

            <section
              id="products-orders"
              className="scroll-mt-57.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                5. Products & Orders
              </h2>

              <ul className="mt-2 list-disc space-y-1.5 pl-5 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                <li>
                  All products are listed by sellers and are subject to
                  availability.
                </li>

                <li>
                  Product prices and availability may change without prior
                  notice.
                </li>

                <li>
                  Shopora reserves the right to cancel or refuse an order
                  for any reason, including suspected fraud or pricing
                  errors.
                </li>

                <li>
                  Product information is provided by the respective seller.
                </li>
              </ul>
            </section>

            {/* =================================================
                6. PAYMENTS
            ================================================== */}

            <section
              id="payments"
              className="scroll-mt-57.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                6. Payments
              </h2>

              <ul className="mt-2 list-disc space-y-1.5 pl-5 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                <li>
                  We support secure payment methods through trusted payment
                  providers.
                </li>

                <li>
                  All payments must be completed at the time of purchase
                  unless otherwise specified.
                </li>

                <li>
                  Prices are listed in the currency shown on the platform.
                </li>
              </ul>
            </section>

            {/* =================================================
                7. SHIPPING
            ================================================== */}

            <section
              id="shipping"
              className="scroll-mt-57.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                7. Shipping & Delivery
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                Shipping times may vary depending on the seller, product,
                destination, and selected delivery method. Shopora is not
                responsible for delays caused by shipping partners,
                incorrect addresses, or circumstances outside our control.
              </p>
            </section>

            {/* =================================================
                8. RETURNS
            ================================================== */}

            <section
              id="returns"
              className="scroll-mt-57.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                8. Returns & Refunds
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                Return and refund eligibility may vary depending on the
                product and seller. Customers should review the applicable
                return policy before completing a purchase.
              </p>
            </section>

            {/* =================================================
                9. INTELLECTUAL PROPERTY
            ================================================== */}

            <section
              id="intellectual-property"
              className="scroll-mt-57.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                9. Intellectual Property
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                All Shopora branding, logos, designs, text, graphics, and
                platform content are protected by applicable intellectual
                property laws. You may not reproduce, distribute, modify,
                or use Shopora content without permission.
              </p>
            </section>

            {/* =================================================
                10. PROHIBITED ACTIVITIES
            ================================================== */}

            <section
              id="prohibited"
              className="scroll-mt-57.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                10. Prohibited Activities
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                Users must not use Shopora to engage in activities that
                violate applicable laws or these Terms & Conditions.
              </p>

              <ul className="mt-2 list-disc space-y-1.5 pl-5 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                <li>
                  Fraudulent transactions or payment activities.
                </li>

                <li>
                  Uploading illegal or harmful content.
                </li>

                <li>
                  Attempting to gain unauthorized access to the platform.
                </li>

                <li>
                  Abusing other users, sellers, or Shopora services.
                </li>
              </ul>
            </section>

            {/* =================================================
                11. LIABILITY
            ================================================== */}

            <section
              id="liability"
              className="scroll-mt-57.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                11. Limitation of Liability
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                Shopora will make reasonable efforts to keep the platform
                available and secure. However, we cannot guarantee that the
                service will always be uninterrupted, error-free, or free
                from circumstances beyond our reasonable control.
              </p>
            </section>

            {/* =================================================
                12. CHANGES
            ================================================== */}

            <section
              id="changes"
              className="scroll-mt-57.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                12. Changes to Terms
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                Shopora may update these Terms & Conditions from time to
                time. Any changes will be posted on this page along with an
                updated revision date. Continued use of the platform after
                changes are published means that you accept the updated
                terms.
              </p>
            </section>

            {/* =================================================
                TRUST BOX
            ================================================== */}

            <div className="mt-8 flex gap-3 rounded-lg border border-[#D8EEEA] bg-[#F0F9F7] p-4">
              <ShieldCheck
                size={22}
                className="mt-0.5 shrink-0 text-[#0F766E]"
              />

              <div>
                <p className="font-['Poppins'] text-[15px] font-semibold text-[#0F766E]">
                  Your Trust Matters
                </p>

                <p className="mt-1 font-['Poppins'] text-[14px] leading-6 text-[#64748B]">
                  We are committed to providing a safe, transparent, and
                  reliable shopping experience for everyone.
                </p>
              </div>
            </div>

            {/* =================================================
                13. CONTACT
            ================================================== */}

            <section
              id="contact"
              className="scroll-mt-57.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                13. Contact Us
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                If you have questions about these Terms & Conditions, please
                contact the Shopora support team.
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#0F766E] px-5 py-3 font-['Poppins'] text-[15px] font-semibold text-white transition hover:bg-[#0B625B]"
              >
                <Mail size={17} />
                Contact Shopora
              </Link>
            </section>

          </article>
        </div>
      </div>
    </main>
  );
};

export default Terms;