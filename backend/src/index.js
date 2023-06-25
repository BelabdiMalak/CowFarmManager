const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app= express();

// enable cors to multiple use for clients server
let cors = require("cors");
app.use(cors());

// load env variables
dotenv.config({
    path: '../config/config.env'
});

require('./settings/joi')();

// startup
//require('./startup/db')();
//require('./startup/logging')();

require('./startup/routes')(app);

// database connection
const PORT = process.env.PORT || 3000;
const dbURL = process.env.MONGO_URI;

mongoose.connect(dbURL, {})
    .then(()=> app.listen(
        PORT,
        ()=> console.log( `The app is running on port : ${PORT}`)
    ))
    .catch((err)=>console.log('database connection error, ', err))

