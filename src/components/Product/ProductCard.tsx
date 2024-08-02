"use client";
import { useCreateCartMutation } from "@/redux/api/cart/cartApi";
import { useCreateWishlistMutation } from "@/redux/api/wishlist/wishlistApi";
import { getUserInfo } from "@/services/auth.service";
import { UserInfo } from "@/types";
import { message } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

const ProductCard = ({ product }: any) => {
  const { id: uId } = getUserInfo() as UserInfo;

  const [createCart, { isLoading: isCartLoading }] = useCreateCartMutation();
  const [createWishlist, { isLoading }] = useCreateWishlistMutation();

  const handleAddToWishList = async (prod: any) => {
    const data = {
      productId: prod.id,
      userId: uId,
    };
    try {
      const res = await createWishlist(data).unwrap();
      console.log(res)
      if (res?.data) {
        message.success("Product added to wishlist successfully");
      }
    } catch (error) {}
  };

  const handleAddToCart = async (prod: any) => {
    const data = {
      productId: prod.id,
      userId: uId,
    };
    try {
      const res = await createCart(data).unwrap();
      if (res?.data) {
        message.success("Product added to cart successfully");
      }
    } catch (error) {}
  };
  
  return (
    <div>
      {/* here set img  */}
      <div className=" bg-gray-100 rounded-2xl relative xl:h-[280px]">
        <Image
          className="w-full md:3-[300px] lg:w-[250px] h-full"
          src={product?.productMainImage}
          width={500}
          height={340}
          alt={product?.productName}
        />
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
                // onClick={() => handleAdd(product)}
                className=" bg-black text-red-500 px-3 py-2 rounded-full"
              >
                Add to cart
              </button>
            </div>
          </div> */}
        <div className="absolute right-3 bottom-2">
          <div className="flex mb-1 justify-between gap-3">
            <button
              onClick={() => handleAddToWishList(product)}
              className=" bg-white px-3 py-2 hover:bg-black text-black hover:text-white"
            >
              <FaRegHeart className="text-xl" />
            </button>
            <button
              onClick={() => handleAddToCart(product)}
              className=" bg-white px-3 py-2 hover:bg-black text-black hover:text-white"
            >
              <FaCartShopping className="text-xl" />
            </button>
          </div>
        </div>
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
