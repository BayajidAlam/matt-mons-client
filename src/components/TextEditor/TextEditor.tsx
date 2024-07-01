import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [
      {
        size: [
          "8px",
          "9px",
          "10px",
          "11px",
          "12px",
          "14px",
          "16px",
          "18px",
          "20px",
          "22px",
          "24px",
          "26px",
          "28px",
          "36px",
          "48px",
          "72px",
        ],
      },
    ],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video"],
    [{ align: [] }],
    ["code-block"],
  ],
};

interface ITextEditor {
  name: string;
  defaultValue?: string;
  label: string;
  required?: boolean;
}

const TextEditor: React.FC<ITextEditor> = ({
  name,
  defaultValue = "",
  label,
  required,
}) => {
  const { control } = useFormContext();

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
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <ReactQuill
            theme="snow"
            value={field.value}
            onChange={field.onChange}
            modules={modules}
          />
        )}
      />
    </>
  );
};

export default TextEditor;
