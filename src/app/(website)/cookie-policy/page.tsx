"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Cookie,
  ShieldCheck,
  Settings2,
  BarChart3,
  Megaphone,
  RefreshCw,
  Mail,
  CircleHelp,
} from "lucide-react";

const sections = [
  {
    id: "what-are-cookies",
    title: "What Are Cookies?",
    icon: Cookie,
  },
  {
    id: "how-we-use",
    title: "How We Use Cookies",
    icon: Settings2,
  },
  {
    id: "types",
    title: "Types of Cookies We Use",
    icon: BarChart3,
  },
  {
    id: "your-choices",
    title: "Your Cookie Choices",
    icon: ShieldCheck,
  },
  {
    id: "third-party",
    title: "Third-Party Cookies",
    icon: Megaphone,
  },
  {
    id: "updates",
    title: "Updates to This Policy",
    icon: RefreshCw,
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: Mail,
  },
];

const CookiePolicy = () => {
  const [activeSection, setActiveSection] =
    useState("what-are-cookies");

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
            MAIN LAYOUT
        ====================================================== */}

        <div className="grid items-start gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">

          {/* =================================================
              SIDEBAR
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
              lg:top-27.5
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
                const isActive =
                  activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() =>
                      handleSectionClick(section.id)
                    }
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

            {/* Need Help */}

            <div className="mt-5 rounded-lg bg-[#F0F9F7] p-3">
              <div className="flex items-center gap-2">
                <CircleHelp
                  size={18}
                  className="text-[#0F766E]"
                />

                <p className="font-['Poppins'] text-[14px] font-semibold text-[#0F766E]">
                  Need Help?
                </p>
              </div>

              <p className="mt-2 font-['Poppins'] text-[14px] leading-5 text-[#64748B]">
                If you have any questions about our Cookie Policy,
                feel free to contact us.
              </p>

              <Link
                href="/contact"
                className="
                  mt-3
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-md
                  border
                  border-[#0F766E]
                  bg-white
                  px-3
                  py-2
                  font-['Poppins']
                  text-[14px]
                  font-medium
                  text-[#0F766E]
                  transition
                  hover:bg-[#E8F5F3]
                "
              >
                <Mail size={14} />
                Contact Us
              </Link>
            </div>
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
                const isActive =
                  activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() =>
                      handleSectionClick(section.id)
                    }
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
              CONTENT
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
                1. WHAT ARE COOKIES?
            ================================================== */}

            <section
              id="what-are-cookies"
              className="scroll-mt-32.5 pt-5"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                1. What Are Cookies?
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                Cookies are small text files placed on your device
                when you visit a website. They help the website
                remember your actions and preferences over a period
                of time, so you can have a better and more
                personalized experience when you return to the site.
              </p>
            </section>

            {/* =================================================
                2. HOW WE USE COOKIES
            ================================================== */}

            <section
              id="how-we-use"
              className="scroll-mt-32.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                2. How We Use Cookies
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                At Shopora, we use cookies to:
              </p>

              <ul className="mt-2 list-disc space-y-1.5 pl-5 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                <li>
                  Make our website work properly.
                </li>

                <li>
                  Remember your preferences and settings.
                </li>

                <li>
                  Provide a personalized shopping experience.
                </li>

                <li>
                  Analyze how visitors use our website.
                </li>

                <li>
                  Help prevent fraud and improve security.
                </li>

                <li>
                  Show relevant products, offers, and advertisements.
                </li>

                <li>
                  Improve our services and platform performance.
                </li>
              </ul>
            </section>

            {/* =================================================
                3. TYPES OF COOKIES
            ================================================== */}

            <section
              id="types"
              className="scroll-mt-32.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                3. Types of Cookies We Use
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                We use the following types of cookies on our
                platform:
              </p>

              {/* Cookie Table */}

              <div className="mt-4 overflow-x-auto rounded-lg border border-[#E5EEEE]">
                <table className="w-full min-w-150 border-collapse font-['Poppins'] text-[14px]">
                  <thead>
                    <tr className="bg-[#F8FAFA]">
                      <th className="border-b border-[#E5EEEE] px-4 py-3 text-left font-semibold text-[#1E293B]">
                        Type of Cookie
                      </th>

                      <th className="border-b border-[#E5EEEE] px-4 py-3 text-left font-semibold text-[#1E293B]">
                        Examples
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="border-b border-[#E5EEEE] px-4 py-3 font-medium text-[#1E293B]">
                        Essential Cookies
                      </td>

                      <td className="border-b border-[#E5EEEE] px-4 py-3 text-[#64748B]">
                        Required for the website to function properly.
                      </td>
                    </tr>

                    <tr>
                      <td className="border-b border-[#E5EEEE] px-4 py-3 font-medium text-[#1E293B]">
                        Performance Cookies
                      </td>

                      <td className="border-b border-[#E5EEEE] px-4 py-3 text-[#64748B]">
                        Help us understand how visitors use our website.
                      </td>
                    </tr>

                    <tr>
                      <td className="border-b border-[#E5EEEE] px-4 py-3 font-medium text-[#1E293B]">
                        Functional Cookies
                      </td>

                      <td className="border-b border-[#E5EEEE] px-4 py-3 text-[#64748B]">
                        Remember your preferences and settings.
                      </td>
                    </tr>

                    <tr>
                      <td className="px-4 py-3 font-medium text-[#1E293B]">
                        Marketing Cookies
                      </td>

                      <td className="px-4 py-3 text-[#64748B]">
                        Show relevant ads and offers.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* =================================================
                4. YOUR COOKIE CHOICES
            ================================================== */}

            <section
              id="your-choices"
              className="scroll-mt-32.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                4. Your Cookie Choices
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                You can control and manage cookies through your
                browser settings. You can choose to accept or decline
                cookies, or be notified when a cookie is being set.
                Please note that disabling certain cookies may affect
                the functionality of our website.
              </p>
            </section>

            {/* =================================================
                5. THIRD PARTY
            ================================================== */}

            <section
              id="third-party"
              className="scroll-mt-32.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                5. Third-Party Cookies
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                We may also use cookies from trusted third-party
                services such as payment providers, analytics
                services, advertising platforms, and marketing
                partners to help us analyze traffic and provide
                relevant services. These third parties may collect
                information according to their own privacy policies.
              </p>
            </section>

            {/* =================================================
                6. UPDATES
            ================================================== */}

            <section
              id="updates"
              className="scroll-mt-32.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                6. Updates to This Policy
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                We may update this Cookie Policy from time to time.
                Any changes will be posted on this page with an
                updated Last updated date.
              </p>
            </section>

            {/* =================================================
                7. CONTACT
            ================================================== */}

            <section
              id="contact"
              className="scroll-mt-32.5 pt-8"
            >
              <h2 className="font-['Poppins'] text-lg font-bold text-[#1E293B]">
                7. Contact Us
              </h2>

              <p className="mt-2 font-['Poppins'] text-[15px] leading-7 text-[#64748B]">
                If you have any questions about our Cookie Policy,
                please contact us at:
              </p>

              <a
                href="mailto:support@shopora.com"
                className="mt-2 inline-block font-['Poppins'] text-[15px] font-medium text-[#0F766E] hover:underline"
              >
                support@shopora.com
              </a>
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
                  Your Privacy Matters
                </p>

                <p className="mt-1 font-['Poppins'] text-[14px] leading-6 text-[#64748B]">
                  We use cookies responsibly to make your shopping
                  experience better, faster, and more personalized.
                </p>
              </div>
            </div>

          </article>
        </div>
      </div>
    </main>
  );
};

export default CookiePolicy;