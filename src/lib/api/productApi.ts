import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "@/types/product";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  tagTypes: ["Product", "Review"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], { search?: string; category?: string }>({
      query: (params) => {
        const query = new URLSearchParams();
    
        if (params?.search) query.append("search", params.search);
        if (params?.category) query.append("category", params.category);
    
        return `/api/products?${query.toString()}`;
      },
      providesTags: ["Product"],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `/api/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductQuery } = productApi;
