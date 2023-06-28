const express = require('express');

const registrations = require('../routes/registrations');
const consultations = require('../routes/consultations');
const productions = require('../routes/productions');
const births = require('../routes/births');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/registrations', registrations);
    //app.use('/api/consultations', consultations);
    //app.use('/api/productions', productions);
    //app.use('/api/births', births);
};