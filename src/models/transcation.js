const mongoose = require('mongoose');

const transcationSchema = new mongoose.Schema({
    // Your code goes here
    statement: { type: String, required: true },
})

const transcations = mongoose.model('history', transcationSchema);

module.exports = transcations;
