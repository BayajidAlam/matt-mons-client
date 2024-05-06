import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { authKey } from "@/constants/storagekey";
import HeaderTop from "../Home/Header/HeaderTop";

const UserUiHeader = () => {
  const router = useRouter();

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  // const items: MenuProps["items"] = [
  //   {
  //     key: "0",
  //     label: (
  //       <Button onClick={logOut} type="text" danger>
  //         Logout
  //       </Button>
  //     ),
  //   },
  // ];

  const { role } = getUserInfo() as any;

  return (
    <div>
      <HeaderTop />
    </div>
  );
};

export default UserUiHeader;
