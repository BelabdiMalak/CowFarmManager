const express = require('express');
const router = express.Router();
const {
    getRegistrations,
    postRegistration,
    updateRegistration,
    getRegistration,
    deleteRegistration
} = require('../controllers/registrations');

router.get('/', (req, res) => getRegistrations(req, res));
router.post('/', (req, res) => postRegistration(req, res));
router.put('/:id', (req, res) => updateRegistration(req, res));
router.get('/:id', (req, res) => getRegistration(req, res));
router.delete('/:id', (req, res) => deleteRegistration(req, res));

module.exports = router;