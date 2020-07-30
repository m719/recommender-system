import { NextFunction, Request, Response } from 'express';
import { MovieModel, MovieLinkModel, MovieRatingModel, MyRatingModel, MyUserModel } from '../models';
import { kNNAlgorithm } from '../util';
import { MovieLink, MovieRating, Movie, MyRating, MyUser } from '../../../types';

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

  static async getMostRatedMovie(req: Request, res: Response, next: NextFunction) {
    let movieAndLink: [Movie, MovieLink];
    const { alreadyRated } = req.query;
    const ratedIds = Array.isArray(alreadyRated) ? alreadyRated : [alreadyRated];
    try {
      let movieRatings = await MovieRatingModel.aggregate([{ $sortByCount: "$movieId" }]).limit(200)
      let mr = movieRatings.find(m => ratedIds.indexOf(m._id.toString()) === -1) // String conversion is mandatory since query param values are received as strings
      movieAndLink = await Promise.all<Movie, MovieLink>([ 
        MovieModel.findOne({ movieId: mr._id }),
        MovieLinkModel.findOne({ movieId: mr._id })
      ]);
    } catch (err) {
      return next(err);
    }
    return res.json({ movie: movieAndLink[0], movieLink: movieAndLink[1] });
  }

  static async submitMovieRatings(req: Request, res: Response, next: NextFunction) {
    const { ratings } = req.body;
    let user; // TODO find a way to define the type here

    try {
      // Create ratings
      let ratingEntries: Array<MyRating> = [];
      await Promise.all([ratings.map((r: MovieRating) => {
        let ratingEntry = new MyRatingModel();
        ratingEntry.rating = r.rating;
        ratingEntry.movieId = r.movieId;
        ratingEntries.push(ratingEntry);
        return ratingEntry.save();
      })])

      // Create the associated user
      let userEntry = new MyUserModel();
      userEntry.ratings = ratingEntries;
      user = await userEntry.save();

    } catch (err) {
      return next(err);
    }
    return res.json({ userId: user._id });
  }

  static async getMovieRecommendations(req: Request, res: Response, next: NextFunction) {
    let movies = [];
    let movieLinks = [];
    let { userId } = req.params;

    try {
      const user = await MyUserModel.findById(userId).populate('ratings');
      movies = await kNNAlgorithm(user.ratings);

      const movieIds = movies.map(m => m.movieId);
      movieLinks = await MovieLinkModel.find({ movieId: { $in: movieIds }});

    } catch (err) {
      return next(err);
    }
    return res.json({ movies, movieLinks });
  }
}

export = MovieController;