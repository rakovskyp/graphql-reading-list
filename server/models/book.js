const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// what our book objects will look like
const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
});

module.exports = mongoose.model('Book', bookSchema);