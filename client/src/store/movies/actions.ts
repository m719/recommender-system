
import { action } from 'typesafe-actions'
import { MoviesActionTypes } from './types'
import Movie from '../../../../types/Movie'

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const fetchAllRequest = () => action(MoviesActionTypes.FETCH_ALL_REQUEST)

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const fetchAllSuccess = (data: Movie[]) => action(MoviesActionTypes.FETCH_ALL_SUCCESS, data)
export const fetchAllError = (message: string) => action(MoviesActionTypes.FETCH_ALL_ERROR, message)