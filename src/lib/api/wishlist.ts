import { apiGet, apiPost, apiDelete } from "@/lib/core/server";

/* =========================================================
   TYPES
   Shape returned by GET /api/v1/wishlist (see server
   services/wishlist.ts -> getWishlistByUser).
========================================================= */

export type WishlistItem = {
  wishlistId: string;
  id: string;
  name: string;
  image: string | null;
  category: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
};

type WishlistListResponse = {
  success: boolean;
  message: string;
  data: WishlistItem[];
};

type WishlistCheckResponse = {
  success: boolean;
  data: { wishlisted: boolean };
};

type WishlistMutationResponse = {
  success: boolean;
  message: string;
  data?: unknown;
};

/* =========================================================
   API CALLS
========================================================= */

// GET /api/v1/wishlist?userId=...
export const getWishlist = async (
  userId: string
): Promise<WishlistItem[]> => {
  const result = await apiGet<WishlistListResponse>(
    `/api/v1/wishlist?userId=${encodeURIComponent(userId)}`
  );

  return result.data ?? [];
};

// GET /api/v1/wishlist/check?userId=...&productId=...
export const checkWishlist = async (
  userId: string,
  productId: string
): Promise<boolean> => {
  const result = await apiGet<WishlistCheckResponse>(
    `/api/v1/wishlist/check?userId=${encodeURIComponent(
      userId
    )}&productId=${encodeURIComponent(productId)}`
  );

  return Boolean(result.data?.wishlisted);
};

// POST /api/v1/wishlist   body: { userId, productId }
export const addToWishlist = async (
  userId: string,
  productId: string
): Promise<WishlistMutationResponse> => {
  return await apiPost<WishlistMutationResponse>("/api/v1/wishlist", {
    userId,
    productId,
  });
};

// DELETE /api/v1/wishlist/:productId?userId=...
export const removeFromWishlist = async (
  userId: string,
  productId: string
): Promise<WishlistMutationResponse> => {
  return await apiDelete<WishlistMutationResponse>(
    `/api/v1/wishlist/${encodeURIComponent(
      productId
    )}?userId=${encodeURIComponent(userId)}`
  );
};
