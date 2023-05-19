import React, {useCallback, useState} from 'react';
import {DataGrid} from 'devextreme-react';
import {DatagridContainer} from './styles';
import useKeyboardShortcut from 'use-keyboard-shortcut';
import {shortCutResetGrid} from '../../consts';
import {toastSucess} from '../../utils/toasts';
import {RowDragging} from 'devextreme/ui/data_grid';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';


type props = {
    columns: any,
    data: any,
    keyEx?: string,
    title?: string,
    editing?: boolean,
    storeEnabled?: boolean,
    getSelectedRowData?: (param: any) => void,
    getSelectedRows?: (param: any) => void,
    onDoubleClick?: (param: any) => void,
    paginate?: boolean,
    height?: any,
    loading?: boolean,
    filters?: boolean,
    grouping?: boolean,
    customize?: boolean,
    width?: string | number,
    allowUpdating?: boolean,
    allowDeleting?: boolean,
    allowAdding?: boolean,
    onEditingStart?: any,
    onInitNewRow?: any,
    onRowInserting?: any,
    onRowInserted?: any,
    onRowUpdating?: any,
    onRowUpdated?: any,
    onRowRemoving?: any,
    onRowRemoved?: any,
    onSaving?: any,
    onSaved?: any,
    onEditCanceling?: any,
    onEditCanceled?: any,
    gridRef?: any,
    summarySchema?: any,
    onCellPrepared?: any,
    rowDragging?: RowDragging<any>,
    filterValue?:any,
}

function CustomDataGrid({
                            columns,
                            data,
                            keyEx,
                            title,
                            editing = false,
                            storeEnabled = true,
                            getSelectedRowData,
                            getSelectedRows,
                            onDoubleClick,
                            paginate = true,
                            height,
                            loading,
                            filters = true,
                            grouping = true,
                            customize = true,
                            width = '100%',
                            onEditingStart,
                            onInitNewRow,
                            onRowInserting,
                            onRowInserted,
                            onRowUpdating,
                            onRowUpdated,
                            onRowRemoving,
                            onRowRemoved,
                            onSaving,
                            onSaved,
                            onEditCanceling,
                            onEditCanceled,
                            allowUpdating = false,
                            allowDeleting = false,
                            allowAdding = false,
                            gridRef,
                            summarySchema = undefined,
                            onCellPrepared,
                            rowDragging,
    filterValue
                        }: props) {
    const [selectedRow, setSelectedRow] = useState(null);
    const gridAdd = `@slw${title?.split(' ').join('')}table`;

    function selectRow(params: any) {
        if (getSelectedRowData !== undefined) {
            getSelectedRowData(params.selectedRowsData);
        }
    }

    function getRowsSelected(params: any) {
        if (getSelectedRows) {
            getSelectedRows(params.selectedRowsData);
        }
    }

    const saveState = useCallback((state: any) => {
        state.selectedRowKeys = [];
        localStorage.setItem(gridAdd, state ? JSON.stringify(state) : '');
    }, []);

    const loadState = useCallback(async () => {
        return new Promise((resolve, reject) => {
            let state = localStorage.getItem(gridAdd);
            if (state)
                resolve(JSON.parse(state));
            else
                resolve(undefined);
        });
    }, []);

    const resetGrid = () => {
        toastSucess('o GRID foi resetado com sucesso!');
        localStorage.removeItem(gridAdd);
        setTimeout(() => window.location.reload(), 2000);
    };

    useKeyboardShortcut(
        shortCutResetGrid,
        (shortcutKeys) => resetGrid(),
        {
            overrideSystem: false,
            ignoreInputFields: true,
            repeatOnHold: true
        }
    );



    return (
        <DatagridContainer>
            <DataGrid
                columns={columns}
                dataSource={data}
                ref={gridRef && gridRef}
                keyExpr={keyEx}
                showBorders={true}
                allowColumnReordering={true}
                columnAutoWidth={true}
                hoverStateEnabled={true}
                noDataText={'Sem dados para exibir'}
                renderAsync={true}
                repaintChangesOnly={true}
                allowColumnResizing={true}
                rowAlternationEnabled={true}
                onCellPrepared={onCellPrepared && onCellPrepared}
                width={width}
                height={height ? height : 'calc(100vh - 130px)'}
                onFocusedRowChanged={(e) => selectRow(e.row?.data)}
                onSelectionChanged={(e) => getRowsSelected(e)}
                onCellDblClick={(e) => onDoubleClick && onDoubleClick(e.data)}

                rowDragging={rowDragging}
                loadPanel={{
                    enabled: loading !== undefined ? loading : 'auto',
                    height: 90,
                    shading: true,
                    showIndicator: true,
                    showPane: true,
                    text: 'Carregando...',
                    width: 200

                }}

                selection={{
                    mode: getSelectedRows || getSelectedRowData ? 'multiple' : 'none',
                    allowSelectAll: true
                }}

                searchPanel={{
                    visible: filters,
                    width: 330,
                    placeholder: 'Digite a informação que deseja localizar...',

                }}

                summary={{
                    totalItems: summarySchema
                }}

                columnFixing={{
                    enabled: true
                }}

                columnChooser={{
                    enabled: customize,
                    mode: 'select'
                }}

                paging={{
                    enabled: true,
                }}

                pager={{
                    infoText: 'Página {0} de {1} ({2} Registros)',
                    showPageSizeSelector: true,
                    allowedPageSizes: [5, 10, 20, 50, 100, 500, 1000],
                    showInfo: true,
                    showNavigationButtons: true,
                }}

                sorting={{
                    mode: 'multiple',
                    showSortIndexes: true
                }}

                grouping={{
                    contextMenuEnabled: grouping
                }}

                groupPanel={{
                    visible: grouping ? 'auto' : false
                }}

                filterRow={{
                    visible: filters,
                }}

                filterPanel={{
                    filterEnabled: true,
                    visible: filters
                }}

                headerFilter={{
                    allowSearch: true,
                    visible: filters
                }}

                stateStoring={{
                    enabled: storeEnabled,
                    savingTimeout: 2000,
                    storageKey: gridAdd,
                    type: 'custom',
                    customSave: saveState,
                    customLoad: loadState
                }}

                scrolling={{mode: `${paginate ? 'standard' : 'virtual'}`}}

                editing={{
                    mode: 'cell',
                    // useIcons: true,
                    allowUpdating: allowUpdating,
                    allowDeleting: allowDeleting,
                    allowAdding: allowAdding,
                }}

                onEditingStart={onEditingStart}
                onInitNewRow={onInitNewRow}
                onRowInserting={onRowInserting}
                onRowInserted={onRowInserted}
                onRowUpdating={onRowUpdating}
                onRowUpdated={onRowUpdated}
                onRowRemoving={onRowRemoving}
                onRowRemoved={onRowRemoved}
                onSaving={onSaving}
                onSaved={onSaved}
                onEditCanceling={onEditCanceling}
                onEditCanceled={onEditCanceled}

            />
        </DatagridContainer>
    );
}

export default CustomDataGrid;