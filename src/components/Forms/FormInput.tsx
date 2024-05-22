"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { Input, InputNumber } from "antd";
import { useFormContext, Controller } from "react-hook-form";

interface IInput {
  name: string;
  type?: string;
  size?: "large" | "middle" | "small";
  value?: string | string[] | undefined;
  defaultValue?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

const FormInput = ({
  name,
  type,
  size = "large",
  value,
  defaultValue,
  id,
  placeholder,
  validation,
  label,
  required,
  disabled = false,
  readOnly = false,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <>
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
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              disabled={disabled}
              type={type}
              size={size}
              required={required}
              readOnly={readOnly}
              placeholder={placeholder}
              {...field}
              defaultValue={defaultValue}
              value={value ? value : field.value}
            />
          ) : type === "number" ? (
            <div className="flex flex-col">
              {/* <p>
                {label}
                {required ? (
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    *
                  </span>
                ) : null}
              </p> */}
              <InputNumber
                type={type}
                style={{ width: "100%", marginRight: "2px" }}
                readOnly={readOnly}
                disabled={disabled}
                min={0}
                size={size}
                placeholder={placeholder}
                {...field}
                defaultValue={defaultValue}
                value={value ? value : field.value}
              />
            </div>
          ) : (
            <Input
              required={required}
              disabled={disabled}
              type={type}
              size={size}
              readOnly={readOnly}
              placeholder={placeholder}
              {...field}
              defaultValue={defaultValue}
              value={value ? value : field.value}
            />
          )
        }
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FormInput;
