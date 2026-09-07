import { apiGet, apiPost, apiPatch, apiDelete } from "@/lib/core/server";

/* 
   TYPES
   Shape returned by /api/v1/addresses (server
   services/address.ts).
 */

export type Address = {
  id: string;
  label?: string | null;
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  postalCode?: string | null;
  country: string;
  isDefault: boolean;
};

// What the add / edit form sends.
export type AddressFormData = {
  label?: string;
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  postalCode?: string;
  country: string;
  isDefault?: boolean;
};

type AddressListResponse = {
  success: boolean;
  message: string;
  data: Address[];
};

type AddressMutationResponse = {
  success: boolean;
  message: string;
  data?: Address;
};

  //  API CALLS

// GET /api/v1/addresses?userId=...
export const getAddresses = async (userId: string): Promise<Address[]> => {
  const result = await apiGet<AddressListResponse>(
    `/api/v1/addresses?userId=${encodeURIComponent(userId)}`
  );

  return result.data ?? [];
};

// POST /api/v1/addresses   body: { userId, ...form }
export const createAddress = async (
  userId: string,
  data: AddressFormData
): Promise<AddressMutationResponse> => {
  return await apiPost<AddressMutationResponse>("/api/v1/addresses", {
    userId,
    ...data,
  });
};

// PATCH /api/v1/addresses/:id   body: { userId, ...form }
export const updateAddress = async (
  userId: string,
  id: string,
  data: AddressFormData
): Promise<AddressMutationResponse> => {
  return await apiPatch<AddressMutationResponse>(
    `/api/v1/addresses/${encodeURIComponent(id)}`,
    { userId, ...data }
  );
};

// DELETE /api/v1/addresses/:id?userId=...
export const deleteAddress = async (
  userId: string,
  id: string
): Promise<AddressMutationResponse> => {
  return await apiDelete<AddressMutationResponse>(
    `/api/v1/addresses/${encodeURIComponent(id)}?userId=${encodeURIComponent(
      userId
    )}`
  );
};
