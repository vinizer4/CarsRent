import React from 'react';
import Typography from '../../CustomText/Typhography';
import {bgColor} from '../../../consts';
import {TextArea, TextBox} from 'devextreme-react';
import {formatFone, SimulateTab} from '../../../utils/utils';
import {Button as TextBoxButton} from 'devextreme-react/text-box';
import eye from '../../../assets/image/eye.png';
import {Controller} from 'react-hook-form';

type props = {
    nameField: string,
    label: string,
    onBeforeChange?: any
    onAfterChange?: any,
    disabled?: boolean,
    placeholder?: string,
    control?: any,
    readOnly?: boolean,
    format?:any,
}

function LabelField({nameField,label,control,format}:props) {
    return (
        <div style={{
            height:'100%',
        }}>
            <Typography>{label}</Typography>
            <div style={{
                display:'flex',
                alignItems:'center',
                height:34,
                paddingLeft:10,
                paddingRight:10,
                backgroundColor:bgColor,
                pointerEvents:'none'
            }}>
                <Controller
                    render={({
                                 field: { onChange, onBlur, value, name, ref },
                                 fieldState: { invalid, isTouched, isDirty, error },
                                 formState,
                             }) => (
                        <>
                            {value ? (format !== undefined ? format(value) : value): value}
                            {(error) && (<Typography style={{ color: 'red' }}><small>{error.message}</small></Typography>)}
                        </>)
                    }
                    control={control}
                    name={nameField}
                />
            </div>
        </div>
    );
}

export default LabelField;