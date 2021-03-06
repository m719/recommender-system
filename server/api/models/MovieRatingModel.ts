/**
 * Maps Movielens ratings file
 */

import * as mongoose from 'mongoose';
import MovieRating from '../../../types/MovieRating';
const Schema = mongoose.Schema;

interface MovieRatingDocument extends MovieRating, mongoose.Document {}

const MovieRatingSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true
  },
  userId: Number,
  rating: Number,
  timestamp: Number
},
{
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});

const MovieRatingModel = mongoose.model<MovieRatingDocument>('MovieRating', MovieRatingSchema);
export = MovieRatingModel;