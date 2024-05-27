import React, { useEffect } from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Input } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

interface FormKeyValuePairInputProps {
  name: string;
  label: string;
  required?: boolean;
}

const FormKeyValuePairInput: React.FC<FormKeyValuePairInputProps> = ({
  name,
  label,
  required,
}) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ key: "", value: "" });
    }
  }, [fields, append]);

  return (
    <>
      {" "}
      {label && label}
      {required && (
        <span
          style={{
            color: "red",
          }}
        >
          *
        </span>
      )}
      <div className="grid grid-cols-1 gap-4">
        {fields.map((field, index) => (
          <div
            className="flex justify-center items-center gap-2"
            key={field.id}
          >
            <Controller
              control={control}
              name={`${name}.${index}.key`}
              render={({ field }) => <Input placeholder="Key" {...field} />}
            />
            <Controller
              control={control}
              name={`${name}.${index}.value`}
              render={({ field }) => <Input placeholder="Value" {...field} />}
            />
            <button className="text-xl" onClick={() => remove(index)}>
              <MinusCircleOutlined />
            </button>
          </div>
        ))}
        <button
          className="text-xl text-end"
          onClick={() => append({ key: "", value: "" })}
        >
          <span className="text-base">Add</span> <PlusCircleOutlined />
        </button>
      </div>
    </>
  );
};

export default FormKeyValuePairInput;
