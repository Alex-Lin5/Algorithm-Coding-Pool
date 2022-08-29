const logger = require('../startup/logger');
const auth = require('../middleware/authorization');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  logger.verbose(`Send user: ${user}`);
  res.send(user);
});

router.post('/', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    logger.error('User already registered.');
    return res.status(400).send('User already registered.');
  }

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  logger.verbose(`User saved successfully, ${user._id}`);

  const token = user.generateAuthToken();
  logger.verbose(`User token send: ${token}`);
  res.status(200).header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router; 
