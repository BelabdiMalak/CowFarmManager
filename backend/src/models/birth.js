const mongoose = require = require('mongoose');

const birthSchema = new mongoose.Schema({
    birthDate: {
        type: Date,
        required: true
    }, 
    motherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Registration'
    }
});

const Birth = mongoose.model(
    'Birth',
    birthSchema
);

module.exports = Birth;