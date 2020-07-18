import Movie from '../../../../types/Movie';

// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum MoviesActionTypes {
  FETCH_ALL_REQUEST = '@@movies/FETCH_ALL_REQUEST',
  FETCH_ALL_SUCCESS = '@@movies/FETCH_ALL_SUCCESS',
  FETCH_ALL_ERROR = '@@movies/FETCH_ALL_ERROR',
}
  
// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface MoviesState {
  readonly loading: boolean
  readonly data: Movie[]
  readonly errors?: string
}