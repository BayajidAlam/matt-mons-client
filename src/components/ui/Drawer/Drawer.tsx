import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import EComLogo from "@/assets/e-com-logo.png";
import UserSideBarMenu from "../Menu/UserSideBarMenu";

const DrawerComponent = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button className="lg:hidden " onClick={showDrawer}>
        {" "}
        <RxHamburgerMenu className="text-3xl" />
      </button>

      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        width={300}
      >
        <div className="">
          <Link className="lg:hidden block ml-8 mt-6" href="/home">
            <Image
              className="w-20"
              src={EComLogo}
              alt="logo"
              width={100}
              height={40}
            />
          </Link>
          <UserSideBarMenu />
        </div>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
