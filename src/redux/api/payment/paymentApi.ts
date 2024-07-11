import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const PAYMENT_URL = "/colors";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // create
    createPayment: build.mutation({
      query: (data: any) => ({
        url: `${PAYMENT_URL}/create-payment-intent`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.color],
    }),
    //   // get all
    //   getAllColors: build.query({
    //     query: (arg: Record<string, any>) => ({
    //       url: `${PAYMENT_URL}`,
    //       method: "GET",
    //       params: arg,
    //     }),
    //     providesTags: [tagTypes.color],
    //   }),

    //   // get single
    //   getSingleColor: build.query({
    //     query: (id: string) => ({
    //       url: `${PAYMENT_URL}/${id}`,
    //       method: "GET",
    //     }),
    //     providesTags: [tagTypes.color],
    //   }),

    //   // update
    //   updateColor: build.mutation({
    //     query: (data: any) => ({
    //       url: `${PAYMENT_URL}/${data?.id}`,
    //       method: "PATCH",
    //       data: data?.data,
    //     }),
    //     invalidatesTags: [tagTypes.color],
    //   }),

    //   // delete
    //   deleteColor: build.mutation({
    //     query: (id: string) => ({
    //       url: `${PAYMENT_URL}/${id}`,
    //       method: "DELETE",
    //     }),
    //     invalidatesTags: [tagTypes.color],
    //   }),
  }),
});

export const { useCreatePaymentMutation } = paymentApi;
