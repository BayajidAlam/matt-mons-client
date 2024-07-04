"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BsStars } from "react-icons/bs";

const ProductCard = ({ product }: any) => {
  console.log(product);
  return (
    <div>
      {/* here set img  */}
      <div className=" bg-gray-100 rounded-2xl relative xl:h-[280px]">
        <Image
          className="w-full md:3-[300px] lg:w-[250px]"
          src={product?.productMainImage}
          width={500}
          height={340}
          alt={product?.productName}
        />
        {/* here top msg */}
        {product?.productTags ? (
          product?.productTags?.map((prod) => (
            <>
              <small className="absolute top-4 left-4">
                <button className="flex gap-1 items-center shadow-lg bg-white px-4 py-1 rounded-full ">
                  <BsStars />
                  {prod}
                </button>
              </small>
            </>
          ))
        ) : (
          <></>
        )}
        {/* here hover items */}
        {/* <div className="hidden absolute left-16 lg:left-4 bottom-3  ">
            <div className="flex my-3 justify-between">
              <button
                onClick={() => handleAdd(product)}
                className=" bg-black text-red-500 px-3 py-2 rounded-full"
              >
                Add to cart
              </button>
            </div>
          </div> */}
      </div>
      {/* here set img description */}

      <div className="product_details py-3">
        <Link href={`/products/${product?.id}`}>
          <h5>{product?.productName}</h5>
        </Link>
        <p className="pt-1">{product?.Shop?.shopName}</p>
        <div className="price_review py-5 flex justify-between">
          <button className="text-green  font-bold border-2 px-2 rounded-lg border-green">
            ${product?.discountPrice}.00
          </button>
          <p className="flex items-center">
            {product?.ReviewAndRatings?.rating}
            <AiFillStar className="text-yellow" /> (
            {product?.ReviewAndRatings?.length} reviews)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
