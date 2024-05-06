import React from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { Ri24HoursFill } from "react-icons/ri";

 const HeaderBottom = () => {
  return (
    <div className="border lg:flex justify-between items-center lg:container xl:w-[70%] mx-auto ">

      <div className="flex justify-start lg:justify-center items-center lg:w-1/3 border-b lg:border-r px-3 py-3">
        <div className="flex justify-center items-center gap-3 ">
          <LiaShippingFastSolid className="text-3xl text-black " />
          <div className="text-black">
            <h1 className="font-bold text-[12px] text-black">
              FREE SHIPPING & RETURN
            </h1>
            <p className="text-[12px] text-[#ccc]">
              Free shipping on all orders over $99
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-start lg:justify-center items-center lg:w-1/3 border-b lg:border-r px-3 py-3">
        <div className="flex justify-center items-center gap-3 ">
          <RiMoneyDollarCircleLine className="text-3xl text-black " />
          <div className="text-black">
            <h1 className="font-bold text-[12px] text-black">
              MONEY BACK GUARANTEE
            </h1>
            <p className="text-[12px] text-[#ccc]">100% money back guarantee</p>
          </div>
        </div>
      </div>

      <div className="flex justify-start lg:justify-center items-center lg:w-1/3  px-3 py-3">
        <div className="flex justify-center items-center gap-3 ">
          <Ri24HoursFill className="text-3xl text-black " />
          <div className="text-black">
            <h1 className="font-bold text-[12px] text-black">
              ONLINE SUPPORT 24/7
            </h1>
            <p className="text-[12px] text-[#ccc]">24/7 online support</p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default HeaderBottom;
