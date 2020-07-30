
import { action } from 'typesafe-actions'
import { MovieRatingActionTypes } from './types'
import Movie from '../../../../types/Movie'
import MovieLink from '../../../../types/MovieLink'

export const fetchRandomRequest = () => action(MovieRatingActionTypes.FETCH_RANDOM_REQUEST)
export const fetchRandomSuccess = (movieAndLink: { movie: Movie, movieLink: MovieLink }) => action(MovieRatingActionTypes.FETCH_RANDOM_SUCCESS, movieAndLink)
export const fetchRandomError = (message: string) => action(MovieRatingActionTypes.FETCH_RANDOM_ERROR, message)

export const fetchTmdbDetails = () => action(MovieRatingActionTypes.FETCH_TMDB_DETAILS)
export const fetchTmdbImageSucess = (image: string) => action(MovieRatingActionTypes.FETCH_TMDB_IMAGE_SUCCESS, image)
export const fetchTmdbImageError = (message: string) => action(MovieRatingActionTypes.FETCH_TMDB_IMAGE_ERROR, message)

export const addMovieRating = (movieIdAndRating: { movieId: number, rating: number }) => action(MovieRatingActionTypes.ADD_MOVIE_RATING, movieIdAndRating)
export const skipMovieRating = (movieId: number) => action(MovieRatingActionTypes.ADD_SKIPPED_MOVIE, movieId)
export const submitMovieRatings = () => action(MovieRatingActionTypes.SUBMIT_MOVIE_RATINGS)
export const submitMovieRatingsError = (message: string) => action(MovieRatingActionTypes.SUBMIT_MOVIE_RATINGS_ERROR, message)