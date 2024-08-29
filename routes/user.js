const express = require('express');
const router = express.Router();
const customerController = require('../controllers/user');

router.get('/users', customerController.getAllUsers);
router.get('/user', customerController.getUser);
router.post('/create-user', customerController.createUser);

module.exports = router;
