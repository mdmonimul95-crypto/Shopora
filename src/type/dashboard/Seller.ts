

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
