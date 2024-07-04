"use client";
import { Layout } from "antd";
import Footer from "./Footer";
import UserUiHeader from "./UserUiHeader";
const { Content } = Layout;

const UserContents = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content
      style={{
        minHeight: "100vh",
        color: "black",
      }}
    >
      <UserUiHeader />

      <div className="relative">{children}</div>
      <Footer />
    </Content>
  );
};

export default UserContents;
