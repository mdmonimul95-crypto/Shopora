"use client";

import React from "react";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
  MessageCircle,
  ShieldCheck,
  RotateCcw,
  Truck,
  Headphones,
  CheckCircle,
} from "lucide-react";

const ContactUs = () => {
  return (
    <section className="bg-white px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            BREADCRUMB
        ====================================================== */}
        <div className="mb-6 flex items-center gap-2 font-['Poppins'] text-[14px] text-[#94A3B8]">
          <span>Home</span>
          <span>›</span>
          <span className="text-[#475569]">Contact Us</span>
        </div>

        {/* =====================================================
            TOP CONTACT SECTION
        ====================================================== */}
        <div className="grid gap-7 lg:grid-cols-[0.9fr_1.5fr]">

          {/* ===================================================
              LEFT CONTACT INFO
          ==================================================== */}
          <div className="relative overflow-hidden rounded-xl bg-[#F1F8F7] p-6 sm:p-8">

            {/* Decorative circles */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#DDF0ED]" />
            <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-[#E5F3F1]" />

            <div className="relative z-10">

              {/* Heading */}
              <div className="mb-6">
                <h1 className="font-['Poppins'] text-3xl font-bold leading-tight text-[#1E293B] sm:text-4xl">
                  Contact <span className="text-[#0F766E]">Us</span>
                </h1>

                <p className="mt-2 font-['Poppins'] text-[16px] font-semibold text-[#FF6B6B]">
                  Were here to help!
                </p>

                <p className="mt-2 max-w-md font-['Poppins'] text-[14px] leading-6 text-[#64748B]">
                  Have questions about your order, products, or account?
                  Our team is ready to assist you.
                </p>
              </div>

              {/* Illustration area */}
              <div className="mb-7 flex h-40 items-center justify-center">
                <div className="relative">

                  {/* Shopping bag */}
                  <div className="relative flex h-28 w-24 items-end justify-center rounded-xl bg-[#0F766E] shadow-md">

                    <div className="absolute -top-8 left-1/2 h-12 w-12 -translate-x-1/2 rounded-t-full border-[5px] border-b-0 border-[#0F766E]" />

                    <span className="mb-4 font-['Poppins'] text-5xl font-bold text-[#FF6B6B]">
                      S
                    </span>
                  </div>

                  {/* Plant */}
                  <div className="absolute -right-16 bottom-0">
                    <div className="mx-auto h-16 w-3 rounded-full bg-[#8B5E3C]" />

                    <div className="absolute -left-5 top-1 h-8 w-10 rotate-[-25deg] rounded-full bg-[#65A30D]" />

                    <div className="absolute left-2 top-6 h-8 w-10 rotate-[25deg] rounded-full bg-[#84CC16]" />
                  </div>

                  {/* Chat bubble */}
                  <div className="absolute -right-24 -top-8 flex h-12 w-16 items-center justify-center rounded-xl bg-[#55C7BB] text-white shadow-sm">
                    <MessageCircle size={28} strokeWidth={1.7} />
                  </div>

                </div>
              </div>

              {/* Contact details */}
              <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white">

                {/* Address */}
                <div className="flex gap-4 border-b border-[#E8EEEE] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F5F3] text-[#0F766E]">
                    <MapPin size={19} />
                  </div>

                  <div>
                    <h3 className="font-['Poppins'] text-[14px] font-semibold text-[#1E293B]">
                      Our Address
                    </h3>

                    <p className="mt-1 font-['Poppins'] text-[14px] leading-5 text-[#64748B]">
                      Shopora Center,
                      <br />
                      123 Commerce Street, Suite 500
                      <br />
                      Dhaka, Bangladesh 1205
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 border-b border-[#E8EEEE] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F5F3] text-[#0F766E]">
                    <Mail size={19} />
                  </div>

                  <div>
                    <h3 className="font-['Poppins'] text-[14px] font-semibold text-[#1E293B]">
                      Email Us
                    </h3>

                    <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
                      support@shopora.com
                    </p>

                    <p className="font-['Poppins'] text-[14px] text-[#64748B]">
                      help@shopora.com
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4 border-b border-[#E8EEEE] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F5F3] text-[#0F766E]">
                    <Phone size={19} />
                  </div>

                  <div>
                    <h3 className="font-['Poppins'] text-[14px] font-semibold text-[#1E293B]">
                      Call Us
                    </h3>

                    <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
                      +880 1234 567 890
                    </p>

                    <p className="font-['Poppins'] text-[14px] text-[#64748B]">
                      Mon - Sat · 9AM - 6PM
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex gap-4 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F5F3] text-[#0F766E]">
                    <Clock size={19} />
                  </div>

                  <div>
                    <h3 className="font-['Poppins'] text-[14px] font-semibold text-[#1E293B]">
                      Business Hours
                    </h3>

                    <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
                      Saturday - Thursday
                    </p>

                    <p className="font-['Poppins'] text-[14px] text-[#64748B]">
                      9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ===================================================
              CONTACT FORM
          ==================================================== */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">

            <div className="mb-6">
              <h2 className="font-['Poppins'] text-2xl font-bold text-[#1E293B] sm:text-3xl">
                Send us a message
              </h2>

              <p className="mt-2 font-['Poppins'] text-[14px] leading-6 text-[#64748B]">
                Fill out the form below and well get back to you as soon as possible.
              </p>
            </div>

            <form className="space-y-5">

              {/* Name + Email */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block font-['Poppins'] text-[14px] font-medium text-[#1E293B]">
                    Full Name
                    <span className="text-[#FF6B6B]"> *</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Your full name"
                    className="h-11 w-full rounded-lg border border-[#E2E8F0] px-4 font-['Poppins'] text-[14px] text-[#1E293B] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-['Poppins'] text-[14px] font-medium text-[#1E293B]">
                    Email Address
                    <span className="text-[#FF6B6B]"> *</span>
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="h-11 w-full rounded-lg border border-[#E2E8F0] px-4 font-['Poppins'] text-[14px] text-[#1E293B] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                  />
                </div>

              </div>

              {/* Subject */}
              <div>
                <label className="mb-2 block font-['Poppins'] text-[14px] font-medium text-[#1E293B]">
                  Subject
                  <span className="text-[#FF6B6B]"> *</span>
                </label>

                <input
                  type="text"
                  placeholder="How can we help you?"
                  className="h-11 w-full rounded-lg border border-[#E2E8F0] px-4 font-['Poppins'] text-[14px] text-[#1E293B] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                />
              </div>

              {/* Order Number */}
              <div>
                <label className="mb-2 block font-['Poppins'] text-[14px] font-medium text-[#1E293B]">
                  Order Number
                  <span className="font-normal text-[#94A3B8]">
                    {" "}
                    (Optional)
                  </span>
                </label>

                <input
                  type="text"
                  placeholder="e.g. #SP123456"
                  className="h-11 w-full rounded-lg border border-[#E2E8F0] px-4 font-['Poppins'] text-[14px] text-[#1E293B] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block font-['Poppins'] text-[14px] font-medium text-[#1E293B]">
                  Message
                  <span className="text-[#FF6B6B]"> *</span>
                </label>

                <textarea
                  rows={6}
                  placeholder="Write your message here..."
                  className="w-full resize-none rounded-lg border border-[#E2E8F0] px-4 py-3 font-['Poppins'] text-[14px] leading-6 text-[#1E293B] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-[#FF6B6B] px-6 py-3 font-['Poppins'] text-[14px] font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F05252] hover:shadow-md"
              >
                Send Message
                <Send size={16} />
              </button>

            </form>
          </div>

        </div>

        {/* =====================================================
            MAP SECTION
        ====================================================== */}
        <div className="mt-7">

          <div className="mb-4">
            <h2 className="font-['Poppins'] text-xl font-bold text-[#1E293B] sm:text-2xl">
              Find Us Here
            </h2>

            <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
              Visit our office or contact us through the details above.
            </p>
          </div>

          <div className="relative h-64 overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#EEF4F2] sm:h-72">

            {/* Fake map background */}
            <div className="absolute inset-0 opacity-60">
              <div className="absolute left-10 top-12 h-1 w-[80%] rotate-12 bg-white" />
              <div className="absolute left-0 top-28 h-1 w-full -rotate-6 bg-white" />
              <div className="absolute left-20 top-40 h-1 w-[70%] rotate-6 bg-white" />
              <div className="absolute left-1/3 top-0 h-full w-1 rotate-12 bg-white" />
              <div className="absolute left-2/3 top-0 h-full w-1 -rotate-12 bg-white" />
            </div>

            {/* Location marker */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF6B6B]/20">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6B6B] text-white shadow-md">
                  <MapPin size={19} fill="currentColor" />
                </div>
              </div>

            </div>

            {/* Map card */}
            <div className="absolute left-5 top-5 max-w-xs rounded-xl bg-white p-5 shadow-md">

              <h3 className="font-['Poppins'] text-[16px] font-semibold text-[#1E293B]">
                Find Us Here
              </h3>

              <p className="mt-2 font-['Poppins'] text-[14px] leading-5 text-[#64748B]">
                Visit our office for any questions or assistance.
              </p>

              <button
                type="button"
                className="mt-4 rounded-lg border border-[#0F766E] px-4 py-2 font-['Poppins'] text-[14px] font-semibold text-[#0F766E] transition-colors hover:bg-[#0F766E] hover:text-white"
              >
                Get Directions
              </button>

            </div>
          </div>
        </div>

        {/* =====================================================
            TRUST FEATURES
        ====================================================== */}
        <div className="mt-7 grid grid-cols-2 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white md:grid-cols-4">

          {/* Feature 1 */}
          <div className="flex flex-col items-center border-b border-[#E8EEEE] p-5 text-center md:border-b-0 md:border-r">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F5F3] text-[#0F766E]">
              <ShieldCheck size={21} />
            </div>

            <h3 className="font-['Poppins'] text-[14px] font-semibold text-[#1E293B]">
              Secure Payments
            </h3>

            <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
              Safe & secure payments
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center border-b border-[#E8EEEE] p-5 text-center md:border-b-0 md:border-r">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF2E8] text-[#F97316]">
              <RotateCcw size={21} />
            </div>

            <h3 className="font-['Poppins'] text-[14px] font-semibold text-[#1E293B]">
              Easy Returns
            </h3>

            <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
              Returns within 30 days
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center border-r border-[#E8EEEE] p-5 text-center">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF2FF] text-[#4F46E5]">
              <Truck size={21} />
            </div>

            <h3 className="font-['Poppins'] text-[14px] font-semibold text-[#1E293B]">
              Fast Delivery
            </h3>

            <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
              Quick & reliable shipping
            </p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center p-5 text-center">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#F0FDF4] text-[#16A34A]">
              <Headphones size={21} />
            </div>

            <h3 className="font-['Poppins'] text-[14px] font-semibold text-[#1E293B]">
              24/7 Support
            </h3>

            <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
              Were here to help anytime
            </p>
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

export default ContactUs;