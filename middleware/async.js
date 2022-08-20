const logger = require('../startup/logger');
module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    }
    catch(ex) {
      logger.error(`Asynchronous function error.`);
      next(ex);
    }
  };  
}