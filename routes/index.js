const express = require('express');
const userRouter = require('./user');

module.exports = {
  user: userRouter
};
