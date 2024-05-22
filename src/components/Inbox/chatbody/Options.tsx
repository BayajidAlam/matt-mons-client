import {
  useCreateConversationMutation,
  useUpdateConversationMutation,
} from "@/redux/api/conversation/conversationApi";
import { getUserInfo } from "@/services/auth.service";
import { useState } from "react";

export default function Options({ info }: { info?: any }) {
  const [message, setMessage] = useState("");
  const [createConversation, { isLoading, isSuccess }] =
    useCreateConversationMutation();
  const [updateConversation, { isLoading: ul, isSuccess: us }] =
    useUpdateConversationMutation();

  const user = getUserInfo() as any;

  // useEffect(() => {
  //   if (isSuccess) {
  //     setMessage("");
  //   }
  // }, [isSuccess]);

  // const participantUser =
  //   info.receiver.email !== loggedInUser.email ? info.receiver : info.sender;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createConversation({
      participants: `${user?.id}_${info.conversation.receiverId}`,
      senderId: user?.id,
      receiverId: info.conversation.receiverId,
      message,
    });
    setMessage("");
    // updateConversation({
    //   id: info.conversation.id,
    //   data: {
    //     senderId: user?.id,
    //     receiverId: info.conversation.receiverId,
    //     message,
    //   },
    // });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between w-full p-3 border-t border-gray-300"
    >
      <input
        type="text"
        placeholder="Message"
        className="block w-full py-2 pl-4 mx-3 bg-gray-100 focus:ring-1 focus:ring-blue-500 rounded-full outline-none focus:text-gray-700"
        name="message"
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button type="submit">
        <svg
          className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>
    </form>
  );
}
