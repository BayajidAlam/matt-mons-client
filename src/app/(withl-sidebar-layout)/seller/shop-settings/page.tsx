"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormKeyValuePairInput from "@/components/Forms/FormKeyValuePairInput";
import FormSwitch from "@/components/Forms/FormSwitch";
import SelectProductCategoryOptions from "@/components/Forms/ProductCategoryOptions";
import SelectProductSkuOptions from "@/components/Forms/ProductSkuOptions";
import SelectProductTagsOptions from "@/components/Forms/ProductTagOptions";
import TextEditor from "@/components/TextEditor/TextEditor";
import UploadImage from "@/components/ui/UploadImage";
import UploadMultipleImage from "@/components/ui/UploadMultipleImage";
import { useCreateProductMutation } from "@/redux/api/products/productsApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ShopSetting = ({ id }: { id?: string }) => {
  const { shopId, fullName, role } = getUserInfo() as any;

  const [image, setimage] = useState("");
  const [images, setImages] = useState<string[]>([]);

  //Create
  const [createProduct, { isLoading: createLoading }] =
    useCreateProductMutation();
  const router = useRouter();

  const onSubmit = async (values: any) => {
    message.loading("Adding....");
    try {
      const res = await createProduct({
        ...values,
        productMainImage: image,
        productAdditionalImages: images,
        shopId,
        createdBy: fullName,
      }).unwrap();

      if (res?.data) {
        message.success(`Product ${id ? "updated" : "added"} successfully`);
        router.push(`/${role}/products/${res?.data?.id}`);
      } else {
        message.error(res?.data?.message);
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
        <h1 className="my-1 font-bold text-lg ">Shop Setting</h1>

        <Link href={`/${role}/dashboard`}>
          <Button type="primary" className="text-md">
            Back
          </Button>
        </Link>
      </div>
      <div className="bg-white p-5 pt-0 w-full">
        <Form submitHandler={onSubmit}>
          <div className="my-4">
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col xs={24} md={24} lg={24}>
                <div className="flex justify-start items-center gap-3">
                  <h1 className="text-base">
                    Allow sells manager to create coupon
                  </h1>
                  <FormSwitch name="productName" size="default" />
                </div>
              </Col>
              <Col xs={24} md={24} lg={24}>
                <div className="flex justify-start items-center gap-3">
                  <h1 className="text-base">
                    Allow sells manager to create coupon
                  </h1>
                  <FormSwitch name="allowCreateCoupon" size="default" />
                </div>
              </Col>
              <Col xs={24} md={24} lg={24}>
                <div className="flex justify-start items-center gap-3">
                  <h1 className="text-base">Another setting</h1>
                  <FormSwitch name="anotherSetting" size="default" />
                </div>
              </Col>
              <Col xs={24} md={24} lg={24}>
                <div className="flex justify-start items-center gap-3">
                  <h1 className="text-base">Yet another setting</h1>
                  <FormSwitch name="yetAnotherSetting" size="default" />
                </div>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ShopSetting;
