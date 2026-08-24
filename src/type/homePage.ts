import type { LucideIcon } from "lucide-react";

export interface Category {
  name: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  discount?: string;
}

export interface AIFeature {
  id: string;
  title: string;
  description: string;
  image: string;
  cta: string;
}



export interface AiPower {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}




export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  rating: number;
}

export interface TrustStat {
  id: string;
  icon: LucideIcon;
  value: string;
  label: string;
}