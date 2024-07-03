"use client";
import ProductDetailsSection from "@/components/Product/ProductDetailsSection";
import { productsArray } from "@/demo/data";
import { useGetSingProductQuery } from "@/redux/api/products/productsApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";

const ProductDetailsPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const { data } = useGetSingProductQuery(id);
  const productData = data?.data;
  console.log(productData);

  return (
    <div className="w-[92%] md:w-[95%] lg:w-[90%] xl:w-[70%] mx-auto my-8">
      <div className="md:flex justify-between items-start">
        <div className="w-[40%]">
          <div className="w-full">
            <Image
              className="bg-gray-100 w-full"
              src={productData?.productMainImage}
              width={500}
              height={500}
              alt="product image"
            />
          </div>

          <div className="flex justify-start items-center w-full mt-2 gap-2">
            {productData?.productAdditionalImages.map((proImage) => (
              <>
                <div className="w-[25%]">
                  <Image
                    className="bg-gray-100 w-full"
                    src={proImage}
                    width={60}
                    height={60}
                    alt="image"
                  />
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="w-[60%] space-y-6 px-6 mt-12">
          <h1 className="text-[30px] font-bold">{productData?.productName}</h1>

          <div className="flex justify-start items-center gap-1">
            <div className="flex justify-start items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p className="text-[13px]">
              {productData?.ReviewAndRatings.length > 0
                ? productData?.ReviewAndRatings.length
                : "Be the first to review this product"}
            </p>
          </div>

          <hr className="w-12" />
          <h1 className="text-[24px] font-semibold">
            {productData?.discountPrice}
          </h1>

          <p>
            AVAILABILITY:
            <span className="font-bold">
              {productData?.ProductSku.quantity > 0
                ? " In Stock"
                : " Out of Stock"}
            </span>
          </p>
          <p>
            SKU:
            <span className="font-bold">{productData?.ProductSku.title}</span>
          </p>

          <div className="flex justify-start items-center gap-1">
            <p>Color:</p>
            <div className="flex gap-1">
              {productData?.ProductSku.availableColor.map((color) => (
                <>
                  <p>{color}</p>
                </>
              ))}
            </div>
          </div>

          <div className="flex justify-start items-center">
            <p>Size:</p>
            <div className="flex gap-1">
              {productData?.ProductSku.availableSize.map((size) => (
                <>
                  <p>{size}</p>
                </>
              ))}
            </div>
          </div>
          <hr />

          <div className="flex justify-start items-center gap-1">
            <button className="px-8 py-3 border-r text-[18px] text-white uppercase bg-buttonBg hover:bg-[#08c]">
              Add to Cart
            </button>

            <button className="px-4 py-3 border text-[18px] text-white">
              <CiHeart className="text-[26px] text-black" />
            </button>
            {/* <button className="px-4 py-3 border text-[18px] text-white">
              <SiGoogleanalytics className="text-[26px] text-black" />
            </button> */}
          </div>

          <hr />
        </div>
      </div>

      <div>
        <ProductDetailsSection
          productDetails={productData?.productDetails}
          productAdditionalInfo={productData?.productAdditionalInfo}
          ReviewAndRatings={productData?.ReviewAndRatings}
        />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
