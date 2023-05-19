import styled, {keyframes} from "styled-components";
import {fadeInLeft, fadeInUp} from "react-animations";
import {colorPrimary, colorSoftGray} from "../../consts";

export const LayoutContainer = styled.div`
  height: calc(100vh - 50px);

  .dx-toolbar {
    background-color: rgba(191, 191, 191, 0.15);
    padding: 5px 10px;
  }

  .dx-list-item-icon-container,
  .dx-toolbar-before {
    width: 36px;
    padding-right: 0 !important;
    text-align: center;
  }


  .dx-list-item-content {
    padding-left: 10px !important;
  }

  .dx-button {
    background-color: rgba(191, 191, 191, -0.15);
    border: none;
  }

  .panel-list {
    height: 100%;
  }

  .dx-drawer-panel-content {
    height: 100%;
  }

  .dx-drawer-expand.dx-drawer-right .panel-list {
    float: right;
  }

  .panel-list .dx-list-item {
    color: #fff;
    border-top: 1px solid rgba(221, 221, 221, 0.2);
  }

  .panel-list .dx-list-item .dx-icon {
    color: #fff !important;
  }

  .options {
    padding: 20px;
    background-color: rgba(191, 191, 191, 0.15);
  }

  .options-container {
    display: flex;
    align-items: center;
  }

  .caption {
    font-size: 18px;
    font-weight: 500;
  }

  .option {
    margin-top: 10px;
    display: inline-block;
    margin-right: 50px;
  }

  label {
    font-weight: bold;
  }

  #content {
    max-height: 100%;
    min-height: 100%;
    padding-top: 10px;
    padding-left: 5px;
    background-color: #efeff0;
  }

  #scrollview {
    min-height: 100%;
  }

  #content h2 {
    font-size: 26px;
  }

`;

const kfFadeIn = keyframes(fadeInLeft);

export const TileMenu = styled.div`
  display:flex;
  flex-direction:column;
  width: 100%;
  cursor: pointer;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
`
export const FadeTile  = styled.div`
  animation: 1s ${kfFadeIn};
  display:table-column;
  margin-left: 10px;
`

export const Navbar = styled.div`
  display: flex;
  width: 100vw;
  height: 50px;
  background-color: ${colorPrimary};
  align-items: center;
  justify-content: space-between;
  padding-left: 8px;
  padding-right:10px;
  
  .nav_right{
    display: flex;
    gap:10px;
    justify-content: flex-end;
    align-items: center;
    width: 30%;
  }
  .nav_center{
    display: flex;
    gap:10px;
  }
  .nav_left{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    width: 30%;
  }
;
`

export const ScrollDrawerView = styled.div`
  height: calc(100vh - 50px);
  overflow-y:auto;
`;