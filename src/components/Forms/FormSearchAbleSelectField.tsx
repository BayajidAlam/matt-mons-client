import React from "react";
import { Select } from "antd";
import { useFormContext, Controller } from "react-hook-form";

export type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
  handleChange?: (value: string) => void;
};

const FormSearchableSelectField: React.FC<SelectFieldProps> = ({
  name,
  size = "large",
  value,
  placeholder = "select",
  options,
  label,
  defaultValue,
  handleChange,
}) => {
  const { control } = useFormContext();

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Select
            showSearch
            placeholder={placeholder}
            optionFilterProp="children"
            onChange={handleChange ? handleChange : onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            size={size}
            options={options}
            value={value}
            style={{ width: "100%" }}
          />
        )}
      />
    </>
  );
};

export default FormSearchableSelectField;
