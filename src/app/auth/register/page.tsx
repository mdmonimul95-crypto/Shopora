"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, UserRound } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { authClient } from "@/lib/auth-client";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(
      formData.get("confirmPassword") || ""
    );

    // --------------------------------
    // Required fields
    // --------------------------------

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    // --------------------------------
    // Name validation
    // --------------------------------

    if (name.length < 3) {
      toast.error("Name must be at least 3 characters");
      return;
    }

    // --------------------------------
    // Email validation
    // --------------------------------

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // --------------------------------
    // Password validation
    // --------------------------------

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // --------------------------------
    // Confirm password
    // --------------------------------

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      console.log("Registering user:", {
        name,
        email,
      });

      // --------------------------------
      // Better Auth registration
      // --------------------------------

      const { data, error } =
        await authClient.signUp.email({
          name,
          email,
          password,
        });

      console.log("Register response:", data);
      console.log("Register error:", error);

      // --------------------------------
      // Better Auth error
      // --------------------------------

      if (error) {
        toast.error(
          error.message || "Unable to create account"
        );

        return;
      }

      // --------------------------------
      // Success
      // --------------------------------

      toast.success(
        "Account created successfully!"
      );

      // --------------------------------
      // Redirect to login
      // --------------------------------

      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 1500);
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      toast.error(
        "Unable to connect to authentication service"
      );
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

              {/* Account Type */}

              <div>
                <label className="mb-3 block font-['Poppins'] text-sm font-semibold text-[#1E293B]">
                  Account Type
                </label>

                <div className="flex items-center gap-3 rounded-lg border border-[#0F766E] bg-[#F0F9F7] px-4 py-3 text-[#0F766E]">

                  <UserRound size={21} />

                  <div>
                    <p className="font-['Poppins'] text-sm font-semibold">
                      Customer
                    </p>

                    <p className="font-['Poppins'] text-xs text-[#64748B]">
                      Standard Shopora account
                    </p>
                  </div>

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
                  autoComplete="name"
                  disabled={loading}
                  className="h-12 w-full rounded-lg border border-[#CBD5E1] px-4 font-['Poppins'] text-sm text-black outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 disabled:cursor-not-allowed disabled:bg-gray-50"
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
                  autoComplete="email"
                  disabled={loading}
                  className="h-12 w-full rounded-lg border border-[#CBD5E1] px-4 font-['Poppins'] text-sm text-black outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 disabled:cursor-not-allowed disabled:bg-gray-50"
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
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    disabled={loading}
                    className="h-12 w-full rounded-lg border border-[#CBD5E1] px-4 pr-12 font-['Poppins'] text-sm text-black outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 disabled:cursor-not-allowed disabled:bg-gray-50"
                  />

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F766E]"
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
                    autoComplete="new-password"
                    disabled={loading}
                    className="h-12 w-full rounded-lg border border-[#CBD5E1] px-4 pr-12 font-['Poppins'] text-sm text-black outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 disabled:cursor-not-allowed disabled:bg-gray-50"
                  />

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() =>
                      setShowConfirmPassword(
                        (prev) => !prev
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F766E]"
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