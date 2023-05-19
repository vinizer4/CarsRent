import { Guid }            from "guid-typescript";
import { StringFormatter } from "@enterprize/string-formatter";
import {format}            from 'date-fns';
import {useLoadingContext} from "../../context/loadingContext";

export const genGuid = () => Guid.create().toString();

export const notEmpity = (value: any) => {
    return (value !== null && value !== undefined && value !== '');
}

export const formatCurrency = (value: any) => {
    let formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    return formatter.format(Number(value));
}

export const formatCurrencyNoMask = (value: any) => {
    let v = new Number(value).toFixed(2)
    return v;
}
export const formatPercent = (value: any) => {
    let v = new Number(value).toFixed(2)
    return `${v} %`.replace('.',',');
}
export const formatStock = (value: any) => {
    let v = new Number(value).toFixed(6)
    return `${v}`.replace('.',',');
}

export const clearString = (str: string): string => {
    str = str.replace(/[^\d]+/g, "");
    return str;
}

export const removeStr = ({ str, config = {
    rmSpaceIniFin: true,
    rmInvalid: true,
    rmSpaces: false,
    rmDash: true,
} }: {
    str: string; config?: {
        rmSpaceIniFin: boolean;
        rmInvalid: boolean;
        rmSpaces: boolean;
        rmDash: boolean;
    };
}): string => {
    if (config.rmSpaceIniFin) str = str.replace(/^\s+|\s+$/g, ''); // remover espaco do comeco e do fim
    str = str.toLowerCase();

    // remover acentuacao
    let from = "ãàáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    let to = "aaaaaeeeeiiiioooouuuunc------";
    for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    if (config.rmInvalid) str = str.replace(/[^a-z0-9 -]/g, '') // remover caracteres inválidos
    if (config.rmSpaces) str = str.replace(/\s+/g, '') // Remover espaços
    if (config.rmDash) str = str.replace(/-+/g, ''); //Remover traços
    return str;
}

export const formatCnpj = (cnpj: string): string => {
    const cnpjFormat: StringFormatter = new StringFormatter(
        "00.000.000/0000-00",
        { reverse: true }
    );
    const cnpjFormated: string = cnpjFormat.apply(cnpj);
    return cnpjFormated;
}
export const formatCpf = (cpf: string): string => {
    const cpfFormat: StringFormatter = new StringFormatter("000.000.000-00", {
        reverse: true,
    });
    const cpfFormated: string = cpfFormat.apply(cpf);
    return cpfFormated;
}
export const formatCep = (cep: string): string => {
    let cepBase = clearString(cep)
    const cepFormat: StringFormatter = new StringFormatter("00000-000", {
        reverse: true,
    });
    const cepFormated: string = cepFormat.apply(cepBase);
    return cepFormated;
}
export const formatFone = (foneP: string): string => {
    let mask = '';
    let fone = clearString(foneP)
    if (fone.length === 11) {
        mask = '(00)00000-0000'
    } else if (fone.length === 10) {
        mask = '(00)0000-0000'
    }
    const foneFormat: StringFormatter = new StringFormatter(mask, {
        reverse: true,
    });
    const foneFormated: string = foneFormat.apply(fone);
    return foneFormated;
}
export const formatPhoneCode = (code: string): string => {
    let mask = '';
    if (notEmpity(code)) {
        mask = '0 0 0 - 0 0 0'
        const PhoneCodeFormat: StringFormatter = new StringFormatter(mask, {
            reverse: true,
        });
        const PhoneCodeFormated: string = PhoneCodeFormat.apply(code);
        return PhoneCodeFormated;
    } else {
        return '_ _ _ - _ _ _'
    }
}

export const docFormater = (doc:string) =>{
    let d = doc;
    d = clearString(d);
    if (d.length < 15) {
        if (d.length === 14) {
            d = formatCnpj(d);
        } else if (d.length === 11) {
            d = formatCpf(d);
        }
    }
    return d;
}

export const isValidEmail = (email: string) => {
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(email);
}

export const isValidDocument = (docP:string) =>{
    let doc = clearString(docP);
    if (!doc || doc.length !== 11 && doc.length !== 14){
        return 'invalid'
    }else if(doc.length === 11){
        return 'cpf'
    }else{
        return 'cnpj'
    }
}

// export const companyMiddleware = () => {
//     return notEmpity(isAuth()?.token_empresa)
// }

export const DateNow = () => new Date().toISOString().slice(0, 19).replace('T', ' ');

export const formatDateSQL = (date:Date) => format(date, 'yyyy-MM-dd')

export const onLoad = (func: () => void) => {
    const { loading, toggleLoading } = useLoadingContext();
    toggleLoading && toggleLoading(true);
    func();
    toggleLoading && toggleLoading(false);
}

export const checkKeyDown = (e: any) => { const keyCode = e.keyCode ? e.keyCode : e.which; if (keyCode === 13) { e.preventDefault() }; };

export const inferPaymentType = (description: string) => {
    let cleanedStr = removeStr({ str: description });
    switch (true) {
        case cleanedStr.includes('dinheiro'):
            return 'dinheiro'
        case cleanedStr.includes('cartao'):
            return 'cartao'
        case cleanedStr.includes('pix'):
            return 'pix'
        case cleanedStr.includes('boleto'):
            return 'boleto'
        case cleanedStr.includes('cheque'):
            return 'cheque'
        case cleanedStr.includes('carteira'):
            return 'carteira'
        default:
            return 'outro'
    }
}

export const isFilledArray = (a: any) => {
    return (a && a.length > 0)
}

export const SimulateTab = (e:any) =>{
    const event = e.event;
    // if (event.keyCode === 13) {
    //   const form = event.target.form;
    //   const indexF = Array.prototype.indexOf.call(form, event.target);
    //   for (let index = indexF + 1; index < form.elements.length; index++) {
    //     const element = form.elements[index];
    //     if (element.disabled === false && element.readOnly === false && element.localName === 'input' && (element.type === 'text' || element.type === 'search' || element.type === 'password')) {
    //       event.preventDefault();

    //       return form.elements[index].focus();
    //     }

    //   }
    //   event.preventDefault();
    // }
}

export function findIn(array:any,the_field:string,for_this_value:any,multiResult:boolean = false){
    if(isFilledArray(array)){
        let find
        if(typeof for_this_value === 'string'){
            find = (array as Array<any>).filter((obj:any) => (obj[the_field as any] as string).toLocaleUpperCase() === for_this_value.toLocaleUpperCase())
        }else{
            find = (array as Array<any>).filter((obj:any) => obj[the_field as any] === for_this_value)
        }
        if(multiResult){
            return find;
        }else{
            if(isFilledArray(find)){
                return find[0]
            }else{
                return []
            }
        }
    }else{
        if(multiResult){
            return []
        }else{
            return undefined
        }
    }
}

export const fixDateTimeToString = (date:Date) =>(new Date(date).toLocaleDateString() + ' '+new Date().toLocaleTimeString())
export const fixDateTimeToStringSQL = (date:Date) =>(format(new Date(date),'yyyy-MM-dd') + ' '+format(new Date(),'HH:mm:ss'))

export const readFile = (file:any) => {
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = e => res(e.target?.result);
        reader.onerror = e => rej(e);
        reader.readAsDataURL(file);
    });
};

export const getFromS3 = (imgURL:string) => `https://gsappfiles.s3.sa-east-1.amazonaws.com/${imgURL}`;
export const getImgFromS3 = (imgURL:string) => `https://gsappimages.s3.sa-east-1.amazonaws.com/${imgURL}`;

export function getBase64(file:any) {
    return new Promise((resolve, reject)=>{
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = function (error) {
            reject('Error: '+error);
        };
    })
}

export function hexToRGB(hex:string, alpha:number = 1) {
    try {
        let r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);

        if (alpha) {
            return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
        } else {
            return 'rgb(' + r + ', ' + g + ', ' + b + ')';
        }
    } catch (e) {
        return hex;
    }
}

export function toFixedNumber(value:number,n = 2) {
    let x=(value.toString()+".0").split(".");
    return parseFloat(x[0]+"."+x[1].substr(0,n));
}
