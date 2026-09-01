export type Product = {
  id: string;
  name: string;
  sku?: string;

  shortDescription?: string;
  description?: string;

  category: string;
  brand?: string;

  regularPrice: number;
  salePrice?: number | null;

  stockQuantity: number;
  stockStatus: string;

  images: string[];

  rating?: number;
  reviews?: number;

  createdAt?: string;
};

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    return result.data || null;
  } catch (error) {
    console.error("Product Fetch Error:", error);

    return null;
  }
}