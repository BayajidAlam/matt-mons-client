import { Modal } from "antd";
import React from "react";

const EComModalWrapper = ({
  children,
  loading,
  setShowModel,
  showModel,
  width,
}: {
  children: React.ReactElement;
  loading?: boolean;
  showModel?: any;
  setShowModel?: any;
  width?: any;
}) => {

  const handleOk = () => {
    setShowModel(false);
  };

  const handleCancel = () => {
    setShowModel(false);
  };

  return (
    <div>
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
    </div>
  );
};

export default EComModalWrapper;
