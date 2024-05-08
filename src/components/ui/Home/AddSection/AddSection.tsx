"use client";
import React, { useEffect } from "react";

import SaleManyTimeLogo from "@/assets/sale-many-time-logo.png";
import Image from "next/image";

const AddSection = () => {
  return (
    <div className="w-[92%] md:w-[95%] lg:w-[90%] xl:w-[70%] mx-auto my-8">
      <div className="flex justify-between items-start">
        {" "}
        <div className="w-[23%] border h-[430px] hidden lg:block">
          <div className="flex justify-center items-center">
            <Image
              src={SaleManyTimeLogo}
              width={50}
              height={50}
              alt="sale many time"
            />
          </div>

        </div>
        <div className="w-full lg:w-[76%] ">
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default AddSection;
