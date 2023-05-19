import styled from 'styled-components';

export const FindModalContainer = styled.div`
  height: 100%;
  .items{
    
    overflow: auto;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding-right: 8px;
    padding-bottom: 8px;
    padding-top: 8px;
  }
  
  .description{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  
  .title{
    font-weight: bold;
    font-size: 1.1em;
  }
  
  .cardItem {
    height: 80px;
    display: flex;
    background-color: rgba(206, 206, 206, 0.18);
    border: 1px solid rgba(182, 182, 182, 0.18);
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    -webkit-box-shadow: 4px 4px 8px -4px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 4px 4px 8px -4px rgba(0, 0, 0, 0.75);
    box-shadow: 4px 4px 8px -4px rgba(0, 0, 0, 0.75);
    border-radius: 4px;
  }
  
  .naoencontrado{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

`;

export const  FindScreenBarContainer = styled.div`
  
`;