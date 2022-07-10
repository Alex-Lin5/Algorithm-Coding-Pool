const express = require('express');
const path = require('path');

module.exports = function(app){
  const dir = app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'ejs');
  // console.log('dir: ', dir);
}