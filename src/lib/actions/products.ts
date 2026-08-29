import { apiPost } from "../core/server";

export const createProduct = async (productData: unknown) => {
  return apiPost("/api/v1/products", productData);
};