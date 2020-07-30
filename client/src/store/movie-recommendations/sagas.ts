import { all, call, fork, put, select, takeEvery, takeLatest, take } from 'redux-saga/effects'
import { MovieRecommendationsActionTypes } from './types'
import { UsersActionTypes } from '../users/types'
import { ApplicationState } from '../'
import { fetchRecommendationsSuccess, fetchRecommendationsError, fetchTmdbImagesError, fetchTmdbImagesSuccess } from './actions'
import TmdbService from '../../api/TmdbService'
import MovieService from '../../api/MovieService'
import { MovieLink, Movie } from '../../../../types';
import config from '../../constants/config';

export const getMovieLinks = (state: ApplicationState)  => state.movieRecommendations.movieLinks;
export const getUserId = (state: ApplicationState) => state.users.id;
export const getMovies = (state: ApplicationState) => state.movieRecommendations.movies;

function* handleFetchRecommendations() {
  try {
    yield take(UsersActionTypes.SET_USER_ID);

    let userId = yield select(getUserId);
    const recommendationsRes = yield call(MovieService.getMovieRecommendations, userId);

    if (recommendationsRes.status >= 400 || !recommendationsRes.data) {
      yield put(fetchRecommendationsError("Error while fetching movie recommendations."))
    } else {
      yield put(fetchRecommendationsSuccess(recommendationsRes.data))
    }
  } catch (err) {
    if (err.response) {
      yield put(fetchRecommendationsError(err.response))
    } else {
      yield put(fetchRecommendationsError('An unknown error occured.'))
    }
  }
}

function* handleFetchTmdbImages() {
  try {
    const movieLinks: MovieLink[] = yield select(getMovieLinks);
    const tmdbRes = yield all(movieLinks.map(link => call(TmdbService.getMovieDetails, link.tmdbId)));

    if (tmdbRes.status >= 400 || !tmdbRes) {
      yield put(fetchTmdbImagesError("Error while fetching movie recommendations."))
    } else {
      const formattedRes: Array<{ movieId: number, imagePath: string }> = tmdbRes.map((tr: any) => {
        return { imagePath: `${config.tmdbImagesUrl}${tr.data.poster_path}`, movieId: movieLinks.filter(link => link.tmdbId === tr.data.id.toString())[0].movieId}
      })
      yield put(fetchTmdbImagesSuccess(formattedRes));
    }
  } catch (err) {
    if (err && err.response) {
      yield put(fetchTmdbImagesError(err.response))
    } else {
      yield put(fetchTmdbImagesError('An unknown error occured.'))
    }
  }
}

function* handleFetchRecommendationsAndImages() {
  const movies: Movie[] = yield select(getMovies);

  if (!movies || movies.length === 0) {
    yield call(handleFetchRecommendations);
  }

  yield call(handleFetchTmdbImages);
}

function* watchFetchRecommendations() {
  yield takeLatest(MovieRecommendationsActionTypes.FETCH_RECOMMENDATIONS, handleFetchRecommendations)
}

function* watchFetchMovieImages() {
  yield takeEvery(MovieRecommendationsActionTypes.FETCH_TMDB_IMAGES, handleFetchTmdbImages)
}

function* watchFetchRecommendationsAndImages() {
  yield takeLatest(MovieRecommendationsActionTypes.FETCH_RECOMMENDATIONS_AND_IMAGES, handleFetchRecommendationsAndImages)
}

function* movieRecommendationsSaga() {
  yield all([fork(watchFetchRecommendations), fork(watchFetchMovieImages), fork(watchFetchRecommendationsAndImages)])
}

export default movieRecommendationsSaga