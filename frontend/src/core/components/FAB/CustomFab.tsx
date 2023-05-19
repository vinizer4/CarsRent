import React from 'react';
import {isMobile} from "../../consts";
import {SpeedDialAction} from "devextreme-react";
type actions = {
    icon:any,
    name:string,
    action:(params:any)=>void,
    hideInMobile?:boolean
}
type props = {
    schema:Array<actions>
}

function CustomFab({schema}:props) {
    return (
        <div style={{bottom:100}}>
            {schema.map((act,index)=>(
                <SpeedDialAction
                    key={index+act.name}
                    icon={act.icon}
                    label={act.name}
                    index={index+1}
                    onClick={act.action}
                    visible={act.hideInMobile ? (!isMobile) : true}

                />
            ))}
        </div>
    );
}

export default CustomFab;