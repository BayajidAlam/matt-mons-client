import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const COUPON_URL = "/coupons";

export const couponApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // create
    createCoupon: build.mutation({
      query: (data: any) => ({
        url: `${COUPON_URL}/create-coupon`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.coupon],
    }),

    // get all
    getAllCoupon: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${COUPON_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.coupon],
    }),

    // get single
    getSingleCoupon: build.query({
      query: (id: string) => ({
        url: `${COUPON_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.coupon],
    }),

    // get single by title
    getSingleCouponByTitle: build.query({
      query: (id: string) => ({
        url: `${COUPON_URL}/title`,
        method: "GET",
      }),
      providesTags: [tagTypes.coupon],
    }),

    // update
    updateCoupon: build.mutation({
      query: (data: any) => ({
        url: `${COUPON_URL}/${data?.id}`,
        method: "PATCH",
        data: data?.data,
      }),
      invalidatesTags: [tagTypes.coupon],
    }),

    // delete
    deleteCoupon: build.mutation({
      query: (id: string) => ({
        url: `${COUPON_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.coupon],
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useGetAllCouponQuery,
  useGetSingleCouponQuery,
  useGetSingleCouponByTitleQuery,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponApi;
