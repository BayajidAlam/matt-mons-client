import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TextAreaProps = {
  name: string;
  label?: string;
  rows?: number;
  value?: string;
  size?: "small" | "large";
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
};

const FormTextArea = ({
  name,
  label,
  size,
  rows,
  value,
  required,
  placeholder,
  readOnly = false,
}: TextAreaProps) => {
  const { control } = useFormContext();

  return (
    <div className={`flex flex-col  w-full`}>
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
        name={name}
        control={control}
        render={({ field }) => (
          <Input.TextArea
            rows={rows}
            size={size}
            placeholder={placeholder}
            readOnly={readOnly}
            {...field}
            defaultValue={value}
            required={required}
          />
        )}
      />
    </div>
  );
};

export default FormTextArea;
