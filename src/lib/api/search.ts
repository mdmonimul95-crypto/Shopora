export async function searchProducts(search: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/search?q=${encodeURIComponent(search)}`
  );

  if (!response.ok) {
    throw new Error("Failed to search products");
  }

  const result = await response.json();

  return result.data;
}