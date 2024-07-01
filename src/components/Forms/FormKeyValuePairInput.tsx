import React, { useEffect } from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Button, Input, Tooltip } from "antd";
import {
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";

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
            <Tooltip title="Remove Row">
              <Button
                type="primary"
                icon={<CloseOutlined style={{ fontSize: 16 }} />}
                size="small"
                style={{ color: "#fff", background: "red", padding: "10px" }}
                onClick={() => remove(index)}
              />
            </Tooltip>
          </div>
        ))}
        <div className="flex justify-end">
          <Tooltip title="Add Row">
            <Button
              onClick={() => append({ key: "", value: "" })}
              type="primary"
              icon={<PlusOutlined />}
              size="small"
            />
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default FormKeyValuePairInput;
