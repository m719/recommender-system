import MovieRating from '../../../types/MovieRating';
import Movie from '../../../types/Movie';
import { MovieModel, MovieRatingModel } from '../models';

interface RatingsByUsers {
  [userId: number]: RatingAndMovie[]
}

interface RatingAndMovie {
  movieId: number
  rating: number
}

interface Neighbor {
  userId: number,
  similarity: number
}

function mapUserToRatings(movieRatings: Array<MovieRating>): RatingsByUsers {
  return movieRatings.reduce((prev: RatingsByUsers, current) => {
    if (!prev.hasOwnProperty(current.userId)) {
      prev[current.userId] = [];
    }
    prev[current.userId].push({ movieId: current.movieId, rating: current.rating });
    return prev;
  }, {})
}

function cosineSimilarity(u1: Array<RatingAndMovie>, u2: Array<RatingAndMovie>): number {
  let u1Movies = new Set<number>();
  let u2Movies = new Set<number>();
  u1.forEach(m => u1Movies.add(m.movieId));
  u2.forEach(m => u2Movies.add(m.movieId));
  
  let common = new Set<number>([...u1Movies].filter(id => u2Movies.has(id)));

  // The similarity between the two users can't be calculated if they have not rated at least one common item
  if (common.size === 0) {
    return 0;
  }

  let u1Subset = u1.filter(m => common.has(m.movieId));
  let u2Subset = u2.filter(m => common.has(m.movieId))

  // The numerator is the sum of the product between the rating of common items
  let numerator = u1Subset.reduce((acc, current) => {
    let u2Data = u2Subset.filter(m => m.movieId === current.movieId);
    acc += current.rating * u2Data[0].rating; // get 0th element since only one can have the given movie id
    return acc;
  }, 0)

  // The denominator is the product of the root squared sum of each rating at the power of 2 (one for each user)
  let squaredSum1 = u1.reduce((acc, current) => acc += Math.pow(current.rating, 2), 0);
  let squaredSum2 = u2.reduce((acc, current) => acc += Math.pow(current.rating, 2), 0);
  let denominator = Math.sqrt(squaredSum1) * Math.sqrt(squaredSum2);

  return numerator / denominator;
}

function getNearestNeighbors(ratingsByUsers: RatingsByUsers, userRatings: RatingAndMovie[]) {
  let neighbors: Neighbor[] = [];
  const THRESHOLD = 0.3;

  for (const userId of Object.keys(ratingsByUsers)) {
      let res = cosineSimilarity(userRatings, ratingsByUsers[userId])

      if (res >= THRESHOLD)
        neighbors.push({ userId: parseInt(userId), similarity: res });
  }
  return neighbors.sort((n1, n2) => n2.similarity - n1.similarity);
}

async function getRecommendedMovies(ratingsByUsers: RatingsByUsers, neighbors: Neighbor[], alreadySeenMovieIds: number[]): Promise<Movie[]> {
  const NEIGHBORS_THRESHOLD = 3;

  const topNeighbors = neighbors.slice(0, NEIGHBORS_THRESHOLD);
  let movieIds: Array<number> = [];

  // EPSILON DELTA To compare floating point values equality. 0.001 is quite big for an epsilon value
  // but it is good here since rating values have at least a 0.5 gap between them (1, 1.5, 2, 2.5, ...).
  const EPSILON = 0.001; 
  const MAX_RATING_VAL = 5; 
  for (let i = 0; i < topNeighbors.length; i++) {
    let neighbor = ratingsByUsers[topNeighbors[i].userId];
    movieIds = [
      ...movieIds, 
      ...neighbor
        .filter(n => !alreadySeenMovieIds.includes(n.movieId))
        .filter(n => Math.abs(MAX_RATING_VAL - n.rating) <= EPSILON)
        .map(n => n.movieId)
    ]

    // A recommendation percentage could be calculated from a formula that uses the movie rate and the neighbor similarity
    // recPercentage = [
    //   ...recPercentage,
    //   ...neighbor
    //     .filter(n => !alreadySeenMovieIds.includes(n.movieId))
    //     .filter(n => Math.abs(MAX_RATING_VAL - n.rating) <= EPSILON)
    //     .map(n => (MAX_RATING_VAL - Math.abs(MAX_RATING_VAL - n.rating)) * 100 / 5.0)
    // ];
  }

  const movies = await MovieModel.find({
    movieId: {
      $in: movieIds
    }
  })
  return movies;
}

export default async function kNNRecommendedMovies(userRatings: RatingAndMovie[]) {
  // Extract training and test sets
  const movieRatings = await MovieRatingModel.find();

  // Map each user to its movie ratings
  const ratingsByUsers = mapUserToRatings(movieRatings);
  
  // Get nearest neighbors for each user
  const neighbors = getNearestNeighbors(ratingsByUsers, userRatings);

  // Get recommended movies, exclude already seen movies
  const alreadySeenMovieIds = userRatings.map(ur => ur.movieId);
  const recommendedMovies = await getRecommendedMovies(ratingsByUsers, neighbors, alreadySeenMovieIds);
  return recommendedMovies;
}