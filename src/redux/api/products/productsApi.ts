import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const PRODUCTS_URL = "/products";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // create
    // createAccountHead: build.mutation({
    //   query: (data: any) => ({
    //     url: `${ACCOUNT_HEAD_URL}/create`,
    //     method: 'POST',
    //     data: data,
    //   }),
    //   invalidatesTags: [tagTypes.accountHead],
    // }),

    // get all
    getAllProducts: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${PRODUCTS_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.sells_manager],
    }),

    // get single
    // getSingleSellsManager: build.query({
    //   query: (id: string) => ({
    //     url: `${PRODUCTS_URL}/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.sells_manager],
    // }),

    // update
    // updateSellsManager: build.mutation({
    //   query: (data: any) => ({
    //     url: `${PRODUCTS_URL}/${data?.id}`,
    //     method: "PATCH",
    //     data: data?.data,
    //   }),
    //   invalidatesTags: [tagTypes.sells_manager],
    // }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
