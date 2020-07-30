
import { action } from 'typesafe-actions'
import { MovieRecommendationsActionTypes } from './types'
import Movie from '../../../../types/Movie'
import MovieLink from '../../../../types/MovieLink'

export const fetchRecommendationsAndImages = (userId: number) => action(MovieRecommendationsActionTypes.FETCH_RECOMMENDATIONS_AND_IMAGES, userId)

export const fetchRecommendations = (userId: number) => action(MovieRecommendationsActionTypes.FETCH_RECOMMENDATIONS, userId)
export const fetchRecommendationsSuccess = (moviesAndLinks: { movies: Movie[], movieLinks: MovieLink[] }) => action(MovieRecommendationsActionTypes.FETCH_RECOMMENDATIONS_SUCCESS, moviesAndLinks)
export const fetchRecommendationsError = (message: string) => action(MovieRecommendationsActionTypes.FETCH_RECOMMENDATIONS_ERROR, message)

export const fetchTmdbImages = () => action(MovieRecommendationsActionTypes.FETCH_TMDB_IMAGES)
export const fetchTmdbImagesSuccess = (movieImages: { movieId: number, imagePath: string }[]) => action(MovieRecommendationsActionTypes.FETCH_TMDB_IMAGES_SUCCESS, movieImages)
export const fetchTmdbImagesError = (message: string) => action(MovieRecommendationsActionTypes.FETCH_TMDB_IMAGES_ERROR, message)