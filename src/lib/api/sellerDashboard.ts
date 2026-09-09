import { apiGet } from "@/lib/core/server";

export type SellerDashboardStats = {
  totalSales: number;
  totalOrders: number;
  productsSold: number;
  totalEarnings: number;
  totalProducts: number;
  storeViews: number;
  storeViewsGrowth: number;

  growth: {
    sales: number;
    orders: number;
    productsSold: number;
    earnings: number;
  };
};

type SellerDashboardResponse = {
  success: boolean;
  message: string;
  data: SellerDashboardStats;
};

export const getSellerDashboardStats = async (
  sellerId: string
): Promise<SellerDashboardStats> => {
  const response =
    await apiGet<SellerDashboardResponse>(
      `/api/v1/seller/dashboard/${sellerId}`
    );

  return response.data;
};