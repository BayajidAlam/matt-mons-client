import uploadImgCloudinary from "@/hooks/uploadImgCloudinary";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

type ImageUploadProps = {
  label: string;
  required?: boolean;
  name: string;
  defaultImage?: string;
  customChange?: any;
  setImageStatus: React.Dispatch<React.SetStateAction<any>>;
};

const UploadImage = ({
  label,
  required,
  name,
  defaultImage,
  customChange,
  setImageStatus,
}: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState("");
  const { setValue } = useFormContext();

  const handleChange: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    // if (info.file.status === "uploading") {
    //   setLoading(true);
    // }
    // if (info.file.status === "done") {
    //   setLoading(false);
    //   setValue(name, info.file.response); // Assuming the response contains the Cloudinary URL
    // }
    // if (info.file.status === "error") {
    //   setLoading(false);
    //   message.error(`${info.file.name} upload failed.`);
    // }
  };

  const beforeUpload = async (file: RcFile) => {
    try {
      setLoading(true);
      const imgUrl = await uploadImgCloudinary(file); // Cloudinary upload
      // console.log("Cloudinary URL:", imgUrl);
      setImageStatus(imgUrl);
      setValue(name, setImg);
      setImg(imgUrl);
      setLoading(false);
      return imgUrl; // Returning the Cloudinary URL for Ant Design to use
    } catch (error) {
      console.error("Failed to upload image to Cloudinary", error);
      message.error("Upload failed");
      setLoading(false);
      throw error; // Throw the error to prevent the file from being added to the upload list
    }
  };

  const uploadButton = (
    <div className="">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      {label && label}
      {required && (
        <span
          style={{
            color: "red",
          }}
        >
          *
        </span>
      )}

      <Upload
        name={name}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {img ? (
          <Image
            src={img as string}
            alt="avatar"
            style={{ width: "100%" }}
            width={100}
            height={100}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

export default UploadImage;
