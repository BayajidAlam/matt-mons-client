import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const ORDERS_URL = "/orders";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // create
    createNewOrders: build.mutation({
      query: (data: any) => ({
        url: `${ORDERS_URL}/create-order`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.orders],
    }),

    // get all
    getAllOrders: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${ORDERS_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.sells_manager, tagTypes.seller, tagTypes.orders],
    }),

    // get single
    getSingleOrder: build.query({
      query: (id: string) => ({
        url: `${ORDERS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.sells_manager, tagTypes.seller],
    }),

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

export const {
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useCreateNewOrdersMutation,
} = ordersApi;
