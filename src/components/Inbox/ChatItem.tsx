import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Image from "next/image";

export default function ChatItem({
  avatar,
  name,
  lastMessage,
  lastTime,
}: {
  avatar?: any;
  name?: any;
  lastMessage?: any;
  lastTime?: any;
}) {
  return (
    <div className="flex gap-2 items-center justify-center md:justify-normal p-3 text-sm border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none w-">
      <div>
        {avatar ? (
          <Image
            className="object-cover w-10 h-10 rounded-full"
            src={avatar}
            alt={name}
          />
        ) : (
          <Avatar size="large" icon={<UserOutlined />} />
        )}
      </div>
      <div className="w-full hidden md:block">
        <div className="flex justify-between">
          <span className="block font-semibold text-gray-600">{name}</span>
          <span className="block text-sm text-gray-600">{lastTime}</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-1 mt-1">{lastMessage}</p>
      </div>
    </div>
  );
}
