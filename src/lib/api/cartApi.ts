import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CartItem } from "@/lib/features/cartSlice";

interface GenerateCartIdResponse {
  cartId: string;
}

interface AddToCartRequest {
  cartId: string;
  item: Omit<CartItem, "_id" | "total">;
}

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/api/cart",
    credentials: "include",
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    generateCartId: builder.query<GenerateCartIdResponse, void>({
      query: () => "/generate",
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation<CartItem, AddToCartRequest>({
      query: (data) => ({
        url: "/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useGenerateCartIdQuery, useAddToCartMutation } = cartApi;
