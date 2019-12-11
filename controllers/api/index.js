const express = require('express');

const api = express.Router();

api
  .use('/user', require('./user'))
  .use('/item', require('./item'));


// No routes hit?
api.use((req, res) => res.status(404).end());
module.exports = api;