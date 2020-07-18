import React from "react";
import './Header.css';
import Container from '../Generic/Container';
import styled from 'styled-components';

const HeaderStyle = styled.div`
  box-shadow: 0 2px 8px #f0f1f2;
  background: #fff;
  z-index: 10;
  max-width: 100%;
  height: 50px;
`;

const Title = styled.h2`
  align-items: middle;
`;

function Header() {
  return (
    <HeaderStyle>
      <Container centered>
        <Title>
          Movie Recommender system
        </Title>
      </Container>
    </HeaderStyle>
  );
}

export default Header;