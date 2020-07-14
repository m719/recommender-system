import { MovieLensParser } from '../util';
import { NextFunction, Request, Response } from 'express';

class MovieController {
  static getMovies(req: Request, res: Response, next: NextFunction) {
    let movies = [];
    try {
      movies = MovieLensParser.parseMovies();
    } catch (err) {
      return next(err);
    }
    return res.json({ movies });
  }

  static getRandomMovie() {
    // TODO
  }
}

export { MovieController };