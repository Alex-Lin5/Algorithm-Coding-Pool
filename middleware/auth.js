const jwt = require('jsonwebtoken');
const config = require('config');
const logger = require('../startup/logger');

module.exports = function (err, req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    logger.error('Access unauthorized. No token provided.');
    return res.status(401).send('Access unauthorized. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded; 
    next();
  }
  catch (ex) {
    logger.error('Invalid token.');
    res.status(400).send('Invalid token.');
  }
}