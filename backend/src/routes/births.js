const express = require('express');
const router = express.Router();
const {
    getBirths,
    postBirth,
    updateBirth,
    getBirth,
    deleteBirth
} = require('../controllers/births');

router.get('/', (req, res) => getBirths(req, res));
router.post('/', (req, res) => postBirth(req, res));
router.put('/:id', (req, res) => updateBirth(req, res));
router.get('/:id', (req, res) => getBirth(req, res));
router.delete('/:id', (req, res) => deleteBirth(req, res));

module.exports = router;