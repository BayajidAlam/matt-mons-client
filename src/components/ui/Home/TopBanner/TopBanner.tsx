"use client";
import React from "react";
import BannerImage1 from "@/assets/shop1_home_slider1.png";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Category from "./Category";

const TopBanner = () => {

  return (
    <div className="w-[92%] md:w-[95%] lg:w-[90%] xl:w-[70%] mx-auto my-8 hidden lg:block">
      <div className="flex justify-between items-start">
        {" "}
        <Category />
        <div className="rest_part">
          <div>
            <div >
              <Swiper
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                autoplay={{ delay: 3500 }}
                className="mySwiper"
              >
                <SwiperSlide >
                  <div className="relative w-full">
                    <Image
                      src={BannerImage1}
                      className="w-full  h-[430px]"
                      width={300}
                      height={200}
                      alt="BannerImage"
                    />
                    <div className="absolute top-28 md:top-20 xl:top-24 left-6 md:left-10 xl:left-16 ">
                      <p className="text-[15px] text-[#f5f5f5] tracking-wider font-poppins">
                        Find the boundaries. Push Through!
                      </p>
                      <h1 className="dancing-script text-[44px] tracking-widest m-0">
                        Summer Sale
                      </h1>
                      <h1 className="text-[76px] font-bold">70% OFF</h1>

                      <div className="flex justify-start items-start gap-2">
                        <span className="text-[11px]">Starting at</span>
                        <div
                          className="bg-[#FF7272] text-white py-1 flex justify-center
                         items-center w-20"
                        >
                          <span>$</span> <p className="text-[20px]">199</p>{" "}
                          <span>99</span>
                        </div>
                        <button className="bg-buttonBg text-white px-8 py-4 text-[13px] font-poppins font-bold uppercase">
                          Shop Now
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
