

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
  sku: string;
  category: string;
  brand: string;
  regularPrice: number;
  salePrice: number;
  stockQuantity: number;
  stockStatus: string;
  status: string;
  productType: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}