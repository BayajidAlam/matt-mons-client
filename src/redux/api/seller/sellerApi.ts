import { tagTypes } from '@/redux/tag-types';
import { baseApi } from '../baseApi';

const  SELLER_URL = '/sellers';

export const sellerApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // create
    // createAccountType: build.mutation({
    //   query: (data: any) => ({
    //     url: `${SELLER_URL}/create`,
    //     method: 'POST',
    //     data: data,
    //   }),
    //   invalidatesTags: [tagTypes.accountType],
    // }),

    // get single
    getSingleSeller: build.query({
      query: (id: string) => ({
        url: `${ SELLER_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.seller],
    }),

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

export const {
 useGetSingleSellerQuery
} = sellerApi;