import React, { useCallback, useRef, useState } from "react";
import { TreeList } from "devextreme-react";
import { Column } from "devextreme/ui/data_grid";
import { DatagridContainer } from "./styles";
import useKeyboardShortcut from "use-keyboard-shortcut";
import { shortCutResetGrid, shortCutSave } from "../../consts";
import { toastSucess } from "../../utils/toasts";

type props = {
  columns: Array<Column<any, any> | string>;
  data: Array<any>;
  keyEx: string;
  parentKey: string;
  title: string;
  editing?: boolean;
  onCellPrepared?: any;
  storeEnabled?: boolean;
  getSelectedRowData?: (param: any) => void;
  getSelectedRows?: (param: any) => void;
  onDoubleClick?: (param: any) => void;
  height?: any;
};

function CustomTreeDataGrid({
  columns,
  data,
  keyEx,
  title,
  parentKey,
  editing = false,
  storeEnabled = true,
  getSelectedRowData,
  getSelectedRows,
  onDoubleClick,
  height,
  onCellPrepared,
}: props) {
  const [selectedRow, setSelectedRow] = useState(null);
  const dataGrid = useRef(null);

  const gridAdd = `@slw${title.split(" ").join("")}table`;

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
    localStorage.setItem(gridAdd, state ? JSON.stringify(state) : "");
  }, []);

  const loadState = useCallback(async () => {
    return new Promise((resolve, reject) => {
      let state = localStorage.getItem(gridAdd);
      if (state) resolve(JSON.parse(state));
      else resolve(undefined);
    });
  }, []);

  const resetGrid = () => {
    toastSucess("o GRID foi resetado com sucesso!");
    localStorage.removeItem(gridAdd);
    setTimeout(() => window.location.reload(), 2000);
  };

  useKeyboardShortcut(shortCutResetGrid, (shortcutKeys) => resetGrid(), {
    overrideSystem: false,
    ignoreInputFields: true,
    repeatOnHold: true,
  });

  return (
    <DatagridContainer>
      <TreeList
        columns={columns as any}
        dataSource={data && data.length > 0 ? data : []}
        ref={dataGrid}
        keyExpr={keyEx}
        showBorders={true}
        allowColumnReordering={true}
        columnAutoWidth={true}
        hoverStateEnabled={true}
        rowAlternationEnabled={true}
        noDataText={"Sem dados para exibir"}
        renderAsync={true}
        onCellPrepared={onCellPrepared}
        repaintChangesOnly={true}
        parentIdExpr={parentKey}
        allowColumnResizing={true}
        height={height ? height : "80vh"}
        onFocusedRowChanged={(e) => selectRow(e.row?.data)}
        onSelectionChanged={(e) => getRowsSelected(e)}
        onCellDblClick={(e) => onDoubleClick && onDoubleClick(e.data)}
        loadPanel={{
          enabled: "auto",
          height: 90,
          shading: true,
          showIndicator: true,
          showPane: true,
          text: "Carregando...",
          width: 200,
        }}
        selection={{
          mode: "multiple",
          allowSelectAll: true,
        }}
        searchPanel={{
          visible: true,
          width: 330,
          placeholder: "Digite a informação que deseja localizar...",
        }}
        columnFixing={{
          enabled: true,
        }}
        columnChooser={{
          enabled: true,
          mode: "select",
        }}
        paging={{
          pageSize: 15,
        }}
        pager={{
          infoText: "Página {0} de {1} ({2} Registros)",
          showPageSizeSelector: true,
          allowedPageSizes: [5, 10, 20, 50, 100, 500, 1000],
          showInfo: true,
          showNavigationButtons: true,
        }}
        sorting={{
          mode: "multiple",
          showSortIndexes: true,
        }}
        filterRow={{
          visible: true,
        }}
        filterPanel={{
          filterEnabled: true,
          visible: true,
        }}
        headerFilter={{
          allowSearch: true,
          visible: true,
        }}
        stateStoring={{
          enabled: storeEnabled,
          savingTimeout: 2000,
          storageKey: gridAdd,
          type: "custom",
          customSave: saveState,
          customLoad: loadState,
        }}
        scrolling={{ mode: "virtual" }}
        editing={{
          mode: "row",
          useIcons: true,
          allowUpdating: editing,
        }}
      />
    </DatagridContainer>
  );
}

export default CustomTreeDataGrid;
