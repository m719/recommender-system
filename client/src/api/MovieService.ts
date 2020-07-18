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

  static getRandomMovie() : Promise<AxiosResponse<MoviesObject>> {
    return apiClient.get(`/api/movies/random`)
  }
}

export default MovieService;