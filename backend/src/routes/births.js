const express = require('express');
const router = express.Router();
const {
    getBirths,
    postBirth
} = require('../controllers/births');

router.get('/', (req, res) => getBirths(req, res));
router.post('/', (req, res) => postBirth(req, res));

module.exports = router;