import config from '../constants/config';
import { AxiosResponse } from 'axios';

import axios from 'axios';

const tmdbApiUrl = 'https://api.themoviedb.org/3';
const tmdbImagesUrl = 'https://image.tmdb.org/t/p/original';

class TmdbService {
  static getMovieDetails(movieId: string) : Promise<AxiosResponse<any>> {
    return axios.get(`${tmdbApiUrl}/movie/${movieId}?api_key=${config.tmdbApiKey}`)
  }

  static getMovieImage(imagePath: string) : Promise<AxiosResponse<any>> {
    return axios.get(`${tmdbImagesUrl}/${imagePath}`)
  }
}

export default TmdbService;