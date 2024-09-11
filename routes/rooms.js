const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room');

router.get('/rooms', roomController.getAllRooms);
router.get('/room/:id', roomController.getRoom);
router.post(
  '/create-room',
  (req, res, next) => {
    console.log(req.headers, 111)
    if (req.headers.id?.length) {
      req.body.ownerId = req.headers.id;
      return next();
    }   

    return res.sendStatus(401);
  },
  roomController.createRoom
);
// router.get('/user', customerController.getUser);
// router.post('/create-user', customerController.createUser);

module.exports = router;
