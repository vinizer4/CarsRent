import { Controller } from 'react-hook-form'
import { NumberBox } from "devextreme-react";
import Typography from "../../CustomText/Typhography";
import { SimulateTab } from "../../../utils/utils";
import { formatStockGrid } from '../../../utils/strings';

type props = {
    nameField: string,
    label: string,
    onBeforeChange?: any
    onAfterChange?: any,
    control: any,
    readOnly?: boolean,
    disabled?: boolean,
    format?: any,
    showSpinButton?: boolean,
    min?: number,
    max?: number,
    // props?: InputNumberProps
}

function NumberField({ label, nameField, onAfterChange, onBeforeChange, control, readOnly = false, disabled = false, format = undefined, showSpinButton = false, min, max }: props) {
    return (<>
        <Typography>{label}</Typography>
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
                        onFocusOut={onBlur}
                        validationStatus={error ? 'invalid' : 'valid'}
                        onValueChange={(values: any) => {
                            onBeforeChange && onBeforeChange(Number(values));
                            onChange(Number(values))
                            onAfterChange && onAfterChange(Number(values));
                        }}
                        style={{ width: '100%' }}
                        readOnly={readOnly}
                        disabled={disabled}
                        format={format}
                        showSpinButtons={showSpinButton}
                        min={min && min}
                        max={max && max}
                        value={(value !== null && value !== undefined) ? Number(value) : undefined}
                    />
                    {(error) && (<Typography style={{ color: 'red' }}><small>{error.message}</small></Typography>)}
                </>)
            }
            control={control}
            name={nameField}
        />
    </>)
}

export default NumberField