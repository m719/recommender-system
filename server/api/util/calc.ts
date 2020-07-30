import MovieRating from '../../../types/MovieRating';
import Movie from '../../../types/Movie';
import { MovieModel, MovieRatingModel } from '../models';
import mongoose from 'mongoose';
import configs from '../../config/config';

const config = configs[process.env.NODE_ENV];

interface RatingsByUsers {
  [userId: number]: RatingAndMovie[]
}

interface RatingAndMovie {
  movieId: number
  rating: number
}

interface Neighbors {
  [userId: number]: Neighbor[]
}

interface Neighbor {
  userId: number,
  similarity: number
}

interface RatingSet {
  estimatedRating: number,
  actualRating: number
}

const myRatings = [
  { movieId: 156675, rating: 3},
  { movieId: 1848, rating: 4 },
  { movieId: 5817, rating: 2 },
  { movieId: 170937, rating: 4 },
  { movieId: 6678, rating: 2 },
  { movieId: 52831, rating: 4 },
  { movieId: 8571, rating: 3 },
  { movieId: 73386, rating: 5 },
  { movieId: 5462, rating: 3 },
  { movieId: 47124, rating: 2 }
]

async function extractTrainingAndTestSets(): Promise<{ trainingSet: Array<MovieRating>, testSet: Array<MovieRating>}> {
  let ratings = [...await MovieRatingModel.find()].sort(() => Math.random() - 0.5); // Shuffle the array
  const size = ratings.length;
  const nineTenthIdx = size * 80 / 100;
  return { trainingSet: ratings.slice(0, nineTenthIdx), testSet: ratings.slice(nineTenthIdx + 1)};
}

async function getUserIds(): Promise<Set<number>> {
  let data = await MovieRatingModel.find();
  const userIds = new Set<number>();
  data.forEach(d => userIds.add(d.userId));
  return userIds;
}

function mapUserToRatings(trainingSet: Array<MovieRating>): RatingsByUsers {
  return trainingSet.reduce((prev: RatingsByUsers, current) => {
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

function getNearestNeighbors(userIds: Array<number>, ratingsByUsers: RatingsByUsers) {
  const neighbors: Neighbors = {};
  const memo = [];

  for (let i = 0; i < userIds.length; i++) {
    memo[i] = [];
    for (let j = 0; j < userIds.length; j++) {
      memo[i][j] = 0;
    }
  }

  for (let i = 0; i < userIds.length; i++) {
    neighbors[userIds[i]] = [];
    for (let j = 0; j < userIds.length; j++) {
      // Sim of i - i is useless and some user ids can be missing along the way since we work with the training set (90% of the data)
      if (i === j || !ratingsByUsers[userIds[i]] || !ratingsByUsers[userIds[j]]) continue;

      const THRESHOLD = 0.2;
      const hi = i > j ? i : j;
      const lo = i <= j ? i : j;

      let res = memo[lo][hi];
      if (res === 0) {
        res = cosineSimilarity(ratingsByUsers[userIds[i]], ratingsByUsers[userIds[j]])
        memo[lo][hi] = res;
      }

      if (res > THRESHOLD) neighbors[userIds[i]].push({ userId: userIds[j], similarity: res });
    }
  }
  return neighbors;
}

function calcRatingFromNearestNeighbors(ratingsByUsers: RatingsByUsers, neighbors: Neighbors, testData: Array<MovieRating>) {
  let estimatedRatings: Array<RatingSet> = [];
  for (const line of testData) {
    let { userId, movieId, rating } = line;
    let userNeighbors: Array<Neighbor> = neighbors[userId];

    let movieRatings = [];
    for (const un of userNeighbors) {
      const neighborId = un.userId;
      for (const movieIdAndRating of ratingsByUsers[neighborId]) {
        if (movieIdAndRating.movieId === movieId) {
          movieRatings.push(movieIdAndRating.rating);
        }
      }
    }

    if (movieRatings.length > 0) {
      const er = movieRatings.reduce((acc, current) => acc += current, 0) / movieRatings.length;
      estimatedRatings.push({ actualRating: rating, estimatedRating: er });
    }
  }
  return estimatedRatings
}

function calcMAE(ratings: Array<RatingSet>) {
  let mae = 0;
  for (const r of ratings) {
    mae += Math.abs(r.actualRating - r.estimatedRating);
  }
  return mae / ratings.length;
}

(async () => {
  try {
    await mongoose.connect(config.databaseUrl);
    const db = mongoose.connection;

    if (db.readyState !== mongoose.Connection.STATES.connected) {
      throw new Error("Database unreachable")
    }

    // Extract training and test sets
    const movieRatings = await extractTrainingAndTestSets()

    // Map each user to its movie ratings
    const ratingsByUsers = mapUserToRatings(movieRatings.trainingSet);
    
    // Store all user id's
    const userIds: Array<number> = [...await getUserIds()];
    
    // Get nearest neighbors for each user
    const neighbors = getNearestNeighbors(userIds, ratingsByUsers);    

    // Calculate absolute errors between estimated ratings and actual ratings
    const estimatedRatings = calcRatingFromNearestNeighbors(ratingsByUsers, neighbors, movieRatings.testSet);

    // Calculate the Mean Absolute Error (MAE)
    let res = calcMAE(estimatedRatings);
    console.log(`======= CALCULATED MAE : ${res} ========`)

  } catch (err) {
    console.log(err)
    process.exit(-1)
  }
  process.exit(0);
})();