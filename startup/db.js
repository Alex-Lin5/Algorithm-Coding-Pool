const mongoose = require('mongoose');
const config = require('config');
// const logger = require('./logging');

module.exports = function() {
  const db = config.get('db');
  mongoose.connect(db)
    .then(() => console.log(`Connected to ${db}...`));
}