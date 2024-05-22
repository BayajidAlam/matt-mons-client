import { getUserInfo } from "@/services/auth.service";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

export default function ChatHead({ message }: { message?: any }) {
  const user = getUserInfo() as any;

  const { sender, receiver } = message?.conversation;

  // const partnerImage =
  //   sender.email === user.email ? receiver.email : sender.email;
  // const partnerName = sender.email === user.email ? receiver.name : sender.name;
  return (
    <div className="relative flex items-center p-3 border-b border-gray-300">
      {/* <img
        className="object-cover w-10 h-10 rounded-full"
        src={partnerImage}
        alt={receiver.userName}
      /> */}
      <Avatar size={48} icon={<UserOutlined />} />
      <span className="block ml-2 font-bold text-gray-600">
        {sender?.id === user?.id ? receiver?.userName : sender?.userName}
      </span>
    </div>
  );
}
