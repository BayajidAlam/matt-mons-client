import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tag-types";

const USER_URL = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // create
    createSellsManager: build.mutation({
      query: (data: any) => ({
        url: `${USER_URL}/create-sells-manager`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.sells_manager],
    }),

    //  create customer
    createCustomer: build.mutation({
      query: (data: any) => ({
        url: `${USER_URL}/create-customer`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.customer],
    }),

    // get all
    getAllUser: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${USER_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any[], meta: IMeta) => {
        return {
          users: response,
          meta,
        };
      },
      providesTags: [tagTypes.user],
    }),

    // get single
    getSingleUser: build.query({
      query: (id: string) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.seller],
    }),
  }),
});

export const {
  useCreateCustomerMutation,
  useGetAllUserQuery,
  useCreateSellsManagerMutation,
  useGetSingleUserQuery
} = userApi;
