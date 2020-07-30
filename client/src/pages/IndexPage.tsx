import React from 'react';
import Container from '../components/Generic/Container';
import { Button } from 'antd';
import { History } from 'history'
import styled from 'styled-components';

const Description = styled.div`
  margin-top: 50px;
`;

class IndexPage extends React.Component<{ history: History }> {
  render() {
    return (
      <Container centered>
        <Description>
          <p>
            You will have to rate 10 movies to bootstrap the recommender system computations in order to give you the best recommendations.
          </p>
          <p>
            Currently, the only technique used by this recommender system is the user-based collaborative filtering "K nearest neighbors" method.
            To learn more about this technique take a look at <a href="https://www.youtube.com/watch?v=h9gpufJFF-0">this video course</a>
          </p>
          <p>Full code available at : <a href="https://github.com/m719/recommender-system">https://github.com/m719/recommender-system</a></p>
          <Button type="primary" onClick={() => this.props.history.push('/movie-rating')}>Get started</Button>
        </Description>
      </Container>
    );
  }
}

export default IndexPage;
