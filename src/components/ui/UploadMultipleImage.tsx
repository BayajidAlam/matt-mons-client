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
  defaultImage?: string[];
  customChange?: any;
  setImageStatus: React.Dispatch<React.SetStateAction<any>>;
};

const UploadMultipleImage = ({
  label,
  required,
  name,
  defaultImage,
  customChange,
  setImageStatus,
}: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const { setValue } = useFormContext();

  const handleChange: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
    }
    if (info.file.status === "done") {
      setImages((prevImages) => {
        const updatedImages = [...prevImages, info.file.response];
        setValue(name, updatedImages);
        return updatedImages;
      });
      setLoading(false);
    }
    if (info.file.status === "error") {
      setLoading(false);
      message.error(`${info.file.name} upload failed.`);
    }
  };

  const beforeUpload = async (file: RcFile) => {
    if (images.length >= 4) {
      message.error("You can only upload a maximum of 4 images.");
      return false;
    }
    try {
      setLoading(true);
      const imgUrl = await uploadImgCloudinary(file);
      setImageStatus(imgUrl);
      setImages((prevImages) => {
        const updatedImages = [...prevImages, imgUrl];
        setValue(name, updatedImages); 
        return updatedImages;
      });
      setLoading(false);
      return false;
    } catch (error) {
      console.error("Failed to upload image to Cloudinary", error);
      message.error("Upload failed");
      setLoading(false);
      throw error;
    }
  };

  console.log(images, "images");
  const uploadedImages = (
    <div className="md:flex justify-start items-center gap-2">
      {images.map((img) => (
        <Image
          key={img}
          src={img}
          alt="avatar"
          style={{ width: "100px", height: "100px" }}
          width={100}
          height={100}
        />
      ))}
    </div>
  );

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      {label && label}
      {required && <span style={{ color: "red" }}>*</span>}

      <Upload
        name={name}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        multiple
      >
        {images.length > 0 ? uploadedImages : uploadButton}
      </Upload>
    </>
  );
};

export default UploadMultipleImage;
