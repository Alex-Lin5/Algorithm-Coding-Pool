const logger = require('../startup/logger');
const auth = require('../middleware/auth');
const Code = require('../models/code');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const codes = await Code.find();
  logger.verbose(`Get all codes: ${codes}`);
  res.status(200).send(codes);
});
router.post('/', auth, async (req, res) => {
  const code = new Code({
    content: req.body.content,
    language: req.body.language,
    result: req.body.result,
    performance: req.body.performance
  });
  await code.save();
  logger.verbose(`Post the code: ${code}`);
  res.status(200).send(code);
});
router.get('/:id', async (req, res) => {
  const code = await Code.findById(req.params.id);
  if (!code) {
    logger.error(`Can not find the code: ${req.params.id}`);
    return res.status(404).send('Can not find the code');
  } 
  logger.verbose(`Get the code: ${code}`);
  res.status(200).send(code);
});
router.put('/:id', auth, async (req, res) => {
  const code = await Code.findByIdAndUpdate(req.params.id, {
    content: req.body.content,
    language: req.body.language,
    result: req.body.result,
    performance: req.body.performance
  }, {new: true});
  if (!code) {
    logger.error(`Can not find the code: ${req.params.id}`);
    return res.status(404).send('Can not find the code');
  } 
  logger.verbose(`Put the code: ${code}`);
  res.status(200).send(code);
});
router.delete('/:id', auth, async (req, res) => {
  const code = await Code.findByIdAndDelete(req.params.id);
  if (!code) {
    logger.error(`Can not find the code: ${req.params.id}`);
    return res.status(404).send('Can not find the code');
  } 
  logger.verbose(`Delete the code: ${code}`);
  res.status(200).send(code);
});

module.exports = router;