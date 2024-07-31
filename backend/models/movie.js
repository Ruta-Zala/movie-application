const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    uuid: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    publishing_year: { type: Number, required: true },
    poster: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Movie', MovieSchema);
