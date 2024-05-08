"use client";
import Image from "next/image";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BsStars } from "react-icons/bs";

const ProductCard = ({ product }: any) => {
  // add cart
  const handleAdd = (product:any) => {};

  // here add modal products
  // const handleProductClick = (product) => {};

  // const handleSize = (size) => {};

  return (
    <div>
      {/* here set img  */}
      <div className=" bg-gray-100 rounded-2xl relative lg:h-[340px]">
        <Image
          className="w-full md:3-[350px] lg:w-[250px]"
          src={product?.productImg}
          width={500}
          height={340}
          alt={product?.name}
        />
        {/* here top msg */}
        {product?.message ? (
          <small className="absolute top-4 left-4">
            <button className="flex gap-1 items-center shadow-lg bg-white px-4 py-1 rounded-full ">
              <BsStars />
              {product?.message}
            </button>
          </small>
        ) : (
          ""
        )}
        {/* here hover items */}
        <div className="hidden absolute left-16 lg:left-4 bottom-3  ">
          <div className="flex my-3 justify-between">
            <button
              onClick={() => handleAdd(product)}
              className=" bg-black text-white px-3 py-2 rounded-full"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      {/* here set img description */}
      <div className="product_details py-3">
        <h5>{product?.name}</h5>
        <p className="pt-1">{product?.description}</p>
        <div className="price_review py-5 flex justify-between">
          <button className="text-green  font-bold border-2 px-2 rounded-lg border-green">
            ${product?.price}.00
          </button>
          <p className="flex items-center">
            <AiFillStar className="text-yellow" /> {product?.star} (
            {product?.reviews} reviews)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
