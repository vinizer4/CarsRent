import React from 'react';
import IconButton from "../Button/IconButton";
import {IoIosNotifications} from "react-icons/all";
import {colorFontW} from "../../consts";

function Notify() {
    return (
        <>
            <IconButton onClick={()=>console.log('Click notification')} icon={<IoIosNotifications size={25} color={colorFontW}/>} />
        </>
    );
}

export default Notify;