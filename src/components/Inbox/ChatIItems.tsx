import moment from "moment";
import { useDispatch } from "react-redux";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import { useState } from "react";
import ChatItem from "./ChatItem";
import Loading from "@/app/loading";
import { useGetAllConversationQuery } from "@/redux/api/conversation/conversationApi";

export default function ChatItems() {
  const [page, setPage] = useState(1);
  const user = getUserInfo() as any;

  const {
    data: conversations,
    isLoading,
    isError,
    error,
  } = useGetAllConversationQuery({
    searchTerm: user.id,
    // senderId: user.id,
    // receiverId: user.id,
  }) || {};

  // const { data: conversations, meta } = data || {};

  // console.log(user, conversations);

  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // useEffect(() => {
  //   if (page > 1) {
  //     dispatch(
  //       conversationsApi.endpoints.getMoreConversations.initiate({
  //         email: user.email,
  //         page,
  //       })
  //     );
  //   }
  // }, [page, dispatch, user.email]);

  // useEffect(() => {
  //   if (totalCount > 0) {
  //     const more =
  //       Math.ceil(
  //         totalCount / Number(process.env.REACT_APP_CONVERSATION_PER_PAGE)
  //       ) > page;
  //     setHasMore(more);
  //   }
  // }, [totalCount, page]);

  // decide what to render
  let content = null;

  if (isLoading) {
    // <Loader className="h-[40vh] flex items-end justify-center" />
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = (
      <li className="m-2 text-center">
        {/* <Error message={error?.data} /> */}
      </li>
    );
  } else if (!isLoading && !isError && conversations?.length === 0) {
    content = <li className="m-2 text-center">No conversations found</li>;
  } else if (!isLoading && !isError && conversations?.length > 0) {
    content = (
      <>
        {conversations.map((conversation: any) => {
          const { id, message, sender, receiver, updatedAt } = conversation;
          // const { name, email } = getPartnerInfo(
          //   conversation.users,
          //   user.email
          // );
          return (
            <li key={id}>
              <Link href={`/inbox/${id}`}>
                <ChatItem
                  // avatar={<UserOutlined />}
                  name={
                    sender?.id === user?.id
                      ? receiver?.userName
                      : sender?.userName
                  }
                  lastMessage={message}
                  lastTime={moment(updatedAt).fromNow()}
                />
              </Link>
            </li>
          );
        })}
        {/* <InfiniteScroll
          dataLength={conversations.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          height={window.innerHeight - 129}
        >
          {conversations.map((conversation: any) => {
            const { id, message, receiver, updatedAt } = conversation;
            // const { name, email } = getPartnerInfo(
            //   conversation.users,
            //   user.email
            // );
            return (
              <li key={id}>
                <Link href={`/inbox/${id}`}>
                  <ChatItem
                    // avatar={gravatarUrl(email, { size: 80 })}
                    name={receiver.username}
                    lastMessage={message}
                    lastTime={moment(updatedAt).fromNow()}
                  />
                </Link>
              </li>
            );
          })}
        </InfiniteScroll> */}
      </>
    );
  }

  return <ul>{content}</ul>;
}
