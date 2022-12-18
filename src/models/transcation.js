const mongoose = require('mongoose');

const transcationSchema = new mongoose.Schema({
    // Your code goes here
    sender: { type: String },
    receiver: { type: String },
    amount: { type: String },
})

const transcations = mongoose.model('transcations', transcationSchema);

module.exports = transcations;
