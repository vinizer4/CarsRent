import React from 'react'
import { Controller } from 'react-hook-form';
import {CheckBox, Switch} from 'devextreme-react';
import Typography from "../../CustomText/Typhography";

type props = {
    nameField: string,
    label: string,
    control: any,
    onBefore?: (value:boolean)=>void,
    onAfter?: (value:boolean)=>void,
    disabled?:boolean,
    disablePadding?:boolean,
    type?:'checkbox' | 'switch'
}

export function CheckboxField({ nameField, label, control, onBefore, onAfter,disabled = false,disablePadding = false,type = 'checkbox' }: props) {
    return (
        <>
            <div style={{ paddingTop: disablePadding ? 0 : '15px', display: 'flex', alignContent: 'center',justifyContent:'center',width:'100%' }}>
                <Controller
                    render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState: { invalid, isTouched, isDirty, error },
                        formState,
                    }) => (
                        <>
                            {type === 'checkbox' ?
                                (<CheckBox
                                style={{width: '100%'}}
                                validationStatus={error ? 'invalid' : 'valid'}
                                onValueChange={(e: any) => {
                                    onBefore && onBefore(e);
                                    onChange(e);
                                    onAfter && onAfter(e);
                                    onBlur();
                                }}
                                text={label}
                                value={value}
                                disabled={disabled}
                            />) :
                                (
                                    <div>
                                        <Typography>{label}</Typography>
                                        <Switch
                                        validationStatus={error ? 'invalid' : 'valid'}
                                        onValueChange={(e: any) => {
                                            onBefore && onBefore(e);
                                            onChange(e);
                                            onAfter && onAfter(e);
                                            onBlur();
                                        }}
                                        value={value}
                                        disabled={disabled}
                                    />
                                    </div>
                                )

                            }

                            {(error) && (<Typography style={{ color: 'red' }}><small>{error.message}</small></Typography>)}
                        </>)
                    }
                    control={control}
                    name={nameField}
                />
            </div>
        </>
    )
}

export default CheckboxField

