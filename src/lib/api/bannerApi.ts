// lib/api/bannerApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BannerEntry } from "@/types/banner";

export const bannerApi = createApi({
  reducerPath: "bannerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/api",
    credentials: "include",
    // Add timeout to prevent hanging requests
    timeout: 30000,
  }),
  tagTypes: ["Banner"],
  endpoints: (builder) => ({
    getBanner: builder.query<BannerEntry, void>({
      query: () => "/banner",
      providesTags: ["Banner"],
    }),
  }),
});

export const { useGetBannerQuery } = bannerApi;
