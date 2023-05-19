import { Controller } from "react-hook-form";
import { DateBox } from "devextreme-react";
import Typography from "../../CustomText/Typhography";
import { formatDateSQL, SimulateTab } from "../../../utils/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type props = {
  label: string;
  nameField: string;
  onBeforeChange?: any;
  onAfterChange?: any;
  disabled?: boolean;
  control: any;
  dtType?: "date" | "datetime";
};

function DateField({
  label,
  nameField,
  onBeforeChange,
  onAfterChange,
  disabled = false,
  control,
  dtType = "date",
}: props) {
  return (
    <div>
      <Typography>{label}</Typography>
      <Controller
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }) => (
          <>
            {/*{typeof value !== 'string' && console.log(value,name)}*/}
            <DateBox
              style={{ width: "100%" }}
              displayFormat={
                dtType === "date" ? "dd/MM/yyyy" : "dd/MM/yyyy hh:mm:ss"
              }
              // ref={ref}
              onKeyDown={SimulateTab}
              disabled={disabled}
              placeholder={label}
              onFocusOut={onBlur}
              type={dtType}
              validationStatus={error ? "invalid" : "valid"}
              onValueChange={(e: any) => {
                onChange(
                  e
                    ? format(
                        new Date(e),
                        dtType === "date"
                          ? "yyyy-MM-dd hh:mm:ss"
                          : "yyyy-MM-dd hh:mm:ss",
                        {
                          locale: ptBR,
                        }
                      )
                    : undefined
                );
              }}
              value={value}
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
    </div>
  );
}

export default DateField;
