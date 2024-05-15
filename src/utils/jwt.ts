import { jwtDecode } from "jwt-decode";
export const decodedToken = (token: string) => {
  // return jwtDecode(token)
  const tkn =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MTU3ODQ1ODAsImV4cCI6MTc0NzMyMDU4MCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInJvbGUiOiJ1c2VyIn0.pyF625neeKKrjsMjh0Wz5VpPkBb-_coq-72n86Gncc8";
  return tkn;
};
