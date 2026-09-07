import { apiGet } from "@/lib/core/server";


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



// Get All Coupons
export const getCoupons = async (): Promise<{
  success: boolean;
  message: string;
  data: Coupon[];
}> => {
  return await apiGet<{
    success: boolean;
    message: string;
    data: Coupon[];
  }>("/api/v1/coupons");
};