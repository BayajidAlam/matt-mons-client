import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const TAG_URL = "/tags";

export const tagsApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // create
    createTag: build.mutation({
      query: (data: any) => ({
        url: `${TAG_URL}/create-product-tags`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.tags],
    }),

    // get all
    getAllTags: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${TAG_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.tags],
    }),

    // get single
    getSingleTag: build.query({
      query: (id: string) => ({
        url: `${TAG_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.tags],
    }),

    // update
    updateTag: build.mutation({
      query: (data: any) => ({
        url: `${TAG_URL}/${data?.id}`,
        method: "PATCH",
        data: data?.data,
      }),
      invalidatesTags: [tagTypes.tags],
    }),

    // delete
    deleteTag: build.mutation({
      query: (id: string) => ({
        url: `${TAG_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.tags],
    }),
  }),
});

export const {
  useCreateTagMutation,
  useGetAllTagsQuery,
  useGetSingleTagQuery,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = tagsApi;
