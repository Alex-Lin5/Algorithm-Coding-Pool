const Solution = require('../models/solution');
const Answer = require('../models/answer');
const Code = require('../models/code');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const solutions = await Solution.find();
  res.send(solutions);
});
router.post('/', async (req, res) => {
  const answer = new Answer({
    content: req.body.answerContent
  });
  const code = new Code({
    content: req.body.codeContent,
    language: req.body.language,
    result: req.body.result,
    performance: req.body.performance
  });
  await answer.save();
  await code.save();
  const solution = new Solution({
    answer: answer._id,
    code: code._id
  });
  await solution.save();
  res.send(solution);
});
router.get('/:id', async (req, res) => {
  const solution = await Solution.findById(req.params.id)
    .populate('answer', 'code');
  if (!solution) return res.status(404).send('Can not find the solution');
  
  res.send(solution);
});
router.put('/:id', async (req, res) => {
  const solution = await Solution.findByIdAndUpdate(req.params.id, {
    answer: req.body.answer,
    code: req.body.code
  }, {new: true});
  if (!solution) return res.status(404).send('Can not find the solution');
  
  res.send(solution);
});
router.delete('/:id', async (req, res) => {
  const solution = await Solution.findByIdAndDelete(req.params.id);
  if (!solution) return res.status(404).send('Can not find the solution');
  
  const answer = await Answer.findByIdAndDelete(solution.answer);
  const code = await Code.findByIdAndDelete(solution.code);
  res.send(solution);
});

module.exports = router;