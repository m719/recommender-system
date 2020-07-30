import styled from 'styled-components';

export const MovieDetailsRow = styled.div`
  display: flex;
  justify-content: center;
`;

export const MovieDetailsTitle  = styled.h3`
  font-weight: 600;
`;

export const MovieDetailsContainer = styled.div<{ height?: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${props => props.height + 'px'};
`;