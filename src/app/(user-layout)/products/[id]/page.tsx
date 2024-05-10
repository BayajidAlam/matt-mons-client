"use client";
import ProductAdditionalInfoSection from "@/components/Product/ProductAdditionalInfoSection";
import ProductDetailsSection from "@/components/Product/ProductDetailsSection";
import { productsArray } from "@/demo/data";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";

const ProductDetailsPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [products, setProducts] = useState(productsArray);

  useEffect(() => {
    setProducts(productsArray);
  }, []);

  const product = products.find((product) => product._id === id);

  return (
    <div className="w-[92%] md:w-[95%] lg:w-[90%] xl:w-[70%] mx-auto my-8">
      <div className="flex justify-between items-start">
        <div className="w-[40%]">
          <div className="w-full">
            <Image
              className="bg-gray-100 w-full"
              src={product?.productImg}
              width={500}
              height={500}
              alt="image"
            />
          </div>

          <div className="flex justify-between items-center w-full mt-2 gap-2">
            <div className="w-[25%]">
              <Image
                className="bg-gray-100 w-full"
                src={product?.productImg}
                width={60}
                height={60}
                alt="image"
              />
            </div>
            <div className="w-[25%]">
              <Image
                className="bg-gray-100 w-full"
                src={product?.productImg}
                width={60}
                height={60}
                alt="image"
              />
            </div>
            <div className="w-[25%]">
              <Image
                className="bg-gray-100 w-full"
                src={product?.productImg}
                width={60}
                height={60}
                alt="image"
              />
            </div>
            <div className="w-[25%]">
              <Image
                className="bg-gray-100 w-full"
                src={product?.productImg}
                width={60}
                height={60}
                alt="image"
              />
            </div>
          </div>
        </div>
        <div className="w-[60%] space-y-6 px-6">
          <h1 className="text-[30px] font-bold">Blue BackPack</h1>

          <div className="flex justify-start items-center gap-1">
            <div className="flex justify-start items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p className="text-[13px]">Be the first to review this product</p>
          </div>

          <hr className="w-12" />
          <h1 className="text-[24px] font-semibold">$299.00</h1>

          <p className="text-[16px]">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
            ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
            egestas semper. Aenean ultricies mi vitae est. Mauris placerat
            eleifend leo.
          </p>

          <p>
            AVAILABILITY:
            <span className="font-bold"> IN STOCK</span>
          </p>
          <p>
            SKU:
            <span className="font-bold"> 654111995-1-1-1</span>
          </p>

          <div className="flex justify-start items-center gap-1">
            <p>Color:</p>
            <input
              className="w-10 h-10 border-none outline-none"
              type="color"
              name=""
              id=""
            />
            <input
              className="w-10 h-10 border-none outline-none"
              type="color"
              name=""
              id=""
            />
            <input
              className="w-10 h-10 border-none outline-none"
              type="color"
              name=""
              id=""
            />
          </div>

          <div className="flex justify-start items-center">
            <p>Size:</p>
            <button className="px-2 py-2 border text-xl">+</button>
            <button className="px-2 py-2 border text-xl">+</button>
            <button className="px-2 py-2 border text-xl">+</button>
          </div>
          <hr />

          <div className="flex justify-start items-center gap-1">
            <div className="border flex justify-between items-center w-40">
              <button className="px-4 py-3 border-r text-xl">-</button>
              <p className="px-6 py-3 text-[16px]">1</p>
              <button className="px-4 py-3 border-l text-xl">+</button>
            </div>

            <button className="px-8 py-3 border-r text-[18px] text-white uppercase bg-[#222529] hover:bg-[#08c]">
              Add to Cart
            </button>

            <button className="px-4 py-3 border text-[18px] text-white">
              <CiHeart className="text-[26px] text-black" />
            </button>
            <button className="px-4 py-3 border text-[18px] text-white">
              <SiGoogleanalytics className="text-[26px] text-black" />
            </button>
          </div>

          <hr />
        </div>
      </div>

      <div>
        <ProductDetailsSection />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
