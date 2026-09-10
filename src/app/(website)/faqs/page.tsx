"use client";

import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

const faqs = [
  {
    question: "What is Shopora?",
    answer:
      "Shopora is an AI-powered e-commerce platform that connects buyers and sellers, offering a wide range of products, smart shopping tools, personalized recommendations, and a seamless shopping experience.",
  },
  {
    question: "Is Shopora free to use?",
    answer:
      "Yes. Customers can browse products, search for items, add products to their wishlist or cart, and place orders without paying any platform access fee.",
  },
  {
    question: "How do I create an account?",
    answer:
      "Click the Register or Sign Up option from the Shopora website and provide the required information. After completing registration, you can log in and start using your Shopora account.",
  },
  {
    question: "Can I shop from multiple sellers?",
    answer:
      "Yes. Shopora is a multi-vendor marketplace, so you can discover and purchase products from different sellers through the platform.",
  },
  {
    question: "Is my personal information safe?",
    answer:
      "Shopora takes reasonable measures to protect your personal information and account data. Please review our Privacy Policy for more information about how your information is collected and used.",
  },
  {
    question: "Do you have a mobile app?",
    answer:
      "Shopora is currently available through its web platform. Mobile application availability may depend on future platform development.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact the Shopora support team through our Contact Us page. Our support team will assist you with your questions and concerns.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Shipping availability depends on the seller, product, destination, and available delivery options. Please check the shipping information provided for the specific product before placing your order.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState("");

  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFA] px-4 py-8 sm:px-6 md:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <h1 className="font-['Poppins'] text-2xl font-bold text-[#1E293B]">
              General Questions
            </h1>

            <p className="mt-1 font-['Poppins'] text-[15px] text-[#64748B]">
              Find answers to the most common questions about Shopora.
            </p>
          </div>

          {/* Search */}

          <div className="relative w-full sm:w-70">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="
                h-10
                w-full
                rounded-md
                border
                border-[#E2E8F0]
                bg-white
                pl-9
                pr-3
                font-['Poppins']
                text-[14px]
                text-[#1E293B]
                outline-none
                transition
                focus:border-[#0F766E]
              "
            />
          </div>
        </div>

        {/* =====================================================
            FAQ LIST
        ====================================================== */}

        <div className="mt-5 space-y-2">

          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className={`
                    overflow-hidden
                    rounded-md
                    border
                    transition
                    ${
                      isOpen
                        ? "border-[#CDE8E3] bg-[#F0F9F7]"
                        : "border-[#E5EEEE] bg-white"
                    }
                  `}
                >

                  {/* Question */}

                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-4
                      px-4
                      py-3
                      text-left
                    "
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`
                        font-['Poppins']
                        text-[15px]
                        font-semibold
                        ${
                          isOpen
                            ? "text-[#0F766E]"
                            : "text-[#1E293B]"
                        }
                      `}
                    >
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={17}
                      className={`
                        shrink-0
                        transition-transform
                        duration-200
                        ${
                          isOpen
                            ? "rotate-180 text-[#0F766E]"
                            : "text-[#94A3B8]"
                        }
                      `}
                    />
                  </button>

                  {/* Answer */}

                  {isOpen && (
                    <div className="border-t border-[#DDEDEA] px-4 pb-4 pt-3">
                      <p className="font-['Poppins'] text-[14px] leading-6 text-[#64748B]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            /* =================================================
               NO RESULT
            ================================================== */

            <div className="rounded-lg border border-[#E5EEEE] bg-white px-5 py-10 text-center">
              <Search
                size={28}
                className="mx-auto text-[#94A3B8]"
              />

              <h2 className="mt-3 font-['Poppins'] text-lg font-semibold text-[#1E293B]">
                No questions found
              </h2>

              <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
                Try searching with a different keyword.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-4 rounded-md bg-[#0F766E] px-4 py-2 font-['Poppins'] text-[14px] font-semibold text-white transition hover:bg-[#0B625B]"
              >
                Clear Search
              </button>
            </div>
          )}

        </div>
      </div>
    </main>
  );
};

export default FAQs;