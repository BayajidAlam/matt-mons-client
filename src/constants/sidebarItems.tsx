import type { MenuProps } from "antd";
import {
  ProfileOutlined,
  MessageOutlined,
  DashboardOutlined,
  HomeOutlined,
  ShopOutlined,
  UserSwitchOutlined,
  SettingOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";

export const sidebarItems = (role: string, shopCount: number) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      key: "/home",
      label: (
        <Link className="text-sm" href={`/`}>
          Home
        </Link>
      ),
      icon: <HomeOutlined />,
    },
    {
      label: (
        <Link className="text-sm " href={`/dashboard`}>
          Dashboard
        </Link>
      ),
      key: "/dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: (
        <Link className="text-sm " href={`/inbox`}>
          Inbox
        </Link>
      ),
      key: "/inbox",
      icon: <MessageOutlined />,
    },
  ];

  const commonUserProfile: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
        {
          label: <Link href={`/forgot-password`}>Change Password</Link>,
          key: `/${role}/forgot-password`,
        },
      ],
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonUserProfile,
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonUserProfile,
  ];

  const createShopForNewSeller: MenuProps["items"] = [
    {
      key: "/seller/create-shop",
      label: (
        <Link className="text-sm" href={`/seller/create-shop`}>
          Create Shop
        </Link>
      ),
      icon: <HomeOutlined />,
    },
  ];

  const sellerWithShopSidebarItems: MenuProps["items"] = [
    {
      label: "Manage order",
      key: "manage-orders",
      icon: <ShoppingOutlined />,
      children: [
        {
          label: <Link href={`/${role}/orders`}>Orders</Link>,
          key: `/${role}/orders`,
        },
        {
          label: (
            <Link href={`/${role}/delivered-orders`}>Delivered orders</Link>
          ),
          key: `/${role}/delivered-orders`,
        },
        {
          label: <Link href={`/${role}/returns`}>Canceled orders</Link>,
          key: `/${role}/returns`,
        },
      ],
    },
    {
      label: "Manage product",
      key: "manage-products",
      icon: <ShopOutlined />,
      children: [
        {
          label: <Link href={`/${role}/products`}>Products</Link>,
          key: `/${role}/products`,
        },
        {
          label: <Link href={`/${role}/cupons`}>Cupons</Link>,
          key: `/${role}/cupons`,
        },
        {
          label: <Link href={`/${role}/category`}>Category</Link>,
          key: `/${role}/category`,
        },
        {
          label: <Link href={`/${role}/tags`}>Tags</Link>,
          key: `/${role}/tags`,
        },
        {
          label: <Link href={`/${role}/skus`}>SKUS</Link>,
          key: `/${role}/skus`,
        },
        {
          label: <Link href={`/${role}/color`}>Color</Link>,
          key: `/${role}/color`,
        },
        {
          label: <Link href={`/${role}/size`}>Size</Link>,
          key: `/${role}/size`,
        },
      ],
    },
    {
      label: "Manage Users",
      key: "shop-users",
      icon: <UserSwitchOutlined />,
      children: [
        {
          label: <Link href={`/${role}/managers`}>Managers</Link>,
          key: `/${role}/managers`,
        },
        {
          label: <Link href={`/${role}/customers`}>Customers</Link>,
          key: `/${role}/customers`,
        },
      ],
    },
    {
      label: (
        <Link className="text-sm " href={`/${role}/shop-settings`}>
          Shop Settings
        </Link>
      ),
      key: "/shop-settings",
      icon: <SettingOutlined />,
    },
  ];

  let sellerSidebarItems: MenuProps["items"] = [...defaultSidebarItems];

  //if seller has a shop
  if (role == USER_ROLE.SELLER && shopCount > 0) {
    sellerSidebarItems.push(...sellerWithShopSidebarItems);
  }
  //if seller does not have any shop give him option to create shop
  else {
    sellerSidebarItems.push(...createShopForNewSeller);
  }
  //push the profile to last of the list
  sellerSidebarItems.push(...commonUserProfile);

  const sellsManagerSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: "Manage order",
      key: "manage-orders",
      icon: <ShoppingOutlined />,
      children: [
        {
          label: <Link href={`/${role}/orders`}>Orders</Link>,
          key: `/${role}/orders`,
        },
        {
          label: (
            <Link href={`/${role}/delivered-orders`}>Delivered orders</Link>
          ),
          key: `/${role}/delivered-orders`,
        },
        {
          label: <Link href={`/${role}/returns`}>Canceled orders</Link>,
          key: `/${role}/returns`,
        },
      ],
    },
    {
      label: "Manage product",
      key: "manage-products",
      icon: <ShopOutlined />,
      children: [
        {
          label: <Link href={`/${role}/products`}>Products</Link>,
          key: `/${role}/products`,
        },
        {
          label: <Link href={`/${role}/category`}>Category</Link>,
          key: `/${role}/category`,
        },
        {
          label: <Link href={`/${role}/tags`}>Tags</Link>,
          key: `/${role}/tags`,
        },
        {
          label: <Link href={`/${role}/skus`}>SKUS</Link>,
          key: `/${role}/skus`,
        },
        {
          label: <Link href={`/${role}/color`}>Color</Link>,
          key: `/${role}/color`,
        },
        {
          label: <Link href={`/${role}/size`}>Size</Link>,
          key: `/${role}/size`,
        },
      ],
    },
    ...commonUserProfile,
  ];

  const customerSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonUserProfile,
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.SELLER) return sellerSidebarItems;
  else if (role === USER_ROLE.SELLS_MANAGER) return sellsManagerSidebarItems;
  else {
    return customerSidebarItems;
  }
};
