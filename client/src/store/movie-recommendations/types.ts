import { Movie, MovieLink } from '../../../../types';

// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum MovieRecommendationsActionTypes {
  FETCH_RECOMMENDATIONS = '@@movies-recommendations/FETCH_RECOMMENDATIONS',
  FETCH_RECOMMENDATIONS_SUCCESS = '@@movies-recommendations/FETCH_RECOMMENDATIONS_SUCCESS',
  FETCH_RECOMMENDATIONS_ERROR = '@@movies-recommendations/FETCH_RECOMMENDATIONS_ERROR',
  FETCH_TMDB_IMAGES = '@@movies-recommendations/FETCH_TMDB_IMAGES',
  FETCH_TMDB_IMAGES_SUCCESS = '@@movies-recommendations/FETCH_TMDB_IMAGES_SUCCESS',
  FETCH_TMDB_IMAGES_ERROR = '@@movies-recommendations/FETCH_TMDB_IMAGES_ERROR',
  FETCH_RECOMMENDATIONS_AND_IMAGES = '@@movies-recommendations/FETCH_RECOMMENDATIONS_AND_IMAGES',
}
  
// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface MovieRecommendationsState {
  readonly loading: boolean
  readonly movies: Movie[]
  readonly movieLinks: MovieLink[]
  readonly movieImages: { movieId: number, imagePath: string }[]
  readonly errors?: string
}