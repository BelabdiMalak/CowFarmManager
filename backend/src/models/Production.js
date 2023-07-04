const mongoose = require('mongoose');

const productionSchema = new mongoose.Schema({
    productionDate: {
        type: Date,
        required: true, 
        unique: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const Production = mongoose.model(
    'Production',
    productionSchema
);

module.exports = Production;