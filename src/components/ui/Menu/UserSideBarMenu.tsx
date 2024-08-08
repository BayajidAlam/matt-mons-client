import React, { useState } from "react";
import {
  AppstoreOutlined,
  HomeOutlined,
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    icon: <HomeOutlined />,
    label: (
      <Link className="text-sm" href={`/`}>
        Home
      </Link>
    ),
  },
  {
    key: "2",
    icon: <AiOutlineShopping />,
    label: (
      <Link className="text-sm" href={`/products`}>
        Products
      </Link>
    ),
  },
  {
    key: "3",
    icon: <IoBagCheckOutline />,
    label: (
      <Link className="text-sm" href={`/`}>
        My Orders
      </Link>
    ),
  },
  {
    key: "4",
    icon: <SettingOutlined />,
    label: "Settings",
    children: [
      { key: "profile", label: <Link href={`/user-profile`}>Profile</Link> },
      {
        key: "change-password",
        label: <Link href={`/change-password`}>Change Password</Link>,
      },
    ],
  },
];

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const levelKeys = getLevelKeys(items as LevelKeysProps[]);

const UserSideBarMenu = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(["2", "23"]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["1"]);

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  const onSelect: MenuProps["onSelect"] = ({ key }) => {
    setSelectedKeys([key]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        selectedKeys={selectedKeys}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        onSelect={onSelect}
        style={{ width: 256, flex: 1 }}
        items={items}
      />
      <Menu mode="inline" style={{ width: 256 }}>
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default UserSideBarMenu;