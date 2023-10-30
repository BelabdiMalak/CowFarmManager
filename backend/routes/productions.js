const express = require('express');
const router = express.Router();
const {
    getProductions, 
    postProduction,
    updateProduction,
    getProduction,
    deleteProduction
} = require('../controllers/productions');

router.get('/', (req, res) => getProductions(req, res));
router.post('/', (req, res) => postProduction(req, res));
router.put('/:id', (req, res) => updateProduction(req, res));
router.get('/:id', (req, res) => getProduction(req, res));
router.delete('/:id', (req, res) => deleteProduction(req, res));

module.exports = router;