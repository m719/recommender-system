import React from 'react';
import styled from 'styled-components';

export const MovieDetailsRow = styled.div`
  display: flex;
  justify-content: center;
`;

export const MovieDetailsTitle  = styled.h2`
  font-weight: 600;
`;

export const MovieRatedNumber  = styled.span`
  font-weight: 600;
  font-size: 25px;
`;


export const MovieDetailsInfo  = styled.div`

`;

export const MovieDetailsContainer = styled.div<{ height: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${props => props.height + 'px'};
`;