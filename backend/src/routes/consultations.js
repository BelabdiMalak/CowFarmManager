const express = require('express');
const router = express.Router();
const {
    getConsultations,
    postConsultations,
    updateConsultation,
    getConsultation,
    deleteConsultation
} = require('../controllers/consultations');

router.get('/', (req, res) => getConsultations(req, res));
router.post('/', (req, res) => postConsultations(req, res));
router.put('/:id', (req, res) => updateConsultation(req, res));
router.get('/:id', (req, res) => getConsultation(req, res));
router.delete('/:id', (req, res) => deleteConsultation(req, res));

module.exports = router;