import mongoose from 'mongoose';
import { MovieModel as Movie, MovieLinkModel as MovieLink, MovieRatingModel as MovieRating } from '../api/models';
import { MovieLensParser } from '../api/util';
import configs from '../config/config';

const config = configs[process.env.NODE_ENV];

(async () => {
  // Parse data files
  const movies = MovieLensParser.parseMovies();
  const movieLinks = MovieLensParser.parseLinks();
  const movieRatings = MovieLensParser.parseRatings();
  
  await mongoose.connect(config.databaseUrl);
  const db = mongoose.connection;

  if (db.readyState !== mongoose.Connection.STATES.connected) {
    throw new Error("Database unreachable")
  }

  // Deleting the movie collection
  console.log('Deleting existing data...')
  await Promise.all([
    Movie.deleteMany({}),
    MovieLink.deleteMany({}),
    MovieRating.deleteMany({})
  ]);
  console.log('Done.')

  // Adding movie data
  console.log('Adding movies...')

  function sleep(timeout) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, timeout)
    })
  }

  try {
    let i = 0;
    for await (const m of movies) {
      // Sleep every 1000 iteration, mLab could be overwhelmed and close the connection otherwise
      if (i % 1000 === 0) {
        console.log('waiting 2 sec...')
        await sleep(2000);
        console.log('OK.')
      }

      const movie = new Movie();
      movie.movieId = m.movieId
      movie.title = m.title;
      movie.genres = m.genres
      await movie.save();
      i++;
    }
    console.log('Done.')
  } catch (err) {
    console.log('Error while adding movies : ', err)
    process.exit(-1);
  }


  console.log('Adding movie links...')
  try {
    let i = 0;
    for await (const m of movieLinks) {
      // Sleep every 1000 iteration, mLab could be overwhelmed and close the connection otherwise
      if (i % 1000 === 0) {
        console.log('waiting 2 sec...')
        await sleep(2000);
        console.log('OK.')
      }

      const movieLink = new MovieLink();
      movieLink.movieId = m.movieId
      movieLink.imdbId = m.imdbId;
      movieLink.tmdbId = m.tmdbId;
      await movieLink.save();
      i++;
    }
    console.log('Done.')
  } catch (err) {
    console.log('Error while adding movie links : ', err)
    process.exit(-1);
  }
  

  console.log('Adding movie ratings...')
  try {
    let i = 0;
    for await (const m of movieRatings) {
      // Sleep every 1000 iteration, mLab could be overwhelmed and close the connection otherwise
      if (i % 1000 === 0) {
        console.log('waiting 2 sec...')
        await sleep(2000);
        console.log('OK.')
      }

      const movieRating = new MovieRating();
      movieRating.movieId = m.movieId
      movieRating.userId = m.userId;
      movieRating.rating = m.rating;
      movieRating.timestamp = m.timestamp;
      await movieRating.save();
      i++;
    }
    console.log('Done.')
  } catch (err) {
    console.log('Error while adding movie ratings : ', err)
    process.exit(-1);
  }
  
  process.exit(0);
})();