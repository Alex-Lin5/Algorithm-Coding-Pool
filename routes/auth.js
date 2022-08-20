const logger = require('../startup/logger');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  // const { error } = validate(req.body); 
  // if (error) {
  //   logger.error(error.details[0].message);
  //   return res.status(400).send(error.details[0].message);
  // } 

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    logger.error(`Invalid email.`);
    return res.status(400).send('Invalid email or password.');
  } 

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    logger.error(`Invalid password.`);
    return res.status(400).send('Invalid email or password.');
  } 

  const token = user.generateAuthToken();
  logger.verbose(`Token send: ${token}`);
  res.send(token);
});

module.exports = router; 
