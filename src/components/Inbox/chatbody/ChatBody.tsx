// import Blank from "./Blank";

import { useGetAllMessageQuery } from "@/redux/api/message/messageApi";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";
import Loader from "@/components/Utils/Loader";

export default function ChatBody({ id }: { id?: any }) {
  const {
    data: messages,
    isLoading,
    isError,
    error,
  } = useGetAllMessageQuery({ conversationId: id }) || {};

  // console.log(id, messages);

  // const { data: messages, totalCount } = data || {};

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <Loader className="h-[40vh] flex items-end justify-center" />;
  } else if (!isLoading && isError) {
    content = <div>{/* <Error message={error?.data} /> */}</div>;
  } else if (!isLoading && !isError && messages?.length === 0) {
    content = <div>No messages found</div>;
  } else if (!isLoading && !isError && messages?.length > 0) {
    content = (
      <>
        <ChatHead message={messages[0]} />
        <Messages messages={messages} totalCount={messages?.length} />
        <Options info={messages[0]} />
      </>
    );
  }
  return (
    <div className="w-full lg:col-span-2 lg:block">
      <div className="w-full grid conversation-row-grid">{content}</div>
    </div>
  );
}
