import {memo} from 'react';
import {Controller} from 'react-hook-form';
import {Button, SelectBox, Tooltip} from 'devextreme-react';
import Typography from '../../CustomText/Typhography';
import {SimulateTab} from '../../../utils/utils';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

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
    dropDownMinW?:any,
    dropDownMaxW?:any,
    showClearButton?:boolean,
}

function DataSelect({
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
                        dropDownMaxW,
                        showClearButton = true
                    }: props) {

    const ds = new DataSource({
        store: new ArrayStore({
            data: data
        }),
        paginate: true,
        pageSize: 50,
    });


    return (
        <>
            <Typography
                style={{
                    marginBottom: `${auxButton && '2px'}`,
                    marginTop: `${auxButton && '-5px'}`
                }}>{label} {auxButton &&
                <Tooltip title={auxButtonTooltip ? auxButtonTooltip : 'Clique para adicionar'}>
                    <Button
                        icon={'pin'} onClick={() => auxButton()}/>
                </Tooltip>}
            </Typography>
            <Controller
                render={({
                             field: {onChange, onBlur, value, name, ref},
                             fieldState: {invalid, isTouched, isDirty, error},
                             formState,
                         }) => (
                    <>
                        <SelectBox
                            // ref={ref}
                            // showSearch
                            // allowClear
                            disabled={disabled}
                            style={{width: '100%'}}
                            placeholder={label}
                            showClearButton={showClearButton}
                            value={(data && data?.length > 0) ? value : null}
                            onKeyDown={SimulateTab}
                            validationStatus={error ? 'invalid' : 'valid'}
                            onValueChange={(e: any) => {
                                onBeforeChange && onBeforeChange(e);
                                onChange(e);
                                onAfterChange && onAfterChange(e);
                            }}
                            dropDownOptions={{
                                minWidth :  dropDownMinW,
                                maxWidth : dropDownMaxW
                            }}
                            dataSource={ds}
                            displayExpr={itemDescription as any}
                            valueExpr={itemKey as any}
                            showDropDownButton={true}
                            searchEnabled={true}
                            id={name}
                            // onDropdownVisibleChange={(e: boolean) => onChangeVisible && onChangeVisible(e)}
                            onFocusOut={onBlur}
                        />
                        {(error) && (<Typography style={{color: 'red'}}><small>{error.message}</small></Typography>)}
                    </>)
                }
                control={control}
                name={nameField}
            />

        </>
    );
}

export default memo(DataSelect);