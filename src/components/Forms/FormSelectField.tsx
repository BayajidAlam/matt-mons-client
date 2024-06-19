"use client";

import { Select } from "antd";
import { useFormContext, Controller } from "react-hook-form";

export type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  size?: "large" | "middle" | "small";
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
  handleChange?: (el: string) => void;
  disabled?: boolean;
  loading?: boolean;
  required?: boolean;
};

const FormSelectField = ({
  name,
  size = "large",
  value,
  placeholder = "select",
  options,
  label,
  defaultValue,
  handleChange,
  disabled,
  loading,
  required,
}: SelectFieldProps) => {
  const { control } = useFormContext();
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      {label ? label : null}
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
        render={({ field: { value, onChange } }) => (
          <Select
            showSearch
            optionFilterProp="children"
            // @ts-ignore
            filterOption={filterOption}
            onChange={handleChange ? handleChange : onChange}
            size={size}
            options={options}
            defaultValue={defaultValue}
            value={value}
            style={{ width: "100%" }}
            placeholder={placeholder}
            disabled={disabled}
            loading={loading}
          />
        )}
      />
    </>
  );
};

export default FormSelectField;
