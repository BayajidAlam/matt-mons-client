"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormKeyValuePairInput from "@/components/Forms/FormKeyValuePairInput";
import FormMultiSelectField from "@/components/Forms/FormMultiSelectField";
import FormSearchableSelectField from "@/components/Forms/FormSearchAbleSelectField";
import TextEditor from "@/components/TextEditor/TextEditor";
import UploadImage from "@/components/ui/UploadImage";
import { genderOptions } from "@/constants/global";
import { Button, Col, Row, message } from "antd";
import { useState } from "react";

const AddUpdateProduct = ({ id }: { id?: string }) => {
  console.log("modal clicked with id: " + id);
  const [image, setimage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  //Get
  // const { data, isLoading: getLoad } = useGetSingleDriverQuery(id ? id : "");
  const data: any = [];
  //Update
  // const [updateDriver, { isLoading: updateLoad }] = useUpdateDriverMutation();

  //Create
  // const [createDriver, { isLoading: createLoad }] = useCreateDriverMutation();

  const onSubmit = async (values: any) => {
    message.loading(id ? "Updating...." : "Adding....");

    console.log(values);
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
    <div className="bg-white border border-blue-200 rounded-lg  shadow-md shadow-blue-200  space-y-3 lg:m-5 md:m-1">
      <h1 className="text-start my-1 font-bold text-lg border-b p-5">
        {id ? "Update Product" : "Add Product"}
      </h1>
      <div className="bg-white p-5 w-full lg:w-3/6 ">
        <Form submitHandler={onSubmit} defaultValues={id ? { ...data } : {}}>
          <div
            // style={{
            //   border: "1px solid #d9d9d9",
            //   borderRadius: "8px",
            //   padding: "20px",
            //   marginBottom: "10px",
            // }}
            className="my-4"
          >
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col xs={24} md={24} lg={24}>
                <FormInput
                  name="productName"
                  label="Product Name"
                  size="large"
                  required={true}
                />
              </Col>

              <Col
                style={{
                  marginTop: "10px",
                }}
                xs={24}
                md={24}
                lg={24}
              >
                <TextEditor
                  name="productDescription"
                  label="Product Details"
                  required
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
                  name="odoMeter"
                  label="Main Price"
                  type="number"
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
                  name="fee"
                  label="Discount Price"
                  type="number"
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
                <FormSearchableSelectField
                  name="Product SKU"
                  options={genderOptions}
                  label="Product SKU"
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
                <FormSearchableSelectField
                  name="categoryId"
                  options={genderOptions}
                  label="Product Category"
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
                <FormMultiSelectField
                  name="productTags"
                  options={genderOptions}
                  label="Product Tags"
                />
              </Col>
            </Row>
            <Row className="my-4" gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col
                style={{
                  marginTop: "10px",
                }}
                xs={24}
                md={24}
                lg={24}
              >
                <FormKeyValuePairInput
                  name="additionalInfo"
                  label="Additional Info"
                  required
                />
              </Col>
            </Row>

            <Row className="my-4" gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              {" "}
              <Col
                style={{
                  marginTop: "10px",
                }}
                className="gutter-row"
                xs={10}
                sm={6}
                md={6}
                lg={4}
              >
                <UploadImage
                  setImageStatus={setimage}
                  name="profileImg"
                  label="Product Image"
                  required
                />
              </Col>
              <Col
                style={{
                  marginTop: "10px",
                }}
                className="gutter-row"
                xs={10}
                sm={6}
                md={6}
                lg={4}
              >
                {/* <UploadMultipleImage
                  name="additionalImage"
                  label="Additional Image"
                  setImageStatus={setImages}
                /> */}
              </Col>
            </Row>

            <div className="flex justify-end items-center mt-3">
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

export default AddUpdateProduct;
