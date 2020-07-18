import * as React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { Root } from '../src/components/Generic/Root'
import { Main } from '../src/components/Generic/Main'

import Header from './components/Layout/Header'
import IndexPage from './pages/IndexPage'
import MovieRatingPage from './pages/MovieRatingPage'

const Routes: React.SFC = () => (
  <Root>
    <BrowserRouter>
      <Header />
      <Main>
        <Switch>
          <Route exact path="/" component={IndexPage}/>
          <Route path="/movie-rating" component={MovieRatingPage} />
          <Route component={() => <div>Not Found</div>} />
        </Switch>
      </Main>
    </BrowserRouter>
  </Root>
)

export default Routes