import styled from 'styled-components';

export const TokenContainer = styled.div`
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
`