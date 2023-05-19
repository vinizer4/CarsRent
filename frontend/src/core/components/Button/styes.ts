import styled from "styled-components";
import IconButton from "./IconButton";
import {colorFont, colorFontW, colorPrimary, colorSave} from "../../consts";

export const IconButtonContainerLink = styled.a`
  display:flex;
  padding:8px;
  align-items: center;
  justify-content: center;
  gap:10px;
  border-radius: 3px;
  text-decoration: none;
  color: ${colorFont} !important;
  cursor: pointer;
  &:hover {
    background-color: rgba(79, 80, 80, 0.09);
  }

  &:active {
    background-color: rgba(79, 80, 80, 0.2);
  }

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
`;

export const ButtonContainer = styled.div`
  display:flex;
  gap:5px;
  .dropdown-item{
    &:active{
      background-color: ${colorSave} !important;
      color: ${colorFontW} !important;
    }
  }
  button {
    background-color: ${colorSave} !important;
    border-color: ${colorSave} !important;
  }
`;