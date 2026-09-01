
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getCategories = async () => {
    const response  = await fetch(`${API_URL}/api/v1/categories`, {
        cache: 'no-store'
    });

    const result = await response.json();
    return result.data;
}