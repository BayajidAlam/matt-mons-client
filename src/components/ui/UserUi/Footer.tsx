import React from "react";
import { Layout } from "antd";
const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: "center", height: "80px" }}>
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </AntFooter>
  );
};

export default Footer;
