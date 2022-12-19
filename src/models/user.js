const mongoose = require('mongoose');
mongoose.set('strictQuery', false)

const userDetails = new mongoose.Schema({
    // Your code goes here
    name: { type: String, required: true },
    email: { type: String ,unique:true},
    account: { type: String, unique:true },
    balance: { type: String }
})

const Details = mongoose.model('details', userDetails);

module.exports = Details;
