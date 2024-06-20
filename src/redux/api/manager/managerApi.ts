import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { IMeta } from "@/types";

const MANAGER_URL = "/sells-managers";

export const managerApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // get all
    getAllManager: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${MANAGER_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.sells_manager],
    }),

    // create
    // createAccountType: build.mutation({
    //   query: (data: any) => ({
    //     url: `${MANAGER_URL}/create`,
    //     method: 'POST',
    //     data: data,
    //   }),
    //   invalidatesTags: [tagTypes.accountType],
    // }),

    // get single
    // getSingleSeller: build.query({
    //   query: (id: string) => ({
    //     url: `${MANAGER_URL}/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.seller],
    // }),

    // update
    // updateAccountType: build.mutation({
    //   query: (data: any) => ({
    //     url: `${ACCOUNT_TYPE_URL}/${data?.id}`,
    //     method: 'PATCH',
    //     data: data?.data,
    //   }),
    //   invalidatesTags: [tagTypes.accountType],
    // }),
  }),
});

export const { useGetAllManagerQuery } = managerApi;
