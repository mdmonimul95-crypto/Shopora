"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";

import { authClient } from "@/lib/auth-client";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const email = String(
    formData.get("email") || ""
  ).trim();

  const password = String(
    formData.get("password") || ""
  );

  const remember =
    formData.get("remember") === "on";

  // Required fields
  if (!email || !password) {
    toast.error("Please fill in all fields");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address");
    return;
  }

  // Password validation
  if (password.length < 6) {
    toast.error(
      "Password must be at least 6 characters"
    );
    return;
  }

  try {
    setLoading(true);

    console.log("Login attempt:", {
      email,
      remember,
    });

    const { data, error } = await authClient.signIn.email({
  email,
  password,
  rememberMe: remember,
});

    console.log("Login response:", data);
    console.log("Login error:", error);

    if (error) {
      toast.error(
        error.message || "Invalid email or password"
      );
      return;
    }

    toast.success("Login successful!");

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    console.error("Login error:", error);

    toast.error(
      "Unable to connect to the authentication server"
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
              Welcome Back
            </h1>

            <p className="mt-2 font-['Poppins'] text-sm text-[#64748B]">
              Login to your Shopora account and continue
              shopping.
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_8px_30px_rgba(15,118,110,0.08)] sm:p-8">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

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
                  className="h-12 text-black w-full rounded-lg border border-[#CBD5E1] px-4 font-['Poppins'] text-sm outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="block font-['Poppins'] text-sm font-semibold text-[#1E293B]"
                  >
                    Password
                  </label>

                  <Link
                    href="/auth/forgot-password"
                    className="font-['Poppins'] text-xs font-medium text-[#0F766E] transition hover:text-[#FF6B6B]"
                  >
                    Forgot Password?
                  </Link>

                </div>

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
                    autoComplete="current-password"
                    className="h-12 text-black w-full rounded-lg border border-[#CBD5E1] px-4 pr-12 font-['Poppins'] text-sm outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                  />

                  <button
                    type="button"
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
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] transition hover:text-[#0F766E]"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">

                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#CBD5E1] accent-[#0F766E]"
                />

                <label
                  htmlFor="remember"
                  className="font-['Poppins'] text-xs text-[#64748B]"
                >
                  Remember me
                </label>

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-lg bg-[#0F766E] font-['Poppins'] text-sm font-semibold text-white transition hover:bg-[#0B625B] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Logging in..."
                  : "Login"}
              </button>

            </form>

            {/* Register */}
            <p className="mt-6 text-center font-['Poppins'] text-sm text-[#64748B]">
              Don&apos;t have an account?{" "}

              <Link
                href="/auth/register"
                className="font-semibold text-[#0F766E] transition hover:text-[#FF6B6B]"
              >
                Create Account
              </Link>
            </p>

          </div>
        </div>
      </section>
    </>
  );
};

export default Login;