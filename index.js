const logger = require('./startup/logger');
const express = require('express');
const app = express();

require('./startup/environment')();
require('./startup/routes')(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  logger.info(`Listening on port ${port}...`)
});
module.exports = server;