"use client";
import { SlMinus } from "react-icons/sl";
import { BsPlusCircle } from "react-icons/bs";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  useDeleteCartMutation,
  useGetAllCartQuery,
} from "@/redux/api/cart/cartApi";
import { getUserInfo } from "@/services/auth.service";
import { UserInfo } from "@/types";
import {
  addToCart,
  decrementOnCart,
  loadCartItems,
  removeFromCart,
} from "@/redux/api/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { DeleteOutlined } from "@ant-design/icons";
import { message } from "antd";
import Loading from "@/app/loading";

const Cart = () => {
  const query: Record<string, any> = {};
  const { id } = getUserInfo() as UserInfo;

  query["limit"] = 100;
  query["page"] = 1;
  query["userId"] = id;

  const { data: cartAllData, isLoading } = useGetAllCartQuery({ ...query });

  const cartData = cartAllData?.data;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCartItems(cartData));
  }, [cartData, dispatch]);

  const cartDataOnCart = useAppSelector((state) => state.cart.products);

  const subTotal = useAppSelector((state) => state.cart.subTotal);
  const shipping = useAppSelector((state) => state.cart.shipping);
  const total = useAppSelector((state) => state.cart.total);
  const taxAmount = useAppSelector((state) => state.cart.taxTotal);

  const [deleteCart] = useDeleteCartMutation();
  const handleDeleteFromCart = async (product: any) => {
    try {
      message.loading("Deleting.....");
      const res = await deleteCart(product.id).unwrap();
      if (res?.data) {
        message.success("Product remove from cart!");
        dispatch(removeFromCart(product));
      }
    } catch (error: any) {
      message.error(`${error.data}`);
    }
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="w-[92%] md:w-[95%] lg:w-[90%] xl:w-[70%] mx-auto">
        {cartDataOnCart.length == 0 ? (
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
                Your cart is empty! Back to{" "}
                <Link href={`/products`}>shopping</Link>
              </h1>
            </div>
          </div>
        ) : (
          <>
            {" "}
            <div>
              <h3 className=" lg:text-left text-[20px] ">Shopping Cart</h3>
            </div>
            <div>
              <div className="lg:grid grid-cols-3">
                <div className="col-span-2 mr-5">
                  {cartDataOnCart?.map((product: any) => (
                    <div
                      key={product?.id}
                      className="flex justify-between my-4 pb-4 border-b "
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
                              {product?.Product?.moneySaved.slice(0, 2)} tk
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="hidden lg:flex items-center gap-5">
                        <button
                          onClick={() => dispatch(decrementOnCart(product))}
                        >
                          <SlMinus className="text-3xl" />
                        </button>
                        <h5>{product?.quantity}</h5>
                        <button onClick={() => dispatch(addToCart(product))}>
                          <BsPlusCircle className="text-3xl" />
                        </button>
                      </div>
                      <div className="price_remove">
                        <div>
                          <button className="font-bold border-2 px-2 rounded-lg border-green-500">
                            Discount:{" "}
                            {product?.Product?.discountPercentage.slice(0, 2)}%
                          </button>
                        </div>

                        <div className="text-end">
                          <button
                            className="mt-16 text-blue font-bold"
                            onClick={() => handleDeleteFromCart(product)}
                          >
                            <DeleteOutlined className="text-xl bg-red-400 p-2 rounded-2xl text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* order summary */}
                <div className="col-span-1 mt-10 md:border-l p-10">
                  <h4 className="mb-10">Order Summary</h4>
                  <div className="flex justify-between py-4 border-b gap-2">
                    <input
                      className="text-[16px] border rounded-full px-8 py-2  uppercase"
                      placeholder="Apply Cupon"
                    ></input>
                    <button className="text-[16px] border rounded-full px-8 py-2 uppercase bg-buttonBg text-white">
                      Apply
                    </button>
                  </div>
                  <div className="flex justify-between py-4 border-b ">
                    <span className="text-slate-500">Subtotal</span>
                    <h5>${subTotal === 0 ? "00" : subTotal}</h5>
                  </div>
                  <div className="flex justify-between py-4 border-b ">
                    <span className="text-slate-500">Shipping estimate</span>
                    <h5>${subTotal === 0 ? "00" : shipping}</h5>
                  </div>
                  <div className="flex justify-between py-4 border-b ">
                    <span className="text-slate-500">Tax estimate</span>
                    <h5>${subTotal === 0 ? "00" : taxAmount}</h5>
                  </div>
                  <div className="flex justify-between py-4  ">
                    <span className="text-[20px] font-bold">Order total</span>
                    <h5>${subTotal === 0 ? "00" : total}</h5>
                  </div>
                  <div className="w-80 my-10">
                    <Link href="/checkout">
                      <button className=" w-full btn bg-buttonBg   text-[16px] border rounded-full px-8 py-2 uppercase  text-white">
                        Check out
                      </button>
                    </Link>
                  </div>
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
