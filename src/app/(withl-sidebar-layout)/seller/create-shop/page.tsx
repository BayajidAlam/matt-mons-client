"use client";

import Loading from "@/app/loading";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import ActionBar from "@/components/ui/ActionBar";
import UploadImage from "@/components/ui/UploadImage";
import { authKey } from "@/constants/storagekey";
import { useGetSingleSellerQuery } from "@/redux/api/seller/sellerApi";
import { useCreateNewShopMutation } from "@/redux/api/shop/shopApi";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateAdminPage = () => {
  const [image, setImage] = useState("");
  const { id, sellerId, shopCount } = getUserInfo() as any;
  const { data, isLoading } = useGetSingleSellerQuery(id);
  const { profileImg = "/" } = data?.data ?? {};

  const router = useRouter();

  const formattedProfileImg =
    profileImg.startsWith("http://") ||
    profileImg.startsWith("https://") ||
    profileImg.startsWith("/")
      ? profileImg
      : `/${profileImg}`;

  const [createNewShop, { isLoading: createShopLoading }] =
    useCreateNewShopMutation();

  const onSubmit = async (values: any) => {
    const shopData = {
      sellerId,
      shopName: values.shopName,
      shopImage: image,
      location: values.location,
    };
    try {
      const res = (await createNewShop(shopData)) as any;
      if (res?.data?.success) {
        message.success(`${res?.data?.message}`);
        removeUserInfo(authKey);
        router.push("/login");
      }
      console.log(res);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  if (isLoading || createShopLoading) return <Loading />;
  return (
    <div className="bg-white border border-blue-200 rounded-lg shadow-md shadow-blue-200 p-5 space-y-3">
      <ActionBar inline title="Create Shop" />
      <div>
        <Form
          submitHandler={onSubmit}
          defaultValues={
            id
              ? //@ts-ignore
                data?.data
              : {}
          }
        >
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Seller Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                style={{
                  marginTop: "10px",
                }}
                className="gutter-row"
                xs={10}
                sm={6}
                md={6}
                lg={8}
              >
                <Image
                  src={formattedProfileImg}
                  alt="avatar"
                  style={{ width: "100%", height: "100px" }}
                  width={100}
                  height={100}
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  disabled
                  type="text"
                  name="fullName"
                  size="large"
                  label="Full Name"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  disabled
                  type="text"
                  name="address"
                  size="large"
                  label="Address"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  disabled
                  type="text"
                  name="contactNumber"
                  size="large"
                  label="Contact Number"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  disabled
                  type="text"
                  name="emergencyContactNumber"
                  size="large"
                  label="Emergency Contact Number"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  disabled
                  type="text"
                  name="nidNumber"
                  size="large"
                  label="NID Number"
                />
              </Col>
            </Row>
          </div>

          {/* basic info */}
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Shop Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <UploadImage
                  name="shopImage"
                  label="Shop Image"
                  required
                  setImageStatus={setImage}
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="shopName"
                  size="large"
                  label="Shop Name"
                />
              </Col>

              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="location"
                  size="large"
                  label="Location"
                />
              </Col>
            </Row>
          </div>
          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateAdminPage;
