import styled from 'styled-components';

export const ContainerCard = styled.div`
  height: 118px;
  min-width: 80px;
  max-width: calc(100% - 100px);
  @media(max-width:768px){
    min-width: 100%;
  }
  border-radius: 5px;
  -webkit-box-shadow: 2px 2px 7px 0px rgba(0,0,0,0.28);
  box-shadow: 2px 2px 7px 0px rgba(0,0,0,0.28);
`;