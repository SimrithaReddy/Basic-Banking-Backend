const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Import routes
const bankHistory = require('./routes/bank')


//Router MIddlewares
app.use(express.json());
app.use('/', bankHistory);

module.exports = app;
