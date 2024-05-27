import React from "react";
import { Checkbox } from "antd";
import { Controller, useFormContext } from "react-hook-form";

export type CheckboxOptionType = {
  label: string;
  value: string;
  disabled?: boolean;
};

type CheckboxGroupProps = {
  checkboxLabel: string;
  required?: boolean;
  options: CheckboxOptionType[];
  defaultValue?: string[];
  disabled?: boolean;
};

const FormGroupCheckBox: React.FC<CheckboxGroupProps> = ({
  checkboxLabel,
  required,
  options,
  defaultValue,
  disabled = false,
}) => {
  const { control } = useFormContext();

  return (
    <>
      {" "}
      {checkboxLabel && checkboxLabel}
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
        name={checkboxLabel}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Checkbox.Group
            options={options}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        )}
      />
    </>
  );
};

export default FormGroupCheckBox;
