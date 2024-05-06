"use client";
import { Layout } from "antd";
import Header from "../Header";
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

      <div
        style={{
          height: `calc(100vh - 80px - 80px)`,
          color: "white"
        }}
      >
        {children}
      </div>
      <Footer />
    </Content>
  );
};

export default UserContents;
