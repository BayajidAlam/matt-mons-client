"use client";
import { SlMinus } from "react-icons/sl";
import { BsPlusCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const subTotal = products?.reduce(
    (order: any, item: any) => order + item.price * item.quantity,
    0
  );
  const taxAmount = 0.1 * subTotal;
  const shipping = 56;
  const total = subTotal + shipping + taxAmount;

  const handleRemove = (productId: any) => {};
  const handleIncrement = (productId: any) => {};
  const handleDecrement = (productId: any) => {};

  return (
    <>
      <div className="w-[92%] md:w-[95%] lg:w-[90%] xl:w-[70%] mx-auto">
        <div>
          <h3 className=" lg:text-left text-[20px] ">Shopping Cart</h3>
        </div>
        <div>
          <div className="lg:grid grid-cols-3">
            <div className="col-span-2 mr-5">
              {products.map((product: any) => (
                <div
                  key={product?._id}
                  className="flex justify-between my-4 pb-4 border-b "
                >
                  <div className=" flex lg:gap-5 gap-3">
                    <Image
                      className="lg:w-28 lg:h-28 w-22 h-28 bg-[#F1F5F9] rounded-lg"
                      src={product?.productImg}
                      width={500}
                      height={500}
                      alt="image"
                    />
                    <div>
                      <h5 className="mb-1">{product?.name}</h5>
                      <span>{product?.description}</span> <br />
                      {product?.message ? (
                        <button className="border mt-4 lg:px-4 lg:py-1 px-2 rounded-full ">
                          {product?.message}
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="hidden lg:flex items-center gap-5">
                    <button onClick={() => handleDecrement(product?._id)}>
                      <SlMinus className="text-3xl" />
                    </button>
                    <h5>2</h5>
                    <button onClick={() => handleIncrement(product?._id)}>
                      <BsPlusCircle className="text-3xl" />
                    </button>
                  </div>
                  <div className="price_remove">
                    <div>
                      <button className="text-green  font-bold border-2 px-2 rounded-lg border-green">
                        ${product?.price}.00
                      </button>
                    </div>
                    <div>
                      <button
                        className="mt-16 text-blue font-bold"
                        onClick={() => handleRemove(product?._id)}
                      >
                        Remove
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
                <span className="text-slate-500">Shipping estimate</span>
                <h5>${subTotal === 0 ? "00" : shipping}</h5>
              </div>
              <div className="flex justify-between py-4 border-b ">
                <span className="text-slate-500">Tax estimate</span>
                <h5>${subTotal === 0 ? "00" : taxAmount}</h5>
              </div>
              <div className="flex justify-between py-4  ">
                <span className="text-[20px] font-bold">Order total</span>
                <h5>${subTotal === 0 ? "00" : total.toFixed(2)}</h5>
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
      </div>
    </>
  );
};

export default Cart;
