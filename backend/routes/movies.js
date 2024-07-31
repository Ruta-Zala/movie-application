const express = require('express');
const router = express.Router();
const {
    createMovie,
    getMovies,
    getMovieById,
    updateMovie,
    deleteMovie,
} = require('../controllers/movieController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');


router.post('/', auth, upload, createMovie);
router.get('/', auth, getMovies);
router.get('/:uuid',auth, getMovieById);
router.put('/:uuid', auth, upload, updateMovie);
router.delete('/:uuid', auth, deleteMovie);

module.exports = router;
