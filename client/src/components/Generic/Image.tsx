import React from 'react';
import styled from 'styled-components';

export const ImageWrapper = styled.div<{ height: number }>`
  height: ${props => props.height + 'px'};
`;

export const Image = styled.img.attrs<{src: string}>(props => ({
  src: props.src,
}))`
  max-height: 100%;
  max-width: 100%;
`;