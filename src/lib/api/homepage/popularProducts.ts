export async function getPopularProducts() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`, {
        cache: 'no-store',
    })

    if(!response.ok) {
        throw new Error("Failed to fetch products");
    }

    const result = await response.json();
    return result.data || [];
}