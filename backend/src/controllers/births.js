const mongoose = require('mongoose');
const Birth = require('../models/Birth');
const Registration = require('../models/Registration')

exports.getBirths = async (req, res)=>{
    try {
        const births = await Birth.find().populate('motherID');
        res.status(200).json(births);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch births' });
    }
};

exports.postBirth = async (req, res)=>{
    try {
        const { birthDate, motherID } = req.body;
        if(!mongoose.Types.ObjectId.isValid(motherID)) 
        return res.status(400).json({ error: 'Invalid mother ID' });
        const mother = await Registration.findById(motherID).populate('consultations');
        if(!mother) 
        return res.status(400).json({ error: 'Invalid mother ID' });
        let birth = new Birth({ birthDate, motherID });
        birth = await birth.save();
        res.status(201).json(birth);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError){
            const validationError = Object.values(error.errors)[0].message;
            return res.status(400).json({ error: validationError });
        }
        res.status(500).json({ error: 'Failed to post birth' });
    }
}; 