const Question = require('../models/question');
const Answer = require('../models/answer');
const Code = require('../models/code');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const questions = await Question.find();
  res.send(questions);
})
router.post('/', async (req, res) => {
  const question = new Question({
    description: req.body.description,
    solutions: {
      answer: req.body.solutions.answer,
      code: req.body.solutions.code
    }
  });
  await question.save();
  res.status(200).send(question);
})
router.get('/:id', async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) return res.status(404).send('Can not find the question.');
  res.status(200).send(question);
})
router.put('/:id', async (req, res) => {
  const question = await Question.findByIdAndUpdate(req.params.id, {
    description: req.body.description,
    solutions: {
      answer: req.body.answer,
      code: req.body.code
    }
  })
  if (!question) return question.status(404)
    .send('Can not find the question');
  res.status(200).send(question);
})
router.delete('/:id', async (req, res) => {
  const question = await Question.findByIdAndDelete(req.params.id);
  if (!question) return res.status(404).send('Can not find the question');
  res.status(200).send(question);
})

module.exports = router;