import { Reducer } from 'redux'
import Movie from '../../../../types/Movie';
import MovieLink from '../../../../types/MovieLink';
import { MovieRatingActionTypes, MovieRatingState } from './types'

export const initialState: MovieRatingState = {
  movie: {} as Movie ,
  movieLink: {} as MovieLink,
  ratedMovies: [],
  skippedMovies: [],
  movieImagePath: '',
  loading: false,
  errors: undefined
}

const reducer: Reducer<MovieRatingState> = (state = initialState, action) => {
  switch (action.type) {
    case MovieRatingActionTypes.FETCH_RANDOM_REQUEST: {
      return { 
        ...state, 
        loading: true
      }
    }
    case MovieRatingActionTypes.FETCH_RANDOM_SUCCESS: {
      return { 
        ...state, 
        loading: false,
        movie: action.payload.movie,
        movieLink: action.payload.movieLink
      }
    }
    case MovieRatingActionTypes.FETCH_RANDOM_ERROR: {
      return { 
        ...state, 
        loading: false,
        errors: action.payload 
      }
    }
    case MovieRatingActionTypes.ADD_MOVIE_RATING: {
      return { 
        ...state,
        ratedMovies: [...state.ratedMovies.filter(rm => rm.movieId != action.payload.movieId), action.payload]
      }
    }
    case MovieRatingActionTypes.ADD_SKIPED_MOVIE: {
      return { 
        ...state,
        skipedMovies: [...state.skippedMovies, action.payload]
      }
    }
    case MovieRatingActionTypes.FETCH_TMDB_DETAILS: {
      return { 
        ...state, 
        loading: true
      }
    }
    case MovieRatingActionTypes.FETCH_TMDB_IMAGE_SUCCESS: {
      return { 
        ...state, 
        loading: false, 
        movieImagePath: action.payload
      }
    }
    case MovieRatingActionTypes.FETCH_TMDB_IMAGE_ERROR: {
      return { 
        ...state, 
        loading: false,
        errors: action.payload 
      }
    }
    default: {
      return state
    }
  }
}

export { reducer as movieRatingReducer }