"use client";
import { Button, Checkbox, Col, Divider, Row, message } from "antd";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FormDatePicker from "../Forms/FormDatePicker";
import { IoLogoFacebook, IoLogoGoogle } from "react-icons/io";
import { useCreateCustomerMutation } from "@/redux/api/user/userApi";

type FormValues = {
  id: string;
  password: string;
};

const RegisterPageComponent = () => {
  const [createCustomer, { isLoading }] = useCreateCustomerMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const customerData = {
        email: data.email,
        password: data.password,
        customer: {
          fullName: data.fullName,
        },
      };
      const res = await createCustomer({ ...customerData }).unwrap();

      //@ts-ignore
      if (res?.success) {
        router.push("/login");
        //@ts-ignore
        message.success(`${res.message}`);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const onChange = (e: any) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <Row className="pr-4 pt-4" justify="center" align="middle">
      <Col sm={12} md={8} lg={24}>
        <div>
          <Form submitHandler={onSubmit}>
            <div>
              <FormInput
                name="fullName"
                type="text"
                size="large"
                label="Full Name"
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput name="email" type="email" size="large" label="Email" />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="password"
                type="password"
                size="large"
                label="Password"
              />
            </div>

            <div className="flex justify-between items-center mb-3">
              <Checkbox onChange={onChange}>Remember me</Checkbox>
              <Link href="/home">Forgot Password</Link>
            </div>
            <Button type="primary" htmlType="submit">
              {isLoading ? "Signing up..." : "Register"}
            </Button>
          </Form>

          <Divider className="border-red-500">OR Login With</Divider>
          <div className="mt-2 flex justify-center items-center gap-2">
            <div className="mt-2 flex justify-start items-center gap-2">
              <IoLogoGoogle className="text-xl" />{" "}
              <p className="text-lg">Google</p>
            </div>
            <div className="mt-2 flex justify-start items-center gap-2">
              <IoLogoFacebook className="text-xl" />{" "}
              <p className="text-lg">Facebook</p>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default RegisterPageComponent;
