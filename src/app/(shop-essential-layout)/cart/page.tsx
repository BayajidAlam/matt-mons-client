"use client";
import { SlMinus } from "react-icons/sl";
import { BsPlusCircle } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import {
  useDecrementQuantityMutation,
  useDeleteCartMutation,
  useGetAllCartQuery,
  useIncrementQuantityMutation,
} from "@/redux/api/cart/cartApi";
import { getUserInfo } from "@/services/auth.service";
import { UserInfo } from "@/types";
import { DeleteOutlined } from "@ant-design/icons";
import { message } from "antd";
import Loading from "@/app/loading";
import { useState } from "react";
import ModalComponent from "@/components/ui/Modal";
import AddUpdateAddress from "@/components/addUpdateFrom/AddUpdateAddress";
import { useGetSingleCustomerQuery } from "@/redux/api/customer/customerApi";

const Cart = () => {
  const query: Record<string, any> = {};
  // const [couponName, setCouponName] = useState<string>("");
  // const [shouldFetchCoupon, setShouldFetchCoupon] = useState(false);
  const [showModel, setShowModel] = useState(false);

  const { id } = getUserInfo() as UserInfo;

  //Get
  const { data, isLoading: getLoad, refetch } = useGetSingleCustomerQuery(id);
  const customerData = data?.data;

  query["limit"] = 100;
  query["page"] = 1;
  query["userId"] = id;

  const { data: cartAllData, isLoading } = useGetAllCartQuery({ ...query });
  const cartData = cartAllData?.data.cartItems;
  const { total, subTotal, taxAmount, shipping } = cartAllData?.data || {};

  //increment quantity
  const [incrementQuantity, { isLoading: isIncrementLoading }] =
    useIncrementQuantityMutation();
  const handleIncrementQuantity = async (id: string) => {
    await incrementQuantity({
      id,
    }).unwrap();
  };

  //decrement quantity
  const [decrementQuantity, { isLoading: isDecrementLoading }] =
    useDecrementQuantityMutation();
  const handleDecrementQuantity = async (id: string) => {
    await decrementQuantity({
      id,
    }).unwrap();
  };

  //delete form cart
  const [deleteCart] = useDeleteCartMutation();
  const handleDeleteFromCart = async (product: any) => {
    try {
      message.loading("Deleting.....");
      const res = await deleteCart(product.id).unwrap();
      if (res?.data) {
        message.success("Product remove from cart!");
      }
    } catch (error: any) {
      message.error(`${error.data}`);
    }
  };

  //apply coupon
  // const { data, refetch } = useGetSingleCouponByTitleQuery(couponName, {
  //   skip: !shouldFetchCoupon,
  // });
  // const couponData = data?.data;

  // const handleApplyCoupon = async () => {
  //   if (!couponName) {
  //     message.warning("Please enter your coupon!");
  //     return;
  //   }
  //   setShouldFetchCoupon(true);
  //   try {
  //     await refetch();
  //   } catch (error) {
  //     console.error("Error fetching coupon data:", error);
  //   }
  // };

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="w-[92%] md:w-[95%] lg:w-[90%] xl:w-[70%] mx-auto">
        {cartData.length == 0 ? (
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
            <div className="py-12">
              <div className="lg:grid grid-cols-3">
                <div className="col-span-2 mr-5">
                  {cartData?.map((product: any) => (
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
                          onClick={() => handleDecrementQuantity(product.id)}
                        >
                          <SlMinus className="text-3xl" />
                        </button>
                        <h5>{product?.quantity}</h5>
                        <button
                          onClick={() => handleIncrementQuantity(product.id)}
                        >
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
                            className="mt-16 text-blue font-bold text-white"
                            onClick={() => handleDeleteFromCart(product)}
                          >
                            <DeleteOutlined className="text-xl bg-buttonBg p-2 rounded-2xl " />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* order summary */}
                <div className="col-span-1 md:border-l p-6">
                  <h4 className="mb-10 text-lg">Order Summary</h4>
                  <p className="text-lg">Delivery Address</p>
                  <div className="border p-4 bg-slate-300 flex justify-between items-center">
                    <div>
                      <h1 className="font-bold">{customerData?.fullName}</h1>
                      <h1>
                        {customerData?.contactNumber
                          ? customerData?.contactNumber
                          : "018xxxxxxxx"}
                      </h1>
                      <h1>
                        {customerData?.address
                          ? customerData?.address
                          : "Tomsom bridge, cumilla, chittagong"}
                      </h1>
                    </div>
                    <ModalComponent
                      showModel={showModel}
                      setShowModel={setShowModel}
                      buttonText={
                        customerData?.address &&
                        customerData?.contactNumber &&
                        customerData?.emergencyContactNumber &&
                        customerData?.fullName
                          ? "Update"
                          : "Add"
                      }
                    >
                      <AddUpdateAddress />
                    </ModalComponent>
                  </div>
                  <div className="flex justify-between py-4 border-b ">
                    <span className="text-slate-500">Sub total</span>
                    <h5>${subTotal === 0 ? "00" : subTotal?.toFixed(2)}</h5>
                  </div>
                  <div className="flex justify-between py-4 border-b ">
                    <span className="text-slate-500">Shipping estimate</span>
                    <h5>${shipping === 0 ? "00" : shipping?.toFixed(2)}</h5>
                  </div>
                  <div className="flex justify-between py-4 border-b ">
                    <span className="text-slate-500">Tax estimate</span>
                    <h5>${taxAmount === 0 ? "00" : taxAmount?.toFixed(2)}</h5>
                  </div>

                  <div className="flex justify-between py-4 border-b ">
                    <span className="text-[20px] font-bold ">Order total</span>
                    <h5>${total === 0 ? "00" : total?.toFixed(2)}</h5>
                  </div>
                  <div className="my-10">
                    <button className=" w-full btn bg-buttonBg   text-[16px] border rounded-full px-8 py-2   text-white">
                      Complete payment
                    </button>
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
