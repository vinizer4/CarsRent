import React from 'react';
import Typography from '../../CustomText/Typhography';
import {bgColor} from '../../../consts';

type props = {
    label:string,
    value:any
}

function LabelField({label,value}:props) {
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
                {value}
            </div>
        </div>
    );
}

export default LabelField;