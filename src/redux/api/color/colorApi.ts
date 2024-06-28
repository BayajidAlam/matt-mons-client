import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const COLOR_URL = "/colors";

export const colorApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // create
    createColor: build.mutation({
      query: (data: any) => ({
        url: `${COLOR_URL}/create-color`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.color],
    }),

    // get all
    getAllColors: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${COLOR_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.color],
    }),

    // get single
    getSingleColor: build.query({
      query: (id: string) => ({
        url: `${COLOR_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.color],
    }),

    // update
    updateColor: build.mutation({
      query: (data: any) => ({
        url: `${COLOR_URL}/${data?.id}`,
        method: "PATCH",
        data: data?.data,
      }),
      invalidatesTags: [tagTypes.color],
    }),

    // delete
    deleteColor: build.mutation({
      query: (id: string) => ({
        url: `${COLOR_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.color],
    }),
  }),
});

export const {
  useGetAllColorsQuery,
  useCreateColorMutation,
  useGetSingleColorQuery,
  useUpdateColorMutation,
  useDeleteColorMutation,
} = colorApi;
