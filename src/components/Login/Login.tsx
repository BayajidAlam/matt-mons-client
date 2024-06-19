"use client";
import { Button, Checkbox, Col, Divider, Row, message } from "antd";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoLogoFacebook, IoLogoGoogle } from "react-icons/io";

type FormValues = {
  email: string;
  password: string;
};

const LoginPageComponent = () => {

  const [userLogin, { isLoading }] = useUserLoginMutation();
  const router = useRouter();
  
  // console.log(isLoggedIn());

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userLogin({ ...data }).unwrap();

      if (res?.data?.accessToken) {
        router.push("/home");
        message.success(`${res.message}`);
      }
      storeUserInfo({ accessToken: res?.data?.accessToken });
      // console.log(res);
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
              {isLoading ? "Signing in..." : "Login"}
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

export default LoginPageComponent;
