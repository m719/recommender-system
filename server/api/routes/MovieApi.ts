import express from 'express';
import { MovieController }  from '../controllers';

const router = express.Router();

// Get all movies
router.get('/movies', MovieController.getMovies)

// Get a random movie
router.get('/movies/most-rated', MovieController.getMostRatedMovie)

// Get a random movie
router.post('/movie-ratings', MovieController.submitMovieRatings)

// Get a random movie
router.get('/movie-recommendations/:userId', MovieController.getMovieRecommendations)

export default router;