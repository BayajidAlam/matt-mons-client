import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const WISHLIST_URL = "/wishlist";

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // create
    createWishlist: build.mutation({
      query: (data: any) => ({
        url: `${WISHLIST_URL}/add-to-wishlist`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.wishlist],
    }),

    // get all
    getWishlist: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${WISHLIST_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.wishlist],
    }),

    // delete
    deleteFromWishlist: build.mutation({
      query: (id: string) => ({
        url: `${WISHLIST_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.wishlist],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useCreateWishlistMutation,
  useDeleteFromWishlistMutation,
} = wishlistApi;
