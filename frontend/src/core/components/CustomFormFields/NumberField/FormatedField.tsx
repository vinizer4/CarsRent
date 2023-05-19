import { Controller } from 'react-hook-form';
import {NumberBox} from "devextreme-react";
import Typography from "../../CustomText/Typhography";
import {formatPercent, SimulateTab} from '../../../utils/utils';

type props = {
  nameField: string,
  label?: string,
  onBeforeChange?: any
  onAfterChange?: any,
  control: any,
  isCurrency?: boolean,
  isPercent?: boolean,
  disabled?: boolean,
  readOnly?: boolean
}

function FormatedField({ nameField, label, control, readOnly = false, onAfterChange, onBeforeChange, isCurrency = false, isPercent = false, disabled = false }: props) {

  return (<>
    {label && (<Typography>{label}</Typography>)}
    <Controller
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <>
            {/*{(typeof value === 'string') && console.log(label,nameField)}*/}
          <NumberBox
            // ref={ref}
            onKeyDown={SimulateTab}
            // status={error !== undefined ? 'error' : undefined}
            format={isCurrency ? 'R$ #,##0.##00' : (isPercent ? formatPercent: '')}
            validationStatus={error ? 'invalid' : 'valid'}
            onValueChange={(values: any) => {
              onBeforeChange && onBeforeChange(Number(values));
              onChange(Number(values))
              onAfterChange && onAfterChange(Number(values));
            }}
            style={{ width: '100%' }}
            onFocusOut={onBlur}
            value={(value !== null && value !== undefined) ? Number(value) : 0}
            min={0}
            disabled={disabled}
            readOnly={readOnly}
          />
          {(error) && (<Typography style={{ color: 'red' }}><small>{error.message}</small></Typography>)}
        </>)
      }
      control={control}
      name={nameField}
    />
  </>)
}

export default FormatedField
