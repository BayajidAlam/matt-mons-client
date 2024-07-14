import React from "react";
import { Switch } from "antd";
import { useFormContext, Controller } from "react-hook-form";
import { getErrorMessageByPropertyName } from "@/utils/schema-validator";

interface IInput {
  name: string;
  label?: string;
  size?: "default" | "small";
  defaultChecked?: boolean;
  disabled?: boolean;
  className?: string;
  validation?: object;
  required?: boolean;
}

const FormSwitch = ({
  name,
  defaultChecked = false,
  disabled = false,
  size = "default",
  required,
  className,
  validation,
  label,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <>
     <h1 className="text-base"> {label && label}</h1>
      {required && (
        <span
          style={{
            color: "red",
          }}
        >
          *
        </span>
      )}
      <Controller
        control={control}
        name={name}
        defaultValue={defaultChecked}
        rules={validation}
        render={({ field: { onChange, value, ref } }) => (
          <Switch
            size={size}
            checked={value}
            onChange={onChange}
            disabled={disabled}
            className={className}
            ref={ref}
          />
        )}
      />
      {errorMessage && <small style={{ color: "red" }}>{errorMessage}</small>}
    </>
  );
};

export default FormSwitch;
