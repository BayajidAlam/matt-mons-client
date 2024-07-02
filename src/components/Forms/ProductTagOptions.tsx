"use client";

import { useGetAllTagsQuery } from "@/redux/api/tags/tagsApi";
import { Select } from "antd";
import { useFormContext, Controller } from "react-hook-form";

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
  disabled?: boolean;
};

const ProductTagOptions = ({
  name,
  size = "large",
  value,
  placeholder = "select",
  label,
  defaultValue,
  disabled,
}: SelectFieldProps) => {
  const { control } = useFormContext();

  const { data: tagsAllData, isLoading } = useGetAllTagsQuery({
    limit: 100,
    page: 1,
  });
  const tagsData = tagsAllData?.data;
  const tagOptions =
    tagsData &&
    tagsData?.map((sku) => {
      return {
        label: sku?.title,
        value: sku?.title,
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
            disabled={disabled}
            onChange={onChange}
            size={size}
            options={tagOptions}
            value={value}
            style={{ width: "100%" }}
            placeholder={placeholder}
            allowClear
            mode="multiple"
          />
        )}
      />
    </>
  );
};

export default ProductTagOptions;
