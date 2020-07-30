import { AxiosResponse } from 'axios';
import apiClient from './apiClient';
import Movie from '../../../types/Movie';

interface MoviesObject {
  movies: Movie[]
}

class MovieService {
  static getMovies() : Promise<AxiosResponse<MoviesObject>> {
    return apiClient.get('/api/movies')
  }

  static getMostRatedMovie(ratedMovieIds: number[]) : Promise<AxiosResponse<MoviesObject>> {
    let query = '';
    for (let i = 0; i < ratedMovieIds.length; i++) {
      if (i === 0) query += `?alreadyRated=${ratedMovieIds[i]}`
      else query += `&alreadyRated=${ratedMovieIds[i]}`
    }
    return apiClient.get(`/api/movies/most-rated${query}`)
  }

  static submitMovieRatings(ratings: Array<{ movieId: number, rating: number }>) : Promise<AxiosResponse<number>> {
    return apiClient.post(`/api/movie-ratings`, { ratings })
  }

  static getMovieRecommendations(userId: number) : Promise<AxiosResponse<MoviesObject>> {
    return apiClient.get(`/api/movie-recommendations/${userId}`)
  }
}

export default MovieService;