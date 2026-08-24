"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff, UserRound, Store, Shield } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { RegisterUser } from "@/type/auth";

type UserRole = "Customer" | "Seller" | "Admin";

const Register = () => {
  const [role, setRole] = useState<UserRole>("Customer");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(
      formData.entries()
    ) as unknown as RegisterUser;

    // Required fields
    if (
      !user.name ||
      !user.email ||
      !user.password ||
      !user.confirmPassword
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    // Name validation
    if (user.name.trim().length < 3) {
      toast.error("Name must be at least 3 characters");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(user.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Password validation
    if (user.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // Confirm password
    if (user.password !== user.confirmPassword) {
      toast.error("Password does not match");
      return;
    }

    // Role validation
    if (!role) {
      toast.error("Please select an account type");
      return;
    }

    try {
      setLoading(true);

      const registerData = {
        name: user.name.trim(),
        email: user.email.trim(),
        password: user.password,
        role,
      };

      console.log("Register Data:", registerData);

      const { data, error } =
        await authClient.signUp.email({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
          callbackURL: "/",
        });

      console.log("Signup data:", data);
      console.log("Signup error:", error);

      if (error) {
        toast.error("Account could not be created");
        return;
      }

      toast.success("Account created successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
 <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
    />
    <section className="bg-white px-4 py-15 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="font-['Poppins'] text-3xl font-bold text-[#1E293B]">
            Create Account
          </h1>

          <p className="mt-2 font-['Poppins'] text-sm text-[#64748B]">
            Create your Shopora account and start shopping.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_8px_30px_rgba(15,118,110,0.08)] sm:p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Role */}
            <div>
              <label className="mb-3 block font-['Poppins'] text-sm font-semibold text-[#1E293B]">
                Account Type
              </label>

              <div className="grid grid-cols-3 gap-2">

                {/* Customer */}
                <button
                  type="button"
                  onClick={() => setRole("Customer")}
                  className={`flex flex-col items-center justify-center rounded-lg border px-2 py-3 transition ${
                    role === "Customer"
                      ? "border-[#0F766E] bg-[#F0F9F7] text-[#0F766E]"
                      : "border-[#E2E8F0] text-[#64748B] hover:border-[#0F766E]"
                  }`}
                >
                  <UserRound size={21} />

                  <span className="mt-1 font-['Poppins'] text-xs font-semibold">
                    Customer
                  </span>
                </button>

                {/* Seller */}
                <button
                  type="button"
                  onClick={() => setRole("Seller")}
                  className={`flex flex-col items-center justify-center rounded-lg border px-2 py-3 transition ${
                    role === "Seller"
                      ? "border-[#0F766E] bg-[#F0F9F7] text-[#0F766E]"
                      : "border-[#E2E8F0] text-[#64748B] hover:border-[#0F766E]"
                  }`}
                >
                  <Store size={21} />

                  <span className="mt-1 font-['Poppins'] text-xs font-semibold">
                    Seller
                  </span>
                </button>

                {/* Admin */}
                <button
                  type="button"
                  onClick={() => setRole("Admin")}
                  className={`flex flex-col items-center justify-center rounded-lg border px-2 py-3 transition ${
                    role === "Admin"
                      ? "border-[#0F766E] bg-[#F0F9F7] text-[#0F766E]"
                      : "border-[#E2E8F0] text-[#64748B] hover:border-[#0F766E]"
                  }`}
                >
                  <Shield size={21} />

                  <span className="mt-1 font-['Poppins'] text-xs font-semibold">
                    Admin
                  </span>
                </button>

              </div>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block font-['Poppins'] text-sm font-semibold text-[#1E293B]"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                className="h-12 w-full rounded-lg border border-[#CBD5E1] px-4 font-['Poppins'] text-sm outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-['Poppins'] text-sm font-semibold text-[#1E293B]"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="h-12 w-full rounded-lg border border-[#CBD5E1] px-4 font-['Poppins'] text-sm outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block font-['Poppins'] text-sm font-semibold text-[#1E293B]"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-lg border border-[#CBD5E1] px-4 pr-12 font-['Poppins'] text-sm outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B]"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block font-['Poppins'] text-sm font-semibold text-[#1E293B]"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your password"
                  className="h-12 w-full rounded-lg border border-[#CBD5E1] px-4 pr-12 font-['Poppins'] text-sm outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B]"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-lg bg-[#0F766E] font-['Poppins'] text-sm font-semibold text-white transition hover:bg-[#0B625B] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          {/* Login */}
          <p className="mt-6 text-center font-['Poppins'] text-sm text-[#64748B]">
            Already have an account?{" "}

            <Link
              href="/auth/login"
              className="font-semibold text-[#0F766E] hover:text-[#FF6B6B]"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </section>

    </>
    
  );
};

export default Register;