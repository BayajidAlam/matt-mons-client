import io from "socket.io-client";
import { baseApi } from "../baseApi";
const CONVERSATION_URL = "/conversations";

export const conversationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all
    getAllConversation: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${CONVERSATION_URL}`,
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
            console.log(data);
            updateCachedData((draft) => {
              const conversation = draft?.find(
                (c: any) => c.id === data?.conversation?.id
              );
              if (conversation?.id) {
                conversation.message = data?.conversation?.message;
                conversation.updatedAt = data?.conversation?.updatedAt;
              } else if (
                data?.conversation?.participants.includes(arg?.searchTerm)
              ) {
                draft.unshift(data?.conversation);
              }
            });
          });
        } catch (error) {
          await cacheEntryRemoved;
          socket.close();
        }
      },
      // providesTags: [tagTypes.conversations],
    }),

    // get single
    getSingleConversation: builder.query({
      query: (id: string) => ({
        url: `${CONVERSATION_URL}/${id}`,
        method: "GET",
      }),
      // providesTags: [tagTypes.conversation],
    }),

    // create
    createConversation: builder.mutation({
      query: (data) => ({
        url: `${CONVERSATION_URL}/create-conversation`,
        method: "POST",
        data: data,
      }),
      // invalidatesTags: [tagTypes.conversations, tagTypes.messages],
    }),

    // update
    updateConversation: builder.mutation({
      query: (data) => ({
        url: `${CONVERSATION_URL}/${data?.id}`,
        method: "PATCH",
        data: data?.data,
      }),
      // invalidatesTags: [tagTypes.conversations],
    }),
  }),
});

export const {
  useCreateConversationMutation,
  useGetAllConversationQuery,
  useGetSingleConversationQuery,
  useUpdateConversationMutation,
} = conversationApi;
