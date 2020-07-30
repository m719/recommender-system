import React from "react";
import Container from '../Generic/Container';
import styled from 'styled-components';
import { Button } from 'antd';

const HeaderStyle = styled.div`
  box-shadow: 0 8px 8px #f0f1f2;
  background: #fff;
  z-index: 10;
  max-width: 100%;
  height: 50px;
`;

const Title = styled.h2`
  padding-top: 10px;
  cursor: pointer;
`;

const HeaderElements = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Actions = styled.div`
  padding-top: 10px;
`;

export default function Header() {
  return (
    <HeaderStyle>
      <Container centered>
        <HeaderElements>
          <Title>
            <div onClick={() => {
              window.localStorage.removeItem('state'); // TODO Should be replaced by a store action and router navigation
              window.location.href = '/';
            }}>Movie Recommender system</div>
          </Title>
          <Actions>
            <Button danger onClick={() => {
              window.localStorage.removeItem('state');
              window.location.href = '/';
            }}>Reset Recommendations</Button>
          </Actions>
        </HeaderElements>
      </Container>
    </HeaderStyle>
  );
}