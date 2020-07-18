import { NextFunction, Request, Response } from 'express';
import { MovieModel, MovieLinkModel } from '../models';
import MovieLink from '../../../types/MovieLink';
import Movie from '../../../types/Movie';

class MovieController {
  static async getMovies(req: Request, res: Response, next: NextFunction) {
    let movies = [];
    try {
      movies = await MovieModel.find();
    } catch (err) {
      return next(err);
    }
    return res.json({ movies });
  }

  static async getRandomMovies(req: Request, res: Response, next: NextFunction) {
    let movies: Movie[] = [];
    let movieLink: MovieLink;
    try {
      movies = await MovieModel.aggregate([{ $sample: { size: 1 } }])

      movieLink = await MovieLinkModel.findOne({
        movieId: movies[0].movieId
      });
    } catch (err) {
      return next(err);
    }
    return res.json({ movie: movies[0], movieLink });
  }
}

export = MovieController;