import { Controller }              from 'react-hook-form';
import { TextArea, TextBox }       from 'devextreme-react';
import Typography                  from '../../CustomText/Typhography';
import { Button as TextBoxButton } from 'devextreme-react/text-box';
import { useState }              from 'react';
import {formatFone, SimulateTab} from "../../../utils/utils/utils";

type props = {
    nameField: string,
    label: string,
    onBeforeChange?: any
    onAfterChange?: any,
    anyProps?: any,
    type?: string,
    disabled?: boolean,
    max?: number,
    placeholder?: string,
    control?: any,
    onBeforeBlur?: any
    onAfterBlur?: any,
    readOnly?: boolean,
    typeField?: string,
    isPhone?: boolean,
    stringCase?: 'upper' | 'lower'
}

function TextfieldCustom({
    nameField,
    control,
    label,
    onAfterChange,
    onBeforeChange,
    readOnly = false,
    type = 'default',
    disabled = false,
    max,
    placeholder,
    onBeforeBlur,
    onAfterBlur,
    typeField = 'default',
    isPhone = false,
    stringCase = 'upper'
}: props) {
    const [showPass, setShowPass] = useState(false);
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
                         {/*{(typeof value !== 'string') && console.log(label, nameField)}*/}
                        {type === 'default' ?
                            (
                                <TextBox
                                    // ref={ref} //NÃO IMPLEMENTAR ISSO, PELO AMOR DE DEUS
                                    style={{ width: '100%' }}
                                    onKeyDown={SimulateTab}
                                    validationStatus={error ? 'invalid' : 'valid'}
                                    onValueChanged={(e: any) => {
                                        if (e.value) {
                                            let val = e.value;
                                            if (typeof val === 'string') stringCase === 'upper' ? val = val.toUpperCase() : val = val.toLowerCase();
                                            onBeforeChange && onBeforeChange(val);
                                            if (isPhone && val) val = formatFone(val);
                                            onChange(val);
                                            onAfterChange && onAfterChange(val);
                                        }else{
                                            onBeforeChange && onBeforeChange(e.value);
                                            onChange(e.value);
                                            onAfterChange && onAfterChange(e.value);
                                        }
                                    }}
                                    value={(value && (typeof value === 'string')) ? (stringCase === 'upper' ? value.toUpperCase() : value.toLowerCase()) : value}
                                    onFocusIn={() => {
                                        onBeforeBlur && onBeforeBlur();
                                    }}
                                    onFocusOut={() => {
                                        onBlur();
                                        onAfterBlur && onAfterBlur();
                                    }}
                                    placeholder={placeholder ? placeholder : label}
                                    disabled={disabled}
                                    maxLength={max && max}
                                    readOnly={readOnly}
                                    mode={typeField === 'password' ? (!showPass ? 'password' : 'text') : 'text'}

                                >
                                    {typeField === 'password' && (
                                        <TextBoxButton
                                            name="password"
                                            location="after"
                                            options={{
                                                // icon: eye,
                                                type: 'default',
                                                onClick: () => {
                                                    setShowPass(prevState => !prevState);
                                                },
                                            }}
                                        />
                                    )}
                                </TextBox>
                            ) :
                            (<TextArea
                                ref={ref}
                                onKeyDown={SimulateTab}
                                onFocusOut={onBlur}
                                maxLength={1000}
                                style={{ height: 100 }}
                                value={value}
                                placeholder={label}
                                disabled={disabled}
                                onChange={(e: any) => {
                                    let val = e.event.target.value;
                                    onBeforeChange && onBeforeChange(val);
                                    onChange(val);
                                    onAfterChange && onAfterChange(val);
                                }}
                                readOnly={readOnly}
                            />)
                        }
                        {(error) && (<Typography style={{ color: 'red' }}><small>{error.message}</small></Typography>)}
                    </>)
                }
                control={control}
                name={nameField}
            />
        </>
    );
}

export default TextfieldCustom;

