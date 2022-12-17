const express = require('express');
const app = express();


// Import routes
const bankHistory = require('./routes/bank')


//Router MIddlewares
app.use(express.json());
app.use('/', bankHistory);

module.exports = app;