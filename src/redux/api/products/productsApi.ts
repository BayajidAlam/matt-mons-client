import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const PRODUCTS_URL = "/products";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // create
    createProduct: build.mutation({
      query: (data: any) => ({
        url: `${PRODUCTS_URL}/create-product`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.product],
    }),

    // get all
    getAllProducts: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${PRODUCTS_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.product],
    }),

    // get all today best sells for home
    getAllTodayBestSellsProducts: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${PRODUCTS_URL}/daily-best-sell`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.product],
    }),

    // get all products
    getAllProductInfinity: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${PRODUCTS_URL}/product-feed`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.product],
    }),

    // get single
    getSingProduct: build.query({
      query: (id: string) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),

    // update
    updateProduct: build.mutation({
      query: (data: any) => ({
        url: `${PRODUCTS_URL}/${data?.id}`,
        method: "PATCH",
        data: data?.data,
      }),
      invalidatesTags: [tagTypes.product],
    }),

    // delete
    deleteProduct: build.mutation({
      query: (id: string) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetAllTodayBestSellsProductsQuery,
  useGetAllProductInfinityQuery,
  useGetSingProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
