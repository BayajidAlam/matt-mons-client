import uploadImgCloudinary from "@/hooks/uploadImgCloudinary";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

type ImageUploadProps = {
  name: string;
  defaultImage?: string;
  customChange?: any;
  setImageStatus: React.Dispatch<React.SetStateAction<any>>;
};

const UploadMultipleImage = ({
  name,
  defaultImage,
  customChange,
  setImageStatus,
}: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [imgs, setImgs] = useState<string[]>([]);
  const { setValue } = useFormContext();

  const handleChange: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile<any>>
  ) => {
    
  };

  const beforeUpload = async (file: RcFile) => {
    try {
      setLoading(true);
      const imgUrl = await uploadImgCloudinary(file); 
      setImageStatus(imgUrl);
      setValue(name, imgUrl);
      setImgs((prevImgs) => [...prevImgs, imgUrl]);
      setLoading(false);
      return imgUrl;
    } catch (error) {
      console.error("Failed to upload image to Cloudinary", error);
      message.error("Upload failed");
      setLoading(false);
      throw error;
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
      <Upload
        name={name}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        multiple={true} 
      >
        {imgs.length > 0
          ? imgs.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`avatar ${index}`}
                style={{ width: "100%" }}
                width={100}
                height={100}
              />
            ))
          : uploadButton}
      </Upload>
    </>
  );
};

export default UploadMultipleImage;
