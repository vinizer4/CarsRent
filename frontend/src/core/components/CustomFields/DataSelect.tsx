import {memo} from 'react';
import {colorPrimary} from '../../consts';
import Typography from "../CustomText/Typhography";
import {Button, SelectBox, Tooltip} from "devextreme-react";
import {MdOutlineAssistant} from "react-icons/all";
import {isFilledArray, SimulateTab} from '../../utils/utils';


type props = {
    data?: Array<any>,
    itemKey: string | number,
    itemDescription: string | number | ((d: any) => string),
    label: string,
    value?: any,
    onBeforeChange?: any
    onAfterChange?: any,
    onBlur?: any
    validateOnBlur?: boolean,
    disabled?: boolean,
    auxButton?: any,
    errors?: any,
    auxButtonTooltip?: any,
    onChange?: any,
    onChangeVisible?: any,
    onKeyDown?: any,
    refSelect?: any,
    useLabel?:boolean,
    onOpen?:any,
}

function DataSelect({
                        data,
                        itemKey,
                        itemDescription,
                        errors,
                        label,
                        value,
                        onBeforeChange,
                        onAfterChange,
                        onChange,
                        onBlur,
                        disabled = false,
                        auxButton,
                        onChangeVisible,
                        auxButtonTooltip,
                        onKeyDown,
                        refSelect,
                        onOpen,
                        useLabel = true
                    }: props) {
        const selectProps = {
            ref:refSelect && refSelect,
            disabled:disabled,
            style:{width: '100%'},
            placeholder:label,
            showClearButton:true,
            value:isFilledArray(data) && value,
            onKeyDown:SimulateTab,
            onValueChange:(e: any) => {
                onBeforeChange && onBeforeChange(e)
                onChange && onChange(e)
                onAfterChange && onAfterChange(e)
            },
            dataSource:data,
            displayExpr:itemDescription as any,
            valueExpr:itemKey as any,
            showDropDownButton:true,
            searchEnabled:true,
            onFocusOut:onBlur,
            onOpened:onOpen && onOpen
        }

    return (
        <div>
            {useLabel && (<Typography
                style={{
                    marginBottom: `${auxButton && '2px'}`,
                    marginTop: `${auxButton && '-5px'}`
                }}>{label} {auxButton && (
                <>
                    <a id={`auxb-${label}`} onClick={() => auxButton()}><MdOutlineAssistant
                        style={{color: `${colorPrimary}`}}/></a>
                    <Tooltip
                        target={`#auxb-${label}`}
                    >
                        <div>Clique para adicionar</div>
                    </Tooltip>
                </>
            )}
            </Typography>)}

            <SelectBox {...selectProps}

            />
            {/* {(errors && errors[nameField]?.length > 0) && (<Typography style={{ color: 'red' }}><small>{errors[nameField]}</small></Typography>)} */}
        </div>
    )
}

export default memo(DataSelect)