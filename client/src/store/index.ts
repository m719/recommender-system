import { combineReducers } from 'redux'
import { all, fork } from 'redux-saga/effects'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import moviesSaga from './movies/sagas'
import movieRatingSaga from './movie-rating/sagas'
import { moviesReducer } from './movies/reducer'
import { movieRatingReducer } from './movie-rating/reducer'
import { MoviesState } from './movies/types'
import { MovieRatingState } from './movie-rating/types'

// The top-level state object
export interface ApplicationState {
  movies: MoviesState
  movieRating: MovieRatingState
  router: RouterState
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const createRootReducer = (history: History) =>
  combineReducers({
    movies: moviesReducer,
    movieRating: movieRatingReducer,
    router: connectRouter(history)
  })

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
export function* rootSaga() {
  yield all([fork(moviesSaga), fork(movieRatingSaga)])
}