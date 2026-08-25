"use client";

import React from "react";
import Link from "next/link";
import {
  Headphones,
  ShieldCheck,
  Users,
  Package,
  Gem,
  Lightbulb,
  Truck,
  RotateCcw,
  Star,
  Mail,
} from "lucide-react";
import Image from "next/image";

/* =========================================================
   DATA
========================================================= */

const values = [
  {
    icon: ShieldCheck,
    title: "Trust & Security",
    description:
      "We protect your data and ensure a safe shopping experience.",
  },
  {
    icon: Gem,
    title: "Quality First",
    description:
      "We partner with trusted brands and deliver quality products.",
  },
  {
    icon: Users,
    title: "Customer Focused",
    description:
      "Our customers are at the heart of every decision we make.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We use smart technology to make your shopping experience easier.",
  },
];

const teamMembers = [
  {
    name: "Foysal Jaman",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Monimul",
    role: "Managing Director (MD)",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Partha",
    role: "Chief Technical Officer (CTO)",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Miraj hawlader",
    role: "Chief Operation Officer (COO)",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=500&q=80",
  },
];

const reasons = [
  {
    icon: Package,
    title: "Wide Selection",
    description: "Millions of products across all categories.",
  },
  {
    icon: Star,
    title: "Best Prices",
    description: "Competitive prices and exclusive deals.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Hassle-free returns when you need them.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable delivery to your door.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "We're here to help anytime.",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const AboutUs = () => {
  return (
    <section className="bg-white px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            BREADCRUMB
        ====================================================== */}

        <div className="mb-5 flex items-center gap-2 font-['Poppins'] text-[14px] text-[#94A3B8]">
          <Link
            href="/"
            className="transition-colors hover:text-[#0F766E]"
          >
            Home
          </Link>

          <span>/</span>

          <span className="text-[#64748B]">
            About Us
          </span>
        </div>

        {/* =====================================================
            HERO
        ====================================================== */}

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">

          {/* Left Content */}

          <div>

            <p className="font-['Poppins'] text-[14px] font-semibold uppercase tracking-wide text-[#0F766E]">
              About Shopora
            </p>

            <h1 className="mt-2 font-['Poppins'] text-2xl font-bold leading-tight text-[#1E293B] sm:text-3xl lg:text-4xl">
              Making Smart Shopping
              <span className="block text-[#0F766E]">
                Accessible to Everyone
              </span>
            </h1>

            <p className="mt-4 max-w-xl font-['Poppins'] text-[14px] leading-6 text-[#64748B] sm:text-[15px]">
              Shopora was founded with a simple mission — to make online
              shopping effortless, intelligent and enjoyable for everyone.
            </p>

            <p className="mt-3 max-w-xl font-['Poppins'] text-[14px] leading-6 text-[#64748B] sm:text-[15px]">
              We bring together trusted sellers, quality products and smart
              technology to create a shopping experience you can trust.
            </p>

            <Link
              href="/shop"
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-[#0F766E] px-5 py-2.5 font-['Poppins'] text-[14px] font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B625B] hover:shadow-md"
            >
              Start Shopping
            </Link>

          </div>

          {/* Hero Image */}

          <div className="relative overflow-hidden rounded-2xl bg-[#F6FAF9]">

            <Image
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=85"
              alt="Shopora smart shopping"
              className="h-full w-full object-cover"
              height={512}
              width={512}
            />

          </div>

        </div>

        {/* =====================================================
            QUICK STATS
        ====================================================== */}

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">

          <div className="rounded-lg border border-[#E8EEEE] bg-white p-4 text-center shadow-sm">
            <Users
              size={22}
              className="mx-auto text-[#0F766E]"
            />

            <h3 className="mt-2 font-['Poppins'] text-[15px] font-bold text-[#1E293B]">
              50K+
            </h3>

            <p className="mt-0.5 font-['Poppins'] text-[14px] text-[#64748B]">
              Happy Customers
            </p>
          </div>

          <div className="rounded-lg border border-[#E8EEEE] bg-white p-4 text-center shadow-sm">
            <ShieldCheck
              size={22}
              className="mx-auto text-[#0F766E]"
            />

            <h3 className="mt-2 font-['Poppins'] text-[15px] font-bold text-[#1E293B]">
              99.5%
            </h3>

            <p className="mt-0.5 font-['Poppins'] text-[14px] text-[#64748B]">
              Satisfaction Rate
            </p>
          </div>

          <div className="rounded-lg border border-[#E8EEEE] bg-white p-4 text-center shadow-sm">
            <Package
              size={22}
              className="mx-auto text-[#0F766E]"
            />

            <h3 className="mt-2 font-['Poppins'] text-[15px] font-bold text-[#1E293B]">
              10K+
            </h3>

            <p className="mt-0.5 font-['Poppins'] text-[14px] text-[#64748B]">
              Products
            </p>
          </div>

          <div className="rounded-lg border border-[#E8EEEE] bg-white p-4 text-center shadow-sm">
            <Headphones
              size={22}
              className="mx-auto text-[#0F766E]"
            />

            <h3 className="mt-2 font-['Poppins'] text-[15px] font-bold text-[#1E293B]">
              24/7
            </h3>

            <p className="mt-0.5 font-['Poppins'] text-[14px] text-[#64748B]">
              Customer Support
            </p>
          </div>

        </div>

        {/* =====================================================
            OUR STORY
        ====================================================== */}

        <div className="mt-10 grid items-center gap-8 md:grid-cols-2">

          {/* Image */}

          <div className="overflow-hidden rounded-xl bg-[#F6FAF9]">

            <Image
              src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1000&q=85"
              alt="Shopora our story"
              className="h-full min-h-65 w-full object-cover"
              height={512}
              width={512}
            />
            

          </div>

          {/* Content */}

          <div>

            <p className="font-['Poppins'] text-[14px] font-semibold uppercase tracking-wide text-[#0F766E]">
              Our Story
            </p>

            <h2 className="mt-1 font-['Poppins'] text-xl font-bold text-[#1E293B] sm:text-2xl">
              Making Smart Shopping
              <span className="block">
                Accessible to Everyone
              </span>
            </h2>

            <p className="mt-4 font-['Poppins'] text-[14px] leading-6 text-[#64748B]">
              Shopora was founded with a simple mission — to make online
              shopping effortless, intelligent and enjoyable for everyone.
            </p>

            <p className="mt-3 font-['Poppins'] text-[14px] leading-6 text-[#64748B]">
              We combine modern technology with carefully selected products
              to help customers discover better products, compare prices and
              make confident purchasing decisions.
            </p>

            <p className="mt-3 font-['Poppins'] text-[14px] leading-6 text-[#64748B]">
              From discovering products to receiving them at your doorstep,
              we are committed to making every step simple and reliable.
            </p>

          </div>

        </div>

        {/* =====================================================
            OUR VALUES
        ====================================================== */}

        <div className="mt-10">

          <div className="mb-5 text-center">

            <p className="font-['Poppins'] text-[14px] font-semibold uppercase tracking-wide text-[#0F766E]">
              Our Values
            </p>

            <h2 className="mt-1 font-['Poppins'] text-xl font-bold text-[#1E293B] sm:text-2xl">
              What We Believe In
            </h2>

          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-xl border border-[#E8EEEE] bg-[#F8FAFC] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#CFE5E1] hover:shadow-sm"
                >

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#0F766E] shadow-sm">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-3 font-['Poppins'] text-[14px] font-semibold text-[#1E293B]">
                    {value.title}
                  </h3>

                  <p className="mt-1 font-['Poppins'] text-[14px] leading-5 text-[#64748B]">
                    {value.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

        {/* =====================================================
            OUR TEAM
        ====================================================== */}

        <div className="mt-10">

          <div className="mb-5 text-center">

            <p className="font-['Poppins'] text-[14px] font-semibold uppercase tracking-wide text-[#0F766E]">
              Our Team
            </p>

            <h2 className="mt-1 font-['Poppins'] text-xl font-bold text-[#1E293B] sm:text-2xl">
              Meet the People Behind Shopora
            </h2>

          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="rounded-xl border border-[#E8EEEE] bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >

                <div className="mx-auto h-20 w-20 overflow-hidden rounded-full bg-[#F1F5F9] sm:h-24 sm:w-24">

                  <Image
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                    height={512}
                    width={512}
                  />

                </div>

                <h3 className="mt-3 font-['Poppins'] text-[14px] font-semibold text-[#1E293B]">
                  {member.name}
                </h3>

                <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
                  {member.role}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* =====================================================
            WHY CHOOSE SHOPORA
        ====================================================== */}

        <div className="mt-10">

          <div className="mb-5 text-center">

            <p className="font-['Poppins'] text-[14px] font-semibold uppercase tracking-wide text-[#0F766E]">
              Why Choose Shopora?
            </p>

            <h2 className="mt-1 font-['Poppins'] text-xl font-bold text-[#1E293B] sm:text-2xl">
              Shopping Made Better
            </h2>

          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">

            {reasons.map((reason) => {
              const Icon = reason.icon;

              return (
                <div
                  key={reason.title}
                  className="rounded-xl border border-[#E8EEEE] bg-white p-4 text-center"
                >

                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F9F7] text-[#0F766E]">
                    <Icon size={19} strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-2 font-['Poppins'] text-[14px] font-semibold text-[#1E293B]">
                    {reason.title}
                  </h3>

                  <p className="mt-1 font-['Poppins'] text-[14px] leading-5 text-[#64748B]">
                    {reason.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

         {/* =====================================================
                   NEWSLETTER
               ====================================================== */}
               <div className="mt-7 flex flex-col gap-5 rounded-xl bg-[#0F766E] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
       
                 <div className="flex items-center gap-4">
       
                   <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                     <Mail size={21} />
                   </div>
       
                   <div>
                     <h3 className="font-['Poppins'] text-[16px] font-semibold text-white">
                       Stay in the loop
                     </h3>
       
                     <p className="mt-1 font-['Poppins'] text-[14px] text-white/75">
                       Subscribe to get updates, exclusive deals and more.
                     </p>
                   </div>
       
                 </div>
       
                 <div className="flex w-full max-w-md overflow-hidden rounded-lg bg-white">
       
                   <input
                     type="email"
                     placeholder="Enter your email"
                     className="min-w-0 flex-1 bg-transparent px-4 py-3 font-['Poppins'] text-[14px] text-[#1E293B] outline-none placeholder:text-[#94A3B8]"
                   />
       
                   <button
                     type="button"
                     className="m-1 rounded-md bg-[#FF6B6B] px-5 font-['Poppins'] text-[14px] font-semibold text-white transition-colors hover:bg-[#F05252]"
                   >
                     Subscribe
                   </button>
       
                 </div>
       
               </div>

      </div>
    </section>
  );
};

export default AboutUs;