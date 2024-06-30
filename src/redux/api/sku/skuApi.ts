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
      invalidatesTags: [tagTypes.sku],
    }),

    // get all
    getAllSkus: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${SKU_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.sku],
    }),

    // get single
    getSingleSku: build.query({
      query: (id: string) => ({
        url: `${SKU_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.sku],
    }),

    // update
    updateSku: build.mutation({
      query: (data: any) => ({
        url: `${SKU_URL}/${data?.id}`,
        method: "PATCH",
        data: data?.data,
      }),
      invalidatesTags: [tagTypes.sku],
    }),

    // delete
    deleteSku: build.mutation({
      query: (id: string) => ({
        url: `${SKU_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.sku],
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
