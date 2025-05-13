// lib/api/aboutApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AboutContent } from "@/types/about";

export const aboutApi = createApi({
  reducerPath: "aboutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/api/about",
    credentials: "include",
  }),
  tagTypes: ["About"],
  endpoints: (builder) => ({
    getAboutContent: builder.query<AboutContent | null, void>({
      query: () => "/",
      providesTags: ["About"],
    }),
  }),
});

export const { useGetAboutContentQuery } = aboutApi;
