"use client";
import Link from "next/link";
import Image from "next/image";
import { useCreateCartMutation } from "@/redux/api/cart/cartApi";
import { getUserInfo } from "@/services/auth.service";
import { UserInfo } from "@/types";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { message } from "antd";
import Loading from "@/app/loading";
import {
  useDeleteFromWishlistMutation,
  useGetWishlistQuery,
} from "@/redux/api/wishlist/wishlistApi";
import { FaRegHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

const Cart = () => {
  const { id: uId } = getUserInfo() as UserInfo;
  const query: Record<string, any> = {};
  query["limit"] = 100;
  query["page"] = 1;
  query["userId"] = uId;

  const { data: wishlistData, isLoading } = useGetWishlistQuery({ ...query });
  const cartData = wishlistData?.data.wishlistItems;

  //delete form wishlist
  const [deleteFromWishlist, { isLoading: isDeleteFromWishlistLoading }] =
    useDeleteFromWishlistMutation();

  const handleDeleteFromWishList = async (product: any) => {
    try {
      message.loading("Deleting.....");
      const res = await deleteFromWishlist(product.id).unwrap();
      if (res?.data) {
        message.success("Product remove from wishlist!");
      }
    } catch (error: any) {
      message.error(`${error.data}`);
    }
  };

  //add to cart and delete form wishlist
  const [createCart, { isLoading: isCartLoading }] = useCreateCartMutation();

  const handleAddToCart = async (product: any) => {
    const data = {
      productId: product.productId,
      userId: uId,
    };
    try {
      const res = await createCart(data).unwrap();
      if (res?.data) {
        message.success("Product added to cart successfully");
      }
    } catch (error) {}
  };

  if (isLoading || isCartLoading || isDeleteFromWishlistLoading)
    return <Loading />;

  return (
    <>
      <div className="w-[92%] md:w-[95%] lg:w-[90%] xl:w-[70%] mx-auto">
        {cartData?.length == 0 ? (
          <div className="flex justify-center items-center h-full my-20">
            <div>
              <Image
                src="https://i.ibb.co/0DWTvLm/undraw-empty-cart-co35.png"
                className="w-[600px] h-[500px]"
                width={300}
                height={300}
                alt="empty cart"
              />
              <h1 className="text-center text-xl">
                Your wishlist is empty! <Link href={`/products`}>shopping</Link>
              </h1>
            </div>
          </div>
        ) : (
          <>
            {" "}
            <div>
              <h3 className=" lg:text-left text-[20px] ">Your Wishlist</h3>
            </div>
            <div className="py-12">
              <div className="lg:grid grid-cols-3">
                <div className="col-span-3 mr-5">
                  {cartData?.map((product: any, index: number) => (
                    <div
                      key={product?.id}
                      className={`flex justify-between my-4 pb-4 ${
                        cartData?.length > 1 && index !== cartData.length - 1
                          ? "border-b"
                          : ""
                      }`}
                    >
                      <div className=" flex lg:gap-5 gap-3">
                        <Image
                          className="lg:w-28 lg:h-28 w-22 h-28 bg-[#F1F5F9] rounded-lg"
                          src={product?.Product?.productMainImage}
                          width={500}
                          height={500}
                          alt="image"
                        />
                        <div>
                          <h5 className="mb-1">
                            {product?.Product?.productName}
                          </h5>
                          <span>{product?.Product?.Shop?.shopName}</span> <br />
                          {product?.Product?.discountPercentage ? (
                            <button className="border mt-4 lg:px-4 lg:py-1 px-2 rounded-full ">
                              Money Saved{" "}
                              {product?.Product?.moneySaved.slice(0, 2)} tk (
                              {product?.Product?.discountPercentage.slice(0, 1)}
                              %)
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="price_remove">
                        <div>
                          <button
                            className="text-blue font-bold text-white"
                            onClick={() => handleDeleteFromWishList(product)}
                          >
                            <DeleteOutlined className="text-xl bg-red-500 p-2 rounded-2xl " />
                          </button>
                        </div>

                        <div className="text-end">
                          <button
                            className="mt-8 text-3xl"
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingCartOutlined className="text-3xl text-black" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
