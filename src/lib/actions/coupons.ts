import { apiPost } from "@/lib/core/server";

export type CreateCouponData = {
  couponCode: string;
  description: string;
  discountType: "FIXED_CART" | "PERCENTAGE" | "FIXED_PRODUCT";
  amount: number;
  expiryDate: string;
};

export type Coupon = {
  id: string;
  couponCode: string;
  description: string | null;
  discountType: "FIXED_CART" | "PERCENTAGE" | "FIXED_PRODUCT";
  amount: number;
  expiryDate: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateCouponResponse = {
  success: boolean;
  message: string;
  data: Coupon;
};

export const createCoupon = async (
  data: CreateCouponData
): Promise<CreateCouponResponse> => {
  return await apiPost<CreateCouponResponse>(
    "/api/v1/coupons",
    data
  );
};