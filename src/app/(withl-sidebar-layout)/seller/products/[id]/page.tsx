"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormKeyValuePairInput from "@/components/Forms/FormKeyValuePairInput";
import SelectProductCategoryOptions from "@/components/Forms/ProductCategoryOptions";
import SelectProductSkuOptions from "@/components/Forms/ProductSkuOptions";
import SelectProductTagsOptions from "@/components/Forms/ProductTagOptions";
import TextEditor from "@/components/TextEditor/TextEditor";
import { useGetSingProductQuery } from "@/redux/api/products/productsApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";

const ViewProduct = ({ params }: any) => {
  const id = params?.id;
  const { role } = getUserInfo() as any;

  //Get
  const { data, isLoading: getLoad } = useGetSingProductQuery(id);
  const prodData = data?.data;
  console.log(prodData);
  const onSubmit = async (values: any) => {};

  // if (id && getLoad) {
  //   return <Loading />;
  // }

  return (
    <div className="bg-white border border-blue-200 rounded-lg  shadow-md shadow-blue-200  space-y-3 lg:m-5 md:m-1">
      <div className="border-b p-4 flex justify-between items-center">
        <h1 className="my-1 font-bold text-lg ">Product Details</h1>

        <Link href={`/${role}/products`}>
          <Button type="primary" className="text-md">
            Back
          </Button>
        </Link>
      </div>
      <div className="bg-white p-5 pt-0 w-full lg:w-3/6">
        <Form submitHandler={onSubmit} defaultValues={{ ...data?.data }}>
          <div className="my-4">
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col xs={24} md={24} lg={24}>
                <FormInput
                  readOnly
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
                  disable
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
                  readOnly
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
                  readOnly
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
                  disabled
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
                  disabled
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
                  disabled
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
                  view
                  disable
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
                <Image
                  src={prodData?.productMainImage}
                  alt="avatar"
                  style={{ width: "100px", height: "100px" }}
                  width={100}
                  height={100}
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
                {/* <UploadMultipleImage
                  required
                  name="additionalImage"
                  label="Additional Image"
                  setImageStatus={setImages}
                /> */}

                <div className="flex justify-start items-center gap-2">
                  {prodData?.productAdditionalImages?.map(
                    (image: string, i: number) => (
                      <Image
                        key={i}
                        src={image}
                        alt="avatar"
                        style={{ width: "100px", height: "100px" }}
                        width={100}
                        height={100}
                      />
                    )
                  )}
                </div>
              </Col>
            </Row>

            <Link href={`/${role}/products/update-product/${id}`}>
              <div className="flex justify-end items-center mt-3">
                <Button htmlType="submit" type="primary">
                  Update
                </Button>
              </div>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ViewProduct;
