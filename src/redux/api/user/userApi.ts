import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tag-types";

const USER_URL = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    //   //  create super admin
    //   createSuperAdmin: build.mutation({
    //     query: (data: any) => ({
    //       url: `${USER_URL}/create-super-admin`,
    //       method: 'POST',
    //       data: data,
    //     }),
    //     invalidatesTags: [tagTypes.customer],
    //   }),
    //   // create admin
    //   createAdmin: build.mutation({
    //     query: (data: any) => ({
    //       url: `${USER_URL}/create-admin`,
    //       method: 'POST',
    //       data: data,
    //     }),
    //     invalidatesTags: [tagTypes.user],
    //   }),

    //  create customer
    createCustomer: build.mutation({
      query: (data: any) => ({
        url: `${USER_URL}/create-customer`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.customer],
    }),

    //   // create driver
    //   createDriver: build.mutation({
    //     query: (data: any) => ({
    //       url: `${USER_URL}/create-driver`,
    //       method: 'POST',
    //       data: data,
    //     }),
    //     invalidatesTags: [tagTypes.user, tagTypes.driver],
    //   }),
    //   // create helper
    //   createHelper: build.mutation({
    //     query: (data: any) => ({
    //       url: `${USER_URL}/create-helper`,
    //       method: 'POST',
    //       data: data,
    //     }),
    //     invalidatesTags: [tagTypes.user],
    //   }),
    //   // get all
    //   getAllUser: build.query({
    //     query: (arg: Record<string, any>) => ({
    //       url: `${USER_URL}`,
    //       method: "GET",
    //       params: arg,
    //     }),
    //     transformResponse: (response: any[], meta: IMeta) => {
    //       return {
    //         users: response,
    //         meta,
    //       };
    //     },
    //     providesTags: [tagTypes.user],
    //   }),
  }),
});

export const { useCreateCustomerMutation } = userApi;
