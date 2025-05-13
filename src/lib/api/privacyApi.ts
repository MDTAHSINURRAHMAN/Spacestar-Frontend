import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PrivacyEntry, TipTapContent } from "@/types/privacy";
import { storyApi } from "./storyApi";

interface ApiResponse {
  message: string;
  [key: string]: unknown;
}

interface PrivacyResponse extends ApiResponse {
  privacyId?: string;
  privacy?: PrivacyEntry;
}

interface RootState {
  storyApi: {
    queries: {
      [key: string]: {
        data?: PrivacyEntry[];
      };
    };
  };
}

export const privacyApi = createApi({
  reducerPath: "privacyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/privacy`,
    credentials: "include",
  }),
  tagTypes: ["Privacy"],
  endpoints: (builder) => ({
    getAllPrivacy: builder.query<PrivacyEntry[], void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      transformResponse: (response: PrivacyEntry[] | null) => {
        console.log("Raw API Response:", response);
        return response || [];
      },
      transformErrorResponse: (response) => {
        console.error("API Error:", response);
        return response;
      },
      providesTags: ["Privacy"],
    }),

    getPrivacyById: builder.query<PrivacyEntry, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Privacy", id }],
    }),

    createPrivacy: builder.mutation<PrivacyResponse, FormData>({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Privacy"],
    }),

    updatePrivacy: builder.mutation<
      PrivacyResponse,
      { id: string; formData: FormData; content: TipTapContent }
    >({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: formData,
      }),
      async onQueryStarted(
        { id, content },
        { dispatch, queryFulfilled, getState }
      ) {
        // Get current cache data
        const state = getState() as RootState;
        const privacies =
          state.privacyApi.queries["getAllPrivacy(undefined)"]?.data;

        if (privacies) {
          // Apply optimistic update to getAllPrivacy cache
          const optimisticPatch = dispatch(
            privacyApi.util.updateQueryData(
              "getAllPrivacy",
              undefined,
              (draft) => {
                const privacyIndex = draft.findIndex((privacy) => privacy._id === id);
                if (privacyIndex !== -1) {
                  draft[privacyIndex].content = content;
                }
              }
            )
          );

          // Also update the single story cache if it exists
          const singlePrivacyPatch = dispatch(
            privacyApi.util.updateQueryData("getPrivacyById", id, (draft) => {
              draft.content = content;
            })
          );

          try {
            await queryFulfilled;
          } catch {
            // If the mutation fails, undo the optimistic update
            optimisticPatch.undo();
            singlePrivacyPatch.undo();
          }
        }
      },
      invalidatesTags: (result, error, { id }) => [
        "Privacy",
        { type: "Privacy", id },
      ],
    }),

    deletePrivacy: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Privacy"],
    }),
  }),
});

export const {
  useGetAllPrivacyQuery,
  useGetPrivacyByIdQuery,
  useCreatePrivacyMutation,
  useUpdatePrivacyMutation,
  useDeletePrivacyMutation,
} = privacyApi;
