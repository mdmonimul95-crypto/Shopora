import { apiPost } from "@/lib/core/server";

export type StripeCheckoutItem = {
    productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string | null;
};

export type StripeCheckoutData = {
  items: StripeCheckoutItem[];

  customerId: string;

  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity?: string;
  shippingPostalCode?: string;
  shippingCountry?: string;

  shippingFee: number;
  discount: number;
};

type CreateStripeCheckoutResponse = {
  success: boolean;
  message: string;

  data: {
    sessionId: string;
    url: string;
  };
};

export const createStripeCheckoutSession = async (
  data: StripeCheckoutData
) => {
  return await apiPost<CreateStripeCheckoutResponse>(
    "/api/v1/stripe/create-checkout-session",
    data
  );
};