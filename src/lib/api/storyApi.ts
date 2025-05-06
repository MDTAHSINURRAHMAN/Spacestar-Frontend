import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StoryEntry } from "@/types/story";

export const storyApi = createApi({
  reducerPath: "storyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/story`,
    credentials: "include",
  }),
  tagTypes: ["Story"],
  endpoints: (builder) => ({
    getAllStories: builder.query<StoryEntry[], void>({
      query: () => "/",
      providesTags: ["Story"],
    }),

    getStoryById: builder.query<StoryEntry, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Story", id }],
    }),
  }),
});

export const { useGetAllStoriesQuery, useGetStoryByIdQuery } = storyApi;
