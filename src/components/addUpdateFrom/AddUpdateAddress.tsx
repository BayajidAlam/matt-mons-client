"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { Button, Col, Row, message } from "antd";
import { useUpdateColorMutation } from "@/redux/api/color/colorApi";
import { getUserInfo } from "@/services/auth.service";
import { UserInfo } from "@/types";
import {
  useGetSingleCustomerQuery,
  useUpdateCustomerMutation,
} from "@/redux/api/customer/customerApi";
import FormTextArea from "../Forms/FormTextArea";

const AddUpdateAddress = () => {
  const { id } = getUserInfo() as UserInfo;

  //Get
  const { data, isLoading: getLoad, refetch } = useGetSingleCustomerQuery(id);
  const customerData = data?.data;
  //Update
  const [updateCustomer, { isLoading: updateLoad }] =
    useUpdateCustomerMutation();

  const onSubmit = async (values: any) => {
    message.loading("Updating....");
    try {
      console.log(values);
      const res = await updateCustomer({
        id,
        data: {
          ...values,
        },
      }).unwrap();
      console.log(res);
      if (res.data) {
        message.success(`Address updated successfully`);
      } else {
        // message.error(res.message);
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
        {customerData?.address &&
        customerData?.contactNumber &&
        customerData?.emergencyContactNumber &&
        customerData?.fullName
          ? "Update Address"
          : "Add Address"}
      </h1>
      <div>
        <Form
          submitHandler={onSubmit}
          defaultValues={
            id
              ? {
                  ...(customerData
                    ? {
                        address: customerData.address,
                        contactNumber: customerData.contactNumber,
                        emergencyContactNumber:
                          customerData.emergencyContactNumber,
                        fullName: customerData.fullName,
                      }
                    : {}),
                }
              : {}
          }
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
                  name={"fullName"}
                  size="large"
                  label="Full Name"
                  required={true}
                  placeholder="Please enter your full name"
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
                  label="Contact Number"
                  required={true}
                  placeholder="Please enter your contact number"
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
                  placeholder="Please enter your emergency contact number"
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
                  placeholder="Please enter your address"
                />
              </Col>
            </Row>
            <div className="flex justify-end items-center">
              <Button htmlType="submit" type="primary" disabled={updateLoad}>
                {customerData?.address &&
                customerData?.contactNumber &&
                customerData?.emergencyContactNumber &&
                customerData?.fullName
                  ? "Update"
                  : "Add"}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddUpdateAddress;
