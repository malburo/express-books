const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    decription: String,
    bookCover: String,
    seller: String,
    nameSeller: String
})

var Book = mongoose.model('books', bookSchema);

module.exports = Book
