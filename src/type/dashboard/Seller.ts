

export interface StatCard {
  title: string;
  value: string;
  growth: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  chartColor: string;
}

export interface Product {
  name: string;
  sold: number;
  revenue: string;
  image: string;
}

export interface Order {
  id: string;
  customer: string;
  amount: string;
  status: "Delivered" | "Shipped" | "Processing" | "Pending";
  date: string;
}


export interface getProduct {
    id: string;
  name: string;
  shortDescription: string;
  description: string;
  sku: string;
  category: string;
  brand: string;
  regularPrice: number;
  salePrice: number;
  stockQuantity: number;
  lowStockAlert: number;
  stockStatus: string;
  productType: string;
  status: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}


export interface Coupon {
  id: number;
  code: string;
  description: string;
  type: CouponType;
  discount: number;
  discountText: string;
  usage: number;
  usageLimit: number;
  minimumOrder: number;
  startDate: string;
  endDate: string;
  status: CouponStatus;
  color: string;
}

export type CouponStatus = "Active" | "Expired" | "Inactive";
export type CouponType = "Percentage" | "Fixed Amount" | "Free Shipping";


export type Brand = {
  id: number;
  name: string;
  description: string;
  products: number;
  status: "Active" | "Inactive";
  createdAt: string;
  logo: string;
};