import React from 'react';
import Typography from '../../CustomText/Typhography';
import Select from 'react-select';
import {TokenContainer} from './styles';
import {Controller} from 'react-hook-form';
import {isFilledArray} from '../../../utils/utils';

type props = {
    data?: Array<any>,
    itemKey: string | number,
    itemDescription: string | number,
    label: string,
    nameField: string,
    control?: any,
    onBeforeChange?: any
    onAfterChange?: any,
    validateOnBlur?: boolean,
    disabled?: boolean,
    auxButton?: any,
    auxButtonTooltip?: any,
    onChangeVisible?: any,
    dropDownMinW?: any,
    dropDownMaxW?: any,
}

function TokenField({
                        data,
                        itemKey,
                        itemDescription,
                        label,
                        nameField,
                        control,
                        onBeforeChange,
                        onAfterChange,
                        disabled = false,
                        auxButton,
                        onChangeVisible,
                        auxButtonTooltip,
                        dropDownMinW,
                        dropDownMaxW
                    }: props) {


    function filterMultiSelect(newValue: any, actionMeta: any,onchange:any) {
        let strRes = '';
        if (isFilledArray(newValue)){
            newValue.forEach((v:any)=>{
                if (strRes === ''){
                    strRes = "'"+v[itemKey]+"'"
                }else{
                    strRes += ','+"'"+v[itemKey]+"'"
                }
            })
        }
        console.log(strRes)
        onchange(strRes)
    }

    function returnMultiSelect (value:string){
        if(value && data){
            let strVal = value.replaceAll("'",'');
            let splitted = strVal.split(',');
            return data!.filter((d:any)=>splitted.includes(d[itemKey]));
        }else{
            return []
        }
    }

    return (
        <>
            <Controller
                render={({
                             field: {onChange, onBlur, value, name, ref},
                             fieldState: {invalid, isTouched, isDirty, error},
                             formState,
                         }) => (
                    <>
                        <TokenContainer>
                            <div style={{width: '100%'}}>
                                <Typography>{label}</Typography>
                                <Select
                                    classNamePrefix={'react-select'}
                                    options={data}
                                    getOptionLabel={(option: any) => option[itemDescription]}
                                    getOptionValue={(option: any) => option[itemKey]}
                                    isMulti
                                    placeholder={label}
                                    value={returnMultiSelect(value)}
                                    onChange={(a, b) => filterMultiSelect(a,b,onChange)}
                                />
                            </div>
                        </TokenContainer>
                        {(error) && (<Typography style={{color: 'red'}}><small>{error.message}</small></Typography>)}
                    </>)
                }
                control={control}
                name={nameField}
            />
        </>
    );
}

export default TokenField;

