import styled from 'styled-components';
import {colorSoftGray} from '../../../consts';

export const FilterContainer = styled.div`
  //background-color: #3dd5f3;
  gap: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .start{
    display: flex;
    gap:20px;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .end{
    display: flex;
    gap:20px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
`;

export const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  .react-select__control {
    background-color: rgba(0,0,0,.04);
    border-radius: 2px;
  }
  .react-select__value-container--is-multi{
    overflow: auto;
    max-height: 50px;
  }

`;

export const FilterItemCentered = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
`;