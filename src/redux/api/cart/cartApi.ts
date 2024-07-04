import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const CART_URL = "/cart";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // create
    createCart: build.mutation({
      query: (data: any) => ({
        url: `${CART_URL}/add-to-cart`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.cart],
    }),

    // get all
    getAllCart: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${CART_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.cart],
    }),

    // get single
    getSingleCart: build.query({
      query: (id: string) => ({
        url: `${CART_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.cart],
    }),

    // update
    updateCart: build.mutation({
      query: (data: any) => ({
        url: `${CART_URL}/${data?.id}`,
        method: "PATCH",
        data: data?.data,
      }),
      invalidatesTags: [tagTypes.cart],
    }),

    // delete
    deleteCart: build.mutation({
      query: (id: string) => ({
        url: `${CART_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.cart],
    }),
  }),
});

export const {
  useGetAllCartQuery,
  useCreateCartMutation,
  useGetSingleCartQuery,
  useUpdateCartMutation,
  useDeleteCartMutation,
} = cartApi;
