const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    cart: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { minimize: false })


var Session = mongoose.model('sessions', sessionSchema);

module.exports = Session
