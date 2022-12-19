const mongoose = require('mongoose');
mongoose.set('strictQuery', false)

const hist = new mongoose.Schema({
    // Your code goes here
    statement: { type: String, required: true },
})

const tHistory = mongoose.model('transactionHistory', hist);

module.exports = tHistory
