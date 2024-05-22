const upload_preset = "f4fg9x1n";
const cloud_name = "dnzlgpcc3";
// console.log(cloud_name);
const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

const uploadImgCloudinary = async (file: any) => {
  // console.log(file);
  try {
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("upload_preset", upload_preset as string);
    formData.append("cloud_name", cloud_name as string);

    const response = await fetch(url, {
      method: "post",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data?.secure_url;
    } else {
      console.error("Failed to upload image to Cloudinary");
    }
  } catch (error) {
    console.error(error, "error");
  }
};

export default uploadImgCloudinary;
