"use client";
import React, { useEffect } from "react";
import SaleManyTimeLogo from "@/assets/sale-many-time-logo.png";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

const AddSection = () => {
  return (
    <div className="w-[92%] md:w-[95%] lg:w-[90%] xl:w-[70%] mx-auto my-8">
      <div className="flex justify-between items-start">
        {" "}
        <div className="w-[23%] border h-[430px] hidden lg:block">
          <div className="flex justify-center items-center">
            <Swiper
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="flex justify-center items-center mt-8">
                  <Image
                    src={SaleManyTimeLogo}
                    width={150}
                    height={150}
                    alt="sale logo"
                  />
                </div>
                <h3>
                  <small>UP TO</small>
                  50 <sup>%</sup> <sub>OFF</sub>
                </h3>
              </SwiperSlide>
            </Swiper>
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
