"use client";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import StyledComponentsRegistry from "./AntdRegistry";
import { AliasToken } from "antd/es/theme/internal";
import { ConfigProvider } from "antd";

const Providers = ({ children }: { children: React.ReactNode }) => {

  const customTheme = {
    token: {
      colorPrimary: "#1890ff",
      colorInfo: "#a18dff",
    } as Partial<AliasToken>,
    components: {
      Layout: {
        triggerBg: "#1890ff",
      },
      Statistic: {
        titleFontSize: 16,
      },
    },
  };


  return (
    <Provider store={store}>
      <ConfigProvider theme={customTheme}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </ConfigProvider>
    </Provider>
  );
};

export default Providers;