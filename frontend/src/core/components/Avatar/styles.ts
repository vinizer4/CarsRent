import styled from "styled-components";
import {colorFontW} from "../../consts";

export const AvatarContainer = styled.div `
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-color: #4f5050;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid rgba(255, 255, 255, 0.76);

  img {
    width: 100%;
    height: 100%;
    border-radius: 50px;
  }

  .nameAvatar {
    color: ${colorFontW};
    font-size: 1.5em;
    font-weight: bold;
  }
`;
