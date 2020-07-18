import Movie from '../../../../types/Movie';
import MovieLink from '../../../../types/MovieLink';

export enum MovieRatingActionTypes {
  ADD_MOVIE_RATING = '@@/movie-rating/ADD_MOVIE_RATING',
  ADD_SKIPED_MOVIE = '@@/movie-rating/ADD_SKIPED_MOVIE',
  SUBMIT_MOVIE_RATINGS = '@@/movie-rating/SUBMIT_MOVIE_RATINGS',
  FETCH_TMDB_DETAILS = '@@movie-rating/FETCH_TMDB_DETAILS',
  FETCH_TMDB_DETAILS_SUCCESS = '@@movie-rating/FETCH_TMDB_DETAILS_SUCCESS',
  FETCH_TMDB_DETAILS_ERROR = '@@movie-rating/FETCH_TMDB_DETAILS_ERROR',
  FETCH_TMDB_IMAGE_SUCCESS = '@@movie-rating/FETCH_TMDB_IMAGE_SUCCESS',
  FETCH_TMDB_IMAGE_ERROR = '@@movie-rating/FETCH_TMDB_IMAGE_ERROR',
  FETCH_RANDOM_REQUEST = '@@movie-rating/FETCH_RANDOM_REQUEST',
  FETCH_RANDOM_SUCCESS = '@@movie-rating/FETCH_RANDOM_SUCCESS',
  FETCH_RANDOM_ERROR = '@@movie-rating/FETCH_RANDOM_ERROR',
}

export interface MovieRatingState {
  movie: Movie
  movieLink: MovieLink
  ratedMovies: MovieRating[]
  skippedMovies: string[]
  movieImagePath: string
  readonly loading: boolean
  readonly errors?: string
}

interface MovieRating {
  movieId: number
  rating: number
}