import MovieApi from './MovieApi';
import express = require('express');

const router = express.Router();

router.use(MovieApi);

export default router;