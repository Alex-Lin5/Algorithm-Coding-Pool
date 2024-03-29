const logger = require('./logger');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
  const nodeEnv = config.util.getEnv('NODE_ENV');
  logger.info(`The NODE_ENV is: ${nodeEnv}`);
  const db = config.get('db');
  mongoose.connect(db)
    .then(() => logger.info(`Connected to ${db}...`))
};
