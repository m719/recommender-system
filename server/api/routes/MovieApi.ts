import express from 'express';
import { MovieController }  from '../controllers';

const router = express.Router();

// Get all movies
router.get('/movies', MovieController.getMovies)

// Get a random movie
router.get('/movies/random', MovieController.getRandomMovies)

export default router;