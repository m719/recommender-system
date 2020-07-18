import { all, call, fork, put, select, takeEvery, take } from 'redux-saga/effects'
import { MovieRatingActionTypes } from './types'
import { ApplicationState } from '../'
import { fetchTmdbDetailsError, fetchRandomSuccess, fetchRandomError, fetchTmdbImageSucess, fetchTmdbImageError } from './actions'
import TmdbService from '../../api/TmdbService'
import MovieService from '../../api/MovieService'
import Movie from '../../../../types/Movie';
import MovieLink from '../../../../types/MovieLink';
import config from '../../constants/config';

export const getMovie = (state: ApplicationState)  => state.movieRating.movie;
export const getMovieLink = (state: ApplicationState)  => state.movieRating.movieLink;

function* handleFetchMovies() {
  try {
    const moviesRes = yield call(MovieService.getRandomMovie);

    if (moviesRes.status >= 400 || !moviesRes.data) {
      yield put(fetchRandomError("Error while fetching movies."))
    } else {
      yield put(fetchRandomSuccess(moviesRes.data))
    }
  } catch (err) {
    if (err.response) {
      yield put(fetchRandomError(err.response))
    } else {
      yield put(fetchRandomError('An unknown error occured.'))
    }
  }
}

function* handleFetchTmdbDetails() {
  try {
    yield take(MovieRatingActionTypes.FETCH_RANDOM_SUCCESS);
    const movieLink: MovieLink = yield select(getMovieLink);
    const detailsRes = yield call(TmdbService.getMovieDetails, movieLink.tmdbId);
    
    if (detailsRes.status >= 400 || !detailsRes.data) {
      yield put(fetchTmdbImageError("Error while fetching tmdb movie image."))
    } else {
      yield put(fetchTmdbImageSucess(`${config.tmdbImagesUrl}${detailsRes.data.poster_path}`));
    }
  } catch (err) {
    console.log(err)
    if (err && err.response) {
      yield put(fetchTmdbDetailsError(err.response))
    } else {
      yield put(fetchTmdbDetailsError('An unknown error occured.'))
    }
  }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchMovies() {
  yield takeEvery(MovieRatingActionTypes.FETCH_RANDOM_REQUEST, handleFetchMovies)
}

function* watchFetchTmdbDetailsRequest() {
  yield takeEvery(MovieRatingActionTypes.FETCH_TMDB_DETAILS, handleFetchTmdbDetails)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* movieRatingSaga() {
  yield all([fork(watchFetchMovies), fork(watchFetchTmdbDetailsRequest)])
}

export default movieRatingSaga