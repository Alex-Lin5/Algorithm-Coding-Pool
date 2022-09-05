const jwt = require('jsonwebtoken');
const config = require('config');
const logger = require('../startup/logger');

module.exports = function (err, req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    logger.error('Access unauthorized. No token provided.', err);
    return res.status(401).send('Access unauthorized. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded; 
    logger.verbose(`Token decoded during authorization: ${decoded}`);
    next();
  }
  catch (ex) {
    logger.error('Invalid token.', err);
    res.status(400).send('Invalid token.');
  }
}