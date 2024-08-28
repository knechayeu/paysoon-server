const express = require('express');
const router = express.Router();
const customerController = require('../controllers/user');

router.get('/users', customerController.getAllUsers);
router.get('/user', customerController.getUser);

module.exports = router;
