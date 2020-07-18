import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { MoviesActionTypes } from './types'
import { fetchAllError, fetchAllSuccess } from './actions'
import MovieService from '../../api/MovieService'

function* handleFetch() {
  try {
    const res = yield call(MovieService.getMovies)

    if (res.status >= 400 || !res.data) {
      yield put(fetchAllError("Error while fetching movies."))
    } else {
      yield put(fetchAllSuccess(res.data.movies))
    }
  } catch (err) {
    if (err.response) {
      yield put(fetchAllError(err.response))
    } else {
      yield put(fetchAllError('An unknown error occured.'))
    }
  }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
  yield takeEvery(MoviesActionTypes.FETCH_ALL_REQUEST, handleFetch)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* moviesSaga() {
  yield all([fork(watchFetchRequest)])
}

export default moviesSaga