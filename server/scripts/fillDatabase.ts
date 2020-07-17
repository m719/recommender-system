import mongoose from 'mongoose';
import { MovieModel as Movie } from '../api/models';
import { MovieLensParser } from '../api/util';
import configs from '../config/config';

const config = configs[process.env.NODE_ENV];

(async () => {
  const movies = MovieLensParser.parseMovies();
  
  await mongoose.connect(config.databaseUrl);
  const db = mongoose.connection;

  if (db.readyState !== mongoose.Connection.STATES.connected) {
    throw new Error("Database unreachable")
  }

  // Deleting the movie collection
  await Movie.deleteMany({});

  // Adding movie data
  await Promise.all(movies.map(async (m) => {
    const movieData = new Movie();
    movieData.movieId = m.movieId
    movieData.title = m.title;
    movieData.genres = m.genres
    await movieData.save();
  }));

  process.exit(0);
})();