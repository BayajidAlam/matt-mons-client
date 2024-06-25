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

    // get single
    getSingleSellsManager: build.query({
      query: (id: string) => ({
        url: `${MANAGER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.sells_manager],
    }),

    // update
    updateSellsManager: build.mutation({
      query: (data: any) => ({
        url: `${MANAGER_URL}/${data?.id}`,
        method: "PATCH",
        data: data?.data,
      }),
      invalidatesTags: [tagTypes.sells_manager],
    }),

    // delete
    deleteSellsManager: build.mutation({
      query: (id: string) => ({
        url: `${MANAGER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.sells_manager],
    }),
  }),
});

export const {
  useGetAllManagerQuery,
  useGetSingleSellsManagerQuery,
  useUpdateSellsManagerMutation,
  useDeleteSellsManagerMutation
} = managerApi;
