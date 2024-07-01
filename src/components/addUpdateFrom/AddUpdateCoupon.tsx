"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { Button, Col, Row, message } from "antd";
import {
  useCreateCouponMutation,
  useGetSingleCouponQuery,
  useUpdateCouponMutation,
} from "@/redux/api/coupon/couponApi";
import FormDatePicker from "../Forms/FormDatePicker";
import { getUserInfo } from "@/services/auth.service";

const AddUpdateCoupon = ({ id }: { id?: string }) => {
  //Get
  const { data, isLoading: getLoad } = useGetSingleCouponQuery(id ? id : "");
  const couponData = data?.data;

  //Update
  const [updateCoupon, { isLoading: updateLoad }] = useUpdateCouponMutation();

  //Create
  const [createCoupon, { isLoading: createLoad }] = useCreateCouponMutation();

  const { shopId, fullName } = getUserInfo() as any;

  const onSubmit = async (values: any) => {
    message.loading(id ? "Updating...." : "Adding....");
    try {
      const res = id
        ? await updateCoupon({
            id,
            data: {
              ...values,
            },
          }).unwrap()
        : await createCoupon({
            ...values,
            shopId,
            createdBy: fullName,
          }).unwrap();
      if (res.data) {
        message.success(`Coupon ${id ? "updated" : "added"} successfully`);
      } else {
        message.error(res.message);
      }

    } catch (err: any) {
      console.error(err.message);
    }
  };

  // if (id && getLoad) {
  //   return <Loading />;
  // }

  // console.log(data);

  return (
    <div>
      <h1 className="text-center my-1 font-bold text-2xl">
        {id ? "Update Coupon" : "Add Coupon"}
      </h1>
      <div>
        <Form
          submitHandler={onSubmit}
          defaultValues={id ? { ...couponData } : {}}
        >
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "10px",
            }}
            className="my-4"
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
                  name={id ? "couponName" : "couponName"}
                  size="large"
                  label="Coupon Name"
                  required={true}
                  placeholder="Please enter Coupon Name"
                />
              </Col>
              <Col
                style={{
                  marginTop: "10px",
                }}
                xs={24}
                md={12}
                lg={8}
              >
                <FormInput
                  name="discount"
                  label="Discount(%)"
                  type="text"
                  size="large"
                  required={true}
                />
              </Col>
              <Col
                style={{
                  marginTop: "10px",
                }}
                xs={24}
                md={12}
                lg={8}
              >
                <FormInput
                  name="shippingCharge"
                  label="Shipping Charge"
                  type="text"
                  size="large"
                  required={true}
                />
              </Col>
              <Col
                style={{
                  marginTop: "10px",
                }}
                xs={24}
                md={12}
                lg={8}
              >
                <FormDatePicker
                  name="validTill"
                  label="Valid Till"
                  size="large"
                  required={!id}
                />
              </Col>
            </Row>
            <div className="flex justify-end items-center mt-2">
              <Button
                htmlType="submit"
                type="primary"
                disabled={createLoad || updateLoad}
              >
                {id ? "Update" : "Add"}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddUpdateCoupon;
