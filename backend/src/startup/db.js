const mongoose = require('mongoose');

module.exports = ()=>{
    const dbURL = process.env.MONGO_URI;
    mongoose.connect(dbURL).then(() => console.log(`INFO: Connected to ${dbURL}...`));
}