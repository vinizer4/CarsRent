import React from 'react';
import {IconButtonContainerLink} from "./styes";

type props = {
    onClick?: ()=>void,
    icon:any,
    text?:any,
    rounded?:boolean,
    size?:any,
}

function IconButton({onClick,icon,text,rounded=false,size}:props) {
    const sizeb = text ? 'auto' : '32px';
    return (
        <IconButtonContainerLink
            onClick={onClick && onClick}
            style={{borderRadius:rounded ? '50px' : '2px',width:size ? size : sizeb ,height:size ? size : '32px'}}
        >
            <div>{icon} </div> {text && <div>{text}</div>}
        </IconButtonContainerLink>
    );
}

export default IconButton;