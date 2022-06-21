// const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
const logger = require('./startup/logging');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  logger.info(`Listening on port ${port}...`)
});
module.exports = server;