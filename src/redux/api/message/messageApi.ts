// import { IMeta } from "@/types";
import { io } from "socket.io-client";
import { baseApi } from "../baseApi";

const MESSAGE_URL = "/messages";

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create
    createMessage: builder.mutation({
      query: (data) => ({
        url: `${MESSAGE_URL}/create-message`,
        method: "POST",
        data: data,
      }),
      // invalidatesTags: [tagTypes.messages],
    }),

    // get all
    getAllMessage: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${MESSAGE_URL}`,
        method: "GET",
        params: arg,
      }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create socket
        const socket = io(`${process.env.NEXT_PUBLIC_API_SOCKET_URL}`, {
          reconnectionDelay: 1000,
          reconnection: true,
          reconnectionAttempts: 10,
          transports: ["websocket"],
          agent: false,
          upgrade: false,
          rejectUnauthorized: false,
        });
        try {
          await cacheDataLoaded;
          socket.on("conversation-message", (data) => {
            // console.log(data);
            updateCachedData((draft) => {
              if (arg?.conversationId === data?.message?.conversationId) {
                draft.unshift(data?.message);
              }
            });
          });
        } catch (error) {
          await cacheEntryRemoved;
          socket.close();
        }
      },
      // providesTags: [tagTypes.messages],
    }),

    // get single
    getSingleMessage: builder.query({
      query: (id: string) => ({
        url: `${MESSAGE_URL}/${id}`,
        method: "GET",
      }),
      // providesTags: [tagTypes.message],
    }),

    // update
    updateMessage: builder.mutation({
      query: (data) => ({
        url: `${MESSAGE_URL}/${data?.id}`,
        method: "PATCH",
        data: data?.data,
      }),
      // invalidatesTags: [tagTypes.messages],
    }),
  }),
});

export const {
  useCreateMessageMutation,
  useGetAllMessageQuery,
  useGetSingleMessageQuery,
  useUpdateMessageMutation,
} = messageApi;