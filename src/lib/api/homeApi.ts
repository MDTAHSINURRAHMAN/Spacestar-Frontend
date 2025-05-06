import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TextEntry } from "@/types/home";



export const homeApi = createApi({
    reducerPath: "homeApi",
    baseQuery: fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_API_URL + "/api/home", // ✅ FIXED
      credentials: "include",
    }),
    tagTypes: ["Texts"],
    endpoints: (builder) => ({
      getAllTexts: builder.query<TextEntry[], void>({
        query: () => "/",
        providesTags: ["Texts"],
      }),
    }),
  });

  export const {
    useGetAllTextsQuery,
  } = homeApi;
  