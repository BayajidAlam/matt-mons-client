import React from 'react';
import { Checkbox } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';

type SingleCheckboxProps = {
  checkboxLabel: string;
  required?: boolean;
  defaultValue?: boolean;
  disabled?: boolean;
};

const FormGroupSingleCheckBox: React.FC<SingleCheckboxProps> = ({
  checkboxLabel,
  required,
  defaultValue,
  disabled = false,
}) => {
  const { control } = useFormContext();

  return (
    <>
      {checkboxLabel && checkboxLabel}
      {required && (
        <span
          style={{
            color: 'red',
          }}
        >
          *
        </span>
      )}
      <Controller
        control={control}
        name={checkboxLabel}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
          />
        )}
      />
    </>
  );
};

export default FormGroupSingleCheckBox;