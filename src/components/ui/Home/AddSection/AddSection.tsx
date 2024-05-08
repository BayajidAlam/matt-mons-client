"use client";
import React, { useEffect, useState } from "react";
import SaleManyTimeLogo from "@/assets/sale-many-time-logo.png";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ProductCard from "@/components/Product/ProductCard";

const AddSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="w-[92%] md:w-[95%] lg:w-[90%] xl:w-[70%] mx-auto my-8">
      <div className="flex justify-between items-start">
        {" "}
        <div className="w-full lg:w-[250px] xl:w-[290px] border h-[430px] hidden lg:block">
          <div className="flex justify-center items-center">
            <Swiper
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Autoplay]}
              autoplay={{ delay: 3500 }}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="flex justify-center items-center mt-2">
                  <Image
                    src={SaleManyTimeLogo}
                    width={150}
                    height={150}
                    alt="sale logo"
                  />
                </div>

                <div
                  className="relative text-center
                mt-4"
                >
                  <h3 className="lg:text-[65px] xl:text-[76px] font-bold">
                    50
                  </h3>
                  <small className="absolute -top-1 left-[85px] xl:left-[100px] text-[20px]  ">
                    UP TO
                  </small>
                  <p className="absolute lg:top-3 xl:top-6 left-[165px] xl:left-[195px] text-[28px] font-bold">
                    %
                  </p>
                  <p className="absolute top-11 xl:top-14 lg:left-[165px] xl:left-[195px] text-[20px]">
                    OFF
                  </p>
                </div>

                <div className="text-center">
                  <p className="w-[70%] mx-auto">
                    Bags, Clothing, T-Shirts, Shoes, Watches and much more...
                  </p>
                  <button className="bg-[#222529] text-white px-6 py-3 text-[13px] font-poppins font-bold uppercase mt-6">
                    Shop Now
                  </button>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex justify-center items-center mt-2">
                  <Image
                    src={SaleManyTimeLogo}
                    width={150}
                    height={150}
                    alt="sale logo"
                  />
                </div>

                <div
                  className="relative text-center
                mt-4"
                >
                  <h3 className="lg:text-[65px] xl:text-[76px] font-bold">
                    50
                  </h3>
                  <small className="absolute -top-1 left-[85px] xl:left-[100px] text-[20px]  ">
                    UP TO
                  </small>
                  <p className="absolute lg:top-3 xl:top-6 left-[165px] xl:left-[195px] text-[28px] font-bold">
                    %
                  </p>
                  <p className="absolute top-11 xl:top-14 lg:left-[165px] xl:left-[195px] text-[20px]">
                    OFF
                  </p>
                </div>

                <div className="text-center">
                  <p className="w-[70%] mx-auto">
                    Bags, Clothing, T-Shirts, Shoes, Watches and much more...
                  </p>
                  <button className="bg-[#222529] text-white px-6 py-3 text-[13px] font-poppins font-bold uppercase mt-6">
                    Shop Now
                  </button>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex justify-center items-center mt-2">
                  <Image
                    src={SaleManyTimeLogo}
                    width={150}
                    height={150}
                    alt="sale logo"
                  />
                </div>

                <div
                  className="relative text-center
                mt-4"
                >
                  <h3 className="lg:text-[65px] xl:text-[76px] font-bold">
                    50
                  </h3>
                  <small className="absolute -top-1 left-[85px] xl:left-[100px] text-[20px]  ">
                    UP TO
                  </small>
                  <p className="absolute lg:top-3 xl:top-6 left-[165px] xl:left-[195px] text-[28px] font-bold">
                    %
                  </p>
                  <p className="absolute top-11 xl:top-14 lg:left-[165px] xl:left-[195px] text-[20px]">
                    OFF
                  </p>
                </div>

                <div className="text-center">
                  <p className="w-[70%] mx-auto">
                    Bags, Clothing, T-Shirts, Shoes, Watches and much more...
                  </p>
                  <button className="bg-[#222529] text-white px-6 py-3 text-[13px] font-poppins font-bold uppercase mt-6">
                    Shop Now
                  </button>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="rest_part">
          <div className="grid grid-cols-1 md:grid-cols-2
           lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {products.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSection;
