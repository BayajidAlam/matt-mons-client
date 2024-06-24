"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import { genderOptions } from "@/constants/global";
import { Col, Row } from "antd";

const Checkout = () => {
  const onSubmit = async (data: any) => {
    try {
    } catch (err: any) {}
  };
  return (
    <>
      <div className="w-[92%] md:w-[95%] lg:w-[90%] xl:w-[70%] mx-auto">
        <div>
          <h3 className=" lg:text-left text-[20px] ">Checkout</h3>
          <div className="md:grid grid-cols-4 gap-8 my-8">
            <div className="col-span-3">
              <Form submitHandler={onSubmit}>
                <Row
                  className="border p-6 rounded-xl"
                  gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}
                >
                  <Col span={12} style={{ margin: "5px 0" }}>
                    <FormInput
                      name="name"
                      label="Full Name"
                      placeholder="John Doe"
                    />
                  </Col>
                  <Col span={12} style={{ margin: "5px 0" }}>
                    <FormInput
                      name="name"
                      label="Town/City"
                      placeholder="matt-mons"
                    />
                  </Col>
                  <Col span={12} style={{ margin: "5px 0" }}>
                    <FormSelectField
                      name="country"
                      label="Country"
                      options={genderOptions}
                    />
                  </Col>
                  <Col span={12} style={{ margin: "5px 0" }}>
                    <FormInput
                      name="name"
                      label="Contact Number"
                      placeholder="matt-mons"
                    />
                  </Col>
                  <Col span={12} style={{ margin: "5px 0" }}>
                    <FormInput
                      name="name"
                      label="Emergency Contact Number"
                      placeholder="matt-mons"
                    />
                  </Col>

                  <Col span={12} style={{ margin: "5px 0" }}>
                    <FormInput
                      name="name"
                      label="Email Address"
                      placeholder="matt-mons"
                    />
                  </Col>
                  <Col span={24} style={{ margin: "5px 0" }}>
                    <FormTextArea
                      name="name"
                      label="Address"
                      placeholder="matt-mons"
                    />
                  </Col>
                </Row>
              </Form>
            </div>

            <div className="border rounded-xl p-6">
              <h1 className="text-xl">Order summary</h1>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-lg">Subtotal</p>
                  <p className="text-lg font-bold">$1220</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg">Shipping</p>
                  <p className="text-lg font-bold">$120</p>
                </div>
                <div className="flex justify-between items-center border-b-2 pb-1">
                  <p className="text-lg">Tax</p>
                  <p className="text-lg font-bold">$12</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lg">Total</p>
                <p className="text-lg font-bold">$1352</p>
              </div>
              <button className=" w-full btn bg-buttonBg   text-[16px] border rounded-full px-8 py-2 mt-8 uppercase  text-white">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
