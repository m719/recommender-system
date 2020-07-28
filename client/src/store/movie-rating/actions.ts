
import { action } from 'typesafe-actions'
import { MovieRatingActionTypes } from './types'
import Movie from '../../../../types/Movie'
import MovieLink from '../../../../types/MovieLink'

export const fetchRandomRequest = () => action(MovieRatingActionTypes.FETCH_RANDOM_REQUEST)
export const fetchRandomSuccess = (movieAndLink: { movie: Movie, movieLink: MovieLink }) => action(MovieRatingActionTypes.FETCH_RANDOM_SUCCESS, movieAndLink)
export const fetchRandomError = (message: string) => action(MovieRatingActionTypes.FETCH_RANDOM_ERROR, message)

export const fetchTmdbDetails = () => action(MovieRatingActionTypes.FETCH_TMDB_DETAILS)
export const fetchTmdbDetailsSucess = (data: any) => action(MovieRatingActionTypes.FETCH_TMDB_DETAILS_SUCCESS, data)
export const fetchTmdbDetailsError = (message: string) => action(MovieRatingActionTypes.FETCH_TMDB_DETAILS_ERROR, message)
export const fetchTmdbImageSucess = (image: string) => action(MovieRatingActionTypes.FETCH_TMDB_IMAGE_SUCCESS, image)
export const fetchTmdbImageError = (message: string) => action(MovieRatingActionTypes.FETCH_TMDB_IMAGE_ERROR, message)

export const addMovieRating = (movieIdAndRating: { movieId: number, rating: number }) => action(MovieRatingActionTypes.ADD_MOVIE_RATING, movieIdAndRating)