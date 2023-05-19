import React, {useState} from 'react';
import Typography from '../../CustomText/Typhography';
import {ContainerCard} from './styles';
import {BiTrendingDown, BiTrendingUp} from 'react-icons/all';
import { v4 as uuidv4 } from 'uuid';
import {Tooltip} from 'devextreme-react';

type props = {
    title: string;
    icon?: any;
    information: Array<{
        text:string,
        value:string
    }>;
    isPositive?: boolean;
    colorInfo?: string[];
    width?:string | number;
};

function GenericCard({ title, icon, information, isPositive, colorInfo,width = '25%' }: props) {

    const renderInfo = () => {
        const [open,setOpen] = useState(false);

        let baseFont = 1.9;
        let sized = (baseFont / information.length).toFixed(1) + 'em';
        return information.map((info, index) =>{
            let id = 'id'+uuidv4();//query selector não aceita ids iniciados com numero
            let infoT = info.text + ' ' + ((info.value && !String(info.value).includes('NaN')) && information ? info.value : '----');
            return (
                <div key={index} onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
                    <div id={id}>
                        <Typography
                            style={{
                                fontFamily: 'Roboto',
                                fontWeight: 'bold',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                fontSize: sized,
                                color: colorInfo && colorInfo[index] ? colorInfo[index] : 'black'
                            }}
                        >
                            {infoT}
                        </Typography>
                    </div>
                    <Tooltip target={'#'+id} visible={open}>
                        {infoT}
                    </Tooltip>
                </div>
            )
            }
        )
    }

    return (
        <>
               <ContainerCard style={{width:width}}>
                    <div style={{ padding: 15 }}>
                        <div style={{ height: 30, marginBottom: 10 }}>
                            <Typography style={{ fontWeight: "bold",fontSize:16 }}>{title}</Typography>
                        </div>
                        <div
                            style={{
                                height: 60,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                alignContent: "center",
                            }}
                        >
                            <div style={{width:'80%'}}>
                                {renderInfo()}
                            </div>
                            {isPositive !== undefined && (
                                <div
                                    style={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        alignContent: "center",
                                    }}
                                >
                                    {isPositive ? (
                                        <BiTrendingUp style={{ color: "green" }} />
                                    ) : (
                                        <BiTrendingDown style={{ color: "red" }} />
                                    )}
                                </div>
                            )}
                            {icon && (
                                <div style={{width:'20%', height: "100%",display:'flex',justifyContent:'flex-end' }}>
                                    {icon}
                                </div>
                            )}
                        </div>
                    </div>
        </ContainerCard>
        </>
    );
}

export default GenericCard;
