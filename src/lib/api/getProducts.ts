import { getProduct } from "@/type/dashboard/Seller";



interface ProductsResponse {
  success: boolean;
  message?: string;
  data?: getProduct[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getProducts = async (): Promise<getProduct[]> => {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/products`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const result: ProductsResponse = await response.json();
    console.log("PRODUCT API STATUS:", response.status);
console.log("PRODUCT API DATA:", result);

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to fetch products"
      );
    }

    return result.data || [];
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    throw error;
  }
};