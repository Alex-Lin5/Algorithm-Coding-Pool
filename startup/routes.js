const express = require('express');
const descriptions = require('../routes/descriptions');
const codes = require('../routes/codes');
const answers = require('../routes/answers');
const questions = require('../routes/questions');
// const solutions = require('../routes/solutions');

module.exports = function(app){
  app.use(express.json());
  app.get('/', (req, res) => {
    res.send('home');
  })
  app.use('/descriptions', descriptions); 
  app.use('/codes', codes);
  app.use('/answers', answers);
  app.use('/questions', questions);
  // app.use('/solutions', solutions);
}