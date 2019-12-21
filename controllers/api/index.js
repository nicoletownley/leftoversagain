//leaving so we don't need to modify other files
const express = require('express');

const api = express.Router();

api
  .use('/user', require('./user'))
  .use('/item', require('./item'));


// No routes hit?

module.exports = api;