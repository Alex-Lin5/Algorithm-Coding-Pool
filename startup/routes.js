const express = require('express');
const descriptions = require('../routes/descriptions');

module.exports = function(app){
  app.use(express.json());
  app.use('/descriptions', descriptions);
}