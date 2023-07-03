const express = require('express');
const router = express.Router();
const {
    getBirths,
    postBirth,
    updateBirth
} = require('../controllers/births');

router.get('/', (req, res) => getBirths(req, res));
router.post('/', (req, res) => postBirth(req, res));
router.put('/:id', (req, res) => updateBirth(req, res));

module.exports = router;