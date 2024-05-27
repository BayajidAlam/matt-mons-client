import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ColorPickerProps {
  name: string;
  label?: string;
  required?: boolean;
}

const FormColorPicker: React.FC<ColorPickerProps> = ({
  name,
  label,
  required,
}) => {
  const { control } = useFormContext();

  return (
    <div>
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
      <Controller
        control={control}
        name={name}
        defaultValue={["#fffff"]}
        render={({ field }) => (
          <div className="flex items-start justify-start gap-2">
            {(field.value || []).map((color: string, index: number) => (
              <input
                key={index}
                className="w-8 h-8  border-none outline-none"
                type="color"
                value={color}
                onChange={(e) => {
                  const newColors = [...(field.value || [])];
                  newColors[index] = e.target.value;
                  field.onChange(newColors);
                }}
              />
            ))}
            <button
              type="button"
              className="w-8 h-8 rounded-full border-none outline-none bg-brandMainColor text-white"
              onClick={() => {
                const newColors = [...(field.value || []), "#000000"];
                field.onChange(newColors);
              }}
            >
              <PlusOutlined />
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default FormColorPicker;
