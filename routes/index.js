const userRouter = require('./user');
const roomRouter = require('./rooms');
const visionRouter = require('./vision');

module.exports = {
  user: userRouter,
  room: roomRouter,
  vision: visionRouter,
};
