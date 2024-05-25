import React from "react";
import EComLogo from "@/assets/e-com-logo.png";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { CiHeart } from "react-icons/ci";
import { LiaShoppingBagSolid } from "react-icons/lia";
import Link from "next/link";

const MainHeader = () => {
  return (
    <div className=" w-[92%] md:w-[95%] lg:w-[90%] xl:w-[70%] mx-auto py-8 px-1">
      <div className="flex justify-between items-center gap-12">
        <Link href="/home">
          <Image src={EComLogo} alt="logo" width={100} height={40} />
        </Link>

        <form className="hidden lg:flex mx-auto w-[40%] px-6 rounded-full bg-[#f5f5f5]   focus-within:border-gray-300 h-[40px]">
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
          <IoIosSearch className="text-3xl text-black block lg:hidden " />
          <VscAccount className="text-2xl" />
          <CiHeart className="text-3xl" />
          <LiaShoppingBagSolid className="text-3xl" />
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
