import Constants from './Constants';
import { AxiosResponse } from 'axios';
import apiClient from './apiClient';
import Movie from '../../../types/Movie';

interface MovieObject {
  movies: Movie[]
}

class MovieDbService {
  static getMovie() : Promise<AxiosResponse<MovieObject>> {
    return apiClient.get('/api/movies')
  }
}

export default MovieDbService;