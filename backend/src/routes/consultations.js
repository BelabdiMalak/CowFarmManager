const express = require('express');
const router = express.Router();
const {
    getConsultations,
    postConsultations
} = require('../controllers/consultations');

router.get('/', (req, res) => getConsultations(req, res));
router.post('/', (req, res) => postConsultations(req, res));

module.exports = router;