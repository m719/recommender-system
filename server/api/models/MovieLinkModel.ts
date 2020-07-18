import mongoose = require('mongoose');
import MovieLink from '../../../types/MovieLink';

interface MovieLinkDocument extends MovieLink, mongoose.Document {}

const MovieLinkSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true
  },
  tmdbId: String,
  imdbId: String
},
{
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});

const MovieLinkModel = mongoose.model<MovieLinkDocument>('MovieLink', MovieLinkSchema);
export = MovieLinkModel;