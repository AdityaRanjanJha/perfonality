const express = require('express');
const router = express.Router();
const {createEntry,calculateOverallSimilarity} = require('../controllers/cal-control');

router.post('/entry',createEntry)
router.get('/calculate/:id',calculateOverallSimilarity)
module.exports = router;