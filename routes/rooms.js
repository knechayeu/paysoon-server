const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room');
const { checkUserId } = require('../middleware/auth');

router.get('/rooms', checkUserId, roomController.getAllRooms);
router.get('/room/:id', checkUserId, roomController.getRoom);
router.post('/create-room', checkUserId, roomController.createRoom);

module.exports = router;
