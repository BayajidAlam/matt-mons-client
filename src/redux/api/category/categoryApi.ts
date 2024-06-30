import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const CATEGORY_URL = "/categories";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // create
    createCategory: build.mutation({
      query: (data: any) => ({
        url: `${CATEGORY_URL}/create-category`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.category],
    }),

    // get all
    getAllCategory: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${CATEGORY_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.category],
    }),

    // get single
    getSingleCategory: build.query({
      query: (id: string) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),

    // update
    updateCategory: build.mutation({
      query: (data: any) => ({
        url: `${CATEGORY_URL}/${data?.id}`,
        method: "PATCH",
        data: data?.data,
      }),
      invalidatesTags: [tagTypes.category],
    }),

    // delete
    deleteCategory: build.mutation({
      query: (id: string) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useCreateCategoryMutation,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
