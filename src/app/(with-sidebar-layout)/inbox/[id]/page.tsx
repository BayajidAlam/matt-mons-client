"use client";

import Sidebar from "@/components/Inbox/Sidebar";
import ChatBody from "@/components/Inbox/chatbody/ChatBody";
import { useGetAllMessageQuery } from "@/redux/api/message/messageApi";

const InboxDetailsPage = ({ params }: { params?: any }) => {
  const { id } = params;

  // const {
  //   data: messages,
  //   isLoading,
  //   isError,
  //   error,
  // } = useGetAllMessageQuery({ conversationId: id }) || {};

  // console.log(id, messages)

  return (
    <div className="max-w- mx-auto -mt-1">
      <div className="bg-white border border-blue-200 rounded-lg shadow-md shadow-blue-200 min-w-full flex lg:grid lg:grid-cols-3">
        <Sidebar />
        <ChatBody id={id} />
      </div>
    </div>
  );
};

export default InboxDetailsPage;
