"use client";
import { Button, Modal } from "antd";
import React from "react";

const CustomModalWrapper = ({
  children,
  icon,
  buttonText,
  buttonDanger,
  loading,
  setShowModel,
  showModel,
  width,
}: {
  children: React.ReactElement;
  buttonText?: string;
  buttonDanger?: boolean;
  loading?: boolean;
  showModel?: any;
  setShowModel?: any;
  icon?: any;
  width?: any;
}) => {
  const showModal = () => {
    setShowModel(true);
  };

  const handleOk = () => {
    setShowModel(false);
  };

  const handleCancel = () => {
    setShowModel(false);
  };

  return (
    <>
      <div>
        <div className="md:hidden">
          <Button
            onClick={showModal}
            type="primary"
            danger={buttonDanger}
            style={{ width: "100%" }}
            className="!flex !items-center !gap-2 !justify-center"
          >
            {icon}
          </Button>
        </div>
        <div className="hidden md:block">
          <Button
            style={{ width: "100%" }}
            danger={buttonDanger}
            type="primary"
            onClick={showModal}
            className="!flex !items-center !gap-2 !justify-center"
          >
            {icon && <span className="m-1">{icon}</span>}
            {buttonText && buttonText}
          </Button>
        </div>
      </div>
      <Modal 
        open={showModel}
        confirmLoading={loading ? loading : false}
        onCancel={handleCancel}
        //! when i went hidden ok and cancel button then it use
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            {/* <Button>Custom Button</Button>
              <CancelBtn />
              <OkBtn /> */}
          </>
        )}
        // width="max-content"
        width={width ? width : 900}
      >
        {children}
      </Modal>
    </>
  );
};

export default CustomModalWrapper;
