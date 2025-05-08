import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Cart, CartItem } from "@/types/cart";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/api/cart",
    credentials: "include",
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query<Cart, string>({
      query: (cartId) => `/${cartId}`,
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation<Cart, { cartId: string; item: Omit<CartItem, "_id" | "shippingDate" | "total" | "addedAt"> }>({
      query: ({ cartId, item }) => ({
        url: `/${cartId}/add`,
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCartItem: builder.mutation<Cart, { cartId: string; itemId: string; updates: Partial<Pick<CartItem, "size" | "color" | "quantity">> }>({
      query: ({ cartId, itemId, updates }) => ({
        url: `/${cartId}/item/${itemId}`,
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: ["Cart"],
    }),

    deleteCartItem: builder.mutation<Cart, { cartId: string; itemId: string }>({
      query: ({ cartId, itemId }) => ({
        url: `/${cartId}/item/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    clearCart: builder.mutation<{ message: string; cartId: string }, string>({
      query: (cartId) => ({
        url: `/${cartId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    generateCartId: builder.query<{ cartId: string; cart: Cart }, void>({
      query: () => `/new`,
    }),

    addSizeVariant: builder.mutation<Cart, { cartId: string; productId: string; size: string; quantity?: number }>({
      query: ({ cartId, productId, size, quantity }) => ({
        url: `/${cartId}/add-size/${productId}`,
        method: "POST",
        body: { size, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
  useClearCartMutation,
  useGenerateCartIdQuery,
  useAddSizeVariantMutation,
} = cartApi;
