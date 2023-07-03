const mongoose = require('mongoose');
const Consultation = require('../models/Consultation');

exports.getConsultations = async (req, res)=>{
    try {
        const consultations = await Consultation.find().populate('registration');
        res.status(200).json(consultations);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch consultations' })
    }
};

exports.postConsultation = async (req, res)=>{
    try {
        const { consltDate, sickness, registration } = req.body;
        const consultation = new Consultation({ consltDate, sickness, registration });
        consultation = await consultation.save();
        res.status(201).json(consultation);
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError){
            const validationError = Object.values(error.errors)[0].message;
            return res.status(400).json({ error: validationError });
        }
        res.status(500).json({ error: 'Failed to post consulation' });
    }
};

exports.updateConsultation = async (req, res)=>{
    try {
        const { id } = req.params;
        const { sickness, consltDate, registration } = req.body;
        let consultation = await Consultation.findByIdAndUpdate(
            id, 
            { sickness, consltDate, registration },
            { new: true }
        ).populate('registration');
        if(!consultation) res.status(404).json({ error: 'Consultation not found' });
        res.status(201).json(consultation);
    } catch (error) {
        if (error instanceof mongoose.Error.validationError){
            const validationError = Object.values(error.errors)[0].message;
            return res.status(400).json({ error: validationError });
        }
        res.status(500).json({ error: 'Failed to update consultation' });
    }
};

exports.getConsultation = async (req, res)=>{
    try {
        const { id } = req.params;
        const consultation = await Consultation.findById(id).populate('registration');
        if(!consultation) return res.status(404).json({ error: 'Consultation not found' });
        res.status(200).json(consultation)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch consultation' });
    }
};

exports.deleteConsultation = async (req, res)=>{
    try {
        const { id } = req.params;
        const consultation = await Consultation.findByIdAndDelete(id);
        if(!consultation) return res.status(404).json({ error: 'Consultation not found' });
        res.status(200).json({ message: 'Consultation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete consultation' });
    }
};