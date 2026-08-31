const API_URL =process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const DeleteProduct = async (id:string) => {
    try{
        const response = await fetch(`${API_URL}/api/v1/products/${id}` , {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            },
            cache: 'no-store'
        })

        const result = await response.json();

        if(!response.ok){
            throw new Error(result.message || "Failed to delete product")
        }

        return result;

    }catch(err){
        console.error("DELETE PRODUCT ERROR:", err);
    throw err;
    }
}