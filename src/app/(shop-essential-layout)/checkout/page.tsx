"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import { useCreateOrderMutation } from "@/redux/api/orders/orderApi";
import { useAppSelector } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { UserInfo } from "@/types";
import { Col, Row, message } from "antd";
import { useRouter } from "next/router";

const Checkout = () => {
  const { id, shopId } = getUserInfo() as UserInfo;
  const router = useRouter();

  const subTotal = useAppSelector((state) => state.cart.subTotal);
  const shipping = useAppSelector((state) => state.cart.shipping);
  const total = useAppSelector((state) => state.cart.total);
  const taxAmount = useAppSelector((state) => state.cart.taxTotal);
  const products = useAppSelector((state) => state.cart.products);

  const [createOrder] = useCreateOrderMutation();
  const onSubmit = async (data: any) => {
    try {
      const orderData = {
        ...data,
        userId: id,
        shopId,
        subTotal,
        shippingCharge: shipping,
        tax: taxAmount,
        total: total,
        products,
      };
      const res = await createOrder(orderData).unwrap();
      if (res?.data) {
        router.push("/order-successful");
      }
    } catch (err: any) {}
  };

  return (
    <>
      <div className="w-[92%] md:w-[95%] lg:w-[90%] xl:w-[70%] mx-auto mb-20">
        <div className="my-30">
          <h3 className=" lg:text-left text-[20px] pb-4">Checkout</h3>
          <Form submitHandler={onSubmit}>
            <div className="md:grid grid-cols-4 gap-8 bg-white border border-blue-200 rounded-lg shadow-md shadow-blue-200  space-y-3 pb-40 p-4">
              <div className="col-span-3">
                <div
                  style={{
                    border: "1px solid #d9d9d9",
                    borderRadius: "8px",
                    padding: "20px",
                    marginBottom: "10px",
                  }}
                  className=""
                >
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                  >
                    <Col
                      className="gutter-row"
                      xs={24}
                      md={24}
                      lg={24}
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      <FormInput
                        type="text"
                        name={"email"}
                        size="large"
                        label="Email"
                        required={true}
                        placeholder="johndoe@gmail.com"
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      xs={24}
                      md={24}
                      lg={12}
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      <FormInput
                        type="text"
                        name={"contactNumber"}
                        size="large"
                        label="ContactNumber"
                        required={true}
                        placeholder="018-xxx-xxx-xx"
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      xs={24}
                      md={24}
                      lg={12}
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      <FormInput
                        type="text"
                        name={"emergencyContactNumber"}
                        size="large"
                        label="Emergency Contact Number"
                        required={true}
                        placeholder="018-xxx-xxx-xx"
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      xs={24}
                      md={24}
                      lg={24}
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      <FormTextArea
                        name={"address"}
                        size="large"
                        label="Address"
                        required={true}
                        placeholder="Jackson height,New York"
                      />
                    </Col>
                  </Row>
                </div>
              </div>

              <div className="border rounded-xl p-6 !mt-0 pb-40">
                <h1 className="text-xl">Order summary</h1>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-lg">Subtotal</p>
                    <p className="text-lg font-bold">${subTotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-lg">Shipping</p>
                    <p className="text-lg font-bold">${shipping}</p>
                  </div>
                  <div className="flex justify-between items-center border-b-2 pb-1">
                    <p className="text-lg">Tax</p>
                    <p className="text-lg font-bold">${taxAmount}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg">Total</p>

                  <p className="text-lg font-bold">${total}</p>
                </div>
                <button
                  type="submit"
                  className=" w-full btn bg-buttonBg   text-[16px] border rounded-full px-8 py-2 mt-8 uppercase  text-white"
                >
                  Place Order
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
