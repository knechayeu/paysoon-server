const express = require('express');
const router = express.Router();
const customerController = require('../controllers/user');

router.get('/users', customerController.getAllUsers);

module.exports = router;
