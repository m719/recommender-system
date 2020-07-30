/**
 * Represents client's movie ratings
 * 
 * This model could actually be merged with MovieRatingModel.
 */

import * as mongoose from 'mongoose';
import MyRating from '../../../types/MyRating';
const Schema = mongoose.Schema;

interface MyRatingDocument extends MyRating, mongoose.Document {}

const MyRatingSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true
  },
  rating: Number
},
{
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});

const MyRatingModel = mongoose.model<MyRatingDocument>('MyRating', MyRatingSchema);
export = MyRatingModel;