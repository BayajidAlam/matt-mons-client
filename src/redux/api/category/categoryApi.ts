import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const CATEGORY_URL = "/admin";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // get all
    getAllCategory: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${CATEGORY_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.category],
    }),
  }),
});

export const { useGetAllCategoryQuery } = categoryApi;
