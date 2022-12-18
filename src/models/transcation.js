const mongoose = require('mongoose');

const transcationSchema = new mongoose.Schema({
    // Your code goes here
    sender: { type: String, required: true },
    receiver: { type: String ,unique:true},
    amount: { type: String },
})

const transcations = mongoose.model('transcations', transcationSchema);

module.exports = transcations;
