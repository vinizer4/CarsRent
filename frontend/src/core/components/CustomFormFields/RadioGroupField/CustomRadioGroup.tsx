import React from "react";
import { Controller } from "react-hook-form";
import { RadioGroup } from "devextreme-react";
import Typography from "../../CustomText/Typhography";

type props = {
  nameField: string;
  label: string;
  radioValues: Array<any>;
  onBeforeChange?: any;
  onAfterChange?: any;
  disabled?: boolean;
  control?: any;
  layout?: any;
};

function CustomRadioGroup({
  nameField,
  label,
  onBeforeChange,
  onAfterChange,
  disabled = false,
  control,
  radioValues,
  layout,
}: props) {
  const rdValue = (value: any) => {
    let v = radioValues.filter((v) => v.id === value);
    return v[0];
  };
  return (
    <>
      <Typography>{label}</Typography>
      <Controller
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }) => (
          <>
            <RadioGroup
              name={nameField}
              items={radioValues}
              value={rdValue(value)}
              onValueChange={(e) => {
                let values = e.id;
                onBeforeChange && onBeforeChange(values);
                onChange(values);
                onAfterChange && onAfterChange(values);
                onBlur();
              }}
              layout={layout ? layout : "horizontal"}
              disabled={disabled}
            />
            {error && (
              <Typography style={{ color: "red" }}>
                <small>{error.message}</small>
              </Typography>
            )}
          </>
        )}
        control={control}
        name={nameField}
      />
    </>
  );
}

export default CustomRadioGroup;
