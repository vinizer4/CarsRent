import React from 'react';
import Typography from "../CustomText/Typhography";
import {colorDelete} from "../../consts";

function SomenteLeitura() {
    return (
        <Typography style={{color:`${colorDelete}`}}>[Somente leitura] Você não tem permissão de edição</Typography>
    );
}

export default SomenteLeitura;