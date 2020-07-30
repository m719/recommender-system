import styled from 'styled-components';

export const CenterHorizontallyAndVertically = styled.div<{ height: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => props.height ? props.height : 0}px;
`;