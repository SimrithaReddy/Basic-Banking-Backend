const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})

// Import routes
const bankHistory = require('./routes/bank')


//Router MIddlewares
app.use(express.json());
app.use('/', bankHistory);

module.exports = app;
