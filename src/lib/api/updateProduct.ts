import { getProduct } from "@/type/dashboard/Seller";


interface UpdateProductResponse {
  success: boolean;
  message?: string;
  data?: getProduct;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";


export const UpdateProduct = async(id:string, data:Partial<getProduct>):Promise<getProduct> => {
    
    try{
        const response = await fetch (`${API_URL}/api/v1/products/${id}` ,{
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data),
            cache: "no-store",
        });

        const result: UpdateProductResponse = await response.json()

        if(!response.ok){
            throw new Error(
                result.message || "Failed to update product"
            )
        }

        if (!result.data) {
      throw new Error("Updated product data not found");
    }

    return result.data;


    }catch(err){
        console.error("Update Product Error" , err);
        throw err
    }
}