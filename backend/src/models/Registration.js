const Joi = require('joi');
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true
    },
    entryDate: {
        type: Date,
        required: true
    },
    breed: {
        type: String, 
        required: true, 
        enum: ['Holstein', 'Montbeliard']
    }
});

const Registration = mongoose.model(
    'Registration', 
    registrationSchema
    );

module.exports = Registration;
