import styled from "styled-components";
import {bgColor, colorSecondary, colorSoftBlack, colorSoftGray} from "../../consts";

export const ContainerTileText = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
`;
export const DatagridContainer = styled.div`
  padding:5px;
  .dx-datagrid-header-panel {
    border-bottom: 1px solid #e0e0e0;
    padding: 0 0;
    background-color: ${bgColor};
  }
  .dx-treelist-header-panel {
    border-bottom: 1px solid #e0e0e0;
    padding: 0 0;
    background-color: ${bgColor};
  }
`