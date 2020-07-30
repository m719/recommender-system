import styled from 'styled-components';

const Container = styled.div<{ centered: boolean }>`
  width: 1140px;
  margin: ${props => props.centered ? 'auto' : 0};

  @media(max-width: 1200px) {
    width: 960px;
  }

  @media(max-width: 992px) {
    width: 720px;
  }

  @media(max-width: 768px) {
    width: 540px;
  }

  @media(max-wdith: 576px) {
    width: 100%;
  }
`;

export default Container;