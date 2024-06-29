import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const SKU_URL = "/skus";

export const skuApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // create
    createSku: build.mutation({
      query: (data: any) => ({
        url: `${SKU_URL}/create-product-sku`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.color],
    }),

    // get all
    getAllSkus: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${SKU_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.color],
    }),

    // get single
    getSingleSku: build.query({
      query: (id: string) => ({
        url: `${SKU_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.color],
    }),

    // update
    updateSku: build.mutation({
      query: (data: any) => ({
        url: `${SKU_URL}/${data?.id}`,
        method: "PATCH",
        data: data?.data,
      }),
      invalidatesTags: [tagTypes.color],
    }),

    // delete
    deleteSku: build.mutation({
      query: (id: string) => ({
        url: `${SKU_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.color],
    }),
  }),
});

export const {
  useCreateSkuMutation,
  useGetAllSkusQuery,
  useGetSingleSkuQuery,
  useUpdateSkuMutation,
  useDeleteSkuMutation,
} = skuApi;
