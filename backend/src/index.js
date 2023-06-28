const express = require('express');
const dotenv = require('dotenv');
const app= express();

// enable cors to multiple use for clients server
let cors = require("cors");
app.use(cors());

// load env variables
dotenv.config({
    path: '../config/config.env'
});

// require('./settings/joi')();

// startup
require('./startup/db')();
//require('./startup/logging')();

require('./startup/routes')(app);

// database connection
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
