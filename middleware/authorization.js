const jwt = require('jsonwebtoken');
const config = require('config');
const logger = require('../startup/logger');

module.exports = function (err, req, res, next) {
  const token = req.get('x-auth-token');
  if (!token) {
    logger.error('401, Access unauthorized. No token provided.', err);
    res.status(401).send('Access unauthorized. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    // req.user = decoded; 
    const id = req.body.user._id;
    if(id === decoded._id) {
      logger.verbose(`Token validation passed during authorization: ${decoded}`);
      next();
    }
    else{
      logger.error('400, Invalid token.', err);
      res.status(400).send('Invalid token.');
    }
  }
  catch (ex) {
    logger.error('Something wrong on authorization step.', ex);
  }
}