const Movie = require('../models/movie');
const { v4: uuidv4 } = require('uuid');

exports.createMovie = async (req, res) => {
    const { title, publishing_year } = req.body;
    const poster = req.file ? req.file.path : '';
    const uuid = uuidv4();
    const userId = req.user; // Assuming user ID is stored in req.user

    try {
        const movie = new Movie({ uuid, title, publishing_year, poster, user: userId });
        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getMovies = async (req, res) => {
    const userId = req.user; // Assuming user ID is stored in req.user

    try {
        const movies = await Movie.find({ user: userId });
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMovieById = async (req, res) => {
    const userId = req.user; // Assuming user ID is stored in req.user

    try {
        const movie = await Movie.findOne({ uuid: req.params.uuid, user: userId });
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateMovie = async (req, res) => {
    const { title, publishing_year } = req.body;
    const poster = req.file ? req.file.path : '';
    const userId = req.user; // Assuming user ID is stored in req.user

    try {
        const movie = await Movie.findOneAndUpdate(
            { uuid: req.params.uuid, user: userId },
            { title, publishing_year, poster },
            { new: true }
        );
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteMovie = async (req, res) => {
    const userId = req.user; // Assuming user ID is stored in req.user

    try {
        const movie = await Movie.findOneAndDelete({ uuid: req.params.uuid, user: userId });
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
