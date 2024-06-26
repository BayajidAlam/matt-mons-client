"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import { Button, Col, Row, message } from "antd";
import { useState } from "react";
import UploadImage from "../ui/UploadImage";
import {
  useGetSingleSellsManagerQuery,
  useUpdateSellsManagerMutation,
} from "@/redux/api/manager/managerApi";
import { useCreateSellsManagerMutation } from "@/redux/api/user/userApi";
import { getUserInfo } from "@/services/auth.service";
import Loading from "@/app/loading";

const AddUpdateManager = ({ id }: { id?: string }) => {

  const { shopId } = getUserInfo();
  const [image, setimage] = useState("");

  //Get
  const { data, isLoading: getLoad } = useGetSingleSellsManagerQuery(
    id ? id : ""
  );

  // Update
  const [updateSellsManager, { isLoading: updateLoad }] =
    useUpdateSellsManagerMutation();

  // Create
  const [createSellsManager, { isLoading: createLoad }] =
    useCreateSellsManagerMutation();

  const onSubmit = async (values: any) => {
    message.loading(id ? "Updating...." : "Adding....");
    id ? values.profileImg : (values.sellsManager.profileImg = image);
    id ? values : (values.sellsManager.shopId = shopId);
    try {
      const res = id
        ? await updateSellsManager({
            id,
            data: {
              fullName: values.fullName,
              contactNumber: values.contactNumber,
              emergencyContactNumber: values.emergencyContactNumber,
              address: values.address,
              nidNumber: values.nidNumber,
            },
          }).unwrap()
        : await createSellsManager({ ...values }).unwrap();

      console.log(res);
      if (res?.data?.id) {
        message.success(
          `sellsManager ${id ? "updated" : "added"} successfully`
        );
      } else {
        message.error(res?.message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  if (id && getLoad) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-center my-1 font-bold text-2xl">
        {id ? "Update Manager" : "Add Manager"}
      </h1>
      <div>
        <Form
          submitHandler={onSubmit}
          defaultValues={id ? { ...data?.data } : {}}
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
                xs={10}
                sm={6}
                md={6}
                lg={4}
                // style={{
                //   marginBottom: "10px",
                // }}
              >
                <UploadImage
                  setImageStatus={setimage}
                  name="sellsManager.profileImg"
                  label=""
                />
              </Col>

              <Col
                className="gutter-row"
                xs={14}
                sm={18}
                md={18}
                lg={20}
                style={{
                  marginBottom: "10px",
                }}
              >
                <div className="space-y-[10px]">
                  <Col
                    style={{
                      padding: "0px",
                    }}
                  >
                    {!id && (
                      <FormInput
                        type="text"
                        name={id ? "email" : "email"}
                        size="large"
                        label="Email Address"
                        required={!id}
                        placeholder="Please enter sellsManager email"
                      />
                    )}
                  </Col>
                  <Col
                    style={{
                      padding: "0px",
                    }}
                  >
                    {!id && (
                      <FormInput
                        type="password"
                        name="password"
                        size="large"
                        label="Password"
                        required={!id}
                        placeholder="Please enter sellsManager password"
                      />
                    )}
                  </Col>
                </div>
              </Col>

              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={12}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name={id ? "fullName" : "sellsManager.fullName"}
                  size="large"
                  label="Full Name"
                  required={!id}
                  placeholder="Please enter full name"
                />
              </Col>

              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={12}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="tel"
                  name={id ? "nidNumber" : "sellsManager.nidNumber"}
                  size="large"
                  label="NID Number"
                  required={!id}
                  placeholder="Please enter mobile NID number"
                />
              </Col>

              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={12}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="tel"
                  name={id ? "contactNumber" : "sellsManager.contactNumber"}
                  size="large"
                  label="Contact No"
                  required={!id}
                  placeholder="Please enter contact number"
                />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={12}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name={
                    id
                      ? "emergencyContactNumber"
                      : "sellsManager.emergencyContactNumber"
                  }
                  size="large"
                  label="Emergency Contact No"
                  required={!id}
                  placeholder="Please enter emergency contact number"
                />
              </Col>

              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={24}
                style={{
                  marginBottom: "15px",
                }}
              >
                <FormTextArea
                  name={id ? "address" : "sellsManager.address"}
                  label="Address"
                  rows={3}
                  placeholder="Enter address"
                  required
                />
              </Col>
            </Row>
            <div className="flex justify-end items-center">
              <Button
                htmlType="submit"
                type="primary"
                // disabled={createLoad || updateLoad}
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

export default AddUpdateManager;
