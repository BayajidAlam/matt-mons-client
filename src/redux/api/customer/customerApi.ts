import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const CUSTOMER_URL = "/customers";

export const customerApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // create
    // createCoupon: build.mutation({
    //   query: (data: any) => ({
    //     url: `${CUSTOMER_URL}/create-coupon`,
    //     method: "POST",
    //     data: data,
    //   }),
    //   invalidatesTags: [tagTypes.coupon],
    // }),

    // get all
    // getAllCustomer: build.query({
    //   query: (arg: Record<string, any>) => ({
    //     url: `${CUSTOMER_URL}`,
    //     method: "GET",
    //     params: arg,
    //   }),
    //   providesTags: [tagTypes.customer],
    // }),

    // get single
    getSingleCustomer: build.query({
      query: (id: string) => ({
        url: `${CUSTOMER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.customer],
    }),

    // update
    updateCustomer: build.mutation({
      query: (data: any) => ({
        url: `${CUSTOMER_URL}/${data?.id}`,
        method: "PATCH",
        data: data?.data,
      }),
      invalidatesTags: [tagTypes.customer],
    }),

    // delete
    // deleteCustomer: build.mutation({
    //   query: (id: string) => ({
    //     url: `${CUSTOMER_URL}/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [tagTypes.customer],
    // }),
  }),
});

export const { useGetSingleCustomerQuery, useUpdateCustomerMutation } = customerApi;
