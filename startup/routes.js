const express = require('express');
const descriptions = require('../routes/descriptions');
const codes = require('../routes/codes');

module.exports = function(app){
  app.use(express.json());
  app.get('/', (req, res) => {
    res.send('home');
  })
  app.use('/descriptions', descriptions); 
  app.use('/codes', codes);
}