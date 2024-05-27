"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { Button, Col, Row, message } from "antd";
import { useState } from "react";
import UploadImage from "../ui/UploadImage";
import TextEditor from "../TextEditor/TextEditor";
import FormColorPicker from "../Forms/FormColorPicker";
import { genderOptions } from "@/constants/global";
import FormSearchableSelectField from "../Forms/FormSearchAbleSelectField";
import FormGroupCheckBox from "../Forms/FormGroupCheckBox";
import FormKeyValuePairInput from "../Forms/FormKeyValuePairInput";
import UploadMultipleImage from "../UploadMultipleImage";

const options = [
  { label: "L", value: "L" },
  { label: "M", value: "M" },
  { label: "X", value: "X" },
  { label: "XL", value: "XL" },
];

const AddUpdateProduct = ({ id }: { id?: string }) => {
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
        {id ? "Update Product" : "Add Product"}
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
                <FormColorPicker name="colors" label="Color" required />
              </Col>
              <Col
                style={{
                  marginTop: "10px",
                }}
                xs={24}
                md={12}
                lg={8}
              >
                <FormGroupCheckBox
                  options={options}
                  checkboxLabel="Abailable Size"
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
                <UploadImage setImageStatus={setimage} name="profileImg" label="Product Image" required/>
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
                <UploadMultipleImage name="additionalImage" label="Additional Image" setImageStatus={setImages}/>
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
