import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const SIZE_URL = "/sizes";

export const sizeApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // create
    createSize: build.mutation({
      query: (data: any) => ({
        url: `${SIZE_URL}/create-size`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.color],
    }),

    // get all
    getAllSizes: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${SIZE_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.color],
    }),

    // get single
    getSingleSize: build.query({
      query: (id: string) => ({
        url: `${SIZE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.color],
    }),

    // update
    updateSize: build.mutation({
      query: (data: any) => ({
        url: `${SIZE_URL}/${data?.id}`,
        method: "PATCH",
        data: data?.data,
      }),
      invalidatesTags: [tagTypes.color],
    }),

    // delete
    deleteSize: build.mutation({
      query: (id: string) => ({
        url: `${SIZE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.color],
    }),
  }),
});

export const {
  useGetAllSizesQuery,
  useCreateSizeMutation,
  useGetSingleSizeQuery,
  useUpdateSizeMutation,
  useDeleteSizeMutation,
} = sizeApi;
