import React from "react";
import { Select } from "antd";
import { useFormContext, Controller } from "react-hook-form";
import { useGetAllSkusQuery } from "@/redux/api/sku/skuApi";

export type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
  handleChange?: (value: string) => void;
};

const SelectProductSkuOptions: React.FC<SelectFieldProps> = ({
  name,
  size = "large",
  value,
  placeholder = "select",
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

  const { data: skuAllData, isLoading } = useGetAllSkusQuery({
    limit: 100,
    page: 1,
  });
  const skuData = skuAllData?.data;
  const skuOptions =
    skuData &&
    skuData?.map((sku) => {
      return {
        label: sku?.title,
        value: sku?.id,
      };
    });

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
            options={skuOptions}
            value={value}
            style={{ width: "100%" }}
          />
        )}
      />
    </>
  );
};

export default SelectProductSkuOptions;
