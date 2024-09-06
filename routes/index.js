const express = require('express');
const userRouter = require('./user');
const roomRouter = require('./rooms');

module.exports = {
  user: userRouter,
  room: roomRouter,
};
