"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormKeyValuePairInput from "@/components/Forms/FormKeyValuePairInput";
import SelectProductCategoryOptions from "@/components/Forms/ProductCategoryOptions";
import SelectProductSkuOptions from "@/components/Forms/ProductSkuOptions";
import SelectProductTagsOptions from "@/components/Forms/ProductTagOptions";
import TextEditor from "@/components/TextEditor/TextEditor";
import UploadImage from "@/components/ui/UploadImage";
import UploadMultipleImage from "@/components/ui/UploadMultipleImage";
import {
  useCreateProductMutation,
  useGetSingProductQuery,
  useUpdateProductMutation,
} from "@/redux/api/products/productsApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";
import Link from "next/link";
import { useState } from "react";

const AddUpdateProduct = ({ id }: { id?: string }) => {
  const { shopId, fullName, role } = getUserInfo() as any;

  const [image, setimage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  //Get
  const { data, isLoading: getLoad } = useGetSingProductQuery(id ? id : "");

  //Update
  const [updateProduct, { isLoading: updateLoad }] = useUpdateProductMutation();

  //Create
  const [createProduct, { isLoading: createLoad }] = useCreateProductMutation();

  console.log(images, "imgs");
  const onSubmit = async (values: any) => {
    message.loading(id ? "Updating...." : "Adding....");

    values.productMainImage = image;
    console.log(values, "vault");
    try {
      const res = id
        ? await updateProduct({
            id,
            data: {
              ...values,
            },
          }).unwrap()
        : await createProduct({
            ...values,
            productAdditionalImages: images,
            shopId,
            createdBy: fullName,
          }).unwrap();
      if (res?.data) {
        message.success(`Product ${id ? "updated" : "added"} successfully`);
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

  return (
    <div className="bg-white border border-blue-200 rounded-lg  shadow-md shadow-blue-200  space-y-3 lg:m-5 md:m-1">
      <div className="border-b p-4 flex justify-between items-center">
        <h1 className="my-1 font-bold text-lg ">
          {id ? "Update Product" : "Add Product"}
        </h1>

        <Link href={`/${role}/products`}>
          <Button type="primary" className="text-md">
            Back
          </Button>
        </Link>
      </div>
      <div className="bg-white p-5 pt-0 w-full lg:w-3/6">
        <Form
          submitHandler={onSubmit}
          defaultValues={id ? { ...data?.data } : {}}
        >
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
                  name="productDetails"
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
                  name="minPrice"
                  label="Main Price"
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
                  name="discountPrice"
                  label="Discount Price"
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
                <SelectProductSkuOptions
                  name="productSkuId"
                  label="Product SKU"
                />
              </Col>
              <Col
                style={{
                  marginTop: "10px",
                }}
                xs={24}
                md={12}
                lg={12}
              >
                <SelectProductCategoryOptions
                  name="categoryId"
                  label="Product Category"
                />
              </Col>
              <Col
                style={{
                  marginTop: "10px",
                }}
                xs={24}
                md={12}
                lg={12}
              >
                <SelectProductTagsOptions
                  name="productTags"
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
                  name="productAdditionalInfo"
                  label="Additional Info"
                  required
                />
              </Col>
            </Row>

            <Row className="my-4" gutter={{ xs: 24, xl: 24, lg: 24, md: 24 }}>
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
                  name="productMainImage"
                  label="Product Image"
                  required
                />
              </Col>
              <Col
                style={{
                  marginTop: "10px",
                }}
                className="gutter-row"
                xs={14}
                sm={18}
                md={18}
                lg={20}
              >
                <UploadMultipleImage
                  required
                  name="additionalImage"
                  label="Additional Image"
                  setImageStatus={setImages}
                />
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
