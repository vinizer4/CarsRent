import React from 'react';
import Typography from '../../CustomText/Typhography';
import {DateBox} from 'devextreme-react';

type props = {
    label:string,
    onChange:(date:Date)=>void,
    defaultValue?:Date | string | number,
    value?:Date | string | number,
    type?: 'date' | 'time' | 'datetime'
}

function CustomDateField({label,onChange,defaultValue,value,type = 'date'}:props) {
    const getProps = () =>{
        let props:any = {
            type:type,
            onValueChange:(e:Date) => {e && onChange(new Date(e))},
        }
        if(value) props.value = value;
        if(defaultValue) props.defaultValue = defaultValue;
        return props;
    }

    return (
        <div>
            <Typography>{label}</Typography>
            <DateBox
                {...getProps()}
            />
        </div>
    );
}

export default CustomDateField;