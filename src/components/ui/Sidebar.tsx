"use client";

import { useState } from "react";
import { Layout, Menu } from "antd";
import { sidebarItems } from "@/constants/sidebarItems";
import { getUserInfo } from "@/services/auth.service";
import { usePathname, useRouter } from "next/navigation";
const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const role = USER_ROLE.ADMIN;
  const { role } = getUserInfo() as any;
  // console.log(role);
  const pathName = usePathname();
  const router = useRouter();

  return (
    <section className="hidden sm:block">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={270}
        breakpoint="lg"
        style={{
          // overflow: "auto",
          height: "100vh",
          position: "sticky",
          backgroundColor: "white",
          //  boxShadow: "10px 0 5px -2px #D1D5DB",
          // left: 0,
          top: 0,
          bottom: 0,
          padding: "0px",
        }}
      >
        <div
          onClick={() => router.push("/dashboard")}
          style={{
            color: "Black",
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            margin: "8px 0",
            cursor: "pointer",
          }}
        >
          {collapsed ? "ECS" : "E COM SYS"}
        </div>
        <Menu
          items={sidebarItems(role)}
          theme="light"
          defaultSelectedKeys={[`${pathName}`]}
          selectedKeys={[`${pathName}`]}
          mode="inline"
          style={{
            overflow: "auto",
            height: "calc(100vh - 112px)",
            position: "sticky",
            // backgroundColor: "white",
            //  boxShadow: "10px 0 5px -2px #D1D5DB",
            // left: 0,
            // top: 48,
            top: collapsed ? 64 : 48,
            bottom: 48,
          }}
        />
      </Sider>
    </section>
  );
};

export default SideBar;
