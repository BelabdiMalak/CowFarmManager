const mongoose = require('mongoose');
const Registration = require('../models/Registration');

exports.getRegistrations = async (req, res)=>{
    try {
        const registrations = await Registration.find().populate('consultations');
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).send({ error : 'Failed to fetch registrations' });
    }
};

exports.postRegistration = async (req, res)=>{
    try {
        let registration = await Registration.findOne({ number: req.body.number });
        if (registration) {
          return res.status(400).json({ error: 'This number already exists' });
        }
        const { number, entryDate, breed } = req.body;
        registration = new Registration({ number, entryDate, breed });
        registration = await registration.save();
        res.status(201).json(registration);
      } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            const validationError = Object.values(error.errors)[0].message;
            return res.status(400).json({ error: validationError });
        }
        res.status(500).json({ error: 'Failed to create registration' });
      }
};

exports.updateRegistration = async (req, res)=>{
    try {
        const { id } = req.params;
        const { number, entryDate, breed } = req.body;
        let registration = await Registration.findByIdAndUpdate(
            id,
            { number, entryDate, breed },
            { new: true }
        ).populate('consultations');
        if(!registration) res.status(404).json({ error: 'Registration not found'});
        res.status(201).json(registration);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            const validationError = Object.values(error.errors)[0].message;
            return res.status(400).json({ error: validationError });
        }
        res.status(500).json({ error: 'Failed to create registration' });    
    }
};

exports.getRegistration = async (req, res)=>{
    try {
        const { id } = req.params;
        const registration = await Registration.findById(id).populate('consultations');
        if(!registration) return res.status(404).json({ error: 'Registration not found' });
        res.status(200).json(registration);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch registration' });  
    }
};

exports.deleteRegistration = async (req, res)=>{
    try {
        const { id } = req.params;
        let registration = await Registration.findByIdAndDelete(id);
        if(!registration) res.status(404).json({ error: 'Registration not found' });
        res.status(200).json({ message: 'Registration deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete registration' });
    }
};