const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
    consltDate: {
        type: Date,
        required: true,
    },
    sickness: {
        type: String,
        required: true
    },
    registration: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Registration'
    }
});

const Consultation = mongoose.model(
    'Consultation',
    consultationSchema
);

module.exports = Consultation;