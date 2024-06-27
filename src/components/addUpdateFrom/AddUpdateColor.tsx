"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import { Button, Col, Row, message } from "antd";
import { useState } from "react";
import FormSelectField from "../Forms/FormSelectField";
import { genderOptions } from "@/constants/global";
import Loading from "@/app/loading";
import UploadImage from "../ui/UploadImage";

const AddUpdateColor = ({ id }: { id?: string }) => {
  const [image, setimage] = useState("");
  //Get
  // const { data, isLoading: getLoad } = useGetSingleDriverQuery(id ? id : "");
  const data: any = [];
  //Update
  // const [updateDriver, { isLoading: updateLoad }] = useUpdateDriverMutation();

  //Create
  // const [createDriver, { isLoading: createLoad }] = useCreateDriverMutation();

  const onSubmit = async (values: any) => {
    message.loading(id ? "Updating...." : "Adding....");
    id ? values.profileImg : (values.driver.profileImg = image);
    try {
      // const res = id
      //   ? await updateDriver({
      //       id,
      //       data: {
      //         fullName: values.driver.fullName,
      //         mobile: values.driver.mobile,
      //         licenseNo: values.driver.licenseNo,
      //         bloodGroup: values.driver.bloodGroup,
      //         address: values.driver.address,
      //       },
      //     }).unwrap()
      //   : await createDriver(values).unwrap();
      // if (res.id) {
      //   message.success(`Driver ${id ? "updated" : "added"} successfully`);
      // } else {
      //   message.error(res.message);
      // }
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
        {id ? "Update Color" : "Add Color"}
      </h1>
      <div>
        <Form submitHandler={onSubmit} defaultValues={id ? { ...data } : {}}>
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
                  name={id ? "title" : "title"}
                  size="large"
                  label="Color"
                  required={true}
                  placeholder="Please enter Color Name"
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

export default AddUpdateColor;
