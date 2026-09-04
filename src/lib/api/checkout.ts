import { apiPost } from "@/lib/core/server";

export type CreateOrderItem = {
  productId: string;
  quantity: number;
};

export type CreateOrderData = {
  customerId: string;

  items: CreateOrderItem[];

  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity?: string;
  shippingPostalCode?: string;
  shippingCountry?: string;

  paymentMethod?: string;

  shippingFee?: number;
  discount?: number;

  couponCode?: string;
  notes?: string;
};

export type CreateOrderResponse = {
  success: boolean;
  message: string;
  data: unknown;
};

export const createOrder = async ( data: CreateOrderData): Promise<CreateOrderResponse> => {
  return await apiPost<CreateOrderResponse>(
    "/api/v1/orders",
    data
  );
};