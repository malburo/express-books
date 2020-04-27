const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    cart: []
})


var Session = mongoose.model('sessions', sessionSchema);

module.exports = Session
