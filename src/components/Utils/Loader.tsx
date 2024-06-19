import Image from "next/image";
// import { HashLoader } from "react-spinners";

const Loader = ({
  className,
  color,
  size,
}: {
  className?: string;
  color?: string;
  size?: "small" | "large" | "default";
}) => {
  return (
    // <div
    //   className={`${
    //     className ? className : "flex justify-center items-center"
    //   }`}
    // >
    //   <Flex justify="center" align="center" gap="middle">
    //     <Spin size={size ? size : "default"} />
    //   </Flex>
    //   {/* <HashLoader
    //     color={color ? color : "#1890ff"}
    //     size={50}
    //   /> */}
    // </div>
    <div className="h-[50vh] flex items-end justify-center">
      <Image width={100} height={100} src={"/loading.gif"} alt="loading" />
    </div>
  );
};

export default Loader;
