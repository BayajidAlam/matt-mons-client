import { Button } from "antd";
import React from "react";

const ModalTriggerButton = ({
  icon,
  buttonText,
  buttonDanger,
  setShowModel,
}: {
  buttonText?: string;
  buttonDanger?: boolean;
  setShowModel?: any;
  icon?: any;
}) => {
  
  const showModal = () => {
    setShowModel(true);
  };

  return (
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
  );
};

export default ModalTriggerButton;
