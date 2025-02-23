const express = require('express');
const router = express.Router();
const visionController = require('../controllers/vision');

router.post('/vision', visionController.analyzeImage);

module.exports = router;
