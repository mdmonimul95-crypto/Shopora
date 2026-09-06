import { apiGet, apiPatch } from "@/lib/core/server";

export type SellerOrderItem = {
  id: string;
  productId: string;
  productName: string;
  productImage: string | null;
  quantity: number;
  price: number;
  total: number;
   product?: {
    sku: string;
    images: string[];
  };
};


export type SellerOrder = {

  id: string;
  orderNumber: string;
  status: | "PLACED" | "PAID" | "PROCESSING" | "PACKED" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";
  paymentStatus: string;
  shippingName : string;
  paymentMethod: string;
  shippingPhone: string;
  customerId: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  orderStatus: string;
  subtotal: string;
  shippingFee: string;
  discount: string;
  total: number;
  createdAt: string;
  items: SellerOrderItem[];
  customer?: {
    id: string;
    name: string;
    email: string;
  };
};


export type SellerOrdersResponse = {
  success: boolean;
  message: string;
  data: SellerOrder[];
};


export type SellerOrderIdResponse = {
  success: boolean;
  message: string;
  data: SellerOrder;
};

export type UpdateSellerOrderStatusResponse = {
  success: boolean;
  message: string;
  data: SellerOrder;
};

export const getSellerOrders = async ( sellerId: string): Promise<SellerOrdersResponse> => {
  return await apiGet<SellerOrdersResponse>( `/api/v1/seller/orders/${sellerId}`);
};


export const getSellerOrderId = async(orderId: string) : Promise<SellerOrderIdResponse> => {
  // console.log("STEP 3 - Order ID:", orderId);
  const response  = await apiGet<SellerOrderIdResponse>(`/api/v1/seller/orders/order/${orderId}`)
  //  console.log("STEP 3 - API Response:", response);
   return response;
}


export const updateSellerOrderStatus = async (orderId:string, status: string) => {
  // console.log("STEP FRONTEND 1 - Order ID:", orderId);
  // console.log("STEP FRONTEND 1 - Status:", status);

  const response = await apiPatch<UpdateSellerOrderStatusResponse>(`/api/v1/seller/orders/order/${orderId}/status`,{
    status,
  } )


  // console.log("STEP FRONTEND 1 - API Response:", response);

  return response;

}


