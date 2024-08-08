"use client";
import React from "react";
import EComLogo from "@/assets/e-com-logo.png";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
import Link from "next/link";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Button, Dropdown, MenuProps } from "antd";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { UserInfo } from "@/types";
import { useGetAllCartQuery } from "@/redux/api/cart/cartApi";
import DrawerComponent from "../../Drawer/Drawer";
import { authKey } from "@/constants/storagekey";
import { useRouter } from "next/navigation";

const MainHeader = () => {
  const query: Record<string, any> = {};
  const { id } = getUserInfo() as UserInfo;
  const router = useRouter();

  query["limit"] = 100;
  query["page"] = 1;
  query["userId"] = id;

  const { data: cartAllData, isLoading } = useGetAllCartQuery({ ...query });
  const quantity = cartAllData?.data?.cartItems?.length;

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Link className="text-sm" href={`/user-profile`}>
          Profile
        </Link>
      ),
    },
    {
      key: "1",
      label: (
        <Link className="text-sm" href={`/change-password`}>
          Change password
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <button onClick={logOut}>Logout</button>
      ),
    },
  ];

  return (
    <div className=" w-[92%] md:w-[95%] lg:w-[90%] xl:w-[70%] mx-auto py-8 px-1">
      <div className="flex justify-between items-center gap-12">
        <div className="flex justify-start items-start gap-2">
          <DrawerComponent />
          <Link className="hidden lg:block" href="/home">
            <Image
              className="w-20"
              src={EComLogo}
              alt="logo"
              width={100}
              height={40}
            />
          </Link>
        </div>

        <form className="hidden md:flex mx-auto w-[40%] px-6 rounded-full bg-[#f5f5f5]   focus-within:border-gray-300 h-[40px]">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0 text-xs"
            name="topic"
          />

          <div className="flex justify-center items-center">
            <IoIosSearch className="text-2xl text-brandMainColor" />
          </div>
        </form>

        <div className="hidden lg:flex justify-center items-center gap-2 ">
          <IoCallOutline className="text-3xl" />
          <div>
            <p className="text-[11px]">CALL US NOW</p>
            <h1 className="text-[18px] font-bold">+123 5678 890</h1>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4">
          <IoIosSearch className="text-3xl text-black block md:hidden " />

          <Link className="text-black" href={`/wishlists`}>
            <HeartOutlined className="text-2xl" />
          </Link>
          <Badge count={quantity}>
            <div className="relative">
              <Link className="text-black" href={`/cart`}>
                <ShoppingCartOutlined className="text-2xl" />
              </Link>
            </div>
          </Badge>

          <div className="hidden lg:block">
            <Dropdown menu={{ items }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <UserOutlined className="text-2xl" />
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
