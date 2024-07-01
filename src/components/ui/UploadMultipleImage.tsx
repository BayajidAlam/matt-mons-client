import React, { useState } from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import uploadImgCloudinary from "@/hooks/uploadImgCloudinary";

type IUploadMultipleImageProps = {
  label: string;
  required: boolean;
  name: string;
  setImageStatus: any;
};

const UploadMultipleImage = ({
  label,
  required,
  name,
  setImageStatus,
}: IUploadMultipleImageProps) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const { setValue } = useFormContext();

  const uploadImages = async (files: File[]) => {
    setLoading(true);
    const uploadPromises = files.map((file: File) => uploadImgCloudinary(file));
    try {
      const imageUrls = await Promise.all(uploadPromises);
      setImages(imageUrls);
      setValue(name, imageUrls);
      setImageStatus(imageUrls); // Update the state in parent component
    } catch (error) {
      message.error("Upload failed");
      console.error("Failed to upload images", error);
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file: File, fileList: File[]) => {
    uploadImages(fileList);
    return false;
  };

  const uploadedImages = images.map((img, i) => (
    <Image key={img} src={img} alt="uploaded image" width={100} height={100} />
  ));

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      {label && <span>{label}</span>}
      {required && <span style={{ color: "red" }}>*</span>}

      <div className="flex justify-start items-center gap-2">
        <div className="uploaded-images flex justify-start items-center gap-2">
          {uploadedImages}
        </div>
        <Upload
          name={name}
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          multiple
        >
          {images.length >= 4 ? null : uploadButton}
        </Upload>
      </div>
    </>
  );
};

export default UploadMultipleImage;
