import styled from 'styled-components';

export const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
`;

export const MovieListElement = styled.div`
  display: flex;
  flex-basis: 100%;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;


export const MovieListElementDetailsRow = styled.div`
  margin-left: 20px;
  margin-bottom: 15px;
`;

export const MovieListElementDetailsContainer = styled.div<{ marginLeft?: number, marginTop?: number }>`
  display: flex;
  flex-direction: column;
  margin-left: ${props => props.marginLeft + 'px' || 0 + 'px'};
  margin-top: ${props => props.marginTop + 'px' || 0 + 'px'};
`;