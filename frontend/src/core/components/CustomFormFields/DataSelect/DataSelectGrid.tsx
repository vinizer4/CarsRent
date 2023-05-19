import {memo, useState} from 'react';
import {Controller} from 'react-hook-form';
import {colorPrimary} from '../../../consts';
import {Button, DataGrid, DropDownBox, SelectBox, Tooltip} from "devextreme-react";
import Typography from "../../CustomText/Typhography";
import {SimulateTab} from "../../../utils/utils";
import CustomStore from 'devextreme/data/custom_store';

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
    columns?:any
}

function DataSelectGrid({
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
                        columns
                    }: props) {


        const [boxState,setBoxState] = useState({
            opened:false,
            value:undefined
        })
        const makeAsyncDataSource = () => {
            const a = new CustomStore({
                loadMode: 'raw',
                key: String(itemKey),
                load(opt) {
                    return data as any;
                },
            });
        console.log(a)
        console.log('aaaaaa')
        return a
    }

    function gridRender() {

        const handleOpen = (e:any) =>{
                if (e.name === 'opened') {
                    setBoxState(prevState => {
                        return {
                            ...prevState,
                            opened: e.value,
                        }
                    });
                }
        }

        const handleSelection = (e:any) =>{
            setBoxState({
                value: e.selectedRowKeys,
                opened: false,
            });
        }
        const syncDataGrid = (e:any) =>{
            setBoxState(prevState => {
                return {
                    ...prevState,
                    value: e.value,
                }
            });
        }

        function dataGridRender() {
            return (
                <DataGrid
                    // dataSource={makeAsyncDataSource}
                    columns={columns}
                    selectedRowKeys={boxState.value}
                    onSelectionChanged={handleSelection}
                    height="100%"
                    selection={{
                        mode:'single'
                    }}
                    scrolling={{
                        mode:'virtual'
                    }}
                    paging={{
                        enabled:true,
                        pageSize:10
                    }}
                    filterRow={{
                        visible:true
                    }}
                    searchPanel={{
                        visible:true,
                    }}
                />
            );
        }

        return (
            <DropDownBox
                value={boxState.value}
                opened={boxState.opened}
                valueExpr={String(itemKey)}
                deferRendering={false}
                displayExpr={(e)=> {
                    console.log(e)
                    return e ? e.desc :'ok'
                }}
                placeholder="Select a value..."
                showClearButton={true}
                dataSource={makeAsyncDataSource as any}
                onValueChanged={syncDataGrid}
                onOptionChanged={handleOpen}
                contentRender={dataGridRender}
            />
        )
    }


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
                        {gridRender()}
                        {(error) && (<Typography style={{color: 'red'}}><small>{error.message}</small></Typography>)}
                    </>)
                }
                control={control}
                name={nameField}
            />

        </>
    )
}


export default memo(DataSelectGrid)