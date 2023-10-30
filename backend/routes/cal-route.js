const express = require('express');
const router = express.Router();
const {createEntry,calculateOverallSimilarity} = require('../controllers/cal-control');
const {verifyJwt} = require('../middleware/verify-jwt');

router.post('/entry',verifyJwt,createEntry)
router.get('/calculate',verifyJwt,calculateOverallSimilarity)
module.exports = router;