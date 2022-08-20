const logger = require('../startup/logger');
const auth = require('../middleware/auth');
const Answer = require('../models/answer');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const answers = await Answer.find();
  logger.verbose(`Get all answers: ${answers}`);
  res.send(answers);
});
router.post('/', auth, async (req, res) => {
  const answer = new Answer({
    content: req.body.content,
  });
  await answer.save();
  logger.verbose(`Post the answer: ${answer}`);
  res.send(answer);
});
router.get('/:id', async (req, res) => {
  const answer = await Answer.findById(req.params.id);
  if (!answer) {
    logger.error(`Can not find the answer: ${req.params.id}`);
    return res.status(404).send('Can not find the answer');
  } 
  logger.verbose(`Get the answer: ${answer}`);
  res.send(answer);
});
router.put('/:id', auth, async (req, res) => {
  const answer = await Answer.findByIdAndUpdate(req.params.id, {
    content: req.body.content,
  }, {new: true});
  if (!answer) {
    logger.error(`Can not find the answer: ${req.params.id}`);
    return res.status(404).send('Can not find the answer');
  } 
  logger.verbose(`Put the answer: ${answer}`);
  res.send(answer);
});
router.delete('/:id', auth, async (req, res) => {
  const answer = await Answer.findByIdAndDelete(req.params.id);
  if (!answer) {
    logger.error(`Can not find the answer: ${req.params.id}`);
    return res.status(404).send('Can not find the answer');
  } 
  logger.verbose(`Delete the answer: ${answer}`);
  res.send(answer);
});

module.exports = router;