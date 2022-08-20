const logger = require('../startup/logger');

module.exports = function (req, res, next) { 
  if (!req.user.isAdmin) {
    logger.error('Access forbiddened.');
    return res.status(403).send('Access forbiddened.');
  }

  next();
}