import { apiGet } from "@/lib/core/server";

export type SellerOrderItem = {
  id: string;
  productId: string;
  productName: string;
  productImage: string | null;
  quantity: number;
  price: number;
  total: number;
};


export type SellerOrder = {
  id: string;
  orderNumber: string;
  status: | "PLACED" | "PAID" | "PROCESSING" | "PACKED" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";
  total: number;
  createdAt: string;
  items: SellerOrderItem[];
  customer?: {
    id: string;
    name: string;
    email: string;
  };
};


export type SellerOrdersResponse = {
  success: boolean;
  message: string;
  data: SellerOrder[];
};


export const getSellerOrders = async ( sellerId: string): Promise<SellerOrdersResponse> => {
  return await apiGet<SellerOrdersResponse>( `/api/v1/seller/orders/${sellerId}`);
};