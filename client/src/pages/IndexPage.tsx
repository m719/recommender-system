import React from 'react';
import Container from '../components/Generic/Container';
import { Button } from 'antd';
import { History } from 'history'

class IndexPage extends React.Component<{ history: History }> {
  render() {
    return (
      <Container centered>
        <p>
          You will have to rate 10 movies to bootstrap the recommender system computations in order to give you the best recommendations.
        </p>
        <Button type="primary" onClick={() => this.props.history.push('/movie-rating')}>Get started</Button>
      </Container>
    );
  }
}

export default IndexPage;
