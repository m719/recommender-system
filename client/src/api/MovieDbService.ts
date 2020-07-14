import Constants from './Constants';
import axios, { AxiosResponse } from 'axios';
import Movie from '../types/Movie';

interface MovieObject {
  movies: Movie[]
}

class MovieDbService {
  static getMovie() : Promise<AxiosResponse<MovieObject>> {
    return axios.get(`http://localhost:4000/api/movies`)
  }
}

export default MovieDbService;