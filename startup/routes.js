const express = require('express');
const descriptions = require('../routes/descriptions');

module.exports = function(app){
  app.use(express.json());
  app.get('/', (req, res) => {
    res.render('home');
  })
  app.use('/descriptions', descriptions);  
}