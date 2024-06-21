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

const AddUpdateManager = ({ id }: { id?: string }) => {
  console.log(id)
  const [image, setimage] = useState("");
  //Get
  const { data, isLoading: getLoad } = useGetSingleSellsManagerQuery(
    id ? id : ""
  );
console.log(data)
  // Update
  const [updateSellsManager, { isLoading: updateLoad }] =
    useUpdateSellsManagerMutation();

  // Create
  const [createSellsManager, { isLoading: createLoad }] =
    useCreateSellsManagerMutation();

  const onSubmit = async (values: any) => {
    console.log(values)
    message.loading(id ? "Updating...." : "Adding....");
    id ? values.profileImg : (values.sellsManager.profileImg = image);
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

  // if (id && getLoad) {
  //   return <Loading />;
  // }

  // console.log(data);

  // id: 'f94366d3-f438-4f72-8209-0a72c8754cb2',
  //       fullName: 'John Doe',
  //       contactNumber: '1234567890',
  //       emergencyContactNumber: '0987654321',
  //       address: '123 Main St, Anytown, USA',
  //       profileImg: 'https://example.com/path/to/image.jpg',
  //       userId: '3113e9bb-c2cb-4d74-a5aa-a2c66eca605d',
  //       nidNumber: 'AB1234567',
  //       isActive: true,
  //       shopId: '8f6f5c26-e800-49bc-842e-9e303d21dcca',
  //       createdAt: '2024-06-20T03:14:40.179Z',
  //       updatedAt: '2024-06-20T03:14:40.179Z'
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
                  name="profileImg"
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
                        name="userName"
                        size="large"
                        label="User Name"
                        required={true}
                        placeholder="Please enter sellsManager user name"
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
                        required={true}
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
                  name={id ? "fullName" : "fullName"}
                  size="large"
                  label="Full Name"
                  required={true}
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
                  name={id ? "nidNumber" : "nidNumber"}
                  size="large"
                  label="NID Number"
                  required={true}
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
                  name={id ? "contactNumber" : "contactNumber"}
                  size="large"
                  label="Contact No"
                  required={true}
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
                      : "emergencyContactNumber"
                  }
                  size="large"
                  label="Emergency Contact No"
                  required={true}
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
                  name={id ? "address" : "address"}
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
