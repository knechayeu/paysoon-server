const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room');

router.get('/rooms', roomController.getAllRooms);
router.get('/room/:id', roomController.getRoom);
// router.get('/user', customerController.getUser);
// router.post('/create-user', customerController.createUser);

module.exports = router;
