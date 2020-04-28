const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    decription: String,
    bookCover: String
})

var Book = mongoose.model('books', bookSchema);

module.exports = Book
