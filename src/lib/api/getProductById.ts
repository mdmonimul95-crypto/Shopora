import { getProduct } from "@/type/dashboard/Seller";

interface ProductsResponse {
  success: boolean;
  message?: string;
  data?: getProduct;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";



export const getProductById = async(id:string): Promise<getProduct> =>{

    try{
        const response = await fetch(`${API_URL}/api/v1/products/${id}`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            },
            cache: "no-store"
        });

        const result: ProductsResponse = await response.json();
       
        if(!response.ok){
            throw new Error(
                result.message || "Failed to fetch product"
            )
        }

        if(!result.data){
            throw new Error("Product data not found");
        }

        return result.data

       
    }catch(err){
        console.error("GET PRODUCT BY ID ERROR:", err);
    throw err;
    }
}