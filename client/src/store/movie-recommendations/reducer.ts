import { Reducer } from 'redux'
import { MovieRecommendationsActionTypes, MovieRecommendationsState } from './types'

export const initialState: MovieRecommendationsState = {
  movies: [],
  movieLinks: [],
  movieImages: [],
  loading: false,
  errors: undefined
}

const reducer: Reducer<MovieRecommendationsState> = (state = initialState, action) => {
  switch (action.type) {
    case MovieRecommendationsActionTypes.FETCH_RECOMMENDATIONS: {
      return { 
        ...state, 
        loading: true
      }
    }
    case MovieRecommendationsActionTypes.FETCH_RECOMMENDATIONS_SUCCESS: {
      return { 
        ...state, 
        loading: false,
        movies: action.payload.movies,
        movieLinks: action.payload.movieLinks
      }
    }
    case MovieRecommendationsActionTypes.FETCH_RECOMMENDATIONS_ERROR: {
      return { 
        ...state, 
        loading: false,
        errors: action.payload 
      }
    }
    case MovieRecommendationsActionTypes.FETCH_TMDB_IMAGES: {
      return { 
        ...state, 
        loading: true
      }
    }
    case MovieRecommendationsActionTypes.FETCH_TMDB_IMAGES_SUCCESS: {
      return { 
        ...state, 
        loading: false,
        movieImages: action.payload
      }
    }
    case MovieRecommendationsActionTypes.FETCH_TMDB_IMAGES_ERROR: {
      return { 
        ...state, 
        loading: false,
        errors: action.payload 
      }
    }
    case MovieRecommendationsActionTypes.FETCH_RECOMMENDATIONS_AND_IMAGES: {
      return { 
        ...state, 
        loading: true
      }
    }
    default: {
      return state
    }
  }
}

export { reducer as movieRecommendationsReducer }