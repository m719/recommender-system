/**
 * Maps Movielens movies file
 */

import * as mongoose from 'mongoose';
import Movie from '../../../types/Movie';
const Schema = mongoose.Schema;

interface MovieDocument extends Movie, mongoose.Document {}

const MovieSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  genres: String
},
{
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});

const MovieModel = mongoose.model<MovieDocument>('Movie', MovieSchema);
export = MovieModel;