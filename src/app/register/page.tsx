import React from "react";
import SignUpImage from "@/assets/sign-up.svg";
import Image from "next/image";
import RegisterPageComponent from "@/components/register/Register";

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-between items-start w-1/2 mx-auto border  px-20 py-20 rounded-md shadow-md">
        <div className="w-[50%]">
          <h1 className="text-lg font-bold">Sign Up</h1>
          <RegisterPageComponent />
        </div>
        <div className="w-[50%] mt-12 ml-20">
          <Image
            src={SignUpImage}
            width={500}
            height={500}
            alt="register-image"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
