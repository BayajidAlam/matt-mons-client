import Conversation from "@/components/Inbox/Conversation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ECOM | Inbox",
};

const InboxPage = () => {
  return <Conversation />;
};

export default InboxPage;
