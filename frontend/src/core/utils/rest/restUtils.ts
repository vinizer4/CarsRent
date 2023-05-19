import {AxiosError, AxiosResponse} from 'axios';
import {isFilledArray}             from "../utils/utils";

export const isSucess = (resCode: number) => {
    return (resCode >= 200 || resCode < 300);
}

export const isSucessR = (request: AxiosResponse<any, any> | undefined) =>{
    return (request && isSucess(request.status))
}

export const normalizeNull = (obj: any) => {
    Object.keys(obj).forEach(function (key) { if(obj[key] === null) obj[key] = ''; });
    return obj;
}
export const normalizeEmpity = (obj: any) => {
    Object.keys(obj).forEach(function (key) { if(obj[key] === '') obj[key] = null; });
    return obj;
}

export function normalizeKeys(data:Array<any>) {
    if(isFilledArray(data)){
        let keys = Object.keys(data[0]);
        let parses = keys.map((key:string)=>{
            if (key.includes('.')){
                if (key.includes('. ')){
                    return {
                        key:key,
                        parse: key.replace('. ',' ')
                    }
                }else{
                    return {
                        key:key,
                        parse: key.replace('.',' ')
                    }
                }
            }
        });
        return data.map((dataR)=>{
            parses.forEach((parseObj:{key:any,parse:any} | undefined)=>{
                if (parseObj !== undefined){
                    dataR[parseObj.parse] = dataR[parseObj.key];
                    delete dataR[parseObj.key];
                }
            })
            return dataR;
        });
    }else{
        return []
    }
}

export function getReponseError(error:any) {
    return (((error as AxiosError).response !== undefined) && ((error as AxiosError).response?.data !== undefined)) ? (error as AxiosError).response?.data!.toString() : (error as AxiosError).message.toString()
}
