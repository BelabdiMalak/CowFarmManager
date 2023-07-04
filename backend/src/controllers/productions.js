const mongoose = require('mongoose');
const Production = require('../models/Production');

exports.getProductions = async (req, res)=>{
    try {
        const productions = await Production.find();
        res.status(200).json(productions);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch productions' });
    }
};

exports.postProduction = async (req, res)=>{
    try {
        const { productionDate, quantity } = req.body;
        let production = await Production.findOne({ productionDate: productionDate });
        if(production)
        return res.status(400).json({ error: 'Production date already exists' });
        production = new Production({ productionDate, quantity });
        production = await production.save();
        res.status(201).json(production);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            const validationError = Object.values(error.errors)[0].message;
            return res.status(400).json({ error: validationError });
        }
        res.status(500).json({ error: 'Failed to post production' });
    }
};

exports.updateProduction = async (req, res)=>{
    try {
        const { id } = req.params;
        const { productionDate, quantity } = req.body;
    
        if(!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(400).json({ error: 'Invalid ID' });
    
        let production = await Production.findById(id);
        if(!production) res.status(404).json({ error: 'Production not found' });
        if(production.productionDate !== productionDate){
            const existingProduction = await Production.findOne({ productionDate });
            if(existingProduction){
                return res.status(400).json({ error: 'Production date already exists' });
            }
        }

        production.productionDate = productionDate;
        production.quantity = quantity;
        await production.save();
        res.status(201).json(production);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError){
            const validationError = Object.values(error.errors)[0].message;
            return res.status(400).json({ error: validationError });
        }
        res.status(500).json({ error: 'Failed to update production' });
    }
};

exports.getProduction = async (req, res)=>{
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ error: 'Invalid ID'});
        let production = await Production.findById(id);
        if(!production) return res.status(404).json({ error: 'Production not found' });
        res.status(200).json(production);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch production' });
    }
};

exports.deleteProduction = async (req, res)=>{
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ error: 'Invalid ID'});
        const production = await Production.findByIdAndDelete(id);
        if(!production) res.status(404).json({ error: 'Production not found' });
        res.status(200).json({ message: 'Production deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete production' });
    }
}