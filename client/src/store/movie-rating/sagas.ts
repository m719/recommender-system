import { all, call, fork, put, select, takeEvery, takeLatest, take } from 'redux-saga/effects'
import { MovieRatingActionTypes } from './types'
import { ApplicationState } from '../'
import { fetchRandomSuccess, fetchRandomError, fetchTmdbImageSucess, fetchTmdbImageError, submitMovieRatingsError } from './actions'
import { setUserId } from '../users/action';
import TmdbService from '../../api/TmdbService'
import MovieService from '../../api/MovieService'
import { MovieRating, MovieLink } from '../../../../types';
import config from '../../constants/config';

export const getMovieLink = (state: ApplicationState)  => state.movieRating.movieLink;
export const getRatedMovies = (state: ApplicationState)  => state.movieRating.ratedMovies;
export const getSkippedMovies = (state: ApplicationState)  => state.movieRating.skippedMovies;

function* handleFetchMovies() {
  try {
    let ratedMovies: MovieRating[] = yield select(getRatedMovies);
    let skippedMovies: number[] = yield select(getSkippedMovies);

    let ratedMovieIds = ratedMovies.map(rm => rm.movieId);
    
    // Ask to filter the union of already rated movies and skipped movies
    const moviesRes = yield call(MovieService.getMostRatedMovie, [...ratedMovieIds, ...skippedMovies]);

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
      yield put(fetchTmdbImageError(err.response))
    } else {
      yield put(fetchTmdbImageError('An unknown error occured.'))
    }
  }
}

function* handleSubmitMovieRatings() {
  try {
    const ratedMovies: MovieRating[] = yield select(getRatedMovies);
    const submitRes = yield call(MovieService.submitMovieRatings, ratedMovies);
    
    if (submitRes.status >= 400 || !submitRes.data) {
      yield put(submitMovieRatingsError("Error while submitting movie ratings."))
    } else {
      yield put(setUserId(submitRes.data.userId));
    }
  } catch (err) {
    console.log(err)
    if (err && err.response) {
      yield put(submitMovieRatingsError(err.response))
    } else {
      yield put(submitMovieRatingsError('An unknown error occured.'))
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

function* watchSubmitMovieRatings() {
  yield takeLatest(MovieRatingActionTypes.SUBMIT_MOVIE_RATINGS, handleSubmitMovieRatings)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* movieRatingSaga() {
  yield all([fork(watchFetchMovies), fork(watchFetchTmdbDetailsRequest), fork(watchSubmitMovieRatings)])
}

export default movieRatingSaga