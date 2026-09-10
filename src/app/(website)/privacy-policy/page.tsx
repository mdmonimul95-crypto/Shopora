"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  UserRound,
  Database,
  LockKeyhole,
  CircleUserRound,
  Cookie,
  Globe,
  Baby,
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
    id: "information-we-collect",
    title: "Information We Collect",
    icon: Database,
  },
  {
    id: "how-we-use",
    title: "How We Use Information",
    icon: UserRound,
  },
  {
    id: "sharing",
    title: "Sharing of Information",
    icon: Globe,
  },
  {
    id: "data-security",
    title: "Data Security",
    icon: LockKeyhole,
  },
  {
    id: "your-rights",
    title: "Your Rights",
    icon: CircleUserRound,
  },
  {
    id: "cookies",
    title: "Cookies",
    icon: Cookie,
  },
  {
    id: "third-party",
    title: "Third-Party Services",
    icon: Globe,
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    icon: Baby,
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    icon: RefreshCw,
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: Mail,
  },
];

const PrivacyPolicy = () => {
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
            Privacy & Security
          </p>

          <h1 className="mt-1 font-['Poppins'] text-2xl font-bold text-[#1E293B] sm:text-3xl">
            Privacy Policy
          </h1>

          <p className="mt-2 max-w-2xl font-['Poppins'] text-[15px] leading-6 text-[#64748B]">
            Learn how Shopora collects, uses, protects, and manages your
            information when you use our platform.
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
              PRIVACY CONTENT
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
                Welcome to Shopora. We value your privacy and are committed
                to protecting your personal information. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you use our website or services.
              </p>
            </section>

            {/* =================================================
                2. INFORMATION WE COLLECT
            ================================================== */}

            <section
              id="information-we-collect"
              className="scroll-mt-57.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                2. Information We Collect
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                We may collect the following types of information:
              </p>

              <ul className="mt-2 list-disc space-y-1.5 pl-5 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                <li>
                  Personal information such as name, email address, phone
                  number, and shipping address.
                </li>

                <li>
                  Account information including username and profile details.
                </li>

                <li>
                  Order and transaction information.
                </li>

                <li>
                  Device and usage information such as IP address, browser
                  type, and pages visited.
                </li>

                <li>
                  Cookies and similar technologies.
                </li>
              </ul>
            </section>

            {/* =================================================
                3. HOW WE USE
            ================================================== */}

            <section
              id="how-we-use"
              className="scroll-mt-57.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                3. How We Use Information
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                We use the information we collect to:
              </p>

              <ul className="mt-2 list-disc space-y-1.5 pl-5 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                <li>
                  Process and deliver your orders.
                </li>

                <li>
                  Provide customer support.
                </li>

                <li>
                  Improve our products and services.
                </li>

                <li>
                  Send order updates, promotional offers, and important
                  notifications.
                </li>

                <li>
                  Ensure account security and help prevent fraud.
                </li>
              </ul>
            </section>

            {/* =================================================
                4. SHARING
            ================================================== */}

            <section
              id="sharing"
              className="scroll-mt-57.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                4. Sharing of Information
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                We do not sell your personal information. We may share your
                information with trusted third parties only when necessary,
                such as:
              </p>

              <ul className="mt-2 list-disc space-y-1.5 pl-5 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                <li>
                  Payment gateways and payment processors.
                </li>

                <li>
                  Shipping and delivery partners.
                </li>

                <li>
                  Analytics and marketing tools.
                </li>

                <li>
                  Legal authorities when required by law.
                </li>
              </ul>

              {/* Trust Box */}

              <div className="mt-6 flex gap-3 rounded-lg border border-[#D8EEEA] bg-[#F0F9F7] p-4">
                <ShieldCheck
                  size={22}
                  className="mt-0.5 shrink-0 text-[#0F766E]"
                />

                <div>
                  <p className="font-['Poppins'] text-[15px] font-semibold text-[#0F766E]">
                    Your Trust Is Important
                  </p>

                  <p className="mt-1 font-['Poppins'] text-[14px] leading-6 text-[#64748B]">
                    We are committed to keeping your information safe and
                    secure.
                  </p>
                </div>
              </div>
            </section>

            {/* =================================================
                5. DATA SECURITY
            ================================================== */}

            <section
              id="data-security"
              className="scroll-mt-57.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                5. Data Security
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                We use reasonable technical and organizational measures to
                protect your personal information against unauthorized
                access, alteration, disclosure, or destruction.
              </p>
            </section>

            {/* =================================================
                6. YOUR RIGHTS
            ================================================== */}

            <section
              id="your-rights"
              className="scroll-mt-57.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                6. Your Rights
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                Depending on applicable laws, you may have the right to
                access, update, correct, or request deletion of your personal
                information.
              </p>
            </section>

            {/* =================================================
                7. COOKIES
            ================================================== */}

            <section
              id="cookies"
              className="scroll-mt-57.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                7. Cookies
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                Shopora may use cookies and similar technologies to remember
                preferences, maintain sessions, understand website usage,
                and improve your shopping experience.
              </p>
            </section>

            {/* =================================================
                8. THIRD PARTY
            ================================================== */}

            <section
              id="third-party"
              className="scroll-mt-57.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                8. Third-Party Services
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                Shopora may use trusted third-party services for payments,
                analytics, authentication, hosting, shipping, and other
                platform functionality. These services may process
                information according to their own privacy policies.
              </p>
            </section>

            {/* =================================================
                9. CHILDREN'S PRIVACY
            ================================================== */}

            <section
              id="childrens-privacy"
              className="scroll-mt-57.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                9. Children s Privacy
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                Shopora is not intended for children who are not permitted
                to use online services under applicable law. We do not
                knowingly collect personal information from children without
                appropriate authorization.
              </p>
            </section>

            {/* =================================================
                10. CHANGES
            ================================================== */}

            <section
              id="changes"
              className="scroll-mt-57.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                10. Changes to This Policy
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                We may update this Privacy Policy from time to time. Any
                changes will be reflected on this page with an updated
                revision date.
              </p>
            </section>

            {/* =================================================
                11. CONTACT
            ================================================== */}

            <section
              id="contact"
              className="scroll-mt-57.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                11. Contact Us
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                If you have questions about this Privacy Policy or how we
                handle your information, please contact the Shopora support
                team.
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

export default PrivacyPolicy;