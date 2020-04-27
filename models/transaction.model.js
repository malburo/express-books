const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: String,
    bookId: String,
    userName: String,
    bookTitle: String,
    isComplete: Boolean
})

var Transaction = mongoose.model('transactions', transactionSchema);

module.exports = Transaction