const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// what our book objects will look like
const authorSchema = new Schema({
    name: String,
    age: Number,
});

module.exports = mongoose.model('Author', authorSchema);