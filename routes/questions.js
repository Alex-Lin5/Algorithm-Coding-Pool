const logger = require('../startup/logger');
const auth = require('../middleware/authorization');
const admin = require('../middleware/admin');
const Question = require('../models/question');
// const Answer = require('../models/answer');
// const Code = require('../models/code');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const questions = await Question.find();
  logger.verbose(`Get all questions: ${questions}`);
  res.send(questions);
})
router.post('/', auth, async (req, res) => {
  const question = new Question({
    description: req.body.description,
    solutions: req.body.solutions
  });
  await question.save();
  logger.verbose(`Post the question: ${question}`);
  res.status(200).send(question);
})
router.get('/:id', async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) {
    logger.error(`Can not find the question: ${req.params.id}`); 
    return res.status(404).send('Can not find the question.');
  }
  logger.verbose(`Get the question: ${question}`);
  res.status(200).send(question);
})
router.put('/:id', auth, async (req, res) => {
  const question = await Question.findByIdAndUpdate(req.params.id, {
    description: req.body.description,
    solutions: req.body.solutions
  }, {new: true})
  if (!question){
    logger.error(`Can not find the question: ${req.params.id}`); 
    return question.status(404).send('Can not find the question');
  }   
  logger.verbose(`Put the question: ${question}`);
  res.status(200).send(question);
})
router.delete('/:id', async (req, res) => {
  const question = await Question.findByIdAndDelete(req.params.id);
  if (!question){
    logger.error(`Can not find the question: ${req.params.id}`); 
    return res.status(404).send('Can not find the question');
  } 
  logger.verbose(`Delete the question: ${question}`);
  res.status(200).send(question);
})

module.exports = router;