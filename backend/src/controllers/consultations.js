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

exports.postConsultations = async (req, res)=>{
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
}